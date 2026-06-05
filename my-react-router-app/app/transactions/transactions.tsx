import { useEffect, useState } from "react";

type Transaction = {
  id: number;
  amount: number;
  description: string;
  createdAt: string;
};

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/transactions`)
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch(() => setError("Failed to load transactions"));
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }

      setTransactions((prev) => [...prev, data]);
      setAmount("");
      setDescription("");
    } catch {
      setError("Failed to submit transaction");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex max-w-xl flex-col gap-8 p-6">
      <h1 className="text-2xl font-bold">Transactions</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Amount</span>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="rounded border border-gray-300 p-2"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Description</span>
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="rounded border border-gray-300 p-2"
            required
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-blue-600 p-2 font-medium text-white disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Add Transaction"}
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      <ul className="flex flex-col gap-2">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex justify-between rounded border border-gray-200 p-3"
          >
            <span>{transaction.description}</span>
            <span className="font-medium">
              ${transaction.amount.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
