'use client'

import { useRef, useEffect, useState } from 'react'
import { ArrowUp, User, Bot } from 'lucide-react'
import { useChat } from '@ai-sdk/react'
import { isTextUIPart } from 'ai'
import ReactMarkdown from 'react-markdown'

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ')

function messageText(parts: unknown): string {
  if (!Array.isArray(parts)) return ''
  return parts
    .filter((p): p is { type: 'text'; text: string } => isTextUIPart(p as never))
    .map((p) => p.text)
    .join('')
}

export function AIPromptBox() {
  const { messages, sendMessage, status, stop } = useChat()
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const isLoading = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px'
    }
  }, [input])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, isLoading])

  const submit = () => {
    const text = input.trim()
    if (!text || isLoading) return
    sendMessage({ text })
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  const suggestionChips = [
    'Panduan triase gawat darurat',
    'Protokol demam berdarah',
    'Ringkas riwayat medis',
    'Alur rujukan BPJS',
  ]

  return (
    <div
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="ai-chatbox w-full max-w-xl mx-auto bg-paper rounded-lg overflow-hidden border border-line/70 flex flex-col"
    >
      {/* Header label */}
      <div className="px-5 py-3.5 border-b border-line/70">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
          Sentra Clinical Assistant
        </span>
      </div>

      {/* Messages / empty state — fixed height so layout never jumps */}
      <div ref={scrollRef} className="h-[440px] overflow-y-auto overscroll-y-contain px-5 py-5">
        {messages.length === 0 ? (
          <div className="h-full flex flex-wrap gap-2 content-center">
            {suggestionChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => {
                  setInput(chip)
                  setTimeout(() => textareaRef.current?.focus(), 50)
                }}
                className="font-mono text-[11px] uppercase tracking-[0.14em] px-3 py-1.5 border border-line/70 text-ink-soft hover:text-ink hover:border-ink/60 hover:shadow-[0_2px_12px_-4px_rgba(26,26,24,0.1)] transition-all duration-300"
              >
                {chip}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => {
              const text = messageText(m.parts)
              return (
                <div
                  key={m.id}
                  className={cn(
                    'flex gap-2.5 animate-fade-up motion-reduce:animate-none',
                    m.role === 'user' && 'flex-row-reverse'
                  )}
                >
                  <div
                    className={cn(
                      'w-5 h-5 flex items-center justify-center shrink-0 mt-0.5',
                      m.role === 'user'
                        ? 'bg-ink text-paper rounded-md'
                        : 'border border-line/70 text-ink rounded-md'
                    )}
                  >
                    {m.role === 'user' ? (
                      <User className="w-2.5 h-2.5" />
                    ) : (
                      <Bot className="w-2.5 h-2.5" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'max-w-[85%] px-3 py-2 leading-[1.6]',
                      m.role === 'user'
                        ? 'bg-ink text-paper text-[12px] rounded-md shadow-[0_4px_16px_-6px_rgba(26,26,24,0.25)]'
                        : 'text-ink prose max-w-none rounded-md prose-p:text-[13px] prose-p:leading-[1.6] prose-p:my-1.5 prose-li:text-[13px] prose-li:leading-[1.6] prose-headings:font-display prose-headings:font-medium prose-headings:text-[14px] prose-strong:text-ink prose-a:text-signal prose-code:before:hidden prose-code:after:hidden prose-code:text-[12.5px] prose-pre:bg-paper prose-pre:border prose-pre:border-line/70 prose-pre:text-[12.5px]'
                    )}
                  >
                    {m.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{text}</p>
                    ) : (
                      <ReactMarkdown>{text}</ReactMarkdown>
                    )}
                  </div>
                </div>
              )
            })}

            {isLoading && (
              <div className="flex gap-2.5 animate-fade-up motion-reduce:animate-none">
                <div className="w-5 h-5 border border-line/70 text-ink rounded-md flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-2.5 h-2.5" />
                </div>
                <div className="px-3 py-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-ink-soft rounded-full animate-pulse" />
                  <span className="w-1.5 h-1.5 bg-ink-soft rounded-full animate-pulse [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-ink-soft rounded-full animate-pulse [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-line/70 p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
        >
          <div className="flex items-end gap-2.5 border border-line/70 bg-paper-pure px-3 py-2 focus-within:border-ink/40 focus-within:shadow-[0_0_0_3px_rgba(26,26,24,0.05)] transition-all duration-300">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Tanyakan sesuatu pada asisten klinis…"
              rows={1}
              spellCheck={false}
              className="flex-1 bg-transparent border-none outline-none resize-none min-h-[20px] max-h-[120px] font-display text-[12px] leading-[1.5] text-ink placeholder:text-ink-soft py-0.5"
            />
            {isLoading ? (
              <button
                type="button"
                onClick={stop}
                className="font-mono text-[10px] uppercase tracking-[0.14em] px-2.5 py-1.5 border border-line/70 rounded-md text-ink-soft hover:text-signal hover:border-signal/60 transition-all duration-300 shrink-0"
              >
                Stop
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className={cn(
                  'shrink-0 p-1.5 rounded-md transition-all duration-300',
                  input.trim()
                    ? 'bg-ink text-paper hover:bg-signal hover:shadow-[0_4px_16px_-6px_rgba(226,85,59,0.5)]'
                    : 'bg-paper text-ink-soft border border-line/70 cursor-not-allowed'
                )}
                aria-label="Kirim"
              >
                <ArrowUp className="w-3 h-3 stroke-[2.5]" />
              </button>
            )}
          </div>
        </form>
        <p className="font-mono text-[10px] tracking-[0.08em] text-ink-soft opacity-60 mt-2 text-center">
          AI dapat berbuat kesalahan. Selalu periksa kembali informasi klinis.
        </p>
      </div>
    </div>
  )
}
