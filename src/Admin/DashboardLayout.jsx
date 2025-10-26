import { NavLink, Outlet, useNavigate } from "react-router";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

// 🧩 React Icons
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaSignOutAlt,
  FaBoxes,
  FaPlusSquare,
} from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import NavLogo from "../Header/NavLogo";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Sidebar mobile toggle
  const [dropdownOpen, setDropdownOpen] = useState(false); // Profile dropdown
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  const navLinks = [
    {
      name: "Dashboard Home",
      path: "/dashboard",
      icon: <FaTachometerAlt className="text-lg text-primary" />,
    },
    {
      name: "Add Product",
      path: "/dashboard/addProducts",
      icon: <FaPlusSquare className="text-lg text-primary" />,
    },
    {
      name: "My Products",
      path: "/dashboard/myProducts",
      icon: <FaBoxOpen className="text-lg text-primary" />,
    },
    {
      name: "All Products",
      path: "/dashboard/adminAllProducts",
      icon: <FaBoxes className="text-lg text-primary" />,
    },
  ];

  return (
    <div className="flex bg-gray-50 text-gray-800 relative">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0  z-40 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out
        ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } w-64`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="font-bold text-xl bg-primary px-2 py-3 rounded-sm flex items-center gap-2">
            <NavLogo />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded hover:bg-gray-100 transition md:hidden"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 p-2 mt-4 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gray-100 text-primary"
                    : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-0">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2 rounded hover:bg-gray-100 transition"
            >
              <AiOutlineMenu className="text-2xl" />
            </button>
            <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              <FaTachometerAlt className="text-primary" /> Admin Dashboard
            </h2>
          </div>

          {/* Profile / Logout */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <img
                src={user?.photoURL || "https://i.ibb.co/2FsfXqM/avatar.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full border cursor-pointer"
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b text-sm text-gray-700">
                  {user?.displayName || "Admin"} <br />
                  <span className="text-gray-500 text-xs">{user?.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </div>
  );
};

export default DashboardLayout;
