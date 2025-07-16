import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
function Privacy() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    // Animate container fade in
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    // Animate title with bounce effect
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: -50, scale: 0.8 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.2
      }
    );

    // Animate subtitle
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.4
      }
    );

    // Animate sections with stagger effect
    gsap.fromTo(sectionsRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.6
      }
    );

    // Add hover animations for sections
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        section.addEventListener('mouseenter', () => {
          gsap.to(section, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        section.addEventListener('mouseleave', () => {
          gsap.to(section, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 text-gray-800 px-6 py-12 md:px-20 lg:px-40"
    >
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-black text-white text-xl rounded-full hover:bg-gray-800 transition duration-300 mb-3">
              <IoArrowBackSharp className="text-2xl" />
              <Link to="/" className="text-white no-underline">
                Back
              </Link>
            </div>
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 bg-clip-text text-transparent"
        >
          Privacy Policy
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full"></div>
        <p 
          ref={subtitleRef}
          className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto"
        >
          Your privacy matters to us. Learn how we protect your data.
        </p>
      </div>

      {/* Privacy Sections */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Introduction */}
        <section 
          ref={addToRefs}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 shadow-lg text-white hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h2 className="text-2xl font-bold">Our Commitment</h2>
          </div>
          <p className="text-white/90 leading-relaxed text-lg">
            At [Your Platform Name], your privacy is important to us. We are committed to protecting your personal information and being transparent about our data practices.
          </p>
        </section>

        {/* What We Collect */}
        <section 
          ref={addToRefs}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
              <span className="text-white text-xl">📊</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">What We Collect</h2>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">
              We do not collect or track any personal information such as your phone number, IP address, browser details, or device information. Your privacy is our priority.
            </p>
          </div>
        </section>

        {/* How We Use Information */}
        <section 
          ref={addToRefs}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center mr-4">
              <span className="text-white text-xl">⚙️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">
              Currently, we do not use or store any user data for tracking, analytics, or marketing purposes. Your interactions remain private and secure.
            </p>
          </div>
        </section>

        {/* Data Sharing */}
        <section 
          ref={addToRefs}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center mr-4">
              <span className="text-white text-xl">🔒</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Data Sharing</h2>
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">
              We do not sell, share, or distribute any user data to third parties. Your information stays with us and is never monetized or shared without your explicit consent.
            </p>
          </div>
        </section>

        {/* Changes to Policy */}
        <section 
          ref={addToRefs}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mr-4">
              <span className="text-white text-xl">🔄</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Changes to This Policy</h2>
          </div>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">
              If our data practices change in the future, we will update this page and notify users before making any changes. Transparency is key to maintaining your trust.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          ref={addToRefs}
          className="bg-gradient-to-r from-slate-700 to-gray-800 rounded-2xl p-8 shadow-lg text-white hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">📞</span>
            </div>
            <h2 className="text-2xl font-bold">Contact Us</h2>
          </div>
          <p className="text-white/90 leading-relaxed mb-4">
            If you have any questions about our privacy policy, please don't hesitate to reach out to us.
          </p>
          <a 
            href="mailto:jayrajaraj18@gmail.com" 
            className="inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20 group"
          >
            <span className="mr-2 group-hover:scale-110 transition-transform duration-200">📧</span>
            <span className="font-medium">jayrajaraj18@gmail.com</span>
          </a>
        </section>

        {/* Trust Badge */}
        <div 
          ref={addToRefs}
          className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 shadow-lg text-white text-center hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-center mb-3">
            <span className="text-3xl mr-2">✅</span>
            <h3 className="text-xl font-bold">Privacy First</h3>
          </div>
          <p className="text-white/90">
            We believe in privacy by design. Your data is yours, and we respect that.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-16 py-8 border-t border-gray-200">
        <p className="text-gray-500 mb-2">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-gray-400 text-sm">
          This privacy policy is effective immediately and will remain in effect except with respect to any changes in its provisions in the future.
        </p>
      </div>
    </div>
  );
}

export default Privacy;