"use client"; // 이 줄이 있어야 브라우저에서 클릭/입력이 작동함.

import { useState } from "react";

type Tool = {
  id: number;
  name: string;
  summary_ko: string;
  category: string;
  analysis_score: number;
  thumbnail_url: string;
  visit_url: string;
};

export default function ToolList({ initialTools }: { initialTools: Tool[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 검색어와 카테고리에 따라 데이터 필터링
  const filteredTools = initialTools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (tool.summary_ko && tool.summary_ko.includes(searchTerm));
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "생산성", "마케팅", "개발도구", "디자인", "비디오", "기타"];

  return (
    <>
      {/* 검색 및 필터 섹션 */}
      <div className="max-w-2xl mx-auto mb-12 space-y-4">
        <input 
          type="text" 
          placeholder="원하는 AI 도구를 검색해보세요 (예: 비디오, 번역...)" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-4 rounded-full border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
        
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat 
                  ? "bg-blue-600 text-white" 
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 결과 리스트 섹션 */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div key={tool.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {tool.thumbnail_url ? (
                  <img src={tool.thumbnail_url} alt={tool.name} className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center text-slate-400">?</div>
                )}
                <div>
                  <h3 className="font-bold text-lg text-slate-900 leading-tight">{tool.name}</h3>
                  <div className="flex text-yellow-400 text-sm mt-0.5">
                    {'★'.repeat(Math.round(tool.analysis_score / 2))}
                    <span className="text-slate-400 ml-1 text-xs">({tool.analysis_score})</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">
              {tool.summary_ko || "분석 중..."}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <span className="bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium">
                {tool.category}
              </span>
              <a 
                href={tool.visit_url} 
                target="_blank" 
                rel="noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors"
              >
                View
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {filteredTools.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          검색 결과가 없습니다. 😅
        </div>
      )}
    </>
  );
}