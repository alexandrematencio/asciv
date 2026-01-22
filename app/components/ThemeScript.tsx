// ThemeScript component to prevent flash of wrong theme
// This script runs before React hydration to set the correct theme class

export function ThemeScript() {
  // This is a static script that only reads from localStorage
  // It's safe because we control the exact output and don't use any user input
  const script = `
    (function() {
      try {
        var stored = localStorage.getItem('theme-preference');
        var theme = stored || 'system';
        var resolved = theme;
        if (theme === 'system') {
          resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.classList.add(resolved);
      } catch (e) {
        document.documentElement.classList.add('light');
      }
    })();
  `;

  return (
    <script
      // Safe: this is a static string we control, not user input
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
