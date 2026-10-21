import React, { useRef } from 'react';
import { Play, Send, RotateCcw, Copy, Check } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (val: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  onReset: () => void;
  isRunning: boolean;
  isEvaluating: boolean;
  disabled?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  onSubmit,
  onReset,
  isRunning,
  isEvaluating,
  disabled = false,
}) => {
  const [copied, setCopied] = React.useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Line numbers calculation
  const linesCount = Math.max(1, code.split('\n').length);
  const lineNumbers = Array.from({ length: linesCount }, (_, i) => i + 1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab key inserts 4 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      onChange(newCode);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }

    // Ctrl+Enter or Cmd+Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="font-mono text-slate-300 font-semibold ml-2">solution.py</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-500">Python 3.12</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded transition-colors"
            title="Reset to starter code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Code Text Area with Line Numbers */}
      <div className="relative flex-1 flex font-mono text-sm overflow-hidden bg-slate-900">
        {/* Line Numbers Column */}
        <div
          aria-hidden="true"
          className="select-none py-3 px-3 text-right bg-slate-950/40 text-slate-600 border-r border-slate-800/60 leading-6 shrink-0 font-mono text-xs"
        >
          {lineNumbers.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isEvaluating}
          placeholder="# Write your Python code here..."
          className="w-full h-full py-3 px-4 bg-transparent text-slate-100 resize-none outline-none font-mono text-sm leading-6 selection:bg-cyan-500/20 whitespace-pre"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>

      {/* Editor Action Footer */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-t border-slate-800 text-xs">
        <span className="text-slate-500 hidden sm:inline">
          Tip: Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">Enter</kbd> to run
        </span>

        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={onRun}
            disabled={isRunning || isEvaluating}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors font-medium border border-slate-700 disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : 'text-emerald-400'}`} />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>

          <button
            onClick={onSubmit}
            disabled={isEvaluating || isRunning || !code.trim()}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition-colors font-semibold shadow-md shadow-cyan-950 disabled:opacity-50"
          >
            <Send className={`w-3.5 h-3.5 ${isEvaluating ? 'animate-pulse' : ''}`} />
            <span>{isEvaluating ? 'Inspecting Authenticity...' : 'Submit for Grading'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
