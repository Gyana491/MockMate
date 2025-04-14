import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <section
        id="hero"
        className="bg-gradient-to-b from-indigo-900 to-neutral-900 text-white overflow-hidden relative min-h-screen animate-gradient"
      >
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Hero Content */}
            <div className="lg:w-1/2 space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Master Your{" "}
                <span className="text-indigo-400">Tech Interviews</span> with{" "}
                <span className="text-pink-400">AI</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 max-w-lg animate-fade-in delay-100">
                Practice coding interviews with our advanced AI interviewer. Get
                real-time feedback, improve your problem-solving skills, and
                boost your confidence.
              </p>

              <div className="pt-4 space-y-4 md:space-y-0 md:space-x-4 md:flex animate-fade-in delay-200">
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-xl px-8 py-4 w-full md:w-auto animate-pulse-slow"
                >
                  <Link href="/mock-test">Take a Mock Test</Link>
                </Button>

                <Button
                  variant="outline"
                  className="bg-neutral-800 hover:bg-neutral-700 text-black font-medium rounded-xl px-8 py-4 w-full md:w-auto"
                >
                  <a href="https://jinny.onrender.com/" target="_blank">Try Jinny AI</a>
                  
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-400 animate-fade-in delay-300">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Real-time AI Feedback</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Multiple Tech Stacks</span>
                </div>
              </div>
            </div>

            {/* Hero Interactive Mockup */}
            <div className="lg:w-1/2 animate-fade-in delay-200">
              <div className="relative w-full h-[500px] bg-neutral-800/40 rounded-xl border border-neutral-700/50 shadow-2xl backdrop-blur-sm p-4 overflow-hidden group hover:border-indigo-500/50 transition-all duration-500">
                {/* Window Controls */}
                <div className="flex items-center gap-2 mb-4 animate-fade-in">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                {/* AI Interview Interface */}
                <div className="space-y-4">
                  {/* AI Avatar */}
                  <div className="flex items-center gap-3 p-3 bg-neutral-700/30 rounded-lg animate-slide-in">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/80 flex items-center justify-center animate-pulse-slow">
                      <Image
                        src="/globe.svg"
                        alt="AI Interviewer"
                        width={24}
                        height={24}
                        className="opacity-80"
                      />
                    </div>
                    <div className="text-white">
                      <p className="font-medium">AI Interviewer</p>
                      <p className="text-sm text-gray-400">
                        Senior Technical Interviewer
                      </p>
                    </div>
                  </div>

                  {/* Interview Chat */}
                  <div className="space-y-3">
                    <div className="p-4 bg-neutral-700/20 rounded-lg animate-fade-in delay-100">
                      <p className="text-white">
                        Let's implement a function to reverse a linked list. Can
                        you walk me through your approach?
                      </p>
                    </div>
                    <div className="p-4 bg-indigo-500/10 rounded-lg ml-8 animate-fade-in delay-200">
                      <p className="text-gray-300">
                        I'll use an iterative approach with three pointers to
                        track the previous, current, and next nodes...
                      </p>
                    </div>
                  </div>

                  {/* Code Window */}
                  <div className="p-4 bg-neutral-900/50 rounded-lg border border-neutral-700/30 animate-fade-in delay-300">
                    <div className="flex items-center gap-2 mb-3">
                      <Image
                        src="/file.svg"
                        alt="Code"
                        width={16}
                        height={16}
                        className="opacity-50"
                      />
                      <span className="text-sm text-gray-400">solution.js</span>
                    </div>
                    <div className="font-mono text-sm text-gray-300 space-y-1">
                      <div className="text-pink-400">function</div>
                      <div className="text-indigo-400 ml-4">
                        reverseLinkedList(head) {`{`}
                      </div>
                      <div className="text-gray-300 ml-8">let prev = null;</div>
                      <div className="text-gray-300 ml-8">
                        let current = head;
                      </div>
                      <div className="text-indigo-400 ml-4">{`}`}</div>
                    </div>
                  </div>
                </div>

                {/* Animated Elements */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-transparent z-0 animate-gradient" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-900 to-transparent z-0" />

        {/* Modern Wave Animation */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <div className="relative">
            {/* First wave layer */}
            <div className="absolute bottom-0 w-full">
              <svg
                className="relative block w-[120%] h-[60px]"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                  className="fill-indigo-600/10 animate-wave-slow"
                />
              </svg>
            </div>

            {/* Second wave layer */}
            <div className="absolute bottom-0 w-full">
              <svg
                className="relative block w-[120%] h-[60px]"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                  className="fill-indigo-500/10 animate-wave"
                />
              </svg>
            </div>

            {/* Third wave layer */}
            <div className="absolute bottom-0 w-full">
              <svg
                className="relative block w-[120%] h-[60px]"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0V30.63C59.28,10.21,126.89,0,198.76,2.19c83.17,2.54,163.06,27.56,244.74,37.53,178.82,21.83,337.84-27.93,525.5-27.93V0Z"
                  className="fill-purple-500/10 animate-wave-fast"
                />
              </svg>
            </div>

            {/* Glowing dots */}
            <div className="absolute bottom-0 w-full h-20 flex justify-around items-center overflow-hidden">
              <div className="w-2 h-2 bg-indigo-400/40 rounded-full animate-glow"></div>
              <div className="w-2 h-2 bg-purple-400/40 rounded-full animate-glow-delayed"></div>
              <div className="w-2 h-2 bg-pink-400/40 rounded-full animate-glow"></div>
              <div className="w-2 h-2 bg-indigo-400/40 rounded-full animate-glow-delayed"></div>
              <div className="w-2 h-2 bg-purple-400/40 rounded-full animate-glow"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
