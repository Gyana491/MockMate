import React from "react";

const Card = () => {
  return (
    <section className="bg-neutral-900 text-white py-16 relative overflow-hidden">
      {/* Top wave */}
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
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet the Instructors
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            We are 10-20x industry veterans who are teaching step-by-step,
            coding courses for practical design in our courses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Instructor Card */}
          <div className="bg-gradient-to-br from-purple-900/80 to-neutral-900/90 rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 transition duration-300">
            <div className="px-6 pt-6 pb-8 text-center">
              <div className="w-16 h-16 bg-neutral-800 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                MT
              </div>
              <h3 className="text-xl font-bold mb-1">Meng To</h3>
              <p className="text-gray-400 text-sm mb-4">
                DESIGN, CODE AND WRITE
              </p>
              <p className="text-gray-300 text-sm mb-6">
                Being 10+ in the world of design and code, I'm excited to share
                my knowledge through comprehensive courses.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-neutral-800/50 p-3 rounded-xl">
                  <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-xs">
                    🎨
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-sm font-medium">UI Design Handbook</h4>
                    <p className="text-xs text-gray-400">
                      A comprehensive guide to design principles
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">2 hrs</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-neutral-800/50 p-3 rounded-xl">
                  <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-xs">
                    🎨
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-sm font-medium">UI Design Handbook</h4>
                    <p className="text-xs text-gray-400">
                      A comprehensive guide to design principles
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">2 hrs</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-neutral-800/50 p-3 rounded-xl">
                  <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-xs">
                    🎨
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-sm font-medium">UI Design Handbook</h4>
                    <p className="text-xs text-gray-400">
                      A comprehensive guide to design principles
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">2 hrs</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-900/80 to-neutral-900/90 rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 transition duration-300">
            <div className="px-6 pt-6 pb-8 text-center">
              <div className="w-16 h-16 bg-neutral-800 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                MT
              </div>
              <h3 className="text-xl font-bold mb-1">Meng To</h3>
              <p className="text-gray-400 text-sm mb-4">
                DESIGN, CODE AND WRITE
              </p>
              <p className="text-gray-300 text-sm mb-6">
                Being 10+ in the world of design and code, I'm excited to share
                my knowledge through comprehensive courses.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-neutral-800/50 p-3 rounded-xl">
                  <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-xs">
                    🎨
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-sm font-medium">UI Design Handbook</h4>
                    <p className="text-xs text-gray-400">
                      A comprehensive guide to design principles
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">2 hrs</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-neutral-800/50 p-3 rounded-xl">
                  <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-xs">
                    🎨
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-sm font-medium">UI Design Handbook</h4>
                    <p className="text-xs text-gray-400">
                      A comprehensive guide to design principles
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">2 hrs</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-neutral-800/50 p-3 rounded-xl">
                  <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-xs">
                    🎨
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-sm font-medium">UI Design Handbook</h4>
                    <p className="text-xs text-gray-400">
                      A comprehensive guide to design principles
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">2 hrs</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-900/80 to-neutral-900/90 rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 transition duration-300">
            <div className="px-6 pt-6 pb-8 text-center">
              <div className="w-16 h-16 bg-neutral-800 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                MT
              </div>
              <h3 className="text-xl font-bold mb-1">Meng To</h3>
              <p className="text-gray-400 text-sm mb-4">
                DESIGN, CODE AND WRITE
              </p>
              <p className="text-gray-300 text-sm mb-6">
                Being 10+ in the world of design and code, I'm excited to share
                my knowledge through comprehensive courses.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-neutral-800/50 p-3 rounded-xl">
                  <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-xs">
                    🎨
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-sm font-medium">UI Design Handbook</h4>
                    <p className="text-xs text-gray-400">
                      A comprehensive guide to design principles
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">2 hrs</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-neutral-800/50 p-3 rounded-xl">
                  <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-xs">
                    🎨
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-sm font-medium">UI Design Handbook</h4>
                    <p className="text-xs text-gray-400">
                      A comprehensive guide to design principles
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">2 hrs</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-neutral-800/50 p-3 rounded-xl">
                  <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-xs">
                    🎨
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-sm font-medium">UI Design Handbook</h4>
                    <p className="text-xs text-gray-400">
                      A comprehensive guide to design principles
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">2 hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
