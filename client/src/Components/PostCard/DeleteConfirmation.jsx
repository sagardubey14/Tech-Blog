import React from 'react';

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-darkBlue bg-opacity-75">
      <div className="bg-slate-800 rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this post?</h2>
        <div className="flex justify-end">
          <button
            className="bg-coral text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-600"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
