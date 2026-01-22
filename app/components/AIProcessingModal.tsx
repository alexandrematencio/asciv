'use client';

interface AIProcessingModalProps {
  isOpen: boolean;
  message?: string;
}

export default function AIProcessingModal({ isOpen, message = 'AI is processing...' }: AIProcessingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 max-w-md w-full mx-4 text-center">
        {/* Animated spinner */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-600 rounded-full" />
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
          </div>
        </div>

        {/* Message */}
        <h3 className="text-lg font-semibold text-white mb-2">
          {message}
        </h3>
        <p className="text-slate-400 text-sm">
          Please wait and do not leave this page.
        </p>

        {/* Animated dots */}
        <div className="flex justify-center gap-1 mt-4">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
