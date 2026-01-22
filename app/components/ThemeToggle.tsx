'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-5 h-5" aria-hidden="true" />;
      case 'dark':
        return <Moon className="w-5 h-5" aria-hidden="true" />;
      case 'system':
        return <Monitor className="w-5 h-5" aria-hidden="true" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className={`
        inline-flex items-center gap-2 px-3 py-2 rounded-lg
        text-primary-600 dark:text-primary-300
        hover:bg-primary-100 dark:hover:bg-primary-800
        focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2
        dark:focus:ring-offset-primary-900
        transition-colors duration-200
        ${className}
      `}
      aria-label={`Current theme: ${getLabel()}. Click to change theme.`}
      title={`Theme: ${getLabel()}`}
    >
      {getIcon()}
      {showLabel && (
        <span className="text-sm font-medium">{getLabel()}</span>
      )}
    </button>
  );
}

// Dropdown version for more control
export function ThemeDropdown({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const options = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];

  return (
    <div className={`relative inline-block ${className}`}>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
        className="
          appearance-none pl-10 pr-8 py-2 rounded-lg
          bg-white dark:bg-primary-800
          border border-primary-200 dark:border-primary-600
          text-primary-700 dark:text-primary-200
          focus:outline-none focus:ring-2 focus:ring-accent-500
          cursor-pointer text-sm font-medium
        "
        aria-label="Select theme"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary-500 dark:text-primary-400">
        {theme === 'light' && <Sun className="w-4 h-4" />}
        {theme === 'dark' && <Moon className="w-4 h-4" />}
        {theme === 'system' && <Monitor className="w-4 h-4" />}
      </div>
    </div>
  );
}
