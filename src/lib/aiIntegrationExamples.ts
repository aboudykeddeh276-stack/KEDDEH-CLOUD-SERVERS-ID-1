/**
 * AI API Integration Examples
 * 
 * This file shows how to wire the UI components to real AI APIs.
 * Choose your preferred provider and follow the steps below.
 */

// ============================================================================
// OPTION 1: ANTHROPIC CLAUDE (Recommended for RAG & coding)
// ============================================================================

/*
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY
});

export const callClaudeAPI = async (
  prompt: string,
  conversationHistory: Array<{ role: string; content: string }> = []
) => {
  try {
    // Build message history for context
    const messages = [
      ...conversationHistory,
      { role: "user", content: prompt }
    ];

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: `You are a helpful AI assistant integrated into a dashboard application.
               Always be clear, concise, and provide actionable insights.
               If you're unsure about something, say so.`,
      messages: messages as any
    });

    const output = response.content[0].type === "text" ? response.content[0].text : "";
    const confidence = 0.92; // Claude doesn't provide explicit confidence, use API response

    return {
      output,
      confidence,
      source: "Claude 3.5 Sonnet",
      explanation: `Processed using Anthropic's Claude model with ${response.usage.output_tokens} output tokens.`
    };
  } catch (error) {
    throw new Error(`Claude API error: ${error.message}`);
  }
};
*/

// ============================================================================
// OPTION 2: OPENAI GPT-4 (Best for general purposes)
// ============================================================================

/*
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Use backend proxy in production!
});

export const callGPT4API = async (
  prompt: string,
  conversationHistory: Array<{ role: string; content: string }> = []
) => {
  try {
    const messages = [
      ...conversationHistory,
      { role: "user", content: prompt }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: messages as any,
      max_tokens: 1024,
      temperature: 0.7,
    });

    const output = completion.choices[0].message.content || "";
    const usage = completion.usage;
    const confidence = 0.88; // Varies by task

    return {
      output,
      confidence,
      source: "GPT-4 Turbo",
      explanation: `Generated using OpenAI GPT-4 with ${usage?.completion_tokens || 0} output tokens. Temperature: 0.7 (balanced creativity).`
    };
  } catch (error) {
    throw new Error(`OpenAI API error: ${error.message}`);
  }
};
*/

// ============================================================================
// OPTION 3: GOOGLE GEMINI (Best for multimodal)
// ============================================================================

/*
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

export const callGeminiAPI = async (
  prompt: string,
  conversationHistory: Array<{ role: string; content: string }> = []
) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: conversationHistory.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      }))
    });

    const result = await chat.sendMessage(prompt);
    const output = result.response.text();
    const confidence = 0.85;

    return {
      output,
      confidence,
      source: "Google Gemini Pro",
      explanation: `Generated using Google's Gemini Pro model with multimodal capabilities.`
    };
  } catch (error) {
    throw new Error(`Gemini API error: ${error.message}`);
  }
};
*/

// ============================================================================
// INTEGRATION IN AiEnhancedPanel
// ============================================================================

/*
import { AiEnhancedPanel } from "./components/AiEnhancedPanel";
import { callClaudeAPI } from "./lib/aiIntegration"; // or your chosen provider

// In your component:
const handlePromptSubmit = useCallback((prompt: string) => {
  setCurrentPrompt(prompt);
  setIsProcessing(true);
  setLastStatus("loading");

  callClaudeAPI(prompt, conversationHistory)
    .then((result) => {
      const newResult = {
        id: `result-${Date.now()}`,
        prompt,
        output: result.output,
        confidence: result.confidence,
        timestamp: new Date().toLocaleTimeString()
      };

      setAiResults((prev) => [newResult, ...prev]);
      setConversationHistory((prev) => [
        ...prev,
        { role: "user", content: prompt },
        { role: "assistant", content: result.output }
      ]);

      setIsProcessing(false);
      setLastStatus("success");
      setTimeout(() => setLastStatus("idle"), 3000);
    })
    .catch((error) => {
      console.error("AI Error:", error);
      setIsProcessing(false);
      setLastStatus("error");
      setTimeout(() => setLastStatus("idle"), 5000);
    });
}, [conversationHistory]);
*/

// ============================================================================
// BACKEND PROXY PATTERN (RECOMMENDED FOR PRODUCTION)
// ============================================================================

/*
// Frontend call (safe, no API keys exposed)
export const callAiAPI = async (prompt: string) => {
  const response = await fetch("/api/ai/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
};

// Backend implementation (Express.js example)
app.post("/api/ai/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    // API key stored securely on backend
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });

    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }]
    });

    const output = message.content[0].type === "text" ? message.content[0].text : "";

    res.json({
      output,
      confidence: 0.92,
      source: "Claude 3.5 Sonnet",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
*/

// ============================================================================
// ENVIRONMENT SETUP
// ============================================================================

/*
// .env.local (keep this file in .gitignore!)
VITE_ANTHROPIC_API_KEY=sk-ant-...
VITE_OPENAI_API_KEY=sk-...
VITE_GOOGLE_API_KEY=...

// .env.example (safe to commit)
VITE_ANTHROPIC_API_KEY=your_key_here
VITE_OPENAI_API_KEY=your_key_here
VITE_GOOGLE_API_KEY=your_key_here
*/

// ============================================================================
// RATE LIMITING & ERROR HANDLING
// ============================================================================

/*
class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  async checkLimit(): Promise<boolean> {
    const now = Date.now();
    this.requests = this.requests.filter((time) => now - time < this.windowMs);

    if (this.requests.length >= this.maxRequests) {
      return false;
    }

    this.requests.push(now);
    return true;
  }
}

const rateLimiter = new RateLimiter(100, 60000); // 100 requests per minute

// In your handler:
if (!(await rateLimiter.checkLimit())) {
  setLastStatus("error");
  return; // Show "Rate limit exceeded" message
}

// Specific error handling:
try {
  const result = await callAiAPI(prompt);
  // Success handling
} catch (error: any) {
  if (error.message.includes("401")) {
    setLastStatus("error");
    console.error("Invalid API key");
  } else if (error.message.includes("429")) {
    console.warn("Rate limited, retrying in 30s");
    await new Promise((r) => setTimeout(r, 30000));
    // Retry logic
  } else if (error.message.includes("500")) {
    console.error("AI service unavailable");
  }
}
*/

// ============================================================================
// CONVERSATION PERSISTENCE
// ============================================================================

/*
// Save to localStorage (simple, client-side)
const saveConversation = (conversation: any) => {
  const existing = JSON.parse(localStorage.getItem("ai_conversations") || "[]");
  existing.push({
    id: Date.now(),
    timestamp: new Date().toISOString(),
    messages: conversation
  });
  localStorage.setItem("ai_conversations", JSON.stringify(existing));
};

const loadConversations = () => {
  return JSON.parse(localStorage.getItem("ai_conversations") || "[]");
};

// Save to backend database (production)
const saveConversationToDB = async (messages: any[]) => {
  const response = await fetch("/api/conversations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages,
      user_id: currentUser.id,
      timestamp: new Date().toISOString()
    })
  });

  if (!response.ok) {
    throw new Error("Failed to save conversation");
  }

  return response.json();
};
*/

// ============================================================================
// USAGE TRACKING & COST MONITORING
// ============================================================================

/*
interface UsageMetrics {
  totalTokens: number;
  totalCost: number;
  requestCount: number;
  lastReset: string;
}

const COST_PER_1K_TOKENS = 0.015; // Claude pricing example
const MAX_MONTHLY_TOKENS = 1000000;

const updateUsageMetrics = (tokens: number) => {
  const metrics: UsageMetrics = JSON.parse(
    localStorage.getItem("usage_metrics") || 
    '{"totalTokens":0,"totalCost":0,"requestCount":0,"lastReset":"2026-06-01"}'
  );

  metrics.totalTokens += tokens;
  metrics.totalCost += (tokens / 1000) * COST_PER_1K_TOKENS;
  metrics.requestCount += 1;

  // Reset monthly
  const lastReset = new Date(metrics.lastReset);
  if (lastReset.getMonth() !== new Date().getMonth()) {
    metrics.totalTokens = tokens;
    metrics.totalCost = (tokens / 1000) * COST_PER_1K_TOKENS;
    metrics.requestCount = 1;
    metrics.lastReset = new Date().toISOString();
  }

  localStorage.setItem("usage_metrics", JSON.stringify(metrics));

  // Check limits
  if (metrics.totalTokens > MAX_MONTHLY_TOKENS) {
    console.warn("⚠️ Monthly token limit exceeded!");
    return false;
  }

  return true;
};

// Display usage in dashboard
<div className="usage-widget">
  <p>Monthly Usage: {metrics.totalTokens.toLocaleString()} tokens</p>
  <p>Estimated Cost: ${metrics.totalCost.toFixed(2)}</p>
  <p>Requests: {metrics.requestCount}</p>
  <div className="usage-bar">
    <div 
      className="usage-fill" 
      style={{ width: `${(metrics.totalTokens / MAX_MONTHLY_TOKENS) * 100}%` }}
    />
  </div>
</div>
*/

// ============================================================================
// STREAM RESPONSES FOR REAL-TIME UPDATES
// ============================================================================

/*
export const streamAiResponse = async (
  prompt: string,
  onChunk: (chunk: string) => void
) => {
  const response = await fetch("/api/ai/stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) throw new Error("Stream failed");

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No reader available");

  const decoder = new TextDecoder();
  let result = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      result += chunk;
      onChunk(chunk); // Update UI in real-time
    }
  } finally {
    reader.releaseLock();
  }

  return result;
};

// Usage in component:
const [streamedOutput, setStreamedOutput] = useState("");
await streamAiResponse(prompt, (chunk) => {
  setStreamedOutput((prev) => prev + chunk);
});
*/

export default {
  note: "This file contains integration examples. Uncomment the relevant sections for your chosen AI provider."
};
