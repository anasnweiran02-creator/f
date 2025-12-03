import React, { useState } from 'react';
import { BusinessType, UserPreferences } from '../types';
import { Store, MapPin, Users, Hash, Briefcase, Sparkles } from 'lucide-react';

interface InputFormProps {
  onSubmit: (prefs: UserPreferences) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserPreferences>({
    businessName: '',
    businessType: BusinessType.CAFE,
    niche: '',
    location: '',
    targetAudience: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-900 rounded-2xl shadow-2xl shadow-black/50 p-6 md:p-8 border border-slate-800">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">Create Your Content Plan</h2>
        <p className="text-slate-400 mt-2">Tell us about your business to get started.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Business Name</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              name="businessName"
              required
              placeholder="e.g., The Daily Grind"
              className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              value={formData.businessName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Business Type */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Business Type</label>
          <div className="relative">
            <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <select
              name="businessType"
              required
              className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none appearance-none"
              value={formData.businessType}
              onChange={handleChange}
            >
              {Object.values(BusinessType).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Niche */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Niche / Specialty</label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              name="niche"
              required
              placeholder="e.g., Specialty Coffee, Vintage Clothing"
              className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              value={formData.niche}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">City / Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              name="location"
              required
              placeholder="e.g., Dubai Downtown, Brooklyn NY"
              className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Audience */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Target Audience</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              name="targetAudience"
              required
              placeholder="e.g., University students, Young professionals"
              className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              value={formData.targetAudience}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 mt-4 rounded-xl text-white font-semibold shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] ${
            isLoading 
            ? 'bg-indigo-900 cursor-not-allowed text-indigo-200' 
            : 'bg-indigo-600 hover:bg-indigo-500'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Magic...
            </span>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Weekly Plan
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;