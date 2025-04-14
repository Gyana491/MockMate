import React from "react";

export function Button({ children, className = "", variant = "default", ...props }) {
  const baseStyles = "font-semibold px-6 py-3 rounded-xl text-lg transition-all duration-200";
  
  const variants = {
    default: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white",
    ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-neutral-800/50",
    outline: "border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white bg-transparent",
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
