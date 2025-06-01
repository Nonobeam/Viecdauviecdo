import React, { useEffect, useState } from "react";

function SuccessPage() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) {
      // In a real app, you would redirect to homepage here
      console.log("Redirecting to homepage...");
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-indigo-600 h-28"></div>
      
      <div className="flex justify-center items-center min-h-[calc(100vh-7rem)]">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg p-8">
          <div className="text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Main Message */}
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Payment successfully made
            </h1>
            
            <p className="text-gray-600 mb-6">
              Redirect back to Home page
            </p>

            {/* Countdown */}
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Redirecting in {countdown} seconds...
              </p>
            </div>

            {/* Manual redirect button */}
            <button 
              onClick={() => console.log("Redirecting to homepage...")}
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              Go to Home Page Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;