import React, { useEffect, useState } from 'react';
import { Moon, Sun, Palette } from 'lucide-react';
import { cn } from '@/shared/utils';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  // Available themes
  const themes = ['light', 'dracula', 'corporate', 'lofi', 'winter'];

  // Get the current theme from localStorage or default to 'light'
  const [theme, setTheme] = useState<string>('light');

  // Initialize theme from localStorage when component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    // Make sure the saved theme is in our list, otherwise default to light
    const validTheme = themes.includes(savedTheme) ? savedTheme : 'light';
    setTheme(validTheme);
    document.documentElement.setAttribute('data-theme', validTheme);
  }, []);

  // Cycle through available themes
  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[nextIndex];

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="tooltip tooltip-bottom" data-tip={`Theme: ${theme}`}>
      <button
        onClick={toggleTheme}
        className={cn(
          'btn btn-ghost btn-circle',
          'transition-colors duration-200',
          className,
        )}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Sun className="h-5 w-5" />
        ) : theme === 'dark' ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Palette className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};
