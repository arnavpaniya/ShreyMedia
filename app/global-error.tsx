"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Layout Error:", error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="bg-[#07070A] text-white min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl border border-white/15 bg-[#0C0C14] text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 text-red-400 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">System Malfunction</h1>
            <p className="text-sm text-gray-400">
              A critical error occurred while loading the application shell.
            </p>
          </div>

          <button
            onClick={() => reset()}
            className="w-full py-3 px-6 rounded-full bg-[#FF5E00] text-white font-bold text-sm shadow-lg hover:bg-[#FF7700] transition-colors"
          >
            <RotateCcw className="w-4 h-4 inline mr-2" />
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
