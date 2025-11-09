import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { FaEye } from 'react-icons/fa';
import { FaEyeLowVision } from 'react-icons/fa6';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const { createUser, googleSignIn } = use(AuthContext);
  const [hidden, setHidden] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const image = e.target.image.value;
    const password = e.target.password.value;

    // console.log({ name, email, image, password });

    createUser(email, password)
      .then((res) => {
        updateProfile(res.user, { displayName: name, photoURL: image })
          .then(() => {
            toast.success('Account created successfully!');
            navigate('/');
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(() => {
        toast.success('Signed in with Google!');
        navigate('/');
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <>
      <title>Fureverly | Register</title>

      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          {/* Left Side */}
          <div className="md:w-1/2 bg-linear-to-br from-[#FCDFA3] to-[#F7C568] p-10 relative flex flex-col justify-center items-center text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
              Join Fureverly
            </h2>
            <p className="text-sm text-gray-700 mb-6">
              Create an account for your pets' best experience!
            </p>
            <img
              src="https://i.ibb.co/B2MHQc1K/slink-Dogs.png"
              alt="Dog"
              className="w-56 md:w-72 mx-auto drop-shadow-lg"
            />
            <div className="absolute top-8 left-8 w-8 h-8 bg-white rounded-full shadow"></div>
            <div className="absolute bottom-12 right-10 w-6 h-6 border rounded-full shadow-sm"></div>
          </div>

          {/* Right Side */}
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <h3 className="text-4xl font-bold text-gray-800 mb-6">Register</h3>

            <form className="flex flex-col gap-4" onSubmit={handleRegister}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#F5B22C]/60 transition"
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#F5B22C]/60 transition"
              />
              <input
                type="url"
                placeholder="Photo URL"
                name="image"
                required
                className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#F5B22C]/60 transition"
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
              <button className="bg-[#F5B22C] hover:bg-[#e0a32a] transition text-white p-3 rounded-xl font-semibold shadow-md">
                Register
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <span className="w-full h-px bg-gray-300"></span>
              <span className="text-xs text-gray-500">or</span>
              <span className="w-full h-px bg-gray-300"></span>
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              className="btn bg-white text-black border-[#e5e5e5] rounded-xl mb-5"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
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
                </g>
              </svg>
              Continue with Google
            </button>

            <p className="text-xs text-gray-600 text-center">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Register;
