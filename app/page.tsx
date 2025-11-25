import { supabase } from "@/utils/supabase";
import ToolList from "@/components/ToolList"; // 방금 만든 컴포넌트 불러오기

export const revalidate = 0; // 페이지에 들어올 때마다 최신 데이터 확인 (새로고침 시 반영)

async function getAiTools() {
  const { data, error } = await supabase
    .from("ai_tools")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tools:", error);
    return [];
  }
  return data;
}

export default async function Home() {
  const tools = await getAiTools();

  return (
    <main className="min-h-screen bg-slate-50 p-8 font-sans">
      <section className="max-w-6xl mx-auto text-center pt-12 pb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          AI Tools <span className="text-blue-600">Collector</span>
        </h1>
        <p className="text-slate-600 text-lg mb-8">
          매일 자동으로 수집되는 최신 AI 서비스들을 확인하세요.
        </p>
        
        {/* 검색과 리스트 기능은 여기서 처리 */}
        <ToolList initialTools={tools || []} />
      </section>
    </main>
  );
}