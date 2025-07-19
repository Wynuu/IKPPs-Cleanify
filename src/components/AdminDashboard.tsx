import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { auth, db, storage } from '../services/firebase';
import { 
  collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, 
  query, where, orderBy, Timestamp, onSnapshot, setDoc, serverTimestamp 
} from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSun, FiMoon, FiMenu, FiCheck, FiX, FiTrash, 
  FiEdit, FiEye, FiLogOut, FiImage, FiCalendar,
  FiClipboard, FiUserPlus, FiList, FiPlusCircle,
  FiAlertCircle, FiInfo, FiClock
} from 'react-icons/fi';

interface UserPerformance {
  id: string;
  name: string;
  nik: string;
  progress: number; // 0 - 100
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  status: 'selesai' | 'belum';
  timestamp: any; // Firestore timestamp
  submissionId?: string;
}

interface TaskSubmission {
  id: string;
  taskId: string;
  taskTitle: string;
  userId: string;
  userName: string;
  images: {
    fileName: string;
    fileURL: string;
  }[];
  caption: string;
  submittedAt: string;
  status: 'submitted' | 'reviewed';
}

type UserType = {
  id: string;
  name: string;
  nama: string;
  nik: string;
  role: string;
  progress?: number;
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  // Proteksi: jika tidak login, redirect ke login
  useEffect(() => {
    if (!currentUser) {
      navigate('/', { replace: true });
    } else {
      // Blokir tombol back ke login
      window.history.pushState(null, '', window.location.href);
      const handlePopState = () => {
        window.history.pushState(null, '', window.location.href);
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [currentUser, navigate]);
  const [greeting, setGreeting] = useState('');
  const [timeIcon, setTimeIcon] = useState(<FiSun />);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [user, setUser] = useState<any>(null);
  const [performanceList, setPerformanceList] = useState<UserPerformance[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserPerformance | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<TaskSubmission | null>(null);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSubmissionDetail, setShowSubmissionDetail] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [completedSubmissions, setCompletedSubmissions] = useState<TaskSubmission[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{show: boolean, taskId: string}>({show: false, taskId: ''});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    userId: '',
    deadline: ''
  });
  const [newUserForm, setNewUserForm] = useState({
    email: '',
    password: '',
    nama: '',
    nik: '',
    role: 'user'
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [userFormError, setUserFormError] = useState<string | null>(null);
  const [userFormSuccess, setUserFormSuccess] = useState<string | null>(null);

  // Set time-based greeting and update date/time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hour = now.getHours();
      
      // Set greeting based on time of day
      if (hour < 12) {
        setGreeting('Selamat Pagi');
        setTimeIcon(<FiSun className="text-yellow-400" />);
      } else if (hour < 15) {
        setGreeting('Selamat Siang');
        setTimeIcon(<FiSun className="text-yellow-500" />);
      } else if (hour < 18) {
        setGreeting('Selamat Sore');
        setTimeIcon(<FiSun className="text-orange-500" />);
      } else {
        setGreeting('Selamat Malam');
        setTimeIcon(<FiMoon className="text-blue-300" />);
      }
      
      // Format day name and date to match "Senin, 21 April 2025" format
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      };
      const formattedDate = now.toLocaleDateString('id-ID', options);
      // Capitalize first letter and ensure format matches "Senin, 21 April 2025"
      const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      setCurrentDate(capitalizedDate);
      
      // Format time (hours and minutes) to match "13.24" format
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}.${minutes}`);
    };
    
    // Update immediately
    updateDateTime();
    
    // Update every minute
    const interval = setInterval(updateDateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate('/');
        return;
      }

      try {
        const userRoleDoc = await getDoc(doc(db, 'users', currentUser.uid));
        const role = userRoleDoc.data()?.role;

        if (role !== 'admin') {
          navigate('/user-dashboard');
        } else {
          setUser({
            ...userRoleDoc.data(),
            uid: currentUser.uid
          });
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Fetch users for dropdown 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersQuery = query(
          collection(db, "users"),
          where("role", "==", "user")
        );
        
        const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
          const usersData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            name: doc.data().nama || doc.data().name || "Unknown User"
          })) as UserType[];
          
          console.log("Users data:", usersData);
          setUsers(usersData);
        });
        
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch performance data using real-time updates
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Listen for user changes
        const usersUnsubscribe = onSnapshot(
          query(collection(db, 'users'), where("role", "==", "user")),
          async (usersSnapshot) => {
            console.log("Users snapshot size:", usersSnapshot.size);
            
            const userMap: Record<string, UserPerformance> = {};
            
            // Initialize user map
            usersSnapshot.forEach((docSnap) => {
              const data = docSnap.data();
              userMap[docSnap.id] = {
                id: docSnap.id,
                name: data.nama || data.name || "Unknown User",
                nik: data.nik || 'N/A',
                progress: 0,
                tasks: [],
              };
            });
            
            // Listen for task changes
            const tasksUnsubscribe = onSnapshot(
              collection(db, 'tasks'),
              (tasksSnapshot) => {
                console.log("Tasks snapshot size:", tasksSnapshot.size);
                
                // Reset tasks for each user
                Object.keys(userMap).forEach(userId => {
                  userMap[userId].tasks = [];
                });
                
                // Process all tasks
                tasksSnapshot.forEach((taskSnap) => {
                  const taskData = taskSnap.data();
                  const userId = taskData.assignedTo;
                  
                  if (userMap[userId]) {
                    let formattedTimestamp = "Unknown Date";
                    if (taskData.timestamp) {
                      if (typeof taskData.timestamp.toDate === 'function') {
                        formattedTimestamp = taskData.timestamp.toDate().toLocaleString();
                      } else if (typeof taskData.timestamp === 'string') {
                        formattedTimestamp = new Date(taskData.timestamp).toLocaleString();
                      }
                    }
                    
                    userMap[userId].tasks.push({
                      id: taskSnap.id,
                      title: taskData.title,
                      status: taskData.status,
                      timestamp: taskData.timestamp,
                      submissionId: taskData.submissionId
                    });
                  }
                });
                
                // Calculate progress for each user
                const performanceData = Object.values(userMap).map((user) => {
                  const total = user.tasks.length;
                  const completed = user.tasks.filter((t) => t.status === 'selesai').length;
                  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
                  return { ...user, progress };
                });
                
                console.log("Performance data calculated:", performanceData);
                setPerformanceList(performanceData);
                
                // Update selected user if present
                if (selectedUser) {
                  const updatedSelectedUser = performanceData.find(u => u.id === selectedUser.id);
                  if (updatedSelectedUser) {
                    setSelectedUser(updatedSelectedUser);
                  }
                }
                
                setLoading(false);
              }
            );
            
            return () => {
              tasksUnsubscribe();
            };
          }
        );
        
        return () => {
          usersUnsubscribe();
        };
        
      } catch (error) {
        console.error("Error setting up real-time data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [selectedUser?.id]);

  // Fetch completed tasks
  useEffect(() => {
    if (showCompletedTasks) {
      const fetchCompletedSubmissions = async () => {
        try {
          const q = query(
            collection(db, 'submissions'),
            where('status', '==', 'reviewed'),
            orderBy('submittedAt', 'desc')
          );
          
          const unsubscribe = onSnapshot(q, (snapshot) => {
            const submissions = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              taskId: doc.data().taskId || '',
              taskTitle: doc.data().taskTitle || 'Unknown Task',
              userId: doc.data().userId || '',
              userName: doc.data().userName || 'Unknown User',
              images: doc.data().images || [],
              caption: doc.data().caption || '',
              submittedAt: doc.data().submittedAt || new Date().toISOString(),
              status: doc.data().status
            })) as TaskSubmission[];
            
            setCompletedSubmissions(submissions);
          });
          
          return () => unsubscribe();
        } catch (error) {
          console.error("Error fetching completed submissions:", error);
        }
      };
      
      fetchCompletedSubmissions();
    }
  }, [showCompletedTasks]);

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle new user form changes
  const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new task
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    try {
      const { title, description, userId, deadline } = formData;
      
      if (!title || !userId || !deadline) {
        setFormError("Semua field harus diisi!");
        return;
      }
      
      // Check if user already has 10 tasks
      const userTasksQuery = query(
        collection(db, 'tasks'),
        where('assignedTo', '==', userId),
        where('status', '==', 'belum')
      );
      
      const taskSnapshot = await getDocs(userTasksQuery);
      
      if (taskSnapshot.size >= 10) {
        setFormError("User ini sudah memiliki 10 tugas aktif. Harap tunggu hingga beberapa tugas selesai.");
        return;
      }
      
      // Convert deadline string to Date object
      const deadlineDate = new Date(deadline);
      
      await addDoc(collection(db, 'tasks'), {
        title,
        description: description || '',
        assignedTo: userId,
        status: 'belum',
        timestamp: Timestamp.fromDate(deadlineDate),
        createdAt: Timestamp.now()
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        userId: '',
        deadline: ''
      });
      
      setShowAddTaskForm(false);
    } catch (error) {
      console.error('Gagal menambahkan tugas:', error);
      setFormError('Terjadi kesalahan saat menambahkan tugas');
    }
  };

  // Create new user
  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserFormError(null);
    setUserFormSuccess(null);
    
    try {
      const { email, password, nama, nik } = newUserForm;
      
      if (!email || !password || !nama || !nik) {
        setUserFormError("Semua field harus diisi!");
        return;
      }
      
      // Create the auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      
      // Add user data to Firestore
      await setDoc(doc(db, 'users', userId), {
        nama,
        nik,
        email,
        role: 'user',
        createdAt: serverTimestamp()
      });
      
      // Reset form
      setNewUserForm({
        email: '',
        password: '',
        nama: '',
        nik: '',
        role: 'user'
      });
      
      setUserFormSuccess("Akun user berhasil dibuat!");
      
      // Close form after 3 seconds
      setTimeout(() => {
        setShowAddUserForm(false);
        setUserFormSuccess(null);
      }, 3000);
      
    } catch (error: any) {
      console.error('Gagal membuat user:', error);
      if (error.code === 'auth/email-already-in-use') {
        setUserFormError('Email sudah digunakan. Gunakan email lain.');
      } else if (error.code === 'auth/invalid-email') {
        setUserFormError('Format email tidak valid.');
      } else if (error.code === 'auth/weak-password') {
        setUserFormError('Password terlalu lemah. Gunakan minimal 6 karakter.');
      } else {
        setUserFormError('Terjadi kesalahan saat membuat akun.');
      }
    }
  };
  
  // Delete task
  const deleteTask = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      setDeleteConfirmation({show: false, taskId: ''});
      
      // Update UI directly (optional, since we have real-time updates)
      if (selectedUser) {
        setSelectedUser({
          ...selectedUser,
          tasks: selectedUser.tasks.filter(task => task.id !== taskId)
        });
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // View task submission details
  const viewSubmission = async (submissionId: string) => {
    try {
      const submissionDoc = await getDoc(doc(db, 'submissions', submissionId));
      
      if (submissionDoc.exists()) {
        const submissionData = submissionDoc.data();
        setSelectedSubmission({
          id: submissionDoc.id,
          taskId: submissionData.taskId || '',
          taskTitle: submissionData.taskTitle || 'Tugas Kebersihan',
          userId: submissionData.userId || '',
          userName: submissionData.userName || 'Unknown User',
          images: submissionData.images || [],
          caption: submissionData.caption || '',
          submittedAt: submissionData.submittedAt || new Date().toISOString(),
          status: submissionData.status || 'submitted'
        });
        setShowSubmissionDetail(true);
      } else {
        console.error("Submission not found");
      }
    } catch (error) {
      console.error("Error fetching submission:", error);
    }
  };

  // Mark submission as reviewed
  const markAsReviewed = async (submissionId: string) => {
    try {
      await updateDoc(doc(db, 'submissions', submissionId), {
        status: 'reviewed',
        reviewedAt: new Date().toISOString()
      });
      
      setShowSubmissionDetail(false);
      setSelectedSubmission(null);
    } catch (error) {
      console.error("Error updating submission status:", error);
    }
  };

  // Log out
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp: any): string => {
    if (!timestamp) return 'Tidak ada tanggal';
    
    try {
      // Convert Firestore timestamp to Date
      let date;
      if (timestamp?.toDate && typeof timestamp.toDate === 'function') {
        date = timestamp.toDate();
      } else if (timestamp instanceof Date) {
        date = timestamp;
      } else if (typeof timestamp === 'string') {
        date = new Date(timestamp);
      } else {
        return 'Format tanggal tidak valid';
      }
      
      return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      console.error("Error formatting timestamp:", e);
      return 'Format tanggal tidak valid';
    }
  };

  // Get color based on progress value
  const getProgressColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 50) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  // Toggle menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    // Close other panels when opening menu
    if (!showMenu) {
      setShowAddTaskForm(false);
      setShowAddUserForm(false);
      setShowCompletedTasks(false);
    }
  };

  // Open add task form
  const openAddTaskForm = () => {
    setShowAddTaskForm(true);
    setShowMenu(false);
    setShowAddUserForm(false);
    setShowCompletedTasks(false);
  };

  // Open add user form
  const openAddUserForm = () => {
    setShowAddUserForm(true);
    setShowMenu(false);
    setShowAddTaskForm(false);
    setShowCompletedTasks(false);
  };
  
  // Open completed tasks
  const openCompletedTasks = () => {
    setShowCompletedTasks(true);
    setShowMenu(false);
    setShowAddTaskForm(false);
    setShowAddUserForm(false);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const expandCard = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1, transition: { duration: 0.3 } }
  };
  
  const slideIn = {
    hidden: { x: -300, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  // Generate moving particles background
  const Particles = () => {
    return (
      <div className="particles-container absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-purple-500 opacity-10 rounded-full"
            style={{
              width: Math.floor(Math.random() * 10) + 5,
              height: Math.floor(Math.random() * 10) + 5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
    );
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-purple-300">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white p-6 relative">
      <Particles />
      
      {/* Header Section */}
      <motion.div 
        className="z-10 relative flex justify-between items-start"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <motion.span 
              className="text-4xl"
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {timeIcon}
            </motion.span>
            <h1 className="text-2xl font-bold text-purple-300">{greeting}</h1>
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Selamat Datang {user?.nama || "Admin"}
          </h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className={`bg-purple-600/80 hover:bg-purple-700 p-3 rounded-lg flex items-center space-x-2 relative ${showMenu ? 'bg-purple-700' : ''}`}
          >
            <FiMenu className="text-white text-xl" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center space-x-2 text-sm"
          >
            <FiLogOut />
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.div>
      
      {/* Slide-in Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="fixed top-0 left-0 h-full w-64 bg-gray-900/95 backdrop-blur-md z-50 shadow-xl border-r border-purple-500/20 p-6"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideIn}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-semibold text-purple-300">Menu Admin</h2>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMenu}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX size={20} />
                </motion.button>
              </div>
              
              <div className="space-y-4">
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={openAddTaskForm}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 transition-colors"
                >
                  <FiPlusCircle className="text-purple-400" />
                  <span>Tambah Tugas Baru</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={openAddUserForm}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 transition-colors"
                >
                  <FiUserPlus className="text-purple-400" />
                  <span>Tambah User Baru</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={openCompletedTasks}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-800/30 transition-colors"
                >
                  <FiList className="text-purple-400" />
                  <span>Riwayat Tugas Selesai</span>
                </motion.button>
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-700/50">
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <FiInfo />
                  <span>IKPPs Cleanify</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Employee Performance Cards - Horizontal Scrollable */}
      <motion.div 
        className="mt-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={slideUp}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-purple-200">Performa & Data Karyawan</h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-purple-900 px-4 py-2 rounded-lg flex flex-col items-start shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <FiCalendar className="text-purple-300" />
              <span className="text-white text-sm font-medium">{currentDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiClock className="text-purple-300" />
              <span className="text-white text-sm font-medium">{currentTime}</span>
            </div>
          </motion.div>
        </div>
        
        {performanceList.length === 0 ? (
          <div className="text-center py-8 px-6 bg-gray-800/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl">
            <p className="text-gray-400">Belum ada data karyawan yang tersedia</p>
          </div>
        ) : (
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 w-max py-2">
              {performanceList.map((user) => (
                <motion.div
                  key={user.id}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
                  className="min-w-[250px] bg-gray-800/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-5 cursor-pointer transition-all duration-200"
                >
                  <p className="text-lg font-medium text-white truncate">{user.name}</p>
                  <p className="text-sm text-gray-400">NIK: {user.nik || 'N/A'}</p>
                  
                  <div className="w-full h-4 mt-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgressColor(user.progress)}`}
                      style={{ width: `${user.progress || 0}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-sm font-medium ${
                      user.progress >= 80 ? 'text-green-400' : 
                      user.progress >= 50 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {user.progress || 0}%
                    </span>
                    <span className="text-xs text-gray-400">
                      {user.tasks?.length || 0} tugas
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Task Add Form */}
      <AnimatePresence>
        {showAddTaskForm && (
          <motion.div 
            className="mt-6 relative z-10"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={expandCard}
          >
           <div className="p-6 bg-gray-800/80 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-purple-300">Tambah Tugas Baru</h2>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAddTaskForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX size={20} />
                </motion.button>
              </div>
              
              <form onSubmit={addTask} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm text-purple-300 mb-2">Judul Tugas</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    placeholder="Contoh: Sapu Gudang 1"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm text-purple-300 mb-2">Deskripsi Tugas (Opsional)</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="Detil instruksi tugas..."
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white h-24 resize-none"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm text-purple-300 mb-2">Pilih Karyawan</label>
                  <select 
                    name="userId" 
                    value={formData.userId}
                    onChange={handleFormChange}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white"
                    required
                  >
                    <option value="">-- Pilih Karyawan --</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.nama || user.name || user.id}
                      </option>
                    ))}
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm text-purple-300 mb-2">Deadline</label>
                  <input
                    type="datetime-local"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleFormChange}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white"
                    required
                  />
                </motion.div>
                
                {formError && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-900/30 border border-red-500/30 p-4 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FiX className="text-red-400 mr-2" />
                      <p className="text-red-400 text-sm">{formError}</p>
                    </div>
                  </motion.div>
                )}
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(168, 85, 247, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3 px-6 rounded-lg font-medium shadow-lg transition-all duration-200"
                >
                  Tambahkan Tugas
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add User Form */}
      <AnimatePresence>
        {showAddUserForm && (
          <motion.div 
            className="mt-6 relative z-10"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={expandCard}
          >
            <div className="p-6 bg-gray-800/80 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-purple-300">Tambah User Baru</h2>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAddUserForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX size={20} />
                </motion.button>
              </div>
              
              <form onSubmit={createUser} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm text-purple-300 mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    name="nama"
                    value={newUserForm.nama}
                    onChange={handleUserFormChange}
                    placeholder="Nama lengkap karyawan"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm text-purple-300 mb-2">NIK</label>
                  <input
                    type="text"
                    name="nik"
                    value={newUserForm.nik}
                    onChange={handleUserFormChange}
                    placeholder="Nomor Induk Karyawan"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm text-purple-300 mb-2">Email Gunakan @user.com</label>
                  <input
                    type="email"
                    name="email"
                    value={newUserForm.email}
                    onChange={handleUserFormChange}
                    placeholder="Masukkan NIK, Contoh ( 011****@user.com )"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm text-purple-300 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={newUserForm.password}
                    onChange={handleUserFormChange}
                    placeholder="Minimal 6 karakter"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white"
                    required
                  />
                </motion.div>
                
                {userFormError && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-900/30 border border-red-500/30 p-4 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FiX className="text-red-400 mr-2" />
                      <p className="text-red-400 text-sm">{userFormError}</p>
                    </div>
                  </motion.div>
                )}
                
                {userFormSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FiCheck className="text-green-400 mr-2" />
                      <p className="text-green-400 text-sm">{userFormSuccess}</p>
                    </div>
                  </motion.div>
                )}
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(168, 85, 247, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3 px-6 rounded-lg font-medium shadow-lg transition-all duration-200"
                >
                  Buat Akun User
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Completed Tasks History */}
      <AnimatePresence>
        {showCompletedTasks && (
          <motion.div 
            className="mt-6 relative z-10"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={expandCard}
          >
            <div className="p-6 bg-gray-800/80 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-purple-300">Riwayat Tugas Selesai</h2>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowCompletedTasks(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX size={20} />
                </motion.button>
              </div>
              
              {completedSubmissions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">Belum ada tugas yang diselesaikan</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {completedSubmissions.map((submission, index) => (
                    <motion.div
                      key={submission.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-gray-700/30 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white">{submission.taskTitle}</h3>
                          <p className="text-sm text-gray-400 mt-1">Oleh: {submission.userName}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Selesai pada: {new Date(submission.submittedAt).toLocaleString('id-ID')}
                          </p>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => viewSubmission(submission.id)}
                          className="px-3 py-2 bg-blue-600/40 hover:bg-blue-600/60 rounded-lg text-xs flex items-center space-x-1"
                        >
                          <FiEye />
                          <span>Detail</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* User Task Details Panel with Delete Buttons */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div 
            className="mt-8 relative z-10"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={expandCard}
          >
            <div className="p-6 bg-gray-800/80 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-purple-300">
                  Detail Tugas: {selectedUser.name}
                </h2>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX size={20} />
                </motion.button>
              </div>
              
              {selectedUser.tasks.length === 0 ? (
                <p className="text-gray-400 text-center py-4">Belum ada tugas yang diberikan</p>
              ) : (
                <div className="space-y-3">
                  {selectedUser.tasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border ${
                        task.status === 'selesai' 
                          ? 'bg-green-900/20 border-green-500/30' 
                          : 'bg-red-900/20 border-red-500/30'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-grow">
                          <div className="flex items-center space-x-3">
                            <motion.span
                              animate={task.status === 'selesai' 
                                ? { scale: [1, 1.2, 1], rotate: [0, 180, 360] } 
                                : { rotate: [0, 45, 0] }}
                              transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                task.status === 'selesai' ? 'bg-green-500' : 'bg-red-500'
                              }`}
                            >
                              {task.status === 'selesai' ? <FiCheck /> : <FiX />}
                            </motion.span>
                            <span className="font-medium">{task.title}</span>
                          </div>
                          <span className="text-sm text-gray-400 ml-11 block mt-1">
                            Deadline: {formatTimestamp(task.timestamp)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {task.status === 'selesai' && task.submissionId && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => viewSubmission(task.submissionId!)}
                              className="px-3 py-2 bg-blue-600/40 hover:bg-blue-600/60 rounded-lg text-xs flex items-center space-x-1"
                            >
                              <FiEye />
                              <span>Lihat Bukti</span>
                            </motion.button>
                          )}
                          
                          <motion.button
                            whileHover={{ scale: 1.05, color: "#ff4c4c" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setDeleteConfirmation({show: true, taskId: task.id})}
                            className="p-2 bg-red-600/30 hover:bg-red-600/50 rounded-lg text-white transition-all"
                          >
                            <FiTrash size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Delete Task Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmation.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-red-900/30 text-red-500">
                  <FiAlertCircle size={30} />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Konfirmasi Hapus Tugas</h3>
                <p className="text-gray-400">
                  Anda yakin ingin menghapus tugas ini? Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setDeleteConfirmation({show: false, taskId: ''})}
                  className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium"
                >
                  Batal
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => deleteTask(deleteConfirmation.taskId)}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium"
                >
                  Hapus
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Submission Detail Modal */}
      <AnimatePresence>
        {showSubmissionDetail && selectedSubmission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => {
              setShowSubmissionDetail(false);
              setSelectedSubmission(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-purple-300">
                    Bukti Penyelesaian Tugas
                  </h3>
                  <p className="text-gray-400">
                    {selectedSubmission.taskTitle}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowSubmissionDetail(false);
                    setSelectedSubmission(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-1">Diselesaikan oleh:</p>
                  <p className="font-medium text-white">{selectedSubmission.userName}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Tanggal: {new Date(selectedSubmission.submittedAt).toLocaleString('id-ID')}
                  </p>
                </div>
                
                {selectedSubmission.caption && (
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <p className="text-sm text-gray-300 mb-2">Keterangan dari karyawan:</p>
                    <p className="text-white">{selectedSubmission.caption}</p>
                  </div>
                )}
                
                {selectedSubmission.images && selectedSubmission.images.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-300 mb-3">Bukti Foto ({selectedSubmission.images.length}):</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedSubmission.images.map((img, idx) => (
                        <a 
                          key={idx} 
                          href={img.fileURL} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block rounded-lg overflow-hidden border border-purple-500/30 hover:border-purple-400 transition-colors"
                        >
                          <div className="aspect-square w-full relative">
                            <img 
                              src={img.fileURL} 
                              alt={`Bukti ${idx+1}`} 
                              className="absolute inset-0 w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://via.placeholder.com/150?text=Error";
                              }}
                            />
                          </div>
                          <div className="p-2 bg-gray-800">
                            <p className="text-xs text-gray-400 truncate">{img.fileName}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedSubmission.status === 'submitted' && (
                  <div className="flex justify-end mt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => markAsReviewed(selectedSubmission.id)}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center space-x-2"
                    >
                      <FiCheck />
                      <span>Tandai Sudah Diperiksa</span>
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;