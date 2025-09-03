import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#023047] text-white py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="mb-2">Email: wholesale@b2b.com</p>
            <p className="mb-2">Phone: +8801871494620</p>
            <p className="mb-2">Address: Sector:10, Road:05, Uttara, Dhaka</p>
          </div>

          {/* Terms & Conditions */}
          <div>
            <h3 className="text-xl font-bold mb-4">Terms & Conditions</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-400 p-3 rounded-full hover:bg-blue-500 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-pink-500 p-3 rounded-full hover:bg-pink-600 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-800 p-3 rounded-full hover:bg-blue-900 transition"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center text-sm text-white">
          &copy; {new Date().getFullYear()} B2B-wholesale. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
