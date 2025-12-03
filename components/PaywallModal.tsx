import React from 'react';
import { X, Check, Star, Lock } from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative animate-fade-in-up border border-slate-800">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors z-10 text-slate-400"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Image/Gradient */}
        <div className="h-32 bg-gradient-to-br from-indigo-800 to-purple-900 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg transform translate-y-8 border border-slate-700">
                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            </div>
        </div>

        <div className="pt-12 pb-8 px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Upgrade to Pro</h3>
          <p className="text-slate-400 text-sm mb-6">Unlock Arabic Templates, Unlimited Plans, and Competitor Analysis.</p>

          <div className="space-y-3 text-left mb-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-green-500" />
              </div>
              <span className="text-slate-300 text-sm">Unlimited Content Generations</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-green-500" />
              </div>
              <span className="text-slate-300 text-sm">Advanced Arabic Dialects (Saudi, Egyptian, etc.)</span>
            </div>
             <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-green-500" />
              </div>
              <span className="text-slate-300 text-sm">Video Script Generator for TikTok</span>
            </div>
            <div className="flex items-center gap-3 opacity-60">
              <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                <Lock className="w-3 h-3 text-slate-500" />
              </div>
              <span className="text-slate-500 text-sm">Competitor Analysis (Coming Soon)</span>
            </div>
          </div>

          <button className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-900/50 transition-all transform hover:scale-[1.02]">
            Start 7-Day Free Trial
          </button>
          <p className="mt-3 text-xs text-slate-500">Then $9.99/month. Cancel anytime.</p>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;