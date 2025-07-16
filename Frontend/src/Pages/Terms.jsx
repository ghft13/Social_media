import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function Terms() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useGSAP(() => {
    // Animate container fade in
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    // Animate sections with stagger effect
    gsap.fromTo(
      sectionsRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      }
    );

    // Add hover animations for sections
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        section.addEventListener("mouseenter", () => {
          gsap.to(section, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        section.addEventListener("mouseleave", () => {
          gsap.to(section, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
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
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-800 px-6 py-12 md:px-20 lg:px-40"
    >
      <div className="inline-flex items-center gap-2 px-6 py-2 bg-black text-white text-xl rounded-full hover:bg-gray-800 transition duration-300 mb-3">
        <IoArrowBackSharp className="text-2xl" />
        <Link to="/" className="text-white no-underline">
          Back
        </Link>
      </div>
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
          Terms & Conditions
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
          Please read these terms carefully before using our platform
        </p>
      </div>

      {/* Terms Sections */}
      <div className="max-w-4xl mx-auto space-y-8">
        <section
          ref={addToRefs}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Introduction</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Welcome to [Your Platform Name]! By using our platform, you agree to
            the following terms and conditions. Please read them carefully.
          </p>
        </section>

        <section
          ref={addToRefs}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">User Content</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            You retain ownership of the content you create. However, by posting
            on our platform, you grant us permission to display, promote, and
            distribute your content within the platform.
          </p>
        </section>

        <section
          ref={addToRefs}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">3</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Community Guidelines
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            We do not allow content that includes nudity, violence, harassment,
            or hate speech. Content that violates these rules may result in
            account suspension or removal.
          </p>
        </section>

        <section
          ref={addToRefs}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">4</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Account Termination
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            We reserve the right to suspend or terminate accounts that violate
            these terms or harm the safety of the community.
          </p>
        </section>

        <section
          ref={addToRefs}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">5</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Intellectual Property
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            All rights to the platform design, code, and branding belong to
            [Your Company Name]. Users retain rights to their individual posts.
          </p>
        </section>

        <section
          ref={addToRefs}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">6</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Privacy</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            We respect your privacy. Please read our Privacy Policy to learn how
            we collect and use your data.
          </p>
        </section>

        <section
          ref={addToRefs}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">7</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Changes to Terms
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            We may update these terms from time to time. Users will be notified
            of significant changes via email or platform notice.
          </p>
        </section>

        <section
          ref={addToRefs}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 shadow-lg text-white hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">8</span>
            </div>
            <h2 className="text-2xl font-bold">Contact Us</h2>
          </div>
          <p className="leading-relaxed mb-4">
            For any questions or concerns, please don't hesitate to reach out to
            us.
          </p>
          <a
            href="mailto:arajjayraj18@gmail.com"
            className="inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            <span className="mr-2">📧</span>
            arajjayraj18@gmail.com
          </a>
        </section>
      </div>
    </div>
  );
}

export default Terms;
