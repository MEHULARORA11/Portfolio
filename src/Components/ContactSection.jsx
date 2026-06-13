import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

const ContactSection = () => {
  const BASE_URL = import.meta.env.VITE_CLIENT_URL;

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    if (!name?.trim() || !email?.trim() || !message?.trim()) return;

    try {
      await fetch(`${BASE_URL}/api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });
      form.reset();
      alert("Message Sent Successfully !!");
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Please try again.");
    }
  }

  return (
    <div data-aos="fade-left" className="mb-20 lg:mb-36">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* LEFT COLUMN: Contact Information Card */}
        <div className="lg:col-span-5 flex flex-col justify-between backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.15)] hover:border-purple-500/20 transition-all duration-500">
          <div className="flex flex-col gap-6">
            <div>
              <span className="px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-bold tracking-wider uppercase">
                Get Started!
              </span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight">
                Let's create something <span className="gradient-text">extraordinary</span> together.
              </h2>
            </div>
            
            <div className="flex flex-col gap-4 mt-6">
              {/* Email Link */}
              <a 
                href="mailto:mehularora505@gmail.com" 
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/20 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                  <FiMail className="text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Email Me</span>
                  <span className="text-white font-mono text-sm lg:text-base group-hover:text-purple-300 transition-colors duration-300">
                    mehularora505@gmail.com
                  </span>
                </div>
              </a>

              {/* Phone Link */}
              <a 
                href="tel:+917428894788" 
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/20 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                  <FiPhone className="text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Call Me</span>
                  <span className="text-white font-mono text-sm lg:text-base group-hover:text-purple-300 transition-colors duration-300">
                    +91 7428894788
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400">
                  <FiMapPin className="text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Location</span>
                  <span className="text-white font-mono text-sm lg:text-base">
                    Faridabad, Haryana, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 lg:mt-0 pt-6 border-t border-white/10 flex flex-col gap-4">
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Connect on Socials</span>
            <div className="flex gap-4">
              <a 
                href="https://github.com/MEHULARORA11" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white text-2xl hover:-translate-y-1 hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              >
                <AiFillGithub />
              </a>
              <a 
                href="https://www.linkedin.com/in/mehul-arora-32674b238/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white text-2xl hover:-translate-y-1 hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              >
                <AiFillLinkedin />
              </a>
              <a 
                href="https://x.com/MehulArora121" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white text-xl hover:-translate-y-1 hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Form Card */}
        <div className="lg:col-span-7 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.15)] hover:border-purple-500/20 transition-all duration-500">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
            Send a <span className="gradient-text">Message</span>
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="name" className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">Your Name</label>
              <input
                required
                type="text"
                name="name"
                id="name"
                placeholder="e.g. John Doe"
                className="bg-white/5 p-4 outline-none border border-white/10 focus:border-purple-500 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 rounded-2xl text-white font-mono text-base placeholder-gray-500 w-full"
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">Your Email</label>
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder="e.g. john@example.com"
                className="bg-white/5 p-4 outline-none border border-white/10 focus:border-purple-500 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 rounded-2xl text-white font-mono text-base placeholder-gray-500 w-full"
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <label htmlFor="message" className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">Your Message</label>
              <textarea
                required
                name="message"
                id="message"
                rows="4"
                placeholder="Type your message here..."
                className="bg-white/5 p-4 outline-none border border-white/10 focus:border-purple-500 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 rounded-2xl text-white font-mono text-base placeholder-gray-500 w-full resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 group flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-[0_4px_20px_rgba(168,85,247,0.3)] hover:shadow-[0_4px_25px_rgba(168,85,247,0.5)] hover:-translate-y-0.5"
            >
              <span>Send Message</span>
              <FiSend className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactSection;