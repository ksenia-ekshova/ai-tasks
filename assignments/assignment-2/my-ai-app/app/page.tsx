'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import ChatSection from '@/components/chat/ChatSection';
import ChatSettings from '@/components/chat/ChatSettings';

export default function Home() {
  const [selectedTemp, setSelectedTemp] = useState(2000); // set default temp to 0.2
  const convertedTemp = (selectedTemp / 10000).toFixed(1); // scale value to 0.0 - 2.0 to follow GPT-3.5 Turbo guidelines

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = useChat({ api: '/api/chat', body: { temperature: convertedTemp } });

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const lastJoke = messages.filter((m) => m.role === 'assistant').pop();
  return (
    <main>
      <header className='py-8 text-5xl font-bold text-center mb-4'>
        Joker GPT
      </header>
      <div className='flex min-w-lg'>
        <ChatSettings
          content={lastJoke}
          selectedTemp={selectedTemp}
          convertedTemp={+convertedTemp}
          isLoading={isLoading}
          setSelectedTemp={setSelectedTemp}
          append={append}
        />
        <ChatSection
          messages={messages}
          isLoading={isLoading}
          lastMessageRef={lastMessageRef}
        />
      </div>
    </main>
  );
}
