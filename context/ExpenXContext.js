import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const ExpenXContext = createContext();

const STORAGE_KEY = 'expenx_transactions';
const SETTINGS_KEY = 'expenx_settings';
const BUDGETS_KEY = 'expenx_budgets';

export function ExpenXProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [settings, setSettings] = useState({ currency: 'USD', symbol: '$' });
  const [budgets, setBudgets] = useState({}); // { category: limit }
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem(STORAGE_KEY);
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    const savedBudgets = localStorage.getItem(BUDGETS_KEY);
    
    if (savedTransactions) {
      try {
        setTransactions(JSON.parse(savedTransactions));
      } catch (e) {
        console.error('Failed to parse transactions', e);
      }
    }
    
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to parse settings', e);
      }
    }

    if (savedBudgets) {
        try {
          setBudgets(JSON.parse(savedBudgets));
        } catch (e) {
          console.error('Failed to parse budgets', e);
        }
    }
    
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }
  }, [settings, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
    }
  }, [budgets, isLoaded]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      timestamp: new Date().toISOString(),
      amount: 0,
      currency: settings.currency,
      category: 'General',
      type: 'expense',
      ...transaction
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateCurrency = (currency, symbol) => {
    setSettings(prev => ({ ...prev, currency, symbol }));
  };

  const updateBudget = (category, limit) => {
    setBudgets(prev => ({ ...prev, [category]: limit }));
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear ALL data? This cannot be undone.')) {
      setTransactions([]);
      setBudgets({});
    }
  };

  const exportData = () => {
    const headers = ['Date', 'Type', 'Category', 'Amount', 'Currency'];
    const rows = transactions.map(t => [
      new Date(t.timestamp).toLocaleDateString(),
      t.type,
      t.category,
      t.amount,
      t.currency
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `expenx_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totals = useMemo(() => {
    return transactions.reduce((acc, t) => {
      const amount = parseFloat(t.amount) || 0;
      if (t.type === 'income') {
        acc.income += amount;
        acc.balance += amount;
      } else {
        acc.expense += amount;
        acc.balance -= amount;
      }
      return acc;
    }, { income: 0, expense: 0, balance: 0 });
  }, [transactions]);

  const groupedTransactions = useMemo(() => {
    const groups = {};
    transactions.forEach(t => {
      const date = new Date(t.timestamp).toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      });
      if (!groups[date]) groups[date] = [];
      groups[date].push(t);
    });
    return Object.entries(groups).map(([date, items]) => ({ date, items }));
  }, [transactions]);

  const value = {
    transactions,
    groupedTransactions,
    addTransaction,
    deleteTransaction,
    updateCurrency,
    updateBudget,
    budgets,
    clearAllData,
    exportData,
    totals,
    settings,
    isLoaded
  };

  return (
    <ExpenXContext.Provider value={value}>
      {children}
    </ExpenXContext.Provider>
  );
}

export function useExpenXContext() {
  const context = useContext(ExpenXContext);
  if (!context) {
    throw new Error('useExpenXContext must be used within an ExpenXProvider');
  }
  return context;
}
