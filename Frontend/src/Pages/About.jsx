import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

function About() {
  const aboutRef = useRef(null);

  useGSAP(
    () => {
      const title = aboutRef.current.querySelector("h1");
      const subtitle = aboutRef.current.querySelector("p");
      const sections = aboutRef.current.querySelectorAll("section");

      gsap.from(title, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(subtitle, {
        y: -20,
        opacity: 0,
        delay: 0.2,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(sections, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        stagger: 0.3,
        delay: 0.5,
      });
    },
    { scope: aboutRef }
  );

  return (
    <div
      ref={aboutRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900 px-6 py-8 md:px-20 lg:px-40"
    >
      {/* Back Button */}
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white text-lg rounded-full hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
        >
          <IoArrowBackSharp className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Back</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-16 py-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          About Us
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          A safe and fun social media platform for all age groups. A platform
          that helps new creators get discovered — faster
        </p>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Our mission is to build a social media platform where people of all
            ages — especially children — can safely engage with content without
            the risk of encountering inappropriate material. With 0% nudity,
            we're committed to making the internet a cleaner and safer place.
            We're building more than a social media app. We're creating a
            digital playground where safety meets creativity and parents can
            finally breathe easy.
          </p>
        </section>

        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <span className="w-2 h-8 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></span>
            Why It Matters
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            In today's world, it's hard to find a platform where parents can
            feel completely safe letting their children explore. Our platform
            aims to change that. We believe entertainment should be wholesome,
            creative, and inspiring — not risky. Social platforms today are made
            for clicks — not care. We believe it's time for something different.
            A space that's not just addicting, but uplifting. Safe doesn't mean
            boring — it means <strong className="text-blue-600 font-semibold">trust</strong>. And that's what we're building.
          </p>
        </section>

        <section className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
            Empowering Creators
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-lg">
              Not only are we creating a safe space for users, but we're also
              providing powerful tools and monetization opportunities for
              creators.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
              Every creator starts small. We're here for the ones who haven't
              gone viral — yet. Whether you're filming on your phone or speaking
              your truth for the first time, our platform gives you the tools
              and space to grow, share, and get discovered.
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <span className="w-2 h-8 bg-gradient-to-b from-pink-500 to-red-500 rounded-full"></span>
            Looking Ahead
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            This isn't just a launch — it's a movement. We're rewriting what
            social media can be: safe, and creator-first. We have bold ideas
            ahead, and we'd love for you to shape them with us.
          </p>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-16 py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl text-white">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to be part of something better?
          </h3>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Join the community. <br />
            <span className="text-yellow-300">Change the story.</span>
          </h2>
          <div className="mt-8">
            <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg text-lg">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;