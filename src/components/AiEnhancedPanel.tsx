/**
 * AI Enhancement Panel Component
 * Demonstrates modern AI-augmented interface patterns with accessibility
 * Research-backed from:
 * - Conversational UX patterns
 * - Human-in-the-loop design
 * - WCAG 2.1 accessibility guidelines
 * - AI transparency & explainability
 */

import React, { useState, useCallback } from "react";
import {
  Button,
  PromptBuilder,
  AiOutputCard,
  AiFeedbackControls,
  SettingsPanel,
  LoadingState,
  StatusIndicator
} from "./UIKit";
import { X } from "lucide-react";

interface AiEnhancedPanelProps {
  title?: string;
  note?: string;
  span?: string;
}

export const AiEnhancedPanel: React.FC<AiEnhancedPanelProps> = ({
  title = "AI Assistant",
  note = "Conversational interface with human-in-the-loop feedback",
  span = "span12"
}) => {
  // State Management
  const [showSettings, setShowSettings] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [aiResults, setAiResults] = useState<Array<{
    id: string;
    prompt: string;
    output: string;
    confidence: number;
    timestamp: string;
  }>>([]);
  const [theme, setTheme] = useState<"dark" | "light" | "auto">("dark");
  const [contrast, setContrast] = useState<"normal" | "high">("normal");
  const [textSize, setTextSize] = useState<"small" | "normal" | "large">("normal");
  const [lastStatus, setLastStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Simulate AI processing
  const handlePromptSubmit = useCallback((prompt: string) => {
    setCurrentPrompt(prompt);
    setIsProcessing(true);
    setLastStatus("loading");

    // Simulate API call
    setTimeout(() => {
      const mockConfidence = 0.85 + Math.random() * 0.1;
      const mockOutput = `[AI Processing] Analyzing: "${prompt}"\n\nKey findings:\n• Pattern recognized: ${prompt.includes("summarize") ? "content summary" : "data analysis"}\n• Confidence level: ${(mockConfidence * 100).toFixed(0)}%\n• Processing time: 284ms\n• Data source: Local knowledge base\n\nThis is a simulated response. Connect real AI models by:\n1. Integrating with OpenAI/Claude/Gemini APIs\n2. Implementing token validation & rate limiting\n3. Adding streaming for real-time updates\n4. Storing conversations in a database`;

      const newResult = {
        id: `result-${Date.now()}`,
        prompt,
        output: mockOutput,
        confidence: mockConfidence,
        timestamp: new Date().toLocaleTimeString()
      };

      setAiResults((prev) => [newResult, ...prev]);
      setIsProcessing(false);
      setLastStatus("success");

      // Auto-clear success message
      setTimeout(() => setLastStatus("idle"), 3000);
    }, 1200);
  }, []);

  // Handle feedback on AI outputs
  const handleFeedback = useCallback((resultId: string, action: string) => {
    setLastStatus("success");
    setTimeout(() => setLastStatus("idle"), 2000);

    if (action === "clear") {
      setAiResults([]);
    } else {
      setAiResults((prev) => prev.filter((r) => r.id !== resultId));
    }
  }, []);

  // Apply theme/contrast/text-size to document
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-contrast", contrast);
    document.documentElement.classList.toggle(`text-size-${textSize}`, textSize !== "normal");
  }, [theme, contrast, textSize]);

  return (
    <>
      <article className={`panel ${span}`}>
        <div className="panelTitle">
          <div>
            <h2>{title}</h2>
            <small>{note}</small>
          </div>
          <button
            className="btn-ghost"
            onClick={() => setShowSettings(!showSettings)}
            title="Open settings"
            aria-label="Toggle settings panel"
            style={{
              width: "40px",
              height: "40px",
              padding: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            ⚙️
          </button>
        </div>

        {/* Settings Panel (toggleable) */}
        {showSettings && (
          <div style={{ marginBottom: "16px" }}>
            <SettingsPanel
              currentTheme={theme}
              currentContrast={contrast}
              currentTextSize={textSize}
              onThemeChange={(t) => setTheme(t)}
              onContrastChange={(c) => setContrast(c)}
              onTextSizeChange={(s) => setTextSize(s)}
              onClose={() => setShowSettings(false)}
            />
          </div>
        )}

        {/* Status Indicator */}
        {lastStatus !== "idle" && (
          <div style={{ marginBottom: "12px" }}>
            <StatusIndicator
              status={lastStatus}
              message={
                lastStatus === "loading"
                  ? "Processing with AI..."
                  : lastStatus === "success"
                  ? "Operation successful!"
                  : "An error occurred"
              }
            />
          </div>
        )}

        {/* Prompt Builder */}
        <div style={{ marginBottom: "20px" }}>
          <PromptBuilder
            onSubmit={handlePromptSubmit}
            loading={isProcessing}
            placeholder="Ask me anything about your data, code, or system..."
          />
        </div>

        {/* Loading State or Results */}
        {isProcessing && <LoadingState />}

        {!isProcessing && aiResults.length === 0 && (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              color: "var(--muted)",
              borderTop: "1px solid var(--line)",
              borderRadius: "12px"
            }}
          >
            <p style={{ margin: "0" }}>📝 No AI results yet. Start by entering a prompt above.</p>
            <small style={{ display: "block", marginTop: "8px" }}>
              Use the template buttons for quick-start prompts or write your own.
            </small>
          </div>
        )}

        {/* AI Results */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {aiResults.map((result) => (
            <AiOutputCard
              key={result.id}
              title={`Response at ${result.timestamp}`}
              content={<pre style={{ margin: "0", fontSize: "12px", whiteSpace: "pre-wrap" }}>{result.output}</pre>}
              confidence={result.confidence}
              timestamp={result.timestamp}
              explanation={`Generated based on: "${result.prompt.substring(0, 50)}..."\n\nThis system would connect to real AI models with proper error handling, rate limiting, and data privacy measures.`}
              onFeedback={(action) => handleFeedback(result.id, action)}
              loading={isProcessing}
            />
          ))}
        </div>

        {/* Integration Guide */}
        {aiResults.length > 0 && (
          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              background: "rgba(34, 211, 238, 0.08)",
              border: "1px solid rgba(34, 211, 238, 0.3)",
              borderRadius: "10px",
              fontSize: "11px",
              color: "var(--muted)",
              lineHeight: "1.6"
            }}
          >
            <strong style={{ color: "var(--cyan)" }}>🔌 Integration Steps:</strong>
            <ol style={{ margin: "8px 0 0", paddingLeft: "20px" }}>
              <li>Connect to Claude, GPT, or Gemini API</li>
              <li>Add authentication (API key validation)</li>
              <li>Implement streaming for real-time responses</li>
              <li>Add database persistence (conversations)</li>
              <li>Set up monitoring & usage tracking</li>
              <li>Add cost controls & rate limiting</li>
            </ol>
          </div>
        )}
      </article>
    </>
  );
};
