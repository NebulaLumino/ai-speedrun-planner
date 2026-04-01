"use client";
import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState<Record<string, string>>({
      "game": "",
      "category": "Any%",
      "goal": "World Record",
      "skillLevel": "Beginner (Learning)",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        game: formData["game"],
        category: formData["category"],
        goal: formData["goal"],
        skillLevel: formData["skillLevel"],
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); return; }
      setResult(data.result);
    } catch { setError("Failed to generate content."); }
    finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-neutral-400 to-neutral-200 bg-clip-text text-transparent">
            ⏱️ AI Speedrun Planner
          </h1>
          <p className="text-slate-400">Plan your speedrun route and time-saves</p>
        </header>

        <form onSubmit={handleGenerate} className="bg-slate-800/60 backdrop-blur rounded-2xl p-6 mb-8 border border-neutral-500/20 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Game</label>
              <input type="text" value={formData["game"]} onChange={e => setFormData({...formData, "game": e.target.value})}
                placeholder="Enter game title..."
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neutral-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Category</label>
              <select value={formData["category"]} onChange={e => setFormData({...formData, "category": e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neutral-500">
                {Array.from({length: 7}).map((_, i) => <option key={i}>{["Any%", "100%", "Glitchless", "All Story", "Low%", "Max%", "Custom"]}[i]</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Goal</label>
              <select value={formData["goal"]} onChange={e => setFormData({...formData, "goal": e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neutral-500">
                {Array.from({length: 4}).map((_, i) => <option key={i}>{["World Record", "Personal Best", "First Sub-X Time", "Any% No SRM"]}[i]</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Skill Level</label>
              <select value={formData["skillLevel"]} onChange={e => setFormData({...formData, "skillLevel": e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neutral-500">
                {Array.from({length: 4}).map((_, i) => <option key={i}>{["Beginner (Learning)", "Intermediate", "Advanced", "Expert"]}[i]</option>)}
              </select>
            </div>          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-neutral-600 to-neutral-500 hover:from-neutral-500 hover:to-neutral-400 rounded-xl font-semibold text-white transition-all disabled:opacity-50">
            {loading ? "Generating..." : "⏱️ Generate"}
          </button>
        </form>

        {error && <div className="bg-red-900/40 border border-red-500/40 rounded-xl p-4 text-red-300 mb-6">{error}</div>}

        {result && (
          <div className="bg-slate-800/60 backdrop-blur rounded-2xl p-6 border border-neutral-500/20">
            <h2 className="text-xl font-bold text-neutral-300 mb-4">Generated Content</h2>
            <div className="whitespace-pre-wrap text-slate-200 leading-relaxed">{result}</div>
          </div>
        )}
      </div>
    </main>
  );
}
