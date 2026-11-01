// Educational Drawer / Modal explaining DW Manager concepts & Interactive Quiz
import React, { useState } from 'react';
import { EDUCATIONAL_CONCEPTS } from '../../data/initialData';
import { EducationalConcept } from '../../types';
import { BookOpen, CheckCircle2, XCircle, HelpCircle, Lightbulb, Award, X } from 'lucide-react';

interface EduInfoModalProps {
  managerId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const EduInfoModal: React.FC<EduInfoModalProps> = ({ managerId, isOpen, onClose }) => {
  const concept: EducationalConcept | undefined = EDUCATIONAL_CONCEPTS[managerId];
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  if (!isOpen || !concept) return null;

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    concept.quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) score++;
    });
    return score;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-blue-500/20 border border-blue-400/30 rounded-xl text-blue-300">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-semibold tracking-wider uppercase text-blue-400">
                  Anna University R2021 Data Warehousing • {concept.category}
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{concept.managerName}</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-3 text-xs text-indigo-200/90 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Syllabus Unit: <strong className="text-white">{concept.annaUnivTopic}</strong></span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-slate-700 text-sm">
          {/* Takeaway Highlight Box */}
          <div className="bg-blue-50/80 border-l-4 border-blue-600 p-4 rounded-r-xl">
            <div className="flex items-start gap-2.5">
              <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-blue-900">One-Line Takeaway</div>
                <p className="text-slate-800 font-medium mt-0.5">{concept.oneLineTakeaway}</p>
              </div>
            </div>
          </div>

          {/* Definition & Purpose Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">What is it? (Definition)</h4>
              <p className="text-slate-800 leading-relaxed">{concept.definition}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Why is it needed? (Purpose)</h4>
              <p className="text-slate-800 leading-relaxed">{concept.purpose}</p>
            </div>
          </div>

          {/* Key Responsibilities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">Key Core Responsibilities</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {concept.keyResponsibilities.map((resp, i) => (
                <div key={i} className="flex items-start gap-2 bg-slate-50/70 p-3 rounded-lg border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="text-xs text-slate-800 font-medium">{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real World Example & Difference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50/70 border border-amber-200/60 p-4 rounded-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">Campus Real-World Scenario</h4>
              <p className="text-xs text-amber-950/90 leading-relaxed">{concept.realWorldExample}</p>
            </div>
            <div className="bg-purple-50/70 border border-purple-200/60 p-4 rounded-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-1">How it differs from related managers</h4>
              <p className="text-xs text-purple-950/90 leading-relaxed">{concept.differenceFromRelated}</p>
            </div>
          </div>

          {/* Interactive Knowledge Check Quiz */}
          <div className="border-t border-slate-200 pt-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">Concept Knowledge Check (2 Questions)</h3>
              </div>
              {showResults && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-full font-semibold text-xs">
                  <Award className="w-4 h-4" />
                  Score: {calculateScore()} / {concept.quizQuestions.length}
                </div>
              )}
            </div>

            <div className="space-y-4">
              {concept.quizQuestions.map((q, qIdx) => (
                <div key={qIdx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="font-semibold text-slate-900 text-sm">
                    {qIdx + 1}. {q.question}
                  </div>
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[qIdx] === optIdx;
                      const isCorrect = optIdx === q.correctIndex;
                      let btnStyle = 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700';

                      if (showResults) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'border-red-500 bg-red-50 text-red-900';
                        }
                      } else if (isSelected) {
                        btnStyle = 'border-blue-600 bg-blue-50 text-blue-900 font-semibold shadow-sm';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={showResults}
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs transition flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {showResults && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                          {showResults && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-600 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                  {showResults && (
                    <div className="p-3 bg-slate-100/90 rounded-lg text-xs text-slate-700 mt-2">
                      <span className="font-bold text-slate-900">Explanation: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              {!showResults ? (
                <button
                  onClick={() => setShowResults(true)}
                  disabled={Object.keys(selectedAnswers).length < concept.quizQuestions.length}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold text-xs shadow transition"
                >
                  Submit & Check Answers
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowResults(false);
                    setSelectedAnswers({});
                  }}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold text-xs transition"
                >
                  Retry Quiz
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">Anna University • CS8791 / R2021 Syllabus Reference</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-sm transition"
          >
            Close Reference
          </button>
        </div>
      </div>
    </div>
  );
};
