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
        <Link to="/" className="text-white no-underline">
          Back
        </Link>
      </div>

      <div className="text-center mb-12 py-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A safe and fun social media platform for all age groups. A platform
          that helps new creators get discovered — faster
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed capitalize">
            Our mission is to build a social media platform where people of all
            ages — especially children — can safely engage with content without
            the risk of encountering inappropriate material. With 0% nudity,
            we’re committed to making the internet a cleaner and safer place.
            We’re building more than a social media app. We’re creating a
            digital playground where safety meets creativity.and parents can
            finally breathe easy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Why It Matters</h2>
          <p className="text-gray-700 leading-relaxed">
            In today's world, it's hard to find a platform where parents can
            feel completely safe letting their children explore. Our platform
            aims to change that. We believe entertainment should be wholesome,
            creative, and inspiring — not risky. Social platforms today are made
            for clicks — not care. We believe it's time for something different.
            A space that’s not just addicting, but uplifting. Safe doesn’t mean
            boring — it means **trust**. And that’s what we’re building.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Empowering Creators</h2>
          <p className="text-gray-700 leading-relaxed capitalize">
            Not only are we creating a safe space for users, but we’re also
            providing powerful tools and monetization opportunities for
            creators.
            <p className="text-gray-700 leading-relaxed capitalize">
              Every creator starts small. We’re here for the ones who haven’t
              gone viral — yet. Whether you're filming on your phone or speaking
              your truth for the first time, our platform gives you the tools
              and space to grow, share, and get discovered.
            </p>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Looking Ahead</h2>
          <p className="text-gray-700 leading-relaxed">
            <p className="text-gray-700 leading-relaxed">
              This isn’t just a launch — it’s a movement. We’re rewriting what
              social media can be: safe, and creator-first. We have bold ideas
              ahead, and we’d love for you to shape them with us.
            </p>
          </p>
        </section>

        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold mb-2">
            Ready to be part of something better?
          </h3>
          <h2 className="px-6 py-3 text-black text-3xl">
            Join the community. Change the story.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default About;
