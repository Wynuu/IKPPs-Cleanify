import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const handleLogin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Tentukan role berdasarkan domain email
    const role = email.endsWith('@admin.com') ? 'admin' : 'user';

    // Simpan role di localStorage
    localStorage.setItem('role', role);

    // Redirect berdasarkan role
    if (role === 'admin') {
      window.location.href = '/dashboard/admin';
    } else if (role === 'user') {
      window.location.href = '/dashboard/user';
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};