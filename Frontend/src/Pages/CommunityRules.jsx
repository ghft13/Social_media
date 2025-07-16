import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
function CommunityRules() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const rulesRef = useRef([]);
  const footerRef = useRef(null);

  useGSAP(() => {
    // Animate container fade in
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    // Animate title with elastic effect
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -60, scale: 0.7 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        delay: 0.2,
      }
    );

    // Animate subtitle
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.5,
      }
    );

    // Animate rules with stagger effect
    gsap.fromTo(
      rulesRef.current,
      { opacity: 0, x: -50, rotateY: 10 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.7,
      }
    );

    // Animate footer
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 1.5,
      }
    );

    // Add hover animations for rules
    rulesRef.current.forEach((rule, index) => {
      if (rule) {
        rule.addEventListener("mouseenter", () => {
          gsap.to(rule, {
            scale: 1.03,
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        rule.addEventListener("mouseleave", () => {
          gsap.to(rule, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !rulesRef.current.includes(el)) {
      rulesRef.current.push(el);
    }
  };

  const rules = [
    {
      number: "1",
      title: "Keep It Safe for All Ages",
      content:
        "No nudity, explicit content, or violent material. Our platform is for everyone — including children and families. If it's not safe to show in a classroom, it's not welcome here.",
      icon: "👨‍👩‍👧‍👦",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-500",
    },
    {
      number: "2",
      title: "Be Respectful",
      content:
        "Bullying, hate speech, or harassment of any kind will not be tolerated. Treat others the way you'd want to be treated — with kindness and respect.",
      icon: "🤝",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500",
    },
    {
      number: "3",
      title: "Share Original or Permitted Content",
      content:
        "Only upload content that you created or have permission to use. Respect copyright and avoid reposting videos from other platforms without credit or rights.",
      icon: "🎨",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-500",
    },
    {
      number: "4",
      title: "No Spam or Misleading Content",
      content:
        "Avoid posting spam, fake giveaways, misleading links, or clickbait. Keep the platform clean, honest, and helpful.",
      icon: "✨",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-500",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-800 px-6 py-12 md:px-20 lg:px-40"
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
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Community Rules
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-8"></div>
        <p
          ref={subtitleRef}
          className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed"
        >
          We're building a safe, respectful, and fun community for everyone. By
          using [Your Platform Name], you agree to follow these simple but
          important rules:
        </p>
      </div>

      {/* Rules Section */}
      <div className="max-w-4xl mx-auto space-y-8 mb-16">
        {rules.map((rule, index) => (
          <section
            key={index}
            ref={addToRefs}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform-gpu"
          >
            <div className="flex items-start gap-6">
              {/* Rule Number and Icon */}
              <div className="flex-shrink-0">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${rule.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                >
                  {rule.number}
                </div>
                <div className="text-3xl text-center mt-3">{rule.icon}</div>
              </div>

              {/* Rule Content */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {rule.title}
                </h2>
                <div
                  className={`${rule.bgColor} border-l-4 ${rule.borderColor} p-4 rounded-r-lg`}
                >
                  <p className="text-gray-700 leading-relaxed">
                    {rule.content}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Community Values Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div
          ref={addToRefs}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 shadow-lg text-white text-center hover:shadow-xl transition-all duration-300"
        >
          <div className="text-4xl mb-4">🌟</div>
          <h3 className="text-2xl font-bold mb-4">Our Community Values</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl mb-2">🛡️</div>
              <h4 className="font-semibold">Safety First</h4>
              <p className="text-sm text-white/80">Protecting our community</p>
            </div>
            <div>
              <div className="text-2xl mb-2">💝</div>
              <h4 className="font-semibold">Kindness Matters</h4>
              <p className="text-sm text-white/80">
                Treating everyone with respect
              </p>
            </div>
            <div>
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold">Quality Content</h4>
              <p className="text-sm text-white/80">
                Sharing meaningful experiences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Consequences Section */}
      <div
        ref={addToRefs}
        className="max-w-4xl mx-auto mb-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 shadow-lg text-white"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="text-3xl mr-3">⚠️</div>
          <h3 className="text-2xl font-bold">Important Notice</h3>
        </div>
        <p className="text-center text-lg text-white/90 leading-relaxed">
          Breaking the rules may result in content removal or account
          suspension. Let's work together to build a positive space for
          everyone.
        </p>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="text-center py-8 border-t border-gray-200"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-4xl mb-4">🤗</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Thank You!
          </h3>
          <p className="text-gray-600 mb-4">
            Thank you for helping us create a wonderful community where everyone
            can feel safe, respected, and inspired.
          </p>
          <div className="flex justify-center space-x-4 text-2xl">
            <span>❤️</span>
            <span>🌈</span>
            <span>🚀</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityRules;
