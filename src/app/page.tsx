"use client";

import { useState } from "react";

type FormData = {
  gameName: "",
  category: "Any%",
  currentPB: "",
  targetTime: "",
  techniques: "Glitches and exploits",
  platform: "PC"
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
  gameName: "",
  category: "Any%",
  currentPB: "",
  targetTime: "",
  techniques: "Glitches and exploits",
  platform: "PC"
});
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, systemPrompt: "Generate a comprehensive speedrun plan including: route breakdown by game section, time estimate per section, key time-save tricks per section, practice priority ranking (what to drill first), setup and tool-assisted study recommendations, community resources and Discord servers, individual milestone targets leading to goal time, and mental game and focus techniques." }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setResult(data.result || "");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-8">
          <h1 className={"text-3xl font-bold bg-gradient-to-r from-neutral-500 to-stone-600 bg-clip-text text-transparent"}>
            "AI Speedrun Route Optimizer & Game Mastery Planner"
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">Fill in the options below and generate your game content instantly.</p>
        </header>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
              <div className="space-y-4">
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Game Name</label><input type="text" name="gameName" value={formData.gameName} onChange={handleChange} placeholder="e.g. Super Metroid, Celeste, Elden Ring" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 text-zinc-200" /></div>
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Speedrun Category</label><select name="category" value={formData.category} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 text-zinc-200">{['Any%','100%','Glitchless','All Collectibles','Custom / Other'].map(o=><option key={o} value={o}>{o}</option>)}</select></div>
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Current Personal Best</label><input type="text" name="currentPB" value={formData.currentPB} onChange={handleChange} placeholder="e.g. 42:30, 1h 15m" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 text-zinc-200" /></div>
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Target Time</label><input type="text" name="targetTime" value={formData.targetTime} onChange={handleChange} placeholder="e.g. 38:00" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 text-zinc-200" /></div>
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Techniques to Employ</label><select name="techniques" value={formData.techniques} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 text-zinc-200">{['Glitches and exploits','Optimized routes','Movement tech','All of the above','Not sure yet'].map(o=><option key={o} value={o}>{o}</option>)}</select></div>
<div><label className="block text-sm font-medium text-zinc-300 mb-1.5">Platform</label><select name="platform" value={formData.platform} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 text-zinc-200">{['PC','Console (current gen)','Console (retro)','Emulator'].map(o=><option key={o} value={o}>{o}</option>)}</select></div>
              </div>
              <button
                type="submit"
                disabled={isGenerating}
                className={"w-full bg-neutral-600 hover:opacity-90 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-all text-sm"}
              >
                {isGenerating ? "Generating..." : "Generate Content"}
              </button>
              {error && (
                <p className="text-red-400 text-sm bg-red-500/10 rounded-lg p-2">{error}</p>
              )}
            </form>
          </div>

          <div className="lg:col-span-3">
            {result ? (
              <div className={"bg-neutral-500/10 border border-zinc-800 rounded-2xl p-5"}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={"font-semibold text-neutral-400"}>Generated Result</h2>
                  <button
                    onClick={() => navigator.clipboard.writeText(result)}
                    className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1 rounded bg-zinc-800"
                  >
                    Copy
                  </button>
                </div>
                <div className="prose prose-invert prose-sm max-w-none text-zinc-300 whitespace-pre-wrap leading-relaxed">
                  {result}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-600 border-2 border-dashed border-zinc-800 rounded-2xl p-12 min-h-96">
                <span className="text-4xl mb-4">&#127918;</span>
                <p className="text-center text-sm">Your generated game content will appear here.</p>
                <p className="text-center text-xs text-zinc-700 mt-2">Fill out the form and click Generate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
