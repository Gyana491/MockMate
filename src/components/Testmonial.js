import React from "react";

const Testimonials = () => {
  return (
    <>
      <section
        id="testimonials"
        className="bg-neutral-900 text-white py-16 relative overflow-hidden"
      >
        {/* Top wave design */}
        <div className="absolute top-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 40L48 50C96 60 192 80 288 80C384 80 480 60 576 50C672 40 768 30 864 25C960 20 1056 20 1152 30C1248 40 1344 60 1392 70L1440 80V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V40Z"
              fill="#6C63FF"
              opacity="0.15"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              See how our AI-powered mock interviews helped developers land
              their dream jobs at top tech companies.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                name: "Sarah Chen",
                role: "Software Engineer at Google",
                initials: "SC",
                message:
                  "The AI interviewer helped me practice system design questions I wasn't confident about. The real-time feedback was invaluable for my preparation.",
                course: "System Design Practice",
              },
              {
                name: "Michael Rodriguez",
                role: "Senior Developer at Meta",
                initials: "MR",
                message:
                  "After practicing with this platform, my confidence in technical interviews skyrocketed. The AI's ability to adapt to my skill level was impressive.",
                course: "Algorithm Deep Dive",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-neutral-800 rounded-3xl p-8 relative overflow-hidden group hover:bg-neutral-800/80 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-xl -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>

                <div className="flex items-start gap-4 mb-6 relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-xl font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">{testimonial.message}</p>

                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-400 text-sm">
                    {testimonial.course}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-10">
              Trusted by developers worldwide
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  stat: "1000+",
                  label: "Mock Interviews",
                  color: "text-indigo-400",
                },
                {
                  stat: "50+",
                  label: "Interview Types",
                  color: "text-purple-400",
                },
                { stat: "92%", label: "Success Rate", color: "text-green-400" },
                {
                  stat: "4.9★",
                  label: "Average Rating",
                  color: "text-yellow-400",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-neutral-800 rounded-xl p-6 hover:bg-neutral-700 transition-colors duration-300"
                >
                  <div className={`text-4xl font-bold mb-2 ${item.color}`}>
                    {item.stat}
                  </div>
                  <p className="text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave design */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 100C0 100 240 150 720 100C1200 50 1440 100 1440 100V200H0V100Z"
              fill="#6C63FF"
              opacity="0.2"
            />
            <path
              d="M0 140C0 140 320 180 720 140C1120 100 1440 140 1440 140V200H0V140Z"
              fill="#6C63FF"
              opacity="0.3"
            />
          </svg>
        </div>
        
      </section>

    </>
  );
};

export default Testimonials;
