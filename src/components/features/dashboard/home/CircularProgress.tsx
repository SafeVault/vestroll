"use client";
import { motion } from "framer-motion";

function CircularProgress({ progress = 25 }: { progress: number }) {
  const radius = 30; // radius of circle
  const stroke = 6; // stroke width
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="-rotate-90" // makes progress start from top
      >
        {/* Background circle */}
        <circle
          stroke="#9f7aea"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Animated progress circle */}
        <motion.circle
          stroke="#ffffff"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </svg>

      {/* Percentage text */}
      <div className="absolute text-white font-semibold text-base">
        {progress}%
      </div>
    </div>
  );
}

export default CircularProgress;
