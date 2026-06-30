# Quick Reference: AI-Augmented UI Components

## 🚀 Getting Started

```typescript
// 1. Import components
import {
  Button,
  PromptBuilder,
  AiOutputCard,
  AiFeedbackControls,
  SettingsPanel,
  LoadingState,
  StatusIndicator
} from "./components/UIKit";

// 2. Import demo panel
import { AiEnhancedPanel } from "./components/AiEnhancedPanel";

// 3. Add to your app
<AiEnhancedPanel span="span12" />
```

## 📋 Component Reference

### Button
```typescript
<Button 
  variant="primary"              // "primary" | "secondary" | "ghost" | "danger"
  size="md"                      // "sm" | "md" | "lg"
  loading={false}                // Shows spinner
  icon={<Zap />}                 // Optional icon
  disabled={false}
  onClick={handleClick}
>
  Click me
</Button>
```

### PromptBuilder
```typescript
<PromptBuilder
  templates={customTemplates}    // Optional custom templates
  onSubmit={(prompt) => {}}      // Handle submitted prompt
  loading={false}
  placeholder="Your prompt here..."
/>
```

### AiFeedbackControls
```typescript
<AiFeedbackControls
  onApprove={() => {}}           // Thumbs up
  onReject={() => {}}            // Thumbs down
  onEdit={() => {}}              // Edit result
  onClear={() => {}}             // Clear all
  loading={false}
  ariaLabel="AI feedback"        // Accessibility
/>
```

### AiOutputCard
```typescript
<AiOutputCard
  title="Analysis Result"
  content={<pre>{text}</pre>}
  confidence={0.92}              // 0-1, shown as percentage
  source="Knowledge Base"
  timestamp="10:30 AM"
  explanation="How it was generated"
  onFeedback={(action) => {}}    // "approve" | "reject" | "edit" | "clear"
  loading={false}
/>
```

### SettingsPanel
```typescript
<SettingsPanel
  currentTheme="dark"            // "dark" | "light" | "auto"
  currentContrast="normal"       // "normal" | "high"
  currentTextSize="normal"       // "small" | "normal" | "large"
  onThemeChange={(theme) => {}}
  onContrastChange={(contrast) => {}}
  onTextSizeChange={(size) => {}}
  onClose={() => {}}             // Close panel
/>
```

### StatusIndicator
```typescript
<StatusIndicator
  status="loading"               // "idle" | "loading" | "success" | "error"
  message="Processing..."
/>
```

### LoadingState
```typescript
<LoadingState message="Processing with AI..." />
```

## 🎨 CSS Classes

Ready-to-use styling classes:

```css
.btn                           /* Base button */
.btn-primary, .btn-secondary   /* Button variants */
.btn-sm, .btn-md, .btn-lg      /* Button sizes */
.ai-feedback                   /* Feedback controls container */
.prompt-builder                /* Prompt input container */
.settings-panel                /* Settings UI */
.ai-output-card                /* AI output display */
.loading-state                 /* Loading indicator */
.status-indicator              /* Status display */
```

## 🔧 Common Patterns

### Handle prompt submission
```typescript
const [isProcessing, setIsProcessing] = useState(false);

const handlePrompt = async (prompt: string) => {
  setIsProcessing(true);
  
  try {
    const response = await callAiAPI(prompt);
    // Handle response
  } catch (error) {
    console.error("AI error:", error);
  } finally {
    setIsProcessing(false);
  }
};

<PromptBuilder onSubmit={handlePrompt} loading={isProcessing} />
```

### Display AI results with feedback
```typescript
const [results, setResults] = useState([]);

const handleFeedback = (resultId: string, action: string) => {
  if (action === "clear") {
    setResults([]);
  } else {
    setResults((prev) => prev.filter((r) => r.id !== resultId));
  }
};

{results.map((result) => (
  <AiOutputCard
    key={result.id}
    title={result.title}
    content={result.content}
    confidence={result.confidence}
    onFeedback={(action) => handleFeedback(result.id, action)}
  />
))}
```

### Persist settings to localStorage
```typescript
const [theme, setTheme] = useState(() => 
  localStorage.getItem("theme") || "dark"
);

useEffect(() => {
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]);

<SettingsPanel currentTheme={theme} onThemeChange={setTheme} />
```

## ♿ Accessibility Checklist

- ✅ All buttons have `aria-label` when needed
- ✅ Form inputs have associated `<label>` elements
- ✅ Color contrast ≥ 4.5:1 (WCAG AA)
- ✅ Keyboard navigation works (Tab, Enter, Arrow keys)
- ✅ Focus indicators visible
- ✅ Screen readers announce status with `aria-live="polite"`
- ✅ `aria-expanded` on toggleable elements
- ✅ `aria-busy` on loading buttons
- ✅ Reduced motion respected with `@media (prefers-reduced-motion: reduce)`

## 🎯 Integration Checklist

- [ ] Import UIKit components
- [ ] Add AiEnhancedPanel to your layout
- [ ] Choose AI provider (Claude/GPT-4/Gemini)
- [ ] Set up API keys in `.env.local`
- [ ] Implement prompt handler with real API
- [ ] Add error handling and retries
- [ ] Implement rate limiting
- [ ] Add conversation persistence
- [ ] Test keyboard accessibility
- [ ] Test with screen reader
- [ ] Deploy and monitor usage

## 📱 Responsive Classes

```css
@media(max-width: 768px) {
  /* Mobile-specific overrides */
  .grid { grid-template-columns: repeat(6, 1fr); }
  .span4, .span5, .span6, .span7 { grid-column: span 6; }
}
```

## 🔐 Security Best Practices

```typescript
// ✅ DO: Use backend proxy
const response = await fetch("/api/ai/generate", {
  method: "POST",
  body: JSON.stringify({ prompt })
});

// ❌ DON'T: Expose API keys
const response = await fetch("https://api.anthropic.com/...", {
  headers: { "x-api-key": "sk-ant-..." } // Never!
});

// ✅ DO: Sanitize AI outputs
const sanitized = DOMPurify.sanitize(aiOutput);

// ✅ DO: Validate inputs
if (!prompt.trim() || prompt.length > 5000) {
  return; // Reject
}
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Styles not applying | Ensure `global.css` is imported in `main.tsx` |
| TypeScript errors | Check that all props match interfaces |
| Buttons not working | Verify `onClick` handlers are passed correctly |
| No keyboard focus | Add `tabIndex={0}` to custom elements |
| Screen reader can't read button | Add `aria-label` to icon-only buttons |
| Slow performance | Memoize components with `React.memo()` |

## 🔗 External Resources

- [UIKit Component Library](./src/components/UIKit.tsx)
- [AI Integration Examples](./src/lib/aiIntegrationExamples.ts)
- [Enhancement Guide](./AI_UI_ENHANCEMENT_GUIDE.md)
- [Demo Implementation](./src/components/AiEnhancedPanel.tsx)

---

**Last Updated**: June 2026  
**Version**: 1.0.0
