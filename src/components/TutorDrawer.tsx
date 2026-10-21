import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Volume2, VolumeX, Sparkles, HelpCircle, Bug, Lightbulb, X } from 'lucide-react';

interface TutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
  itemType: 'exercise' | 'project' | 'test';
  currentCode: string;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const TutorDrawer: React.FC<TutorDrawerProps> = ({
  isOpen,
  onClose,
  itemTitle,
  itemType,
  currentCode,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init_1',
      sender: 'bot',
      text: `Greetings. I am JARVIS, your personal programming tutor. I am here to guide your mental model of "${itemTitle}". Ask me anything—I'll explain concepts simply without spoiling the answer!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis unavailable:', e);
    }
  };

  const sendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/tutor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          currentCode,
          itemTitle,
          itemType,
          history: messages.slice(-5),
        }),
      });

      const data = await response.json();
      const botMsg: Message = {
        id: 'b_' + Date.now(),
        sender: 'bot',
        text: data.reply || "I'm right here with you! Let's examine how each variable changes step-by-step.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      speakText(botMsg.text);
    } catch (err) {
      const fallbackMsg: Message = {
        id: 'b_err_' + Date.now(),
        sender: 'bot',
        text: "Let's break this down: Look carefully at what variable you assigned, and trace what happens line by line.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-950 border-l border-slate-800 z-50 flex flex-col shadow-2xl text-slate-100">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-600/30 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>JARVIS Code Coach</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            </div>
            <p className="text-[11px] text-slate-400">Socratic Beginner Programming Guide</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-1.5 rounded-lg border transition-colors ${
              voiceEnabled
                ? 'bg-cyan-950 border-cyan-700 text-cyan-400'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title={voiceEnabled ? 'Voice output active' : 'Click to enable voice reading'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-3 py-2 bg-slate-900/60 border-b border-slate-800/60 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
        <button
          onClick={() => sendMessage("Can you give me a gentle hint without giving away the answer?")}
          className="whitespace-nowrap px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1"
        >
          <Lightbulb className="w-3 h-3 text-amber-400" />
          <span>Need a Hint</span>
        </button>
        <button
          onClick={() => sendMessage("Can you explain this concept like I'm 10 years old with an analogy?")}
          className="whitespace-nowrap px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1"
        >
          <HelpCircle className="w-3 h-3 text-cyan-400" />
          <span>Explain with Analogy</span>
        </button>
        <button
          onClick={() => sendMessage("Can you check my code for syntax or indentation mistakes?")}
          className="whitespace-nowrap px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1"
        >
          <Bug className="w-3 h-3 text-rose-400" />
          <span>Diagnose Bug</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-600 text-white rounded-br-none shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>JARVIS is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 bg-slate-900 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask JARVIS about your code..."
            disabled={loading}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={loading || !inputText.trim()}
            className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg disabled:opacity-40 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
