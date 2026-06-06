import Head from 'next/head';
import { useExpenX } from '../hooks/useExpenX';

export default function Analysis() {
  const { transactions, totals, isLoaded, settings } = useExpenX();

  if (!isLoaded) return <div className="p-10 text-center font-bold text-sunshade animate-pulse">ExpenX is loading...</div>;

  // Group by category for chart
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

  const sortedCategories = Object.entries(categoryData)
    .sort((a, b) => b[1] - a[1]);

  const totalExpense = totals.expense || 1;

  return (
    <div className="flex flex-col min-h-screen bg-eggshell">
      <Head>
        <title>ExpenX – Analysis</title>
      </Head>

      <header className="bg-sunshade p-8 pb-14 text-white shadow-2xl rounded-b-[48px] relative z-10">
        <h1 className="text-2xl font-black tracking-tighter">Analysis</h1>
      </header>

      <div className="flex-1 px-6 -mt-8 pb-24 relative z-20">
        <div className="bg-white rounded-[40px] p-8 shadow-sm mb-6">
          <h2 className="text-center text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">Expense Distribution</h2>
          
          {/* Branded Donut Chart */}
          <div className="relative w-56 h-56 mx-auto mb-10">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-50" strokeWidth="3.5" />
              {/* Dynamic segment logic - simplified for single dominant or empty */}
              <circle 
                cx="18" cy="18" r="16" fill="none" 
                className="stroke-sunshade" 
                strokeWidth="3.5" 
                strokeDasharray={`${(totals.expense / (totals.income || totals.expense || 1)) * 100} 100`} 
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-black text-gray-800 tracking-tighter">{settings.symbol}{totals.expense.toLocaleString()}</p>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Total</p>
            </div>
          </div>

          <div className="space-y-6">
            {sortedCategories.map(([cat, amt]) => (
              <div key={cat} className="space-y-2 group">
                <div className="flex justify-between items-end">
                  <span className="font-black text-gray-700 text-sm tracking-tight">{cat}</span>
                  <span className="font-black text-gray-900 text-sm">{settings.symbol}{amt.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-50 h-2.5 rounded-full overflow-hidden border border-gray-100">
                  <div 
                    className="bg-sunshade h-full rounded-full transition-all duration-1000 ease-out shadow-sm" 
                    style={{ width: `${(amt / totalExpense) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
            {sortedCategories.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-300 text-sm font-bold italic">Gathering data for analysis...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
