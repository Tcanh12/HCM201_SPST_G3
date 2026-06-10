import React, { useState } from 'react';
import { Target, BookOpen, Brain, Lightbulb, Activity, CheckCircle, Flag, ChevronDown, ChevronUp } from 'lucide-react';

export default function LessonDetailView({ lesson }) {
  const [activeAccordion, setActiveAccordion] = useState('beginner');

  return (
    <div className="space-y-12">
      {/* 1. Header is already rendered partially by parent, but we can add Lesson specific meta */}
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Độ khó: {lesson.difficulty}</span>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Thời lượng: {lesson.durationMinutes} phút</span>
        {lesson.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">#{tag}</span>
        ))}
      </div>

      {/* 2. Learning Objectives */}
      <div className="bg-white border-l-4 border-[#F59E0B] p-6 rounded-r-2xl shadow-sm">
        <div className="flex items-start gap-3">
          <Target className="w-6 h-6 text-[#F59E0B] flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-[#1F2937] mb-3">Mục tiêu học tập</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {lesson.learningObjectives.map((obj, i) => <li key={i}>{obj}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Quick Overview */}
      <div className="bg-[#F8FAFC] border border-gray-200 p-6 rounded-2xl">
        <h4 className="font-bold text-[#1F2937] mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" /> Tổng quan nhanh
        </h4>
        <p className="text-gray-700 leading-relaxed">{lesson.quickOverview}</p>
      </div>

      {/* 4. Core Theory */}
      <div>
        <h3 className="text-2xl font-bold text-[#1F2937] mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
          <BookOpen className="w-6 h-6 text-[#B91C1C]" /> Lý thuyết cốt lõi
        </h3>
        <div className="space-y-4">
          {['beginner', 'intermediate', 'advanced'].map((level) => (
            <div key={level} className="border border-gray-200 rounded-xl bg-white overflow-hidden">
              <button 
                onClick={() => setActiveAccordion(activeAccordion === level ? null : level)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 font-bold capitalize text-gray-800"
              >
                Mức độ: {level}
                {activeAccordion === level ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {activeAccordion === level && (
                <div className="p-6 text-gray-700 whitespace-pre-wrap leading-relaxed border-t border-gray-200">
                  {lesson.coreTheory[level]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. Concept Breakdown */}
      <div>
        <h3 className="text-2xl font-bold text-[#1F2937] mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
          <Brain className="w-6 h-6 text-[#B91C1C]" /> Phân tích Khái niệm
        </h3>
        <div className="grid gap-6">
          {lesson.conceptBreakdown.map((concept, i) => (
            <div key={i} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-lg text-[#1E3A8A] mb-4 border-b pb-2">Khái niệm: {concept.conceptId}</h4>
              <div className="space-y-3 text-sm">
                <p><strong className="text-gray-800">Định nghĩa:</strong> {concept.definition}</p>
                <p><strong className="text-gray-800">Giải thích:</strong> {concept.explanation}</p>
                <p><strong className="text-gray-800">Tầm quan trọng:</strong> {concept.importance}</p>
                <p><strong className="text-gray-800">Ví dụ:</strong> {concept.examples}</p>
                <p><strong className="text-gray-800">Ứng dụng:</strong> {concept.applications}</p>
                <div className="bg-red-50 p-3 rounded-lg border border-red-100 mt-2">
                  <strong className="text-red-800 block mb-1">Các lỗi thường gặp:</strong>
                  <ul className="list-disc list-inside text-red-700">
                    {concept.commonMistakes.map((err, j) => <li key={j}>{err}</li>)}
                  </ul>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 mt-2">
                  <strong className="text-yellow-800 block mb-1">Mẹo ghi nhớ:</strong>
                  <p className="text-yellow-700">{concept.memoryTips}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Visual Learning Placeholder */}
      <div>
        <h3 className="text-2xl font-bold text-[#1F2937] mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
          <Activity className="w-6 h-6 text-[#B91C1C]" /> Sơ đồ tư duy & Hình ảnh
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {lesson.visualLearning.map((vl, i) => (
            <div key={i} className="bg-[#F8FAFC] border border-gray-200 p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                {vl.type}
              </div>
              <h5 className="font-bold text-[#1F2937] mb-2">{vl.title}</h5>
              <p className="text-sm text-gray-500">{vl.purpose}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Key Takeaways */}
      <div className="bg-[#1E3A8A] p-8 rounded-3xl text-white shadow-lg">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Flag className="w-6 h-6 text-yellow-400" /> Bài học rút ra (Key Takeaways)
        </h3>
        <ul className="space-y-3">
          {lesson.keyTakeaways.map((takeaway, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <span className="text-white/90 leading-relaxed">{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
