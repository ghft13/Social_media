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
      className="min-h-screen bg-white text-black px-6 py-6 md:px-20 lg:px-40"
    >
      <div className="inline-flex items-center gap-2 px-6 py-2 bg-black text-white text-xl rounded-full hover:bg-gray-800 transition duration-300">
        <IoArrowBackSharp className="text-2xl" />
        <Link to="/Home" className="text-white no-underline">
          Back
        </Link>
      </div>

      <div className="text-center mb-12 py-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A safe and fun social media platform for all age groups.
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to build a social media platform where people of all
            ages — especially children — can safely engage with content without
            the risk of encountering inappropriate material. With 0% nudity,
            we’re committed to making the internet a cleaner and safer place.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Why It Matters</h2>
          <p className="text-gray-700 leading-relaxed">
            In today's world, it's hard to find a platform where parents can
            feel completely safe letting their children explore. Our platform
            aims to change that. We believe entertainment should be wholesome,
            creative, and inspiring — not risky.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Empowering Creators</h2>
          <p className="text-gray-700 leading-relaxed">
            Not only are we creating a safe space for users, but we’re also
            providing powerful tools and monetization opportunities for
            creators. We envision a platform where your creativity is rewarded
            fairly — without compromising values or ethics.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Looking Ahead</h2>
          <p className="text-gray-700 leading-relaxed">
            This is just the beginning. We have many innovative ideas in the
            pipeline to make our platform more engaging, empowering, and
            globally accessible. Join us on this journey to redefine what social
            media can be.
          </p>
        </section>

        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold mb-2">
            Want to be a part of this revolution?
          </h3>
          <h2 className="px-6 py-3 text-black text-3xl">Become a User</h2>
        </div>
      </div>
    </div>
  );
}

export default About;
