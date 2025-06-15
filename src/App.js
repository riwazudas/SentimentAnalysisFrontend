import React, { useState, useEffect } from 'react';

// Main App Component
const App = () => {
  // State management
  const [review, setReview] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [showStartupModal, setShowStartupModal] = useState(true);

  // --- API Configuration ---
  const API_URL = '/api/predict';

  // Trigger entry animation on component mount
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // --- Helper Components ---

  /**
   * A modal that displays on startup to inform the user about server wake-up times.
   */
  const StartupModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-300 scale-100">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Welcome!</h2>
        <p className="text-gray-600 text-center mb-6">
          Just a quick note: The backend server might take 20-30 seconds to start up if it's been idle. Your first request may be a bit slow, but it will be much faster after that!
        </p>
        <button
          onClick={() => setShowStartupModal(false)}
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg"
        >
          Got it!
        </button>
      </div>
    </div>
  );

  /**
   * A prominent loading indicator to show during API calls.
   */
  const LoadingIndicator = () => (
    <div className="flex flex-col items-center justify-center text-center p-4 text-gray-500">
        <svg className="animate-spin h-10 w-10 text-indigo-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-lg font-semibold">Analyzing your text...</p>
        <p>This may take a moment.</p>
    </div>
  );

  /**
   * Displays the final sentiment prediction result.
   */
  const ResultDisplay = ({ prediction }) => {
    if (!prediction) return null;
    const { prediction: sentiment, confidence } = prediction;
    const isPositive = sentiment === 'Positive';
    const cardColor = isPositive ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500';
    const textColor = isPositive ? 'text-green-800' : 'text-red-800';
    const emoji = isPositive ? '😊' : '😞';

    return (
      <div className={`mt-6 p-5 border-l-4 rounded-r-lg shadow-lg ${cardColor} ${textColor} result-card`}>
        <h3 className="text-xl font-bold flex items-center mb-2">
          Prediction: {sentiment} {emoji}
        </h3>
        <p className="text-lg">Confidence: <strong>{parseFloat(confidence).toFixed(2)}%</strong></p>
      </div>
    );
  };
  
  // --- Event Handlers ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim() || isLoading) return;
    setIsLoading(true);
    setResult(null);
    setError('');
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Review: review }),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Failed to fetch sentiment:", err);
      setError('Failed to get sentiment. Please ensure the backend server is running and accessible.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClear = () => {
      setReview('');
      setResult(null);
      setError('');
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes flipIn { from { transform: perspective(400px) rotateX(90deg); opacity: 0; } to { transform: perspective(400px) rotateX(0deg); opacity: 1; } }
        .main-card-enter { animation: fadeInUp 0.7s ease-out forwards; }
        .result-card { animation: flipIn 0.6s ease-in-out forwards; }
      `}</style>
      
      {showStartupModal && <StartupModal />}
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center font-sans p-4">
        <div className={`w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 md:p-10 transform transition-all duration-500 ${isMounted ? 'main-card-enter' : 'opacity-0'}`}>
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Sentiment Sense</h1>
            <p className="text-gray-600 mt-3 text-lg">Uncover the emotion behind the words.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="e.g., 'This product is amazing, I highly recommend it!'"
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none shadow-sm"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               <button
                type="submit"
                disabled={isLoading || !review.trim()}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg"
              >
                {isLoading ? 'Analyzing...' : 'Predict Sentiment'}
              </button>
               <button type="button" onClick={handleClear} disabled={isLoading} className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 disabled:bg-gray-300 transition-colors duration-300 shadow-md">
                Clear
              </button>
            </div>
          </form>
          <div className="mt-8 min-h-[120px]">
            {isLoading && <LoadingIndicator />}
            {error && <p className="text-red-500 text-center text-lg">{error}</p>}
            {result && <ResultDisplay prediction={result} />}
            {!result && !error && !isLoading && (
              <div className="text-center text-gray-400 p-4">
                <p className="text-lg">Your analysis result will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
