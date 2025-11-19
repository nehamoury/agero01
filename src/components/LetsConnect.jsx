import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LetsConnect() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // CLEAN EMAIL LIST (no X symbols here)
  const emails = [
    "franklin@agero.com",
    "franklin@agero.com",
    "franklin@agero.com",
  ];

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#dbdbdb" }}
    >
      {/* BIG HEADING */}
      <div className="relative h-60 sm:h-72 md:h-96 lg:h-[28rem] flex items-center justify-center overflow-hidden">
        <h1 className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem] font-bold text-center leading-none tracking-tight bg-[linear-gradient(180deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.05)_100%)] bg-clip-text text-transparent opacity-40">
          Let's Connect
        </h1>
      </div>

      {/* FORM SECTION */}
      <div className="relative mt-[-6rem] sm:mt-[-8rem] w-auto z-10 lg:mx-3 lg:mt-[-12rem] mx-2">
        <div
          className="w-full min-h-[600px] bg-cover bg-center bg-no-repeat rounded-3xl overflow-hidden flex justify-center px-4 sm:px-8 md:px-14 lg:px-20 py-20 sm:py-28 md:py-32"
          style={{
            backgroundImage:
              'url("https://framerusercontent.com/images/1sREGvYWbdhqXmijCOMUIsD7A.png?scale-down-to=2048")',
          }}
        >
          <div className="relative z-10 w-full max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">
              {/* LEFT TEXT */}
              <div className="text-white px-2 sm:px-4">
                <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6 sm:mb-10">
                  <b>
                    Got a project in <br /> mind?
                  </b>
                </h2>
                <p className="text-gray-300 text-base sm:text-lg">
                  Let's make something happen together
                </p>
              </div>

              {/* RIGHT FORM */}
              <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
                  <div>
                    <label className="block text-white text-sm mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-white/30 pb-4 text-white placeholder-gray-400 focus:outline-none focus:border-white/60 font-semibold text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter the Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-white/30 pb-4 text-white placeholder-gray-400 focus:outline-none focus:border-white/60 font-semibold text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2">
                      Project Description
                    </label>
                    <input
                      type="text"
                      placeholder="Type Here..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full bg-transparent border-b border-white/30 pb-4 text-white placeholder-gray-400 focus:outline-none focus:border-white/60 font-semibold text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-black text-sm py-3 rounded-full hover:bg-gray-200 font-bold transition-all mt-6"
                  >
                    Send Now!
                  </button>
                </form>
              </div>
            </div>

            {/* ---- FIXED FRAMER MOTION MARQUEE (NO GAP) ---- */}
            <div className="mt-32 sm:mt-44 md:mt-56 w-full overflow-hidden">
              <motion.div
                className="flex items-center gap-12 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }} // only half because we duplicate
                transition={{
                  duration: 16,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {/* ORIGINAL EMAIL ROW */}
                {emails.map((email, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="text-white/40 text-3xl">×</span>
                    <span className="text-white text-2xl font-semibold hover:text-orange-500">
                      {email}
                    </span>
                  </div>
                ))}

                {/* DUPLICATED ROW FOR SEAMLESS INFINITE SCROLL */}
                {emails.map((email, idx) => (
                  <div key={`dup-${idx}`} className="flex items-center gap-4">
                    <span className="text-white/40 text-3xl">×</span>
                    <span className="text-white text-2xl font-semibold hover:text-orange-500">
                      {email}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
