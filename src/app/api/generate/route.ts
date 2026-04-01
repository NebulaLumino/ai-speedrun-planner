import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { game, category, goal, skillLevel } = await req.json();
    const prompt = `You are a speedrun strategist. Create a speedrun plan:
- **Game:** ${game}
- **Category:** ${category}
- **Goal:** ${goal}
- **Skill Level:** ${skillLevel}

Include: 1) Route Overview & Key Skips, 2) Major Time-Saves & Tricks (with difficulty rating), 3) Wrong Warp / Sequence Break Opportunities, 4) RNG Management, 5) Checkpoint Times, 6) Killdozer / Wrong Warp Details if applicable, 7) Practice Priorities.`;
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "deepseek-chat", messages: [
        { role: "system", content: "You are a speedrun strategist and world-record holder knowledge base." },
        { role: "user", content: prompt }
      ], temperature: 0.8, max_tokens: 2000 }),
    });
    if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: response.status });
    const data = await response.json();
    return NextResponse.json({ result: data.choices?.[0]?.message?.content || "No response." });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}
