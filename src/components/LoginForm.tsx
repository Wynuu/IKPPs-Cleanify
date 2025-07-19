import { useAuth } from './contexts/AuthContext';
import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../services/firebase';
import { motion, AnimatePresence } from 'framer-motion';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  // Jika sudah login, redirect ke dashboard sesuai role
  useEffect(() => {
    if (currentUser) {
      // Cek role user di Firestore
      (async () => {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().role;
          if (role === 'admin') {
            navigate('/dashboard/admin', { replace: true });
          } else if (role === 'user') {
            navigate('/dashboard/user', { replace: true });
          }
        }
      })();
    }
    // Blokir tombol back ke dashboard, jika di login
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      // Jika user menekan back dari dashboard ke login, lakukan logout
      if (currentUser) {
        auth.signOut();
        navigate('/', { replace: true });
      } else {
        window.history.pushState(null, '', window.location.href);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentUser, navigate]);

  // Animation on mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (userDoc.exists()) {
        const role = userDoc.data().role;
        if (role === 'admin') {
          navigate('/dashboard/admin');
        } else if (role === 'user') {
          navigate('/dashboard/user');
        } else {
          setError('Role tidak dikenal.');
        }
      } else {
        setError('Akun belum terdaftar di database.');
      }
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('Email tidak ditemukan.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Password salah.');
      } else {
        setError('Gagal login. Coba lagi.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Generate moving particles background
  const Particles = () => {
    return (
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
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

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 overflow-hidden relative px-4 py-6">
      {/* Animated background elements */}
      <div className="absolute w-1/3 h-1/3 max-w-md max-h-md rounded-full bg-purple-600 opacity-5 -top-10 -left-10 sm:-top-20 sm:-left-20 animate-pulse"></div>
      <div className="absolute w-1/2 h-1/2 max-w-lg max-h-lg rounded-full bg-blue-500 opacity-5 -bottom-10 -right-10 sm:-bottom-20 sm:-right-20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute w-1/4 h-1/4 max-w-sm max-h-sm rounded-full bg-indigo-400 opacity-5 top-1/4 left-1/4 animate-pulse" style={{ animationDelay: '2.7s' }}></div>
      
      {/* Animated particles */}
      <Particles />
      
      {/* Login card - responsive width and padding */}
      <motion.div 
        className={`bg-gray-800 bg-opacity-40 p-4 sm:p-6 md:p-8 rounded-2xl backdrop-blur-lg w-full max-w-xs sm:max-w-sm md:max-w-md z-10 transform transition-all duration-700 ${mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)' }}
      >
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent">IKPPs Cleanify</h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6 sm:space-y-8">
          {/* Enhanced floating email input */}
          <div className="relative group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(email === '' ? false : true)}
              className="peer w-full h-10 sm:h-12 bg-transparent text-gray-300 border-b-2 border-gray-600 focus:border-indigo-400 outline-none px-2 pt-2 transition-all duration-300 font-light text-sm sm:text-base"
              placeholder=" "
              style={{ fontFamily: "'Segoe UI', 'Inter', sans-serif" }}
            />
            <label 
              htmlFor="email" 
              className={`absolute left-2 transition-all duration-300 pointer-events-none text-sm sm:text-base
                ${emailFocused || email 
                  ? 'text-xs text-indigo-400 -translate-y-5' 
                  : 'text-base text-gray-400 translate-y-0'
                }
              `}
            >
              Email
            </label>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-300 group-hover:w-full peer-focus:w-full"></span>
          </div>
          
          {/* Custom password input with text-based eye icon */}
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(password === '' ? false : true)}
              className="peer w-full h-10 sm:h-12 bg-transparent text-gray-300 border-b-2 border-gray-600 focus:border-indigo-400 outline-none px-2 pt-2 pr-10 transition-all duration-300 font-light text-sm sm:text-base"
              placeholder=" "
              style={{ fontFamily: "'Segoe UI', 'Inter', sans-serif" }}
            />
            <label 
              htmlFor="password" 
              className={`absolute left-2 transition-all duration-300 pointer-events-none text-sm sm:text-base
                ${passwordFocused || password 
                  ? 'text-xs text-indigo-400 -translate-y-5' 
                  : 'text-base text-gray-400 translate-y-0'
                }
              `}
            >
              Password
            </label>
            
            {/* TEXT-BASED TOGGLE instead of icon */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 bg-purple-600 px-2 py-1 rounded text-xs"
            >
              {showPassword ? "Sembunyikan" : "Tampilkan"}
            </button>
            
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-300 group-hover:w-full peer-focus:w-full"></span>
          </div>
          
          {/* Login button with loading state */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 sm:py-3 rounded-lg font-medium text-base sm:text-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg ${
              isLoading ? 'opacity-70' : ''
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-3 sm:border-4 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              'Login'
            )}
          </button>
          
          {/* Error message with animation */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-900 bg-opacity-20 border border-red-800 text-red-300 rounded-lg p-2 sm:p-3 text-xs sm:text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
        
        {/* Copyright footer */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center text-gray-500 text-xs opacity-60 font-light">
          <p> Masukkan email & password anda untuk login</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;