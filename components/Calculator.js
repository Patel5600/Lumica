import { useState } from 'react';

const CATEGORIES = [
  { name: 'Food', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { name: 'Shopping', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  { name: 'Transport', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
  { name: 'Health', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { name: 'Entertain', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
  { name: 'Education', icon: 'M12 14l9-5-9-5-9 5 9 5z' },
  { name: 'Salary', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.407 2.67 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.407-2.67-1M12 16v-1', type: 'income' },
  { name: 'Other', icon: 'M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z' },
];

export default function Calculator({ isOpen, onClose, onSave }) {
  const [display, setDisplay] = useState('0');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [type, setType] = useState('expense');

  if (!isOpen) return null;

  const handleNumber = (num) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOperator = (op) => {
    setDisplay(prev => prev + op);
  };

  const calculate = () => {
    try {
      // Basic math only for this MVP
      const result = eval(display.replace(/[^-+*/.0-9]/g, ''));
      setDisplay(result.toString());
    } catch (e) {
      setDisplay('Error');
    }
  };

  const save = () => {
    let finalAmount = display;
    try {
      finalAmount = eval(display.replace(/[^-+*/.0-9]/g, ''));
    } catch (e) {}
    
    onSave({
      amount: parseFloat(finalAmount) || 0,
      category: category.name,
      type: type,
      timestamp: new Date().toISOString()
    });
    setDisplay('0');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex flex-col justify-end">
      <div className="bg-eggshell rounded-t-[32px] p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onClose} className="text-gray-400">Cancel</button>
          <div className="flex bg-gray-200 rounded-full p-1">
            <button 
              onClick={() => setType('expense')}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-colors ${type === 'expense' ? 'bg-valentine text-white' : 'text-gray-500'}`}
            >
              Expense
            </button>
            <button 
              onClick={() => setType('income')}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-colors ${type === 'income' ? 'bg-dartmouth text-white' : 'text-gray-500'}`}
            >
              Income
            </button>
          </div>
          <button onClick={save} className="text-sunshade font-bold">Save</button>
        </div>

        {/* Display */}
        <div className="bg-white rounded-2xl p-6 mb-6 text-right shadow-inner">
          <p className="text-xs text-gray-400 mb-1">{category.name}</p>
          <p className="text-4xl font-bold text-gray-800 truncate">{display}</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {CATEGORIES.filter(c => !c.type || c.type === type).map((c) => (
            <button 
              key={c.name}
              onClick={() => setCategory(c)}
              className="flex flex-col items-center space-y-2"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${category.name === c.name ? 'bg-sunshade text-white shadow-md' : 'bg-white text-gray-400'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={c.icon} />
                </svg>
              </div>
              <span className={`text-[10px] font-medium ${category.name === c.name ? 'text-sunshade' : 'text-gray-400'}`}>{c.name}</span>
            </button>
          ))}
        </div>

        {/* Calculator Pad */}
        <div className="grid grid-cols-4 gap-3">
          {['7', '8', '9', '/'].map(k => <PadButton key={k} label={k} onClick={() => isNaN(k) ? handleOperator(k) : handleNumber(k)} />)}
          {['4', '5', '6', '*'].map(k => <PadButton key={k} label={k} onClick={() => isNaN(k) ? handleOperator(k) : handleNumber(k)} />)}
          {['1', '2', '3', '-'].map(k => <PadButton key={k} label={k} onClick={() => isNaN(k) ? handleOperator(k) : handleNumber(k)} />)}
          {['0', '.', '=', '+'].map(k => <PadButton key={k} label={k} onClick={k === '=' ? calculate : () => isNaN(k) && k !== '.' ? handleOperator(k) : handleNumber(k)} highlight={k === '='} />)}
        </div>
      </div>
    </div>
  );
}

function PadButton({ label, onClick, highlight }) {
  return (
    <button 
      onClick={onClick}
      className={`h-14 rounded-xl flex items-center justify-center text-xl font-bold transition-transform active:scale-90 ${highlight ? 'bg-sunshade text-white' : 'bg-white text-gray-600 shadow-sm'}`}
    >
      {label}
    </button>
  );
}
