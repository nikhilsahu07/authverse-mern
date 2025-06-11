import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, Fingerprint, Key, Lock, Scan, Shield, ShieldCheck, UserCheck } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

const authIcons = [
  { Icon: Shield, color: 'text-blue-500' },
  { Icon: Lock, color: 'text-green-500' },
  { Icon: Key, color: 'text-purple-500' },
  { Icon: UserCheck, color: 'text-teal-500' },
  { Icon: Eye, color: 'text-orange-500' },
  { Icon: ShieldCheck, color: 'text-indigo-500' },
  { Icon: Fingerprint, color: 'text-pink-500' },
  { Icon: Scan, color: 'text-red-500' },
];

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message = 'Authenticating...',
  className = '',
}) => {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % authIcons.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const containerSizes = {
    sm: 'h-16 w-16',
    md: 'h-20 w-20',
    lg: 'h-28 w-28',
  };

  const currentIcon = authIcons[currentIconIndex];

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {/* Main rotating container */}
      <div className={`relative ${containerSizes[size]} flex items-center justify-center`}>
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-gray-200 border-t-blue-500"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            ease: 'linear',
            repeat: Infinity,
          }}
        />

        {/* Inner pulsing ring */}
        <motion.div
          className="absolute inset-2 rounded-full border border-gray-100 border-t-purple-400"
          animate={{
            rotate: -360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            ease: 'linear',
            repeat: Infinity,
          }}
        />

        {/* Animated icon in center */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIconIndex}
              initial={{
                scale: 0,
                rotate: -180,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                rotate: 0,
                opacity: 1,
              }}
              exit={{
                scale: 0,
                rotate: 180,
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut',
              }}
              className={`${sizeClasses[size]} ${currentIcon.color}`}
            >
              <currentIcon.Icon className="w-full h-full" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating particles */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: [0, 20 * Math.cos((i * 120 * Math.PI) / 180)],
              y: [0, 20 * Math.sin((i * 120 * Math.PI) / 180)],
              opacity: [0.8, 0.2, 0.8],
              scale: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Loading message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <motion.p
          className="text-sm font-medium text-gray-600 dark:text-gray-300"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          {message}
        </motion.p>

        {/* Animated dots */}
        <div className="flex justify-center space-x-1 mt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-blue-500 rounded-full"
              animate={{
                y: [0, -8, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
