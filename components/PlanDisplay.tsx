import React, { useState } from 'react';
import { GeneratedPlan, ContentDay } from '../types';
import { Calendar, Download, Share2, Copy, CheckCircle, ChevronLeft } from 'lucide-react';
import { jsPDF } from "jspdf";

interface PlanDisplayProps {
  plan: GeneratedPlan;
  onReset: () => void;
}

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, onReset }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const selectedDay = plan.schedule[selectedDayIndex];

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;

    doc.setFontSize(20);
    doc.text(`Content Plan: ${plan.weekGoal}`, 10, yPos);
    yPos += 15;

    plan.schedule.forEach((day, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(14);
      doc.text(`${day.day}: ${day.theme}`, 10, yPos);
      yPos += 7;
      
      doc.setFontSize(10);
      doc.text(`Idea: ${day.contentIdea}`, 10, yPos);
      yPos += 7;
      
      const captionPreview = day.captionEnglish.length > 80 ? day.captionEnglish.substring(0, 80) + "..." : day.captionEnglish;
      doc.text(`Caption (EN): ${captionPreview}`, 10, yPos);
      yPos += 15;
    });

    doc.save("social-media-plan.pdf");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast here
    alert("Copied to clipboard!");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 font-medium transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          New Plan
        </button>
        <div className="flex gap-2">
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </div>

      {/* Week Goal */}
      <div className="bg-indigo-900/20 border border-indigo-500/20 p-4 rounded-xl mb-6">
        <h3 className="text-indigo-400 text-sm font-bold uppercase tracking-wider mb-1">Weekly Goal</h3>
        <p className="text-indigo-100 font-medium">{plan.weekGoal}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - Days List */}
        <div className="lg:w-1/3 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-3 pb-2 lg:pb-0 no-scrollbar">
          {plan.schedule.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDayIndex(index)}
              className={`flex-shrink-0 lg:w-full text-left p-4 rounded-xl border transition-all ${
                selectedDayIndex === index
                  ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-black/20 ring-1 ring-indigo-500'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  selectedDayIndex === index ? 'text-indigo-400' : 'text-slate-500'
                }`}>
                  {day.day}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedDayIndex === index ? 'bg-indigo-950 text-indigo-300' : 'bg-slate-800 text-slate-500'
                }`}>{day.postType}</span>
              </div>
              <h4 className={`font-semibold truncate ${
                selectedDayIndex === index ? 'text-white' : 'text-slate-400'
              }`}>{day.theme}</h4>
            </button>
          ))}
        </div>

        {/* Main Content - Detailed View */}
        <div className="lg:w-2/3 bg-slate-900 rounded-2xl shadow-xl shadow-black/30 border border-slate-800 overflow-hidden flex flex-col">
          {/* Detailed Header */}
          <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-indigo-900 to-purple-900 text-white relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
                <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 opacity-80 mb-2 text-indigo-100">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{selectedDay.day} • Best Time: {selectedDay.bestTime}</span>
                    </div>
                    <h2 className="text-2xl font-bold">{selectedDay.theme}</h2>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium border border-white/10">
                    {selectedDay.postType}
                </div>
                </div>
                <p className="mt-4 text-white/90 leading-relaxed text-sm lg:text-base bg-white/5 p-3 rounded-lg border border-white/10">
                💡 <span className="font-semibold text-indigo-200">Idea:</span> {selectedDay.contentIdea}
                </p>
            </div>
          </div>

          {/* Captions Section */}
          <div className="p-6 flex-1 overflow-y-auto bg-slate-900">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* English Caption */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-slate-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    English Caption
                  </h4>
                  <button 
                    onClick={() => copyToClipboard(selectedDay.captionEnglish)}
                    className="text-slate-500 hover:text-blue-400 p-1 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 text-sm whitespace-pre-wrap leading-relaxed shadow-inner">
                  {selectedDay.captionEnglish}
                </div>
              </div>

              {/* Arabic Caption */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-slate-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Arabic Caption
                  </h4>
                  <button 
                     onClick={() => copyToClipboard(selectedDay.captionArabic)}
                     className="text-slate-500 hover:text-green-400 p-1 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 text-sm whitespace-pre-wrap leading-relaxed text-right font-sans shadow-inner" dir="rtl">
                  {selectedDay.captionArabic}
                </div>
              </div>
            </div>

            {/* Hashtags */}
            <div className="mt-8">
              <h4 className="font-semibold text-slate-200 mb-3 flex items-center gap-2">
                <span className="text-indigo-400">#</span> Hashtags
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedDay.hashtags.map((tag, i) => (
                  <span key={i} className="bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full text-xs font-medium border border-indigo-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-between items-center">
             <span className="text-xs text-slate-500">Generated by SocialGenius AI</span>
             <button className="text-indigo-400 text-sm font-medium hover:text-indigo-300 flex items-center gap-1 transition-colors">
                Post to Instagram <Share2 className="w-3 h-3" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDisplay;