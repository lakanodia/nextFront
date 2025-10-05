import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#23313b] text-white py-10 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start px-6 gap-12">
        {/* Subscribe */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <span className="text-lg font-semibold mb-2">Subscribe to our newsletter</span>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded bg-[#23313b] border border-gray-500 text-white focus:outline-none focus:border-blue-400 w-full"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium transition">
              Subscribe
            </button>
          </div>
        </div>
        {/* Contact Info */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <div className="flex items-center gap-3">
            <FaPhone className="text-red-500 bg-white bg-opacity-0 rounded p-1" size={24} />
            <span>+995 322 222145</span>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-red-500 bg-white bg-opacity-0 rounded p-1" size={24} />
            <a href="mailto:info@reformatics.com" className="underline">info@reformatics.com</a>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-red-500 bg-white bg-opacity-0 rounded p-1" size={24} />
            <span>29 Ilia Chavchavadze Avenue, Tbilisi, 0179, Georgia</span>
          </div>
        </div>
        {/* Bottom Info */}
        <div className="flex flex-col gap-2 w-full md:w-1/3 justify-end items-end">
          <span className="text-sm">YOUR TRUSTED FINANCIAL PARTNER & ADVISOR.</span>
          <div className="flex gap-2 items-center">
            <span>Back to top</span>
            <span className="text-xl">&#8679;</span>
          </div>
          <span className="text-sm">All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}