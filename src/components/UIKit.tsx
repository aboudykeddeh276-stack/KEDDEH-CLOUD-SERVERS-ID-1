/**
 * Modern AI-Augmented UI Component Library
 * Research-backed patterns: accessibility (WCAG 2.1), feedback loops, transparency
 */

import React, { ReactNode, useState, useCallback } from "react";
import { ChevronDown, AlertCircle, Check, X, RotateCcw, ThumbsUp, ThumbsDown, Zap, Settings } from "lucide-react";

// ============================================================================
// BUTTONS & INTERACTIVE CONTROLS
// ============================================================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  children,
  disabled,
  ...props
}) => {
  const baseClasses = `btn btn-${variant} btn-${size}`;
  return (
    <button
      className={baseClasses}
      disabled={loading || disabled}
      aria-busy={loading}
      {...props}
    >
      {loading && <span className="spinner" aria-hidden="true" />}
      {icon && <span className="icon" aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

// ============================================================================
// AI-FOCUSED FEEDBACK CONTROLS (Human-in-the-loop)
// ============================================================================

interface FeedbackControlsProps {
  onApprove?: () => void;
  onReject?: () => void;
  onEdit?: () => void;
  onClear?: () => void;
  loading?: boolean;
  ariaLabel?: string;
}

export const AiFeedbackControls: React.FC<FeedbackControlsProps> = ({
  onApprove,
  onReject,
  onEdit,
  onClear,
  loading = false,
  ariaLabel = "AI output feedback controls"
}) => {
  return (
    <div className="ai-feedback" role="group" aria-label={ariaLabel}>
      {onApprove && (
        <button
          className="feedback-btn approve"
          onClick={onApprove}
          disabled={loading}
          title="Accept this AI suggestion"
          aria-label="Approve AI output"
        >
          <ThumbsUp size={16} />
        </button>
      )}
      {onReject && (
        <button
          className="feedback-btn reject"
          onClick={onReject}
          disabled={loading}
          title="Reject this AI suggestion"
          aria-label="Reject AI output"
        >
          <ThumbsDown size={16} />
        </button>
      )}
      {onEdit && (
        <button
          className="feedback-btn edit"
          onClick={onEdit}
          disabled={loading}
          title="Edit the AI output"
          aria-label="Edit AI output"
        >
          <X size={16} />
        </button>
      )}
      {onClear && (
        <button
          className="feedback-btn clear"
          onClick={onClear}
          disabled={loading}
          title="Clear all results"
          aria-label="Clear all results"
        >
          <RotateCcw size={16} />
        </button>
      )}
    </div>
  );
};

// ============================================================================
// PROMPT BUILDER (AI-First Workflow)
// ============================================================================

interface PromptTemplate {
  id: string;
  name: string;
  prompt: string;
  description?: string;
}

interface PromptBuilderProps {
  templates?: PromptTemplate[];
  onSubmit: (prompt: string) => void;
  loading?: boolean;
  placeholder?: string;
}

const DEFAULT_TEMPLATES: PromptTemplate[] = [
  {
    id: "summarize",
    name: "Summarize",
    prompt: "Summarize the following content concisely:",
    description: "Get a quick overview"
  },
  {
    id: "analyze",
    name: "Analyze",
    prompt: "Provide a detailed analysis of:",
    description: "Deep-dive investigation"
  },
  {
    id: "optimize",
    name: "Optimize",
    prompt: "Suggest optimizations for:",
    description: "Performance improvements"
  },
  {
    id: "explain",
    name: "Explain",
    prompt: "Explain this concept clearly:",
    description: "Educational breakdown"
  }
];

export const PromptBuilder: React.FC<PromptBuilderProps> = ({
  templates = DEFAULT_TEMPLATES,
  onSubmit,
  loading = false,
  placeholder = "Describe what you need from AI..."
}) => {
  const [prompt, setPrompt] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [showTemplates, setShowTemplates] = useState(false);

  const handleTemplateSelect = useCallback((template: PromptTemplate) => {
    setPrompt(template.prompt);
    setSelectedTemplate(template.id);
    setShowTemplates(false);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
      setPrompt("");
      setSelectedTemplate("");
    }
  }, [prompt, onSubmit]);

  return (
    <form className="prompt-builder" onSubmit={handleSubmit}>
      <label htmlFor="prompt-input" className="prompt-label">
        <Zap size={14} aria-hidden="true" />
        AI Prompt
      </label>

      <div className="prompt-input-container">
        <textarea
          id="prompt-input"
          className="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          rows={3}
          aria-label="Enter your prompt for AI"
          aria-describedby="prompt-templates"
        />

        <div className="prompt-template-selector" id="prompt-templates">
          <button
            type="button"
            className="template-toggle"
            onClick={() => setShowTemplates(!showTemplates)}
            disabled={loading}
            aria-expanded={showTemplates}
            aria-label="Toggle prompt templates"
          >
            <Settings size={14} aria-hidden="true" />
            Templates
            <ChevronDown size={14} style={{
              transform: showTemplates ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s"
            }} aria-hidden="true" />
          </button>

          {showTemplates && (
            <div className="template-menu" role="listbox">
              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  className={`template-item ${selectedTemplate === template.id ? "selected" : ""}`}
                  onClick={() => handleTemplateSelect(template)}
                  disabled={loading}
                  role="option"
                  aria-selected={selectedTemplate === template.id}
                >
                  <strong>{template.name}</strong>
                  {template.description && <small>{template.description}</small>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        loading={loading}
        disabled={!prompt.trim() || loading}
        icon={<Zap size={16} aria-hidden="true" />}
      >
        {loading ? "Processing..." : "Send to AI"}
      </Button>
    </form>
  );
};

// ============================================================================
// SETTINGS PANEL (User Preferences & Accessibility)
// ============================================================================

interface SettingsPanelProps {
  onThemeChange?: (theme: "dark" | "light" | "auto") => void;
  onContrastChange?: (level: "normal" | "high") => void;
  onTextSizeChange?: (size: "small" | "normal" | "large") => void;
  currentTheme?: "dark" | "light" | "auto";
  currentContrast?: "normal" | "high";
  currentTextSize?: "small" | "normal" | "large";
  onClose?: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onThemeChange,
  onContrastChange,
  onTextSizeChange,
  currentTheme = "dark",
  currentContrast = "normal",
  currentTextSize = "normal",
  onClose
}) => {
  return (
    <div className="settings-panel" role="dialog" aria-label="Settings">
      <div className="settings-header">
        <h3>Settings & Accessibility</h3>
        {onClose && (
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close settings"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="settings-group">
        <label htmlFor="theme-select">Color Theme</label>
        <select
          id="theme-select"
          value={currentTheme}
          onChange={(e) => onThemeChange?.(e.target.value as any)}
          aria-describedby="theme-desc"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="auto">Auto (System)</option>
        </select>
        <small id="theme-desc">Choose how the interface appears</small>
      </div>

      <div className="settings-group">
        <label htmlFor="contrast-select">Color Contrast</label>
        <select
          id="contrast-select"
          value={currentContrast}
          onChange={(e) => onContrastChange?.(e.target.value as any)}
          aria-describedby="contrast-desc"
        >
          <option value="normal">Normal</option>
          <option value="high">High (WCAG AAA)</option>
        </select>
        <small id="contrast-desc">Enhance text readability (WCAG compliance)</small>
      </div>

      <div className="settings-group">
        <label htmlFor="textsize-select">Text Size</label>
        <select
          id="textsize-select"
          value={currentTextSize}
          onChange={(e) => onTextSizeChange?.(e.target.value as any)}
          aria-describedby="textsize-desc"
        >
          <option value="small">Small</option>
          <option value="normal">Normal</option>
          <option value="large">Large (Accessible)</option>
        </select>
        <small id="textsize-desc">Adjust font size for comfortable reading</small>
      </div>

      <div className="settings-info">
        <AlertCircle size={14} aria-hidden="true" />
        <p>Settings are saved to your browser. Keyboard navigation: Use Tab to move between fields, Enter to select.</p>
      </div>
    </div>
  );
};

// ============================================================================
// AI OUTPUT CARD (Transparency & Explainability)
// ============================================================================

interface AiOutputCardProps {
  title: string;
  content: ReactNode;
  confidence?: number;
  source?: string;
  timestamp?: string;
  explanation?: string;
  onFeedback?: (action: "approve" | "reject" | "edit" | "clear") => void;
  loading?: boolean;
}

export const AiOutputCard: React.FC<AiOutputCardProps> = ({
  title,
  content,
  confidence,
  source,
  timestamp,
  explanation,
  onFeedback,
  loading = false
}) => {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <article className="ai-output-card" aria-label={`AI output: ${title}`}>
      <div className="output-header">
        <h3>{title}</h3>
        {confidence !== undefined && (
          <span className="confidence" title={`Confidence: ${(confidence * 100).toFixed(0)}%`}>
            {(confidence * 100).toFixed(0)}%
          </span>
        )}
      </div>

      <div className="output-content">
        {content}
      </div>

      {explanation && (
        <div className="output-explanation">
          <button
            className="explanation-toggle"
            onClick={() => setShowExplanation(!showExplanation)}
            aria-expanded={showExplanation}
            aria-label="Toggle explanation"
          >
            ? How was this generated?
          </button>
          {showExplanation && (
            <div className="explanation-text" role="region" aria-label="AI reasoning">
              {explanation}
            </div>
          )}
        </div>
      )}

      <div className="output-footer">
        <div className="output-meta">
          {source && <small>Source: {source}</small>}
          {timestamp && <small>{timestamp}</small>}
        </div>

        {onFeedback && (
          <AiFeedbackControls
            onApprove={() => onFeedback("approve")}
            onReject={() => onFeedback("reject")}
            onEdit={() => onFeedback("edit")}
            onClear={() => onFeedback("clear")}
            loading={loading}
            ariaLabel="Feedback for this AI output"
          />
        )}
      </div>
    </article>
  );
};

// ============================================================================
// LOADING STATE
// ============================================================================

export const LoadingState: React.FC<{ message?: string }> = ({
  message = "Processing with AI..."
}) => (
  <div className="loading-state" role="status" aria-live="polite" aria-label="Loading">
    <div className="loading-spinner" aria-hidden="true" />
    <p>{message}</p>
  </div>
);

// ============================================================================
// STATUS INDICATORS
// ============================================================================

interface StatusIndicatorProps {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  message
}) => {
  const icons = {
    idle: null,
    loading: <span className="spinner" aria-hidden="true" />,
    success: <Check size={16} aria-hidden="true" />,
    error: <AlertCircle size={16} aria-hidden="true" />
  };

  return (
    <div className={`status-indicator status-${status}`} role="status" aria-live="polite">
      {icons[status]}
      {message && <span>{message}</span>}
    </div>
  );
};
