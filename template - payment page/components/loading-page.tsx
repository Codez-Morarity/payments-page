'use client'

import { useEffect, useState } from 'react'

export default function LoadingPage({
  onLoadComplete,
}: {
  onLoadComplete: () => void
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const intervals = [
      setInterval(() => {
        setProgress((p) => {
          if (p >= 90) return p
          return p + Math.random() * 30
        })
      }, 300),
    ]

    const timeout = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
        onLoadComplete()
      }, 500)
    }, 3000)

    return () => {
      intervals.forEach(clearInterval)
      clearTimeout(timeout)
    }
  }, [onLoadComplete])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Main loading content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Spinning circles */}
        <div className="flex justify-center items-center">
          <div className="relative w-32 h-32">
            {/* Outer spinning ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400 animate-spin-slow"></div>

            {/* Middle spinning ring */}
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-purple-500 border-l-purple-400 animate-spin-fast" style={{ animationDirection: 'reverse' }}></div>

            {/* Inner pulsing circle */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 animate-pulse-glow"></div>

            {/* Center dot */}
            <div className="absolute inset-6 rounded-full bg-white dark:bg-slate-800 animate-bounce-smooth"></div>
          </div>
        </div>

        {/* Loading text with animation */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 animate-float-up">
            Processing Payment
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm animate-slide-down animation-delay-200">
            Preparing your secure checkout...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress text */}
        <p className="text-xs text-slate-500 dark:text-slate-500 font-mono animate-fade">
          {Math.round(progress)}%
        </p>

        {/* Floating loading indicators */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-500 animate-bounce-smooth"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-fade {
          animation: fade 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
