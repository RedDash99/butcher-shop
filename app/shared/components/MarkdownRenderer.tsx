import DOMPurify from 'isomorphic-dompurify';
import { marked } from "marked";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const rawHtml = marked.parse(content, { async: false }) as string;
  const cleanHtml = DOMPurify.sanitize(rawHtml) as string;

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
