import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import Logo from "../assets/Logo.PNG";
import { IoCartOutline } from "react-icons/io5";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const navigate = useNavigate();
  const {getCartCount} = useContext(ShopContext)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/product", label: "Products" },
  ];

  const navLinks_mobile = [
    { href: "/", label: "Home" },
    { href: "/product", label: "Products" },
    { href: "/cart", label: "Cart" },
  ];

  return (
    
    <motion.nav
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50"
      style={{ backgroundColor: "#fffcf6" }}
    >
      <div className="w-full flex justify-between items-center container mx-auto px-4 sm:px-6 lg:px-8 md:h-30 h-24">
        {/* Navigation Links - Desktop */}
        <motion.div
          variants={fadeIn("down", 0.3)}
          className="hidden md:flex items-center gap-10"
        >
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.href}
              onClick={() => setActiveLink(link.href)}
              className={({ isActive }) =>
                `text-lg font-medium relative gaegu after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:transition-all
        ${
          isActive
            ? "text-[#38342c] after:w-full after:bg-[#d3bf5d]"
            : "text-[#d3bf5d] hover:text-[#dbb8bb] after:bg-[#d3bf5d]"
        }`
              }
            >
              <motion.span variants={fadeIn("down", 0.1 * (index + 1))}>
                {link.label}
              </motion.span>
            </NavLink>
          ))}
        </motion.div>

        {/* Logo */}
        <motion.div
          variants={fadeIn("right", 0.3)}
          className="flex items-center gap-1 cursor-pointer"
        >
          <img src={Logo} alt="Logo" className="h-25 w-auto object-contain" />
        </motion.div>
        {/* Mobile Menu Button */}
        <motion.button
          variants={fadeIn("left", 0.3)}
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <HiX className="h-6 w-6" />
          ) : (
            <HiMenu className="h-6 w-6" />
          )}
        </motion.button>

        {/* Shopping Cart */}
        <motion.button
          onClick={() => navigate("/cart")}
          variants={fadeIn("left", 0.3)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block text-[#38342c] bg-transparent p-3 text-2xl cursor-pointer ml-25"
        >
          <div className="relative">
            <IoCartOutline />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#38342c] text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          animate="show"
          className="md:hidden bg-white py-4 border-none shadow-none"
          style={{ backgroundColor: "#fffcf6" }}
        >
          <motion.div
            variants={fadeIn("down", 0.3)}
            className="container mx-auto px-4 space-y-4"
          >
            {navLinks_mobile.map((link, index) => (
              <NavLink
                key={index}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-lg font-medium py-2 gaegu ${
                    isActive
                      ? "text-[#38342c] after:w-full after:bg-[#d3bf5d]"
                      : "text-[#d3bf5d] hover:text-[#dbb8bb] after:bg-[#d3bf5d]"
                  }`
                }
              >
                <motion.span variants={fadeIn("right", 0.1 * (index + 1))}>
                  {link.label}
                </motion.span>
              </NavLink>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
