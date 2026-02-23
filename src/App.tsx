/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  BookOpen, 
  Trophy,
  AlertCircle,
  Info,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { QUESTION_BANK, Question, Difficulty, GrammarPoint } from './types';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(QUESTION_BANK.length).fill(null));

  const currentQuestion = QUESTION_BANK[currentIndex];
  const progress = ((currentIndex + 1) / QUESTION_BANK.length) * 100;

  const handleSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedAnswer;
    setAnswers(newAnswers);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < QUESTION_BANK.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResult(false);
    setAnswers(new Array(QUESTION_BANK.length).fill(null));
  };

  const getEncouragement = (score: number) => {
    const ratio = score / QUESTION_BANK.length;
    if (ratio === 1) return "太棒了！你是语法大师！";
    if (ratio >= 0.8) return "非常出色！继续保持。";
    if (ratio >= 0.6) return "做得不错，再接再厉！";
    return "加油！多练习一定会进步。";
  };

  // Helper to render sentence with blank
  const renderSentence = (sentence: string, currentSelection: string | null) => {
    const parts = sentence.split('______');
    return (
      <div className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-800 tracking-tight">
        {parts[0]}
        <span className={`inline-block min-w-[120px] border-b-2 mx-2 text-center transition-all duration-300 ${
          isSubmitted 
            ? selectedAnswer === currentQuestion.correctAnswer 
              ? 'border-emerald-500 text-emerald-600' 
              : 'border-rose-500 text-rose-600'
            : 'border-indigo-400 text-indigo-600'
        }`}>
          {currentSelection || '______'}
        </span>
        {parts[1]}
      </div>
    );
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border border-slate-100"
        >
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center">
              <Trophy className="w-12 h-12 text-indigo-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">测试完成</h2>
          <p className="text-slate-500 mb-8">{getEncouragement(score)}</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 mb-8">
            <div className="text-5xl font-black text-indigo-600 mb-2">
              {score} <span className="text-2xl text-slate-400">/ {QUESTION_BANK.length}</span>
            </div>
            <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">最终得分</div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={resetQuiz}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
            >
              <RotateCcw className="w-5 h-5" />
              重新开始
            </button>
            <div className="pt-4">
              <p className="text-xs text-slate-400 mb-2">推荐复习内容</p>
              <div className="flex flex-wrap justify-center gap-2">
                <a href="#" className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" /> 非谓语动词详解
                </a>
                <a href="#" className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" /> 定语从句全攻略
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">GrammarMaster</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">初中英语语法专项</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</span>
              <span className="text-sm font-mono font-bold text-slate-700">{currentIndex + 1} / {QUESTION_BANK.length}</span>
            </div>
            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Question Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600" />
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  currentQuestion.difficulty === Difficulty.Beginner ? 'bg-emerald-50 text-emerald-600' :
                  currentQuestion.difficulty === Difficulty.Intermediate ? 'bg-amber-50 text-amber-600' :
                  'bg-rose-50 text-rose-600'
                }`}>
                  {currentQuestion.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                  {currentQuestion.category}
                </span>
              </div>

              {renderSentence(currentQuestion.sentence, selectedAnswer)}
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = isSubmitted && option === currentQuestion.correctAnswer;
                const isWrong = isSubmitted && isSelected && option !== currentQuestion.correctAnswer;

                return (
                  <button
                    key={option}
                    disabled={isSubmitted}
                    onClick={() => handleSelect(option)}
                    className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-200 active:scale-95 ${
                      isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-700' :
                      isWrong ? 'bg-rose-50 border-rose-500 text-rose-700' :
                      isSelected ? 'bg-indigo-50 border-indigo-500 text-indigo-700' :
                      'bg-white border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold">{option}</span>
                      {isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                      {isWrong && <XCircle className="w-6 h-6 text-rose-500" />}
                      {!isSubmitted && isSelected && <div className="w-3 h-3 rounded-full bg-indigo-500" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="flex justify-center pt-4">
              {!isSubmitted ? (
                <button
                  disabled={!selectedAnswer}
                  onClick={handleSubmit}
                  className={`px-12 py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                    selectedAnswer 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  提交答案
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-12 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center gap-2 shadow-xl"
                >
                  {currentIndex === QUESTION_BANK.length - 1 ? '查看结果' : '下一题'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Explanation Card */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  <div className={`p-4 flex items-center gap-2 ${
                    selectedAnswer === currentQuestion.correctAnswer ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {selectedAnswer === currentQuestion.correctAnswer ? (
                      <><CheckCircle2 className="w-5 h-5" /> <span className="font-bold">回答正确！</span></>
                    ) : (
                      <><AlertCircle className="w-5 h-5" /> <span className="font-bold">回答错误，正确答案是：{currentQuestion.correctAnswer}</span></>
                    )}
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div>
                      <h4 className="flex items-center gap-2 text-indigo-600 font-bold mb-3">
                        <BookOpen className="w-5 h-5" /> 语法详解
                      </h4>
                      <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                        {currentQuestion.explanation.rule}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Info className="w-4 h-4" /> 典型例句
                        </h5>
                        <p className="text-slate-800 font-medium italic">
                          "{currentQuestion.explanation.example}"
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-sm font-bold text-rose-400 uppercase tracking-widest flex items-center gap-2">
                          <XCircle className="w-4 h-4" /> 常见误区
                        </h5>
                        <p className="text-slate-600 text-sm">
                          {currentQuestion.explanation.commonMistake}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Decoration */}
      <footer className="max-w-4xl mx-auto p-8 text-center text-slate-400 text-sm">
        <p>© 2024 GrammarMaster - 助力每一位初中生掌握地道英语句法</p>
      </footer>
    </div>
  );
}
