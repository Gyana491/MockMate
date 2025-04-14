"use client";

import { useAuth } from "@/lib/hooks/useAuth";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const modules = [
    {
      name: "Full Stack Dev",
      description: "Master frontend and backend to build full web apps.",
      rating: 4.5,
    },
    {
      name: "Data Analyst",
      description: "Analyze data using Python, SQL, and visualization tools.",
      rating: 4.2,
    },
    {
      name: "Mobile App",
      description: "Create mobile apps using React Native or Flutter.",
      rating: 4.3,
    },
    {
      name: "SQL",
      description: "Query and manage databases with advanced SQL.",
      rating: 4.0,
    },
    {
      name: "Next.js",
      description: "Build modern SSR apps using Next.js framework.",
      rating: 4.6,
    },
    {
      name: "React Native",
      description: "Develop cross-platform mobile apps efficiently.",
      rating: 4.4,
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push("⭐");
      } else if (i - rating < 1) {
        stars.push("✨"); // half-star look
      } else {
        stars.push("☆");
      }
    }
    return stars.join(" ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 animate-text">
              Good Morning, {user?.firstName || "Student"}!
            </h1>
            <p className="text-gray-400 mt-4 text-lg">
              Elevate your interview preparation with AI-powered insights.
            </p>
          </div>
          <button
            onClick={logout}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Sign Out
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Quick Start Section */}
          <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 p-6 rounded-2xl shadow-xl backdrop-blur-md bg-opacity-60 border border-gray-700 hover:shadow-2xl transition-shadow">
            <h2 className="text-3xl font-semibold mb-4 text-indigo-400">
              Quick Start
            </h2>
            <p className="text-gray-300 mb-6">
              Begin your interview preparation journey with AI-powered tools.
            </p>
            <button className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-lg shadow-md transition-transform transform hover:scale-105">
              Start New Interview
            </button>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 p-6 rounded-2xl shadow-xl backdrop-blur-md bg-opacity-60 border border-gray-700 hover:shadow-2xl transition-shadow">
            <h2 className="text-3xl font-semibold mb-4 text-purple-400">
              Recent Activity
            </h2>
            <p className="text-gray-300">
              No recent interviews yet. Start practicing now!
            </p>
          </div>

          {/* Progress Section */}
          <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 p-6 rounded-2xl shadow-xl backdrop-blur-md bg-opacity-60 border border-gray-700 hover:shadow-2xl transition-shadow">
            <h2 className="text-3xl font-semibold mb-4 text-green-400">
              Progress
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg">Completed Interviews</span>
                <span className="text-green-400 text-xl font-bold">8/10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg">Average Score</span>
                <span className="text-blue-400 text-xl font-bold">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg">Practice Hours</span>
                <span className="text-purple-400 text-xl font-bold">24h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Mock Test Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-2xl transition-shadow"
            >
              <h3 className="text-2xl font-semibold text-pink-400 mb-2">
                {module.name}
              </h3>
              <p className="text-gray-300 mb-2">{module.description}</p>
              <p className="text-yellow-400 mb-4 text-sm">
                {renderStars(module.rating)} ({module.rating}/5)
              </p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg transition-transform transform hover:scale-105">
                Take Mock
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
