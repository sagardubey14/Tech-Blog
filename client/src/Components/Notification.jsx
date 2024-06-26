import { useState, useEffect } from 'react';

function Notification() {
  const [showMsg, setShowMsg] = useState(true);
  const [timeLeft, setTimeLeft] = useState(5); // Timer state initialized to 5 seconds

  useEffect(() => {
    if (showMsg && timeLeft > -1) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === -1) {
      setShowMsg(false);
    }
  }, [showMsg, timeLeft]);

  return (
    <>
      {showMsg && (
        <>
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-40"></div>
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-white text-black p-4 rounded shadow-lg z-50 mt-4">
            <div className="flex justify-between items-center">
              <span>Message</span>
              <button
                onClick={() => setShowMsg(false)}
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                X
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-500">Disappearing in {timeLeft} seconds</div>
            <div className="relative w-full h-1 mt-2 bg-gray-200">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500"
                style={{
                  transition: `width ${timeLeft === 5 ? 0 : 1}s linear`,
                  width: `${(timeLeft / 5) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Notification;
