// src/pages/_app.tsx

// --- Default Imports ---
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Layout from '@/components/layout/Layout';
import { Inter } from 'next/font/google';

// --- New Imports for Page Transitions ---
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

// 1. ADD THE VERCEL IMPORT HERE
import { Analytics } from "@vercel/analytics/next";

// --- Font Configuration (No Change) ---
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// --- New Animation Configuration ---
const pageVariants = {
  initial: { opacity: 0, y: 5 }, 
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -5 }, 
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut', 
  duration: 0.3,   
};

// --- The Main App Component (Updated) ---
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter(); 

  return (
    <div className={`${inter.variable} font-sans`}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Layout>
          <AnimatePresence mode="wait">
            <motion.div
              key={router.route}
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={pageTransition}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      </ThemeProvider>
      
      {/* 2. ADD THE ANALYTICS COMPONENT HERE */}
      {/* Placing it just inside the main div ensures it tracks every route change */}
      <Analytics />
    </div>
  );
}
