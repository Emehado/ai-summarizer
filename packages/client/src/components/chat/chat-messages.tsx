import { Check, Copy, RefreshCcw, Volume2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '../ui/button';
import { useEffect, useRef, useState } from 'react';

export type Message = {
  content: string;
  role: 'user' | 'bot';
};

type Props = {
  messages: Message[];
};

const ChatMessages = ({ messages }: Props) => {
  const [messageCopied, setMessageCopied] = useState<number | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const onCopy = async (content: Message['content'], msgId: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setMessageCopied(msgId);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    if (messageCopied === null) return;

    const timer = setTimeout(() => {
      setMessageCopied(null);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [messageCopied]);

  useEffect(() => {
    messagesContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {messages.map((message, index) => (
        <div
          className={`text px-4 mb-2 py-2 rounded-xl ${message.role === 'user' ? 'bg-gray-200 self-end ' : 'self-start'}`}
          key={index}
          ref={messages.length - 1 === index ? messagesContainerRef : null}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
          {message.role === 'bot' ? (
            <div className="flex -ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCopy(message.content, index)}
              >
                {messageCopied === index ? <Check /> : <Copy />}
              </Button>
              <Button variant="ghost" size="sm">
                <Volume2 />
              </Button>
              <Button variant="ghost" size="sm">
                <RefreshCcw />
              </Button>
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default ChatMessages;
