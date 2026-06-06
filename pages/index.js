import Head from 'next/head';
import { useExpenX } from '../hooks/useExpenX';

export default function Records() {
  const { groupedTransactions, totals, isLoaded, deleteTransaction, settings } = useExpenX();

  if (!isLoaded) return <div className="p-10 text-center font-bold text-sunshade animate-pulse">ExpenX is loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-eggshell">
      <Head>
        <title>ExpenX – Money Manager</title>
      </Head>

      {/* Branded Header - iOS style soft shadow */}
      <header className="bg-sunshade p-8 pb-14 text-white shadow-2xl rounded-b-[48px] relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-black tracking-tighter">ExpenX</h1>
          <div className="bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/30">
            <span className="text-xs font-black uppercase tracking-widest">{new Date().toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-sm border border-white/10">
            <p className="text-[10px] uppercase font-black tracking-widest opacity-70 mb-1">Income</p>
            <p className="text-lg font-black text-white truncate">{settings.symbol}{totals.income.toLocaleString()}</p>
          </div>
          <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-sm border border-white/10">
            <p className="text-[10px] uppercase font-black tracking-widest opacity-70 mb-1">Expense</p>
            <p className="text-lg font-black text-white truncate">{settings.symbol}{totals.expense.toLocaleString()}</p>
          </div>
          <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-sm border border-white/10">
            <p className="text-[10px] uppercase font-black tracking-widest opacity-70 mb-1">Balance</p>
            <p className="text-lg font-black text-white truncate">{settings.symbol}{totals.balance.toLocaleString()}</p>
          </div>
        </div>
      </header>

      {/* Transaction List - Card in Container design */}
      <div className="flex-1 px-6 -mt-8 pb-24 relative z-20">
        {groupedTransactions.length === 0 ? (
          <div className="mt-24 text-center">
            <div className="w-24 h-24 bg-white rounded-[40px] shadow-sm flex items-center justify-center mx-auto mb-6 text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No entries found</p>
          </div>
        ) : (
          <div className="space-y-8">
            {groupedTransactions.map((group) => (
              <section key={group.date}>
                <div className="flex items-center space-x-4 mb-4 ml-2">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    {group.date}
                  </h3>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-white rounded-[32px] p-5 flex items-center justify-between shadow-sm active:scale-[0.98] active:bg-gray-50 transition-all duration-200 group relative"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-ube/10 rounded-2xl flex items-center justify-center text-ube group-active:rotate-12 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.407 2.67 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.407-2.67-1M12 16v-1" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-black text-gray-800 text-sm tracking-tight">{item.category}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <p className={`font-black text-base ${item.type === 'income' ? 'text-dartmouth' : 'text-valentine'}`}>
                          {item.type === 'income' ? '+' : '-'}{settings.symbol}{parseFloat(item.amount).toLocaleString()}
                        </p>
                        <button 
                          onClick={() => deleteTransaction(item.id)}
                          className="w-8 h-8 rounded-full bg-valentine/5 text-valentine flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
