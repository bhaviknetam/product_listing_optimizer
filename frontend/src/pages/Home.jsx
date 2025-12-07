import React, { useState, useEffect } from 'react';
import CompareView from './CompareView';
import api from '../utils/api';

const STORAGE_KEY = 'lastOptimizationResult';

export default function Home() {
  const [asin, setAsin] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleOptimize = async () => {
    setError('');
    if (!asin.trim()) {
      setError("Please enter an ASIN.");
      return;
    }

    setLoading(true);
    try {
      const data = await api.optimizeListing(asin);

      setResult(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      setError(err.message || 'Failed to optimize.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Amazon Listing Optimizer
        </h1>
        <p className="text-gray-600 mt-3">
          Enhance your product’s visibility with AI-powered optimization.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4 border border-gray-100">
        <div className="flex gap-3">
          <input
            type="text"
            value={asin}
            onChange={(e) => setAsin(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter ASIN (e.g. B08X...)"
          />
          <button
            onClick={handleOptimize}
            disabled={loading}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Optimizing..." : "Optimize"}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* Results */}
      {loading && (
        <div className="mt-10">
          <CompareView loading />
        </div>
      )}

      {result && !loading && (
        <div className="mt-10 fade-in">
          <CompareView original={result.original} optimized={result.optimized} />
        </div>
      )}
    </div>
  );
}
