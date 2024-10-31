import { useState } from "react";
import { GiTicTacToe } from "react-icons/gi";
import { AiFillGithub } from 'react-icons/ai';
import { FaTwitter, FaFacebookF } from 'react-icons/fa';
import { AiFillLinkedin } from 'react-icons/ai'; // Import LinkedIn icon

const Contact = () => {
  // State to track which section is open
  const [activeSection, setActiveSection] = useState(null);

  // Function to toggle display of each section
  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white px-6 py-12">
      {/* Navigation Bar */}
      <nav className="p-4 fixed top-0 left-0 w-full z-10 bg-black">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">
            <a href="/">
              <GiTicTacToe className="h-12 w-12" />
            </a>
          </div>
          <div className="flex-grow flex justify-center space-x-8">
            <a href="/" className="text-white hover:text-gray-300 text-lg">Home</a>
            <a href="/about" className="text-white hover:text-gray-300 text-lg">About</a>
            <a href="/gameplay" className="text-white hover:text-gray-300 text-lg">Gameplay</a>
            <a href="/faq" className="text-white hover:text-gray-300 text-lg">FAQ</a>
            <a href="/contact" className="text-white hover:text-gray-300 text-lg">Contact</a>
          </div>
          <div className="ml-auto">
            <a href="https://github.com/SusheelThapa" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 text-2xl">
              <AiFillGithub />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="text-center max-w-3xl mt-24"> {/* Add margin-top to avoid overlapping with nav */}
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg mb-6 leading-relaxed">
          We would love to hear from you! If you have any questions, feedback, or concerns regarding our Tic-Tac-Toe game, please feel free to reach out to us using the contact form below or through our social media channels.
        </p>

        {/* Contact Form */}
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-2 rounded bg-gray-800 text-white"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-2 rounded bg-gray-800 text-white"
            required
          />
          <textarea
            placeholder="Your Message"
            className="p-2 rounded bg-gray-800 text-white h-32"
            required
          />
          <button 
            type="submit" 
            className="bg-white text-black py-2 rounded hover:bg-gray-300 transition duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Additional Contact Information */}
        <div className="mt-8 text-center"> {/* Center the icons here */}
          <h2 className="text-3xl font-semibold">Connect with Us</h2>
          <p className="text-lg mt-2">Follow us on our social media channels for the latest updates:</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://x.com/susheelthapaa" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-white-400 text-2xl">
              <FaTwitter />
            </a>
            <a href="https://facebook.com/susheelthapaa/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-white-400 text-2xl">
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
