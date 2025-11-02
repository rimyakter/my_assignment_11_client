import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFileContract,
  FaUserShield,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary text-gray-300 py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-primary" />
                <span>wholesale@b2b.com</span>
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-primary" />
                <span>+8801871494620</span>
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" />
                <span>Sector:10, Road:05, Uttara, Dhaka</span>
              </p>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div>
            <h3 className="text-xl font-bold mb-4">Terms & Conditions</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/terms"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaFileContract className="text-primary" />
                  <span>Terms of Service</span>
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaUserShield className="text-primary" />
                  <span>Privacy Policy</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/rimy.aktr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-primary p-3 rounded-full hover:bg-white hover:text-primary transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/__rimy__aktr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-primary p-3 rounded-full hover:bg-white hover:text-primary transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.linkedin.com/in/asha-akter-rimy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-primary p-3 rounded-full hover:bg-white hover:text-primary transition"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Wholesale Avenue. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
