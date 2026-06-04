import React from "react";
import { AiFillInstagram, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
const ContactSection = () => {
  const BASE_URL = import.meta.env.VITE_CLIENT_URL

  

  async function handleSubmit(e){
    e.preventDefault()
      const form = e.target;

   const name = form.name.value;
   const email = form.email.value;
   const message = form.message.value;
   if(!name?.trim() || !email?.trim() || !message?.trim()) return

   await fetch(`${BASE_URL}/api/post`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name,
      email,
      message
    })
   })
   form.reset()
   alert("Message Sent Successfully !!")

  }

  return (
    <div
      data-aos="fade-left"
      className="flex flex-col lg:flex-row lg:items-center mb-20 lg:mb-36 "
    >
      <span className="uppercase text-3xl lg:text-2xl font-bold gradient-text mb-8 lg:mb-0 rotate-0 lg:-rotate-90">
        Get Started!
      </span>
      <div className="flex flex-col lg:flex-row lg:ml-20 lg:gap-36">
        <div className="mb-5 lg:mb-0">
          <h1 className="text-5xl lg:text-7xl gradient-text mb-5 lg:mb-10">
            Contact me
          </h1>
          <div className="flex flex-col gap-2">
            <a
              className="text-white font-mono underline text-lg lg:text-2xl"
            >
              mehularora505@gmail.com
            </a>
            <a
              className="text-white font-mono underline text-lg lg:text-2xl"
            >
              +91 7428894788
            </a>
          </div>
          <div className="flex gap-2 mt-2">
            <a href = "https://github.com/MEHULARORA11" target="_blank" className="text-white text-2xl" >
            <AiFillGithub />
            </a>
            <a href = "https://www.linkedin.com/in/mehul-arora-32674b238/" target="_blank" className="text-white text-2xl" >
            <AiFillLinkedin/>
            </a>
            <a href = "https://x.com/MehulArora121" target="_blank" className="text-white text-2xl" >
            <FaXTwitter/>
            </a>
          </div>
          <h2 className="text-2xl font-bold font-mono text-white text-center">
            OR
          </h2>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col p-3">
            <input
              required
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="bg-transparent p-3 outline-none border focus:border-purple-500 focus:pl-8 transition-all duration-100 rounded-lg border-white gradient-text font-mon text-lg lg:text-2xl  mb-5 lg:mb-10 w-full lg:w-[30vw]"
            />
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="bg-transparent p-3 outline-none border focus:border-purple-500 focus:pl-8 transition-all duration-100 rounded-lg border-white gradient-text font-mon text-lg lg:text-2xl  mb-5 lg:mb-10 w-full lg:w-[30vw]"
            />
            <textarea
              required
              name="message"
              id="message"
              rows="3"
              className="bg-transparent p-3 outline-none border focus:border-purple-500 focus:pl-8 transition-all duration-100 rounded-lg border-white gradient-text font-mon text-lg lg:text-2xl  mb-5 lg:mb-10 w-full lg:w-[30vw]"
              placeholder="Enter your message"
            />
            <button
              type="submit"
              className="px-3 py-2 text-lg lg:text-2xl bg-purple-500 hover:bg-purple-600 border font-bold text-white rounded-lg"
            >
              Send Message
            </button>
          </form>
        </div> 
      </div>
    </div>
  );
};

export default ContactSection;