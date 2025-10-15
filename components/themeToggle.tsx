'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Fix SSR mismatch
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="transition-opacity duration-300 hover:opacity-70 text-foreground p-2 rounded-full ring-1 ring-border dark:ring-black cursor-pointer"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? <Sun className="h-5 w-5 text-black" /> : <Moon className="h-5 w-5 text-white" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
