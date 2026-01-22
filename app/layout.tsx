import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeScript } from './components/ThemeScript';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Job Application Manager",
  description: "Track your job applications and create professional resumes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <ProfileProvider>
              {children}
            </ProfileProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
