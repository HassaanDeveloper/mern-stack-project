import React from 'react';

export default function MessageBubble({
  role,
  content,
}: {
  role: string;
  content: string;
}) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-sm px-4 py-2 rounded-lg shadow ${
          isUser
            ? 'bg-indigo-500 text-white rounded-br-none'
            : 'bg-gray-700 text-gray-200 rounded-bl-none'
        } animate-fade-in`}
      >
        {content}
      </div>
    </div>
  );
}
