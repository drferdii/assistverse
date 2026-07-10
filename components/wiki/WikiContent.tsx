import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import Link from 'next/link'

interface WikiContentProps {
  content: string
}

export default function WikiContent({ content }: WikiContentProps) {
  return (
    <article className="wiki-content prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => <h1 className="sr-only">{children}</h1>,
          h2: ({ children }) => (
            <h2 className="text-3xl font-display font-semibold text-ink mt-12 mb-4">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-display font-semibold text-ink mt-8 mb-3">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-display font-semibold text-ink mt-6 mb-2">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="prose text-ink-soft leading-relaxed mb-4">{children}</p>
          ),
          a: ({ href, children }) => {
            if (href?.startsWith('http')) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-signal hover:text-signal-deep underline transition-colors duration-200"
                >
                  {children}
                </a>
              )
            }
            return (
              <Link
                href={href || '#'}
                className="text-signal hover:text-signal-deep underline transition-colors duration-200"
              >
                {children}
              </Link>
            )
          },
          code: ({ children, className }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code className="font-mono bg-paper-pure px-1 py-0.5 rounded text-sm">
                  {children}
                </code>
              )
            }
            return (
              <pre className="font-mono bg-ink-bg text-paper-on-ink p-4 rounded-none overflow-x-auto my-6">
                <code className={className}>{children}</code>
              </pre>
            )
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-line">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-paper-pure font-mono uppercase text-sm">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border border-line px-4 py-3 text-left text-ink font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-line px-4 py-3 text-ink-soft">{children}</td>
          ),
          tr: ({ children }) => <tr className="bg-paper">{children}</tr>,
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-ink-soft">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-ink-soft">{children}</ol>
          ),
          li: ({ children }) => <li className="text-ink-soft">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-signal pl-4 italic text-ink-soft my-6">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-line my-8" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
