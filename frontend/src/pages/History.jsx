import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import CompareView from './CompareView';

export default function History() {
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/history").then(async (res) => {
      const json = await res.json();
      setHistory(json || []);
    });
  }, []);

  const filtered = history.filter(item =>
    item.asin.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Sidebar */}
      <div className="bg-white border border-gray-100 shadow rounded-xl p-4 h-[85vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">History</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search ASIN..."
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            className={`p-3 rounded-lg cursor-pointer mb-3 border transition
              ${selected?.id === item.id ? "bg-blue-50 border-blue-300" : "bg-gray-50 border-gray-200 hover:bg-gray-100"}`}
          >
            <p className="font-semibold">{item.asin}</p>
            <p className="text-sm text-gray-500">
              {item.optimized_title?.slice(0, 40) || "No title"}
            </p>
          </div>
        ))}
      </div>

      {/* Detail Panel */}
      <div className="md:col-span-2 bg-white shadow rounded-xl border border-gray-100 p-6">
        {!selected ? (
          <p className="text-center text-gray-400 py-20 text-lg">
            Select an item to view details.
          </p>
        ) : (
          <CompareView
            original={{
              title: selected.original_title,
              bullets: selected.original_bullets,
              description: selected.original_description
            }}
            optimized={{
              title: selected.optimized_title,
              bullets: selected.optimized_bullets,
              description: selected.optimized_description,
              keywords: selected.keywords
            }}
          />
        )}
      </div>
    </div>
  );
}
