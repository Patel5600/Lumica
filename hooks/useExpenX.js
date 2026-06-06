import { useState, useEffect, useMemo } from 'react';

const STORAGE_KEY = 'expenx_transactions';

export function useExpenX() {
  const [transactions, setTransactions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setTransactions(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse transactions', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever transactions change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions, isLoaded]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      amount: 0,
      currency: 'USD',
      category: 'General',
      type: 'expense',
      ...transaction
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
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

  // Group transactions by date
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

  return {
    transactions,
    groupedTransactions,
    addTransaction,
    deleteTransaction,
    totals,
    isLoaded
  };
}
