import Head from 'next/head';
import { useExpenX } from '../hooks/useExpenX';

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

export default function Profile() {
  const { settings, updateCurrency, exportData, clearAllData } = useExpenX();

  return (
    <div className="flex flex-col min-h-screen bg-eggshell">
      <Head>
        <title>ExpenX – Profile</title>
      </Head>

      <header className="bg-sunshade p-8 pb-14 text-white shadow-2xl rounded-b-[48px] relative z-10">
        <h1 className="text-2xl font-black tracking-tighter">Profile</h1>
      </header>

      <div className="flex-1 px-6 -mt-8 pb-24 relative z-20">
        <div className="bg-white rounded-[40px] p-8 shadow-sm space-y-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gray-100 rounded-[32px] flex items-center justify-center text-gray-300 border border-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-800 tracking-tight">ExpenX User</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Premium Member</p>
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-gray-50">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block ml-1">Currency Configuration</label>
              <div className="grid grid-cols-1 gap-3">
                {CURRENCIES.map((c) => (
                  <button 
                    key={c.code}
                    onClick={() => updateCurrency(c.code, c.symbol)}
                    className={`flex items-center justify-between p-5 rounded-3xl transition-all duration-300 border ${settings.currency === c.code ? 'bg-sunshade/5 border-sunshade/20 text-sunshade shadow-sm' : 'bg-gray-50/50 border-transparent text-gray-600 active:bg-gray-100'}`}
                  >
                    <span className="font-bold">{c.name} ({c.code})</span>
                    <span className="text-lg font-black">{c.symbol}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block ml-1">Data Management</label>
              <button 
                onClick={exportData}
                className="w-full flex items-center justify-between p-5 bg-white border border-gray-100 rounded-3xl font-black text-gray-700 shadow-sm active:scale-[0.98] transition-all"
              >
                <span>Export Data (CSV)</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sunshade" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button 
                onClick={clearAllData}
                className="w-full flex items-center justify-between p-5 bg-valentine/5 border border-valentine/10 rounded-3xl font-black text-valentine active:scale-[0.98] transition-all"
              >
                <span>Clear All Data</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
