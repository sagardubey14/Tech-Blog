import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setTimeLeft, setShowMsg } from '../features/notifications/noteSlice';


function Notification() {
  const message = useSelector(state=>state.message.message)
  const dispatch = useDispatch()

  useEffect(() => {
    if (message.showMsg && message.time > -1) {
      const timer = setTimeout(() => {
        dispatch(setTimeLeft(message.time - 1))
      }, 1000);
      return () => clearTimeout(timer);
    } else if (message.time === -1) {
      dispatch(setShowMsg(false))
    }
  }, [message, dispatch]);

  return (
    <>
      {message.showMsg && (
        <>
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-40"></div>
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-white text-black p-4 rounded shadow-lg z-50 mt-4">
            <div className="flex justify-between items-center">
              <span>{message.msg}</span>
              <button
                onClick={() => dispatch(setShowMsg(false))}
                className="text-sm font-medium text-blue-600 ml-2 hover:underline dark:text-blue-500"
              >
                x
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-500">Disappearing in {message.time} seconds</div>
            <div className="relative w-full h-1 mt-2 bg-gray-200">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500"
                style={{
                  transition: `width ${message.time === 5 ? 0 : 1}s linear`,
                  width: `${(message.time / 5) * 100}%`,
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
