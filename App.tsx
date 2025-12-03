import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Sparkles, LayoutGrid, Settings, Crown, Menu, X } from 'lucide-react';
import InputForm from './components/InputForm';
import PlanDisplay from './components/PlanDisplay';
import PaywallModal from './components/PaywallModal';
import { UserPreferences, GeneratedPlan } from './types';
import { generateContentPlan } from './services/geminiService';

const App: React.FC = () => {
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (prefs: UserPreferences) => {
    setIsLoading(true);
    setError(null);
    try {
      const plan = await generateContentPlan(prefs);
      setGeneratedPlan(plan);
    } catch (err) {
      setError("Failed to generate plan. Please verify your API Key and try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPlan = () => {
    setGeneratedPlan(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans flex flex-col md:flex-row">
        
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20">
            <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
                <Sparkles className="w-6 h-6" />
                <span>SocialGenius</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>

        {/* Sidebar Navigation */}
        <aside className={`
            fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-screen flex flex-col
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-6 border-b border-slate-100 hidden md:flex items-center gap-2 font-bold text-xl text-indigo-600">
            <Sparkles className="w-6 h-6 fill-indigo-100" />
            <span>SocialGenius</span>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <button 
              onClick={() => { resetPlan(); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${!generatedPlan ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <LayoutGrid className="w-5 h-5" />
              Generator
            </button>
            <button 
                onClick={() => setIsPaywallOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </nav>

          <div className="p-4">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-4 text-white shadow-lg relative overflow-hidden">
                <div className="absolute -right-4 -top-4 bg-white/10 w-24 h-24 rounded-full blur-2xl"></div>
                <div className="flex items-center gap-2 font-bold mb-1">
                    <Crown className="w-4 h-4 text-yellow-300" />
                    <span>Go Pro</span>
                </div>
                <p className="text-xs text-indigo-100 mb-3">Get unlimited plans & Arabic templates.</p>
                <button 
                    onClick={() => setIsPaywallOpen(true)}
                    className="w-full py-2 bg-white text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-50 transition-colors"
                >
                    Upgrade Now
                </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
            <div 
                className="fixed inset-0 bg-black/20 z-20 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
            ></div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-64px)] md:h-screen">
          <div className="max-w-5xl mx-auto h-full">
            
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    {error}
                </div>
            )}

            {!generatedPlan ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
                
                {!isLoading && (
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl opacity-60">
                         {/* Trust indicators/Placeholders */}
                         {['Cafés', 'Real Estate', 'Beauty', 'Fashion'].map((n) => (
                             <div key={n} className="text-center p-4 border border-slate-200 rounded-xl">
                                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Example</span>
                                 <p className="font-medium text-slate-600">{n}</p>
                             </div>
                         ))}
                    </div>
                )}
              </div>
            ) : (
              <PlanDisplay plan={generatedPlan} onReset={resetPlan} />
            )}
          </div>
        </main>
        
        <PaywallModal isOpen={isPaywallOpen} onClose={() => setIsPaywallOpen(false)} />

      </div>
    </Router>
  );
};

export default App;
