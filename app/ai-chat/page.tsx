'use client';
import React, { useState, useRef, useEffect } from 'react';
import ChatBox from '@/components/ChatBox';

export default function AIChat() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white flex justify-center items-center px-4">
      <ChatBox />
    </div>
  );
}
