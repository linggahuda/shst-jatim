import React from 'react';
import { X, User } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg border border-[#dee2e6] shadow-xl w-full max-w-md p-6 flex flex-col items-center text-center relative animate-in fade-in zoom-in-95 duration-150">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 mb-4">
          <User className="w-6 h-6 text-[#0d6efd]" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 font-sans mb-2">
          ADMIN
        </h3>

        <p className="text-sm text-slate-500 font-sans leading-relaxed">
          Dalam pengembangan
        </p>
      </div>
    </div>
  );
}
