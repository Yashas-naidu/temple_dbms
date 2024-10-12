import React, { useEffect } from 'react';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4 rounded-lg shadow-lg z-50 transition-transform transform scale-100 animate-slide-in">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h1m-1 8a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <p className="flex-1">{message}</p>
      </div>
      <div className="w-full h-1 bg-blue-300 mt-2 relative overflow-hidden">
        <div
          className="h-1 bg-white"
          style={{
            animation: 'progress 2s linear',
            width: '100%',
          }}
        />
      </div>
      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes slide-in {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Notification;
