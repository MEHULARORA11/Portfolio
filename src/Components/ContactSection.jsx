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

  const contactItemClass =
    "group flex items-center gap-4 p-4 rounded-2xl glass-card transition-all duration-300";

  const iconBoxClass = "theme-icon-box flex items-center justify-center w-12 h-12 rounded-xl";

  return (
    <div data-aos="fade-left" className="mb-20 lg:mb-36">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

        <div className="lg:col-span-5 flex flex-col justify-between glass-card rounded-3xl p-8 lg:p-10">
          <div className="flex flex-col gap-6">
            <div>
              <span className="theme-pill px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                Get Started!
              </span>
              <h2 className="text-4xl lg:text-5xl font-extrabold theme-text mt-4 tracking-tight">
                Let's create something <span className="gradient-text">extraordinary</span> together.
              </h2>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <a href="mailto:mehularora505@gmail.com" className={contactItemClass}>
                <div className={iconBoxClass}>
                  <FiMail className="text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs theme-text-label font-semibold uppercase tracking-wider">Email Me</span>
                  <span className="theme-text font-mono text-sm lg:text-base group-hover:text-[var(--accent-light)] transition-colors duration-300">
                    mehularora505@gmail.com
                  </span>
                </div>
              </a>

              <a href="tel:+917428894788" className={contactItemClass}>
                <div className={iconBoxClass}>
                  <FiPhone className="text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs theme-text-label font-semibold uppercase tracking-wider">Call Me</span>
                  <span className="theme-text font-mono text-sm lg:text-base group-hover:text-[var(--accent-light)] transition-colors duration-300">
                    +91 7428894788
                  </span>
                </div>
              </a>

              <div className={contactItemClass}>
                <div className={iconBoxClass}>
                  <FiMapPin className="text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs theme-text-label font-semibold uppercase tracking-wider">Location</span>
                  <span className="theme-text font-mono text-sm lg:text-base">
                    Faridabad, Haryana, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-0 pt-6 border-t theme-divider flex flex-col gap-4">
            <span className="text-xs theme-text-label font-semibold uppercase tracking-wider">Connect on Socials</span>
            <div className="flex gap-4">
              <a
                href="https://github.com/MEHULARORA11"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-icon-btn flex items-center justify-center w-12 h-12 rounded-xl text-2xl hover:-translate-y-1"
              >
                <AiFillGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/mehul-arora-32674b238/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-icon-btn flex items-center justify-center w-12 h-12 rounded-xl text-2xl hover:-translate-y-1"
              >
                <AiFillLinkedin />
              </a>
              <a
                href="https://x.com/MehulArora121"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-icon-btn flex items-center justify-center w-12 h-12 rounded-xl text-xl hover:-translate-y-1"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 glass-card rounded-3xl p-8 lg:p-10">
          <h3 className="text-2xl lg:text-3xl font-bold theme-text mb-6">
            Send a <span className="gradient-text">Message</span>
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="name" className="text-xs font-semibold theme-text-label uppercase tracking-wider pl-1">Your Name</label>
              <input
                required
                type="text"
                name="name"
                id="name"
                placeholder="e.g. John Doe"
                className="theme-input p-4 rounded-2xl font-mono text-base w-full"
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <label htmlFor="email" className="text-xs font-semibold theme-text-label uppercase tracking-wider pl-1">Your Email</label>
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder="e.g. john@example.com"
                className="theme-input p-4 rounded-2xl font-mono text-base w-full"
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <label htmlFor="message" className="text-xs font-semibold theme-text-label uppercase tracking-wider pl-1">Your Message</label>
              <textarea
                required
                name="message"
                id="message"
                rows="4"
                placeholder="Type your message here..."
                className="theme-input p-4 rounded-2xl font-mono text-base w-full resize-none"
              />
            </div>

            <button
              type="submit"
              className="theme-btn mt-2 group flex items-center justify-center gap-2 px-6 py-4 font-bold text-lg rounded-2xl hover:-translate-y-0.5"
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
