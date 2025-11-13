import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { FaEye, FaEyeLowVision } from 'react-icons/fa6';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();
  const { signInUser, googleSignIn } = use(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordPattern.test(password)) {
      toast.error(
        'Password must include at least 1 uppercase, 1 lowercase letter, and be 6+ characters long.'
      );
      return;
    }

    signInUser(email, password)
      .then((res) => {
        toast.success('Login successful!');
        navigate('/');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((res) => {
        toast.success('Logged in with Google!');
        navigate('/');
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <Toaster />
      <motion.div
        className="w-full max-w-5xl flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Panel */}
        <div className="md:w-1/2 w-full bg-gradient-to-br from-[#FCDFA3] to-[#F7C568] p-10 flex flex-col justify-center items-center text-center relative">
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-900 mb-2">
            Welcome to Fureverly
          </h2>
          <p className="text-gray-700 dark:text-gray-100 mb-6">
            Best experience for your lovely pets!
          </p>
          <img
            src="https://i.ibb.co/B2MHQc1K/slink-Dogs.png"
            alt="Dog"
            className="w-60 h-auto mx-auto drop-shadow-lg"
          />
          {/* Decorative circles */}
          <div className="absolute top-6 left-6 w-6 h-6 bg-white rounded-full shadow hidden md:block"></div>
          <div className="absolute bottom-10 right-8 w-5 h-5 border rounded-full shadow-sm hidden md:block"></div>
        </div>

        {/* Right Panel */}
        <div className="md:w-1/2 w-full p-10 flex flex-col justify-center">
          <motion.h3
            className="text-3xl font-bold mb-6 text-center md:text-left text-gray-800 dark:text-white"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Login
          </motion.h3>

          <motion.form
            onSubmit={handleLogin}
            className="flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="Email"
              name="email"
              required
              className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#F5B22C] dark:bg-gray-700 dark:text-white dark:border-gray-600 transition"
            />

            <div className="relative">
              <input
                type={hidden ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                required
                className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#F5B22C] dark:bg-gray-700 dark:text-white dark:border-gray-600 w-full transition"
              />
              <button
                onClick={() => setHidden(!hidden)}
                type="button"
                className="absolute right-4 top-3"
              >
                {hidden ? <FaEye size={20} /> : <FaEyeLowVision size={20} />}
              </button>
            </div>

            <p className="text-right font-medium hover:text-blue-600 cursor-pointer text-sm dark:text-gray-300">
              Forget password
            </p>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#F5B22C] hover:bg-[#e0a32a] transition text-white p-3 rounded-xl font-semibold shadow-md"
            >
              Login
            </motion.button>
          </motion.form>

          <div className="flex items-center gap-3 my-6">
            <span className="h-px w-full bg-gray-300 dark:bg-gray-600"></span>
            <span className="text-xs text-gray-500 dark:text-gray-400">or</span>
            <span className="h-px w-full bg-gray-300 dark:bg-gray-600"></span>
          </div>

          {/* Google Login */}
          <motion.button
            onClick={handleGoogleLogin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition p-3 rounded-xl w-full mb-4 font-medium text-gray-700 dark:text-gray-200"
          >
            <svg
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </svg>
            Login with Google
          </motion.button>

          <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Register here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
