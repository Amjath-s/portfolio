import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LightRays from "./LightRays";
import { useInView } from "framer-motion";
import axios from 'axios'
import frontendSkills from "./frontend.json"
import otherSkills from "./otherskill.json"
import project from "./Project.json"
gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const heroRef = useRef(null);
  const skillRef = useRef(null);
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [message,setMessage]=useState('')
  const [loading,setLoading]=useState(false )
  const isInView = useInView(skillRef, { once: true, amount: 1 });

   const socialPlatforms = [
     {
       name: "GitHub",
      
       iconUrl: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
       url: "https://github.com/Amjath-s", //
     },
     {
       name: "LinkedIn",
       
       iconUrl: "https://cdn-icons-png.flaticon.com/512/174/174857.png", 
       url: "https://www.linkedin.com/in/amjath-s-39680823b/",
     },
   ];
 
  useEffect(() => {
    // animate ONLY the hero content children, not the background
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
      });

      // scroll reveals for sections
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);



  const handleSubmit= async (e)=>
  {
    e.preventDefault();
    setLoading(true)

    try
    {
      const response=await axios.post(' https://portfolio-0mni.onrender.com/api/contact',{name,email,message})
      if (response.status === 200) {
        alert('Message sent!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      alert('Error sending message');
      console.error(error);
    } finally {
      setLoading(false);
    }
    
      


  }
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900">
      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        {/* Background rays (pinned to section) */}
        <LightRays className="absolute inset-0 -z-10 pointer-events-none" />

        {/* Foreground content */}
        <div className="hero-content absolute z-0 px-6 text-center text-white max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Hello👋🏼 <br />
            I'm
            <span className="text-cyan-300"> Amjath S</span> a Full Stack
            Developer
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/30"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border border-cyan-400 text-cyan-300 hover:bg-white/10 transition"
            >
              Contact Me
            </a>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mt-4">
            {socialPlatforms.map((platform, index) => (
              <motion.a
                key={index}
                href={platform.url}
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center p-2 bg-white/3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out
                       hover:scale-105 transform cursor-pointer min-w-[120px] sm:min-w-[140px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
              >
                {/* Icon using img tag with CDN URL */}
                <img
                  src={platform.iconUrl}
                  alt={`${platform.name} logo`}
                  className="h-8 w-8 mb-2"
                />

                {/* Platform Name */}
                <p className="text-base font-semibold text-gray-700">
                  {platform.name}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}

      <section className="reveal min-h-screen flex flex-col  items-center justify-center px-6 py-20 bg-white">
        <div class="terminal-container w-11/12 max-w-4xl bg-gray-900 rounded-lg shadow-xl shadow-green-700/30 overflow-hidden border border-gray-700">
          <div class="terminal-header bg-gray-800 p-3 flex items-center rounded-t-lg">
            <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <div class="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            <span class="text-white text-xs ml-auto font-mono">
              user@portfolio:~
            </span>
          </div>
          <div
            id="terminal-body"
            class="terminal-body p-5 min-h-72 max-h-[600px] overflow-y-auto text-green-400 text-sm leading-relaxed"
          >
            {/* <!-- Static Terminal output content --> */}
            <div>
              <span class="text-cyan-400">user@portfolio:~ $</span> whoami
            </div>
            <div>
              Greetings, digital voyager! I am Amjath S, a passionate software
              developer.
            </div>
            <div class="mb-2"></div>
            <div>
              <span class="text-cyan-400">user@portfolio:~ $</span> cat
              about_me.txt
            </div>
            <div>
              My journey in the realm of code began with a curiosity for how
              things work, evolving into a dedication to building intuitive and
              impactful digital experiences.
            </div>
            <div>
              My journey in the realm of code began with a curiosity for how
              things work, evolving into a dedication to building intuitive and
              impactful digital experiences. I am driven by a passion to
              contribute to innovations that hold the **potential to positively
              transform society**, creating a ripple effect of greater impact in
              my field. I believe in the continuous cycle of **learning,
              unlearning, and relearning**.
            </div>
            <div class="mb-2"></div>
            <div>
              <span class="text-cyan-400">user@portfolio:~ $</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <motion.section className="reveal min-h-screen flex flex-col items-center py-10 px-6 bg-gray-100">
        <h2 className="text-4xl font-bold mb-12">Skills</h2>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Frontend Skills */}
          <motion.div>
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Full Stack
            </h3>
            {frontendSkills.map((skill, i) => (
              <motion.div
                key={i}
                className="p-6 bg-gray-800 rounded-2xl shadow-lg mb-6 text-white"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
              >
                <div className="flex items-center mb-3">
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-10 h-10 mr-3"
                  />
                  <p className="text-lg font-semibold">{skill.name}</p>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-700 rounded-full h-4 relative">
                  <motion.div
                    className="bg-blue-500 h-4 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: i * 0.3 }}
                  />
                  <span className="absolute right-2 top-0 text-sm">
                    {skill.level}%
                  </span>
                </div>

                <p className="text-sm mt-2 italic">{skill.tag}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Other Skills */}
          <motion.div>
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Other Skills
            </h3>
            {otherSkills.map((skill, i) => (
              <motion.div
                key={i}
                className="p-6 bg-gray-800 rounded-2xl shadow-lg mb-6 text-white"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <div className="flex items-center mb-3">
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-10 h-10 mr-3"
                  />
                  <p className="text-lg font-semibold">{skill.name}</p>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-4 relative">
                  <motion.div
                    className="bg-green-500 h-4 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: i * 0.3 }}
                  />
                  <span className="absolute right-2 top-0 text-sm">
                    {skill.level}%
                  </span>
                </div>

                <p className="text-sm mt-2 italic">{skill.tag}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ===== PROJECTS ===== */}
      <motion.section
        id="projects"
        className="min-h-screen flex flex-col items-center  justify-around  px-6 py-20 bg-white"
      >
        <h2 className="text-4xl font-bold mb-12 items-center">Projects</h2>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
          {/* Project Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full mb-12">
            {/* Added mb-12 for space below */}
            {project.map((pro, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between min-h-[250px]" // Added min-h for consistent card height
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div>
                  <p className="text-2xl font-bold text-gray-800 mb-2">
                    {pro.project_name}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-4">
                    {pro.content}
                  </p>
                </div>
                <div className="flex justify-start space-x-4 mt-4">
                  {pro.github && (
                    <a
                      href={pro.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out shadow-md text-sm"
                    >
                      View GitHub
                    </a>
                  )}

                  {pro.demo ? (
                    <a
                      href={pro.demo}
                      target="_blank"
                      rel=""
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 ease-in-out shadow-md text-sm"
                    >
                      View Demo
                    </a>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 bg-gray-400 text-gray-700 rounded-md cursor-not-allowed shadow-inner text-sm"
                      title="Demo not available yet"
                    >
                      Demo Unavailable
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>{" "}
          <div className="w-full max-w-6xl text-center bg-white rounded-lg shadow-lg p-6">
            <p className="text-xl font-semibold text-gray-700 mb-2">
              More exciting projects are currently in development!
            </p>
            <p className="text-gray-500 text-sm">
              Stay tuned for updates as we continue to build and innovate.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ===== CONTACT ===== */}
      <section
        id="contact"
        className="reveal min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gray-100"
      >
        <h2 className="text-4xl font-bold mb-6">Contact Me</h2>
        <form className="w-full max-w-lg space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={name}
            onChange={e=>setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            onChange={e=>setEmail(e.target.value)}
            value={email}
            required
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            onChange={e=>setMessage(e.target.value)}
            value={message}
            required
          />
          <button
            type='submit'
            disabled={loading}
           
            className={` w-full py-3 rounded-lg bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition  `}
          >
            Send Message 
          </button>
        </form> 
       
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-6 bg-white text-center text-gray-500">
        © {new Date().getFullYear()} Amjath S. Built with React & Tailwind.
      </footer>
    </div>
  );
}
