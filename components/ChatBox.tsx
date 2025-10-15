'use client';
import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import Loader from './Loader';

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
  
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }), // <<< Only sending user's message
      });
  
      const data = await res.json();
  
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong.' }]);
      }
  
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error occurred.' }]);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="w-full max-w-2xl h-[80vh] bg-black bg-opacity-30 border border-gray-700 rounded-xl p-6 overflow-hidden shadow-2xl flex flex-col backdrop-blur-md">
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {loading && <Loader />}
        <div ref={chatEndRef} />
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-all duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
}
