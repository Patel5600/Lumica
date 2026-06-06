import Head from 'next/head';
import { useExpenX } from '../hooks/useExpenX';

export default function Analysis() {
  const { transactions, totals, isLoaded } = useExpenX();

  if (!isLoaded) return <div className="p-10 text-center">Loading Analysis...</div>;

  // Group by category for chart
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

  const sortedCategories = Object.entries(categoryData)
    .sort((a, b) => b[1] - a[1]);

  const totalExpense = totals.expense || 1; // avoid div by zero

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>ExpenX – Analysis</title>
      </Head>

      <header className="bg-sunshade p-6 pb-10 text-white shadow-md">
        <h1 className="text-xl font-bold">Analysis</h1>
      </header>

      <div className="flex-1 px-4 -mt-4">
        <div className="bg-white rounded-[32px] p-8 shadow-sm mb-6">
          <h2 className="text-center text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Total Expense</h2>
          
          {/* Simple SVG Donut Chart */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-100" strokeWidth="3" />
              {/* This is a simplified single-segment chart for demo */}
              <circle 
                cx="18" cy="18" r="16" fill="none" 
                className="stroke-dartmouth" 
                strokeWidth="3" 
                strokeDasharray={`${(totals.expense / (totals.income || totals.expense || 1)) * 100} 100`} 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-black text-gray-800">${totals.expense.toFixed(0)}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">This Month</p>
            </div>
          </div>

          <div className="space-y-4">
            {sortedCategories.map(([cat, amt]) => (
              <div key={cat} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-700">{cat}</span>
                  <span className="font-bold text-gray-900">${amt.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-dartmouth h-full rounded-full" 
                    style={{ width: `${(amt / totalExpense) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
            {sortedCategories.length === 0 && (
              <p className="text-center text-gray-400 text-sm italic">No data to analyze yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
