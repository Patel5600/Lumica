import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Calculator from './Calculator';
import { useExpenX } from '../hooks/useExpenX';

export default function Layout({ children }) {
  const router = useRouter();
  const { addTransaction } = useExpenX();
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  const navItems = [
    { label: 'Records', path: '/', icon: 'M3 10h18M3 14h18m-9-4v8m-3-4h6' },
    { label: 'Analysis', path: '/leaderboard', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { label: 'Budget', path: '/invite', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.407 2.67 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.407-2.67-1M12 16v-1' },
    { label: 'Profile', path: '/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-eggshell">
      {/* Main Content */}
      <main className="flex-1 pb-32">
        {children}
      </main>

      {/* Elevated Floating Action Button */}
      <button 
        onClick={() => setIsCalcOpen(true)}
        className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-sunshade rounded-full flex items-center justify-center text-white ios-shadow active:scale-90 active:rotate-90 transition-all duration-300 z-50 border-4 border-eggshell"
        aria-label="Add Transaction"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Calculator Modal */}
      <Calculator 
        isOpen={isCalcOpen} 
        onClose={() => setIsCalcOpen(false)} 
        onSave={addTransaction} 
      />

      {/* Bottom Navigation - Native iOS Feel */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl h-24 flex items-center justify-around px-4 z-40 border-t border-gray-100 rounded-t-[32px]">
        {navItems.map((item) => {
          const isActive = router.pathname === item.path;
          return (
            <Link key={item.path} href={item.path} className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${isActive ? 'text-sunshade scale-110' : 'text-gray-300'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 2.5 : 2} d={item.icon} />
              </svg>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-0'}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
