import { useRef, useState } from 'react';
import axios from 'axios';
import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import TypingIndicator from './typing-indicator';
import ChatMessages, { type Message } from './chat-messages';
import ChatInput, { type ChatFormData } from './chat-input';
import lightButtonSound from '@/assets/sounds/light-button.wav';
import longPop from '@/assets/sounds/long-pop.wav';

const botResponseSound = new Audio(lightButtonSound);
botResponseSound.volume = 0.2;
const sendMessageSound = new Audio(longPop);
sendMessageSound.volume = 0.2;

type ChatResponse = {
  message: string;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [botTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState<string>('');
  const conversationId = useRef(crypto.randomUUID());

  const onSubmit = async ({ prompt }: ChatFormData) => {
    try {
      setError('');
      setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
      sendMessageSound.play();

      setIsBotTyping(true);
      const response = await axios.post<ChatResponse>('/api/chat', {
        prompt,
        conversationId: conversationId.current,
      });

      setMessages((prev) => [
        ...prev,
        { content: response.data.message, role: 'bot' },
      ]);
      botResponseSound.play();
    } catch (error) {
      console.error(error);
      setError(
        'We are working hard to resolve the issue. please try again soon!',
      );
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className="h-full relative ">
      <div className="p-5 pb-56 flex flex-col ">
        <ChatMessages messages={messages} />
        {botTyping ? <TypingIndicator /> : null}
        {error ? (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Unable to process your request.</AlertTitle>
            <AlertDescription>
              <p>{error}</p>
            </AlertDescription>
          </Alert>
        ) : null}
      </div>
      <ChatInput onSubmit={onSubmit} />
    </div>
  );
};

export default Chatbot;
