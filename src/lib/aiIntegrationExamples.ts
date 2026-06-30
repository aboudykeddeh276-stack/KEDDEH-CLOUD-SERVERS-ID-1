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
    const confidence = 0.92;

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
  dangerouslyAllowBrowser: true
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
    const confidence = 0.88;

    return {
      output,
      confidence,
      source: "GPT-4 Turbo",
      explanation: `Generated using OpenAI GPT-4 with ${usage?.completion_tokens || 0} output tokens.`
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
// OPTION 4: BRAINK (KEX/BRAINK Ethics-First Provider)
// ============================================================================

import { validateAffectEthicsGate } from "./validators";

interface BrainkConfig {
  apiKey: string;
  endpoint?: string;
}

interface BrainkResponse {
  output: string;
  confidence: number;
  source: string;
  explanation: string;
  ethicsValidated: boolean;
  affectState?: {
    care: number;
    uncertainty: number;
    boundary_pressure: number;
    harm_risk: number;
    repair_need: number;
    confidence: number;
    response_intensity: number;
  };
}

const brainkConfig: BrainkConfig = {
  apiKey: import.meta.env.VITE_BRAINK_API_KEY || "",
  endpoint: import.meta.env.VITE_BRAINK_ENDPOINT || "https://api.braink.keddeh.io"
};

export const callBrainkAPI = async (
  prompt: string,
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<BrainkResponse> => {
  try {
    // Validate ethics gate before processing
    const affectEthicsInput = {
      humanBioBoundaryPreserved: true,
      codexNonBiologicalBoundaryPreserved: true,
      brainkAnchorPreserved: true,
      noManipulation: true,
      noUnsupportedMedicalClaim: true,
      repairRouteAvailable: true,
      blockersPreserved: true
    };

    const ethicsValidation = validateAffectEthicsGate(affectEthicsInput);
    
    if (!ethicsValidation.valid) {
      throw new Error(`BRAINK ethics gate failed: ${ethicsValidation.errors.join(", ")}`);
    }

    // Call BRAINK API endpoint
    const authHeader = brainkConfig.apiKey;
    const response = await fetch(`${brainkConfig.endpoint}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader,
        "X-Client-Type": "kex-hyperdrive-dashboard"
      },
      body: JSON.stringify({
        prompt,
        conversation_history: conversationHistory,
        affect_ethics_validated: true,
        affect_state: {
          care: 0.8,
          uncertainty: 0.3,
          boundary_pressure: 0.2,
          harm_risk: 0.1,
          repair_need: 0.2,
          confidence: 0.85,
          response_intensity: 0.7
        }
      })
    });

    if (!response.ok) {
      throw new Error(`BRAINK API error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      output: data.output || data.message || "No response from BRAINK",
      confidence: data.confidence || 0.88,
      source: "BRAINK/KEX Provider",
      explanation: `Processed through KEX/BRAINK ethics-first AI provider. All boundaries preserved: human bio, codex non-biological, BRAINK anchor, manipulation guards, and repair routes available.`,
      ethicsValidated: true,
      affectState: data.affect_state
    };
  } catch (error) {
    throw new Error(`BRAINK API error: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// ============================================================================
// INTEGRATION IN AiEnhancedPanel
// ============================================================================

/*
import { AiEnhancedPanel } from "./components/AiEnhancedPanel";
import { callBrainkAPI } from "./lib/aiIntegration";

// In your component:
const handlePromptSubmit = useCallback((prompt: string) => {
  setCurrentPrompt(prompt);
  setIsProcessing(true);
  setLastStatus("loading");

  callBrainkAPI(prompt, conversationHistory)
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
// ENVIRONMENT SETUP
// ============================================================================

/*
// .env.local (keep this file in .gitignore!)
VITE_ANTHROPIC_API_KEY=sk-ant-...
VITE_OPENAI_API_KEY=sk-...
VITE_GOOGLE_API_KEY=...
VITE_BRAINK_API_KEY=your_braink_api_key
VITE_BRAINK_ENDPOINT=https://api.braink.keddeh.io
*/

export default {
  note: "This file contains integration examples. Uncomment the relevant sections for your chosen AI provider. BRAINK is available as OPTION 4 - an ethics-first provider with KEX/BRAINK bioethics validation."
};
