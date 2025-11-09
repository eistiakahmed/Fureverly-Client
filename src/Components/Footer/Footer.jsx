import React from 'react';
import { Link } from 'react-router';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa';
import logo from '../../assets/footerLogo.png'

const Footer = () => {
  return (
    <footer className="bg-[#FFF9EE] border-t border-gray-200">
      <div className="w-11/12 mx-auto  py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="">
          <div className="flex items-center">
            <img
              src={logo}
              alt=""
              className="w-10 h-10 md:w-14 md:h-14 rounded-full"
            />
            <h2 className="text-3xl font-extrabold text-[#092052] mb-3 YesevaOne">
              Fureverly
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your trusted companion in finding, adopting, and caring for your
            furry friends.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center bg-[#F5B22C] text-white rounded-full hover:bg-[#e0a32a] transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center bg-[#F5B22C] text-white rounded-full hover:bg-[#e0a32a] transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center bg-[#F5B22C] text-white rounded-full hover:bg-[#e0a32a] transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center bg-[#F5B22C] text-white rounded-full hover:bg-[#e0a32a] transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link to="/" className="hover:text-[#F5B22C] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#F5B22C] transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/adopt" className="hover:text-[#F5B22C] transition">
                Adopt a Pet
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#F5B22C] transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link to="/faq" className="hover:text-[#F5B22C] transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-[#F5B22C] transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-[#F5B22C] transition">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-[#F5B22C] transition">
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Stay Connected
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            Subscribe to get pet care tips and adoption updates.
          </p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-2 py-[13px] border border-[#F5B22C] border-r-0 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-[#F5B22C]/60 text-sm"
            />
            <button
              type="submit"
              className="bg-[#F5B22C] hover:bg-[#e0a32a] transition text-white px-4 py-3.5 rounded-r-xl font-semibold text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#F5B22C] text-white text-center text-sm py-4 font-medium">
        © {new Date().getFullYear()} Fureverly — All Rights Reserved 🐾
      </div>
    </footer>
  );
};

export default Footer;
