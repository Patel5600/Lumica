import Head from 'next/head';
import { useExpenX } from '../hooks/useExpenX';

export default function Budget() {
  const { budgets, updateBudget, transactions, settings } = useExpenX();
  
  const categories = ['Food', 'Shopping', 'Transport', 'Health', 'Entertain', 'Education'];

  return (
    <div className="flex flex-col min-h-screen bg-eggshell">
      <Head>
        <title>ExpenX – Budget</title>
      </Head>

      <header className="bg-sunshade p-8 pb-14 text-white shadow-2xl rounded-b-[48px] relative z-10">
        <h1 className="text-2xl font-black tracking-tighter">Budget</h1>
      </header>

      <div className="flex-1 px-6 -mt-8 pb-24 relative z-20">
        <div className="space-y-4">
          {categories.map(cat => {
            const limit = budgets[cat] || 0;
            const spent = transactions
                .filter(t => t.category === cat && t.type === 'expense')
                .reduce((sum, t) => sum + parseFloat(t.amount), 0);
            const percentage = limit > 0 ? (spent / limit) * 100 : 0;
            
            return (
                <div key={cat} className="ios-card p-6">
                    <div className="flex justify-between mb-3">
                        <span className="font-black text-gray-800">{cat}</span>
                        <input 
                            type="number"
                            value={limit}
                            onChange={(e) => updateBudget(cat, parseFloat(e.target.value))}
                            className="w-20 text-right font-black text-sunshade bg-sunshade/5 rounded-lg px-2"
                        />
                    </div>
                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-500 ${percentage > 100 ? 'bg-valentine' : 'bg-dartmouth'}`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                    </div>
                    <p className="text-[10px] font-black text-gray-400 mt-2 uppercase">
                        Spent {settings.symbol}{spent.toLocaleString()} / {settings.symbol}{limit.toLocaleString()}
                    </p>
                </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
