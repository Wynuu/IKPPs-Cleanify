import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { auth, db, storage } from '../services/firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiUpload, FiCheck, FiX, FiLogOut, FiCalendar, FiClock, FiImage, FiTrash } from 'react-icons/fi';


// Di bagian atas file, di luar komponen
  // Fungsi untuk mendapatkan pesan error yang aman dari berbagai jenis error
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    } else if (error && typeof error === 'object' && 'message' in error) {
      return String((error as { message: unknown }).message);
    } else if (typeof error === 'string') {
      return error;
    } else {
      return "Terjadi kesalahan yang tidak diketahui";
    }
  };

interface CleaningTask {
  id: string;
  title: string;
  description?: string;
  status: 'belum' | 'selesai';
  timestamp: any; // Using any for Firestore timestamp compatibility
  assignedTo: string;
}

interface TaskImage {
  file: File;
  preview: string;
}

interface TaskSubmission {
  id: string;
  taskId: string;
  taskTitle?: string;
  images: {
    fileName: string;
    fileURL: string;
  }[];
  caption: string;
  submittedAt: string;
  status: 'submitted' | 'reviewed';
}

const UserDashboard: React.FC = () => {
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
  const [userData, setUserData] = useState<any>(null);
  const [tasks, setTasks] = useState<CleaningTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadImages, setUploadImages] = useState<TaskImage[]>([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set time-based greeting
  useEffect(() => {
    const updateTimeInfo = () => {
      const now = new Date();
      const hour = now.getHours();
      
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
    };

    updateTimeInfo();
    const interval = setInterval(updateTimeInfo, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Auth check and fetch user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate('/');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.role === 'user') {
            setUserData({...data, uid: currentUser.uid});
            fetchTasks(currentUser.uid);
            fetchCompletedTasks(currentUser.uid);
          } else {
            navigate('/admin-dashboard');
          }
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error("Error checking user data:", error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Fetch assigned cleaning tasks
  const fetchTasks = async (userId: string) => {
    try {
      const tasksQuery = query(
        collection(db, 'tasks'), 
        where('assignedTo', '==', userId),
        where('status', '==', 'belum')
      );
      
      const tasksSnapshot = await getDocs(tasksQuery);
      const tasksList = tasksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CleaningTask[];
      
      console.log("Fetched tasks:", tasksList);
      setTasks(tasksList);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch completed tasks by the user
  const fetchCompletedTasks = async (userId: string) => {
    try {
      const completedQuery = query(
        collection(db, 'submissions'),
        where('userId', '==', userId),
        orderBy('submittedAt', 'desc')
      );
      
      const completedSnapshot = await getDocs(completedQuery);
      const completedList = completedSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TaskSubmission[];
      
      console.log("Fetched completed tasks:", completedList);
      setCompletedTasks(completedList);
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles: TaskImage[] = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      // Add up to 5 images
      const combinedImages = [...uploadImages, ...newFiles].slice(0, 5);
      setUploadImages(combinedImages);
    }
  };

  // Remove selected image
  const removeImage = (index: number) => {
    const updatedImages = [...uploadImages];
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(updatedImages[index].preview);
    updatedImages.splice(index, 1);
    setUploadImages(updatedImages);
  };

  // Handle task selection
  const handleTaskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTask(e.target.value);
  };

  // Handle caption change
  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  // Clear form
  const resetForm = () => {
    // Revoke all object URLs to avoid memory leaks
    uploadImages.forEach(img => URL.revokeObjectURL(img.preview));
    
    setUploadImages([]);
    setSelectedTask("");
    setCaption("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

          // Di bagian atas file, di luar komponen
  // Fungsi untuk mendapatkan pesan error yang aman dari berbagai jenis error
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    } else if (error && typeof error === 'object' && 'message' in error) {
      return String((error as { message: unknown }).message);
    } else if (typeof error === 'string') {
      return error;
    } else {
      return "Terjadi kesalahan yang tidak diketahui";
    }
  };

  // Handle task submission - Fixed version
const handleUpload = async () => {
  if (uploadImages.length === 0 || !selectedTask || !userData) {
    setUploadError("Harap pilih minimal 1 gambar dan tugas yang akan diselesaikan");
    return;
  }
  
  setUploadLoading(true);
  setUploadError(null);
  
  try {
    // Find the task details for reference
    const selectedTaskData = tasks.find(task => task.id === selectedTask);
    if (!selectedTaskData) {
      throw new Error("Task tidak ditemukan");
    }
    
    // Use Promise.all to upload all images concurrently with better error handling
    const uploadPromises = uploadImages.map(async (img, index) => {
      // Create a unique filename with timestamp and index
      const fileName = `${Date.now()}_${index}_${img.file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      
      // Create a reference to the file location
      const storageRef = ref(
        storage, 
        `submissions/${userData.uid}/${selectedTask}/${fileName}`
      );
      
      // Upload with explicit content type for better handling
      const metadata = {
        contentType: img.file.type
      };
      
      console.log(`Uploading image ${index + 1}/${uploadImages.length}: ${fileName}`);
      
      // Upload and get snapshot
      const uploadSnapshot = await uploadBytes(storageRef, img.file, metadata);
      console.log(`Image ${index + 1} uploaded successfully`);
      
      // Get download URL
      const downloadURL = await getDownloadURL(uploadSnapshot.ref);
      console.log(`Got download URL for image ${index + 1}`);
      
      return {
        fileName: img.file.name,
        fileURL: downloadURL
      };
    });
    
    console.log("Starting all uploads...");
    const uploadedImages = await Promise.all(uploadPromises);
    console.log("All images uploaded successfully:", uploadedImages);
    
    // Current timestamp
    const now = new Date();
    const timestamp = Timestamp.fromDate(now);
    
    // Add submission to Firestore
    console.log("Creating submission document...");
    const submissionRef = await addDoc(collection(db, 'submissions'), {
      userId: userData.uid,
      userName: userData.nama || "User",
      taskId: selectedTask,
      taskTitle: selectedTaskData.title || "Tugas Kebersihan",
      images: uploadedImages,
      caption: caption.trim(),
      submittedAt: now.toISOString(),
      timestamp: timestamp,
      status: 'submitted'
    });
    
    console.log("Created submission:", submissionRef.id);
    
    // Update the task document status to "selesai"
    console.log("Updating task status...");
    await updateDoc(doc(db, 'tasks', selectedTask), {
      status: 'selesai',
      completedAt: timestamp,
      submissionId: submissionRef.id
    });
    
    console.log("Task marked as completed");
    
    // Reset form
    resetForm();
    
    // Show success message
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
    
    // Refresh tasks and completed tasks
    fetchTasks(userData.uid);
    fetchCompletedTasks(userData.uid);
    setShowUploadForm(false);
 // Kemudian di dalam fungsi handleUpload, ganti bagian catch dengan:
} catch (error: unknown) {
  console.error("Error uploading files:", error);
  const errorMessage = getErrorMessage(error);
  setUploadError(`Terjadi kesalahan saat mengunggah file: ${errorMessage}`);
} finally {
  setUploadLoading(false);
}
};
  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
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

  // Format timestamp
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
      
      {/* Header Section with Date & Time Display */}
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
            {userData?.nama || "Karyawan"}
          </h2>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="bg-gray-800/60 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 mb-2">
            <div className="flex items-center space-x-2">
              <FiCalendar className="text-purple-400" />
              <span className="text-sm text-gray-300">
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <FiClock className="text-purple-400" />
              <span className="text-sm text-gray-300">
                {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
          
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
      
      {/* User Info Card */}
      <motion.div 
        className="mt-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={slideUp}
      >
        <div className="bg-gray-800/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-5 mb-6">
          <h2 className="text-xl font-semibold text-purple-300 mb-4">Informasi Karyawan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Nama Lengkap</p>
              <p className="font-medium text-white">{userData?.nama}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">NIK</p>
              <p className="font-medium text-white">{userData?.nik || 'N/A'}</p>
            </div>
            {userData?.email && (
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="font-medium text-white">{userData.email}</p>
              </div>
            )}
            {userData?.phone && (
              <div>
                <p className="text-sm text-gray-400">Nomor Telepon</p>
                <p className="font-medium text-white">{userData.phone}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Tasks Section */}
      <motion.div 
        className="mt-6 relative z-10"
        initial="hidden"
        animate="visible"
        variants={slideUp}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-purple-300">Tugas Kebersihan</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full shadow-lg flex items-center justify-center"
            onClick={() => setShowUploadForm(prev => !prev)}
            disabled={tasks.length === 0}
          >
            <FiUpload className="text-white text-xl" />
          </motion.button>
        </div>
        
        {tasks.length === 0 ? (
          <div className="bg-gray-800/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 text-center">
            <p className="text-gray-400">Tidak ada tugas yang perlu diselesaikan saat ini</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.4)" }}
                className="bg-gray-800/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-5"
              >
                <h3 className="font-medium text-lg text-white">{task.title}</h3>
                {task.description && (
                  <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                )}
                <div className="flex justify-between items-center mt-3">
                  <span className="px-2 py-1 bg-red-900/30 border border-red-500/30 rounded-full text-xs text-red-400">
                    Belum Selesai
                  </span>
                  {task.timestamp && (
                    <span className="text-xs text-gray-400">
                      Deadline: {formatTimestamp(task.timestamp)}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
      
      {/* Task Upload Form */}
      <AnimatePresence>
        {showUploadForm && (
          <motion.div 
            className="mt-6 relative z-10"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={expandCard}
          >
            <div className="p-6 bg-gray-800/80 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-purple-300">Unggah Bukti Penyelesaian Tugas</h2>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShowUploadForm(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX size={20} />
                </motion.button>
              </div>
              
              <div className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm text-purple-300 mb-2">Pilih Tugas</label>
                  <select
                    value={selectedTask}
                    onChange={handleTaskChange}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white"
                  >
                    <option value="">-- Pilih Tugas --</option>
                    {tasks.map((task) => (
                      <option key={task.id} value={task.id}>
                        {task.title}
                      </option>
                    ))}
                  </select>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm text-purple-300">Unggah Bukti Foto (Max 5)</label>
                    <span className="text-xs text-gray-400">
                      {uploadImages.length}/5 foto
                    </span>
                  </div>
                  
                  {/* Upload images preview */}
                  {uploadImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {uploadImages.map((img, index) => (
                        <div 
                          key={index} 
                          className="relative h-24 rounded-lg overflow-hidden border border-purple-500/30"
                        >
                          <img 
                            src={img.preview} 
                            alt={`Preview ${index + 1}`} 
                            className="h-full w-full object-cover"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white text-xs"
                          >
                            <FiTrash size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className={`border-2 border-dashed p-4 rounded-lg text-center 
                    ${uploadImages.length >= 5 ? 'border-gray-600 bg-gray-700/30' : 'border-purple-500/50 bg-purple-900/10'}`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple
                      disabled={uploadImages.length >= 5}
                      className="hidden"
                      id="image-upload"
                    />
                    
                    <label 
                      htmlFor="image-upload"
                      className={`flex flex-col items-center justify-center cursor-pointer 
                        ${uploadImages.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <FiImage className="text-purple-400 mb-2" size={30} />
                      <span className="text-sm font-medium text-purple-300">
                        {uploadImages.length >= 5
                          ? 'Batas maksimal 5 foto tercapai'
                          : 'Klik untuk memilih foto'}
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        Format: JPG, PNG, JPEG (Max: 5MB per file)
                      </span>
                    </label>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm text-purple-300 mb-2">Keterangan / Komentar</label>
                  <textarea
                    value={caption}
                    onChange={handleCaptionChange}
                    placeholder="Tambahkan keterangan tentang tugas yang telah diselesaikan..."
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-500/30 text-white min-h-[100px]"
                  />
                </motion.div>
                
                {uploadError && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-900/30 border border-red-500/30 p-4 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FiX className="text-red-400 mr-2" />
                      <p className="text-red-400 text-sm">{uploadError}</p>
                    </div>
                  </motion.div>
                )}
                
                <motion.button
                  onClick={handleUpload}
                  disabled={uploadImages.length === 0 || !selectedTask || uploadLoading}
                  whileHover={{ scale: uploadImages.length === 0 || !selectedTask || uploadLoading ? 1 : 1.02, boxShadow: "0 5px 15px rgba(168, 85, 247, 0.4)" }}
                  whileTap={{ scale: uploadImages.length === 0 || !selectedTask || uploadLoading ? 1 : 0.98 }}
                  className={`w-full py-3 px-6 rounded-lg font-medium shadow-lg transition-all duration-200 ${
                    uploadImages.length === 0 || !selectedTask || uploadLoading
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600'
                  }`}
                >
                  {uploadLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mengunggah...
                    </div>
                  ) : (
                    'Kirim Bukti Penyelesaian'
                  )}
                </motion.button>
                
                {uploadSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FiCheck className="text-green-400 mr-2" />
                      <p className="text-green-400 text-sm">
                        Bukti tugas berhasil diunggah!
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Completed Tasks Section */}
      <motion.div 
        className="mt-8 relative z-10 mb-6"
        initial="hidden"
        animate="visible"
        variants={slideUp}
      >
        <h2 className="text-xl font-semibold text-purple-300 mb-4">Riwayat Penyelesaian Tugas</h2>
        
        {completedTasks.length === 0 ? (
          <div className="bg-gray-800/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 text-center">
            <p className="text-gray-400">Belum ada riwayat tugas yang diselesaikan</p>
          </div>
        ) : (
          <div className="space-y-4">
            {completedTasks.map((submission) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg text-white">{submission.taskTitle || "Tugas Kebersihan"}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Diselesaikan pada: {new Date(submission.submittedAt).toLocaleString('id-ID')}
                    </p>
                    
                    {submission.caption && (
                      <div className="mt-3 bg-gray-700/40 p-3 rounded-lg">
                        <p className="text-sm text-gray-300">{submission.caption}</p>
                      </div>
                    )}
                  </div>
                  
                  <span className={`px-2 py-1 h-fit inline-flex text-xs leading-5 font-semibold rounded-full ${
                    submission.status === 'reviewed' 
                      ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                      : 'bg-blue-900/30 text-blue-400 border border-blue-500/30'
                  }`}>
                    {submission.status === 'reviewed' ? 'Diperiksa' : 'Terkirim'}
                  </span>
                </div>
                
                {/* Gallery of submitted images */}
                {submission.images && submission.images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-400 mb-2">Bukti Foto:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {submission.images.map((img, idx) => (
                        <a 
                          key={idx} 
                          href={img.fileURL} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block h-20 rounded-lg overflow-hidden border border-purple-500/30 hover:border-purple-400 transition-colors"
                        >
                          <img 
                            src={img.fileURL} 
                            alt={`Bukti ${idx+1}`} 
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "https://via.placeholder.com/80?text=Error";
                            }}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UserDashboard;