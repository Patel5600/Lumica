import Head from 'next/head';
import { useExpenX } from '../hooks/useExpenX';

export default function Records() {
  const { groupedTransactions, totals, isLoaded, addTransaction } = useExpenX();

  if (!isLoaded) return <div className="p-10 text-center">Loading ExpenX...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>ExpenX – Money Manager</title>
      </Head>

      {/* Branded Header */}
      <header className="bg-sunshade p-6 pb-10 text-white shadow-md">
        <h1 className="text-xl font-bold mb-4 opacity-90">ExpenX</h1>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Income</p>
            <p className="text-lg font-bold text-dartmouth">+{totals.income.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Expense</p>
            <p className="text-lg font-bold text-valentine">-{totals.expense.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Balance</p>
            <p className="text-lg font-bold">{totals.balance.toFixed(2)}</p>
          </div>
        </div>
      </header>

      {/* Transaction List (The Ledger) */}
      <div className="flex-1 px-4 -mt-4">
        {groupedTransactions.length === 0 ? (
          <div className="mt-20 text-center text-gray-400">
            <p className="text-lg">No records yet.</p>
            <p className="text-sm">Tap the + button to start tracking.</p>
            {/* Quick Add for Demo */}
            <button 
              onClick={() => addTransaction({ amount: 50, type: 'expense', category: 'Food' })}
              className="mt-4 text-sunshade font-medium"
            >
              Add Sample Expense
            </button>
          </div>
        ) : (
          <div className="space-y-6 pb-10">
            {groupedTransactions.map((group) => (
              <section key={group.date}>
                <h3 className="text-gray-500 text-xs font-semibold mb-3 ml-2 uppercase tracking-wide">
                  {group.date}
                </h3>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm active:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-ube/10 rounded-xl flex items-center justify-center text-ube">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.407 2.67 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.407-2.67-1M12 16v-1" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{item.category}</p>
                          <p className="text-xs text-gray-400">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                      <p className={`font-bold ${item.type === 'income' ? 'text-dartmouth' : 'text-valentine'}`}>
                        {item.type === 'income' ? '+' : '-'}{parseFloat(item.amount).toFixed(2)}
                      </p>
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
