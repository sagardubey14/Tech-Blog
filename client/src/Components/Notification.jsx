import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimeLeft, setShowMsg } from "../features/notifications/noteSlice";

function Notification() {
  const message = useSelector((state) => state.message.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message.showMsg && message.time > -1) {
      const timer = setTimeout(() => {
        dispatch(setTimeLeft(message.time - 1));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (message.time === -1) {
      dispatch(setShowMsg(false));
    }
  }, [message, dispatch]);

  return (
    <>
      {message.showMsg && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-40">
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-white text-black rounded shadow-lg z-50 mt-4">
            {message.type === 0 && (
              <>
                <div className="relative w-full h-1 bg-gray-200">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-800"
                    style={{
                      transition: `width ${message.time === 3 ? 0 : 1}s linear`,
                      width: `${(message.time / 3) * 100}%`,
                    }}
                  ></div>
                </div>
                <div
                  id="alert-border-1"
                  className="flex items-center p-4 text-blue-800 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800"
                  role="alert"
                >
                  <div className="ms-3 text-sm font-medium">{message.msg}</div>
                  <button
                    type="button"
                    onClick={() => dispatch(setShowMsg(false))}
                    className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 ml-7 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                    data-dismiss-target="#alert-border-1"
                    aria-label="Close"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
              </>
            )}

            {message.type === 1 && (
              <>
                <div className="relative w-full h-1 bg-gray-200">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-800"
                    style={{
                      transition: `width ${message.time === 3 ? 0 : 1}s linear`,
                      width: `${(message.time / 3) * 100}%`,
                    }}
                  ></div>
                </div>
                <div
                  id="alert-border-2"
                  className="flex items-center p-4 text-red-800 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
                  role="alert"
                >
                  <div className="ms-3 text-sm font-medium">{message.msg}</div>
                  <button
                    type="button"
                    onClick={() => dispatch(setShowMsg(false))}
                    className="ms-auto -mx-1.5 -my-1.5 bg-red-50 ml-5 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                    data-dismiss-target="#alert-border-2"
                    aria-label="Close"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
              </>
            )}

            {message.type === 2 && (
              <>
                <div className="relative w-full h-1 bg-gray-200">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-800"
                    style={{
                      transition: `width ${message.time === 3 ? 0 : 1}s linear`,
                      width: `${(message.time / 3) * 100}%`,
                    }}
                  ></div>
                </div>
                <div
                  id="alert-border-3"
                  className="flex items-center p-4 text-green-800 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
                  role="alert"
                >
                  <div className="ms-3 text-sm font-medium">{message.msg}</div>
                  <button
                    type="button"
                    onClick={() => dispatch(setShowMsg(false))}
                    className="ms-auto -mx-1.5 -my-1.5 bg-green-50 ml-5 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                    data-dismiss-target="#alert-border-3"
                    aria-label="Close"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Notification;
