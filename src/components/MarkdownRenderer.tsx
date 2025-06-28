import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Spin } from 'antd';

interface MarkdownRendererProps {
  content?: string;
  filePath?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, filePath }) => {
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        if (filePath) {
          const response = await fetch(filePath);
          if (!response.ok) {
            throw new Error(`Failed to load Markdown file: ${response.statusText}`);
          }
          let text = await response.text();
          // Replace placeholder with the actual public URL
          text = text.replace(/{{PUBLIC_URL}}/g, process.env.PUBLIC_URL || '');
          setMarkdown(text);
        } else if (content) {
          // Also process content passed directly as a prop
          const processedContent = content.replace(/{{PUBLIC_URL}}/g, process.env.PUBLIC_URL || '');
          setMarkdown(processedContent);
        }
        setLoading(false);
      } catch (err: any) {
        console.error('Error loading Markdown file:', err);
        setError(`Unable to load Markdown content: ${err.message}`);
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [content, filePath]);

  if (loading) {
    return <Spin tip="Loading document..." />;
  }

  if (error) {
    return <div className="markdown-error">{error}</div>;
  }

  return (
    <div className="markdown-content">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
