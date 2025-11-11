import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { FaEye } from 'react-icons/fa';
import { FaEyeLowVision } from 'react-icons/fa6';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();
  const { signInUser, googleSignIn } = use(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // console.log({ email, password });

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordPattern.test(password)) {
      toast.error(
        'Password must include at least 1 uppercase, 1 lowercase letter, and be 6+ characters long.'
      );
      return;
    } 

    signInUser(email, password)
      .then((res) => {
        console.log(res.user);
        toast.success('Login successful!');
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((res) => {
        console.log(res.user);
        toast.success('Logged in with Google!');
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <title>Fureverly | Login</title>

      <div className="bg-white rounded-3xl shadow-xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden border border-gray-200">
        <div className="md:w-1/2 w-full bg-linear-to-br from-[#FCDFA3] to-[#F7C568] p-10 relative flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            Welcome to Fureverly
          </h2>
          <p className="text-sm text-gray-700 mb-6">
            Best experience for your lovely pets!
          </p>
          <img
            src="https://i.ibb.co.com/B2MHQc1K/slink-Dogs.png"
            alt="Dog"
            className="w-60 sm:w-72 mx-auto drop-shadow-lg"
          />

          <div className="absolute top-6 left-6 w-6 h-6 bg-white rounded-full shadow hidden md:block"></div>
          <div className="absolute bottom-10 right-8 w-5 h-5 border rounded-full shadow-sm hidden md:block"></div>
        </div>

        <div className="md:w-1/2 w-full bg-white p-8 sm:p-10 flex flex-col justify-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Login
          </h3>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#F5B22C]/60 transition text-sm sm:text-base"
            />

            <div className="relative">
              <input
                type={hidden ? 'text' : 'Password'}
                placeholder="password"
                name="password"
                required
                className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#F5B22C]/60 transition w-full"
              />
              <button
                onClick={() => setHidden(!hidden)}
                type="button"
                className=" absolute right-4 top-4"
              >
                {hidden ? <FaEye size={20} /> : <FaEyeLowVision size={20} />}
              </button>
            </div>
            <p className="text-right font-medium hover:text-blue-600">
              {' '}
              Forget password{' '}
            </p>

            <button className="bg-[#F5B22C] hover:bg-[#e0a32a] transition text-white p-3 rounded-xl font-semibold shadow-md text-sm sm:text-base">
              Login
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <span className="w-full h-px bg-gray-300"></span>
            <span className="text-xs text-gray-500">or</span>
            <span className="w-full h-px bg-gray-300"></span>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 transition p-3 rounded-xl w-full mb-4 font-medium text-gray-700 text-sm sm:text-base"
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
          </button>

          <p className="text-gray-600 text-center text-sm">
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Login;
