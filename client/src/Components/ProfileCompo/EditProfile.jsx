import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { updateUser } from "../../features/user/userSlice";

function EditProfile() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [newEmail, setNewEmail] = useState("");
  const [pass, setPass] = useState({
    oldPass: "",
    newPass: "",
  });
  const [recPass, setRecPass] = useState({
    newPass: "",
    confirmNewPass: "",
  });
  const [answer, setAnswer] = useState("");
  const [showRecovery, setShowRecovery] = useState(false);
  const [showNextForm, setShowNextForm] = useState(false);
  const [showChange, setShowChange] = useState("hidden");

  const handleEmailChange = () => {
    if (showChange === "hidden") {
      setShowChange("block");
    } else {
      setShowChange("hidden");
    }
  };
  const handleNewPassUpdate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/update/newpass",
        {
          newPass: recPass.newPass,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setShowNextForm(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePassUpdate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/update/pass",
        {
          oldPass: pass.oldPass,
          newPass: pass.newPass,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const submitAnswer = async () => {
    console.log(answer);
    try {
      const response = await axios.post(
        "http://localhost:3001/update/ans",
        { answer: answer },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.message === "Wrong") {
        console.log("The Answer is Wrong");
        setShowRecovery(false);
      } else {
        console.log("The Answer is Right");
        setShowRecovery(false);
        setShowNextForm(true);
      }
    } catch (error) {
      console.log(error);
    }
    setAnswer("");
  };
  const handleEmailUpdate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/update/email",
        { newEmail: newEmail },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      dispatch(updateUser({ email: response.data.email }));
    } catch (error) {
      console.log(error);
    }
    setNewEmail("");
  };
  return (
    <div className="mt-10 flex flex-col justify-center items-center">
      {showRecovery && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
          <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Security Question
              </h5>
              <button
                onClick={() => setShowRecovery(false)}
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                X
              </button>
            </div>
            <div className="mt-4">
              <label className="block text-xl text-gray-500 dark:text-gray-400">
                {user.question}
              </label>
              <div className="relative mt-3 flex overflow-hidden rounded-md border border-gray-200 focus-within:border-blue-600">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full border-none bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
                  placeholder="Your answer..."
                />
              </div>
              <button
                onClick={submitAnswer}
                className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {showNextForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
          <div
            className={`w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 ${
              showNextForm ? "slide-in-right" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Set Your New Password
              </h5>
              <button
                onClick={() => setShowNextForm(false)}
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                X
              </button>
            </div>
            <label name="login-password" className="flex-grow mt-2">
              <span className="text-sm text-gray-500">New Password</span>
              <div className="relative flex overflow-hidden mb-4 rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="password"
                  id="current-password"
                  name="newPass"
                  className="w-full border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="***********"
                  value={recPass.newPass}
                  onChange={(e) =>
                    setRecPass({
                      ...recPass,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </label>
            <label name="login-password" className="flex-grow mt-2">
              <span className="text-sm text-gray-500">Confirm Password</span>
              <div className="relative flex overflow-hidden mb-4 rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="password"
                  id="current-password"
                  name="confirmNewPass"
                  className="w-full border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="***********"
                  value={recPass.confirmNewPass}
                  onChange={(e) =>
                    setRecPass({
                      ...recPass,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </label>
            <button
              onClick={handleNewPassUpdate}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Update Password
            </button>
          </div>
        </div>
      )}
      <div className="w-full sm:w-auto p-4 sm:bg-gray-50 sm:px-8 sm:shadow rounded-xl">
        <div className="pt-4">
          <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
          <p className="text-slate-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
        </div>
        <hr className="mt-4 mb-8" />
        <p className="py-2 text-xl font-semibold">Email Address</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600">
            Your email address is <strong>{user.email}</strong>
          </p>
          <button
            onClick={handleEmailChange}
            className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2 mt-2 sm:mt-0"
          >
            {showChange === "hidden" ? "change" : "cancel"}
          </button>
        </div>

        <div
          className={`${showChange} flex flex-col sm:flex-row sm:items-center sm:space-x-2 md:mt-4 mt-4 sm:mt-0`}
        >
          <input
            type="email"
            placeholder="New email address"
            className="p-2 rounded border border-gray-300"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button
            onClick={handleEmailUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2 sm:mt-0"
          >
            Update Email
          </button>
        </div>

        <hr className="mt-4 mb-8" />
        <p className="py-2 text-xl font-semibold">Password</p>
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-3 sm:flex-row">
            <label name="login-password" className="flex-grow">
              <span className="text-sm text-gray-500">Current Password</span>
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="password"
                  id="current-password"
                  name="oldPass"
                  className="w-full border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="***********"
                  value={pass.oldPass}
                  onChange={(e) =>
                    setPass({
                      ...pass,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </label>
            <label name="login-password" className="flex-grow">
              <span className="text-sm text-gray-500">New Password</span>
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="password"
                  id="new-password"
                  name="newPass"
                  className="w-full border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="***********"
                  value={pass.newPass}
                  onChange={(e) =>
                    setPass({
                      ...pass,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </label>
          </div>
        </div>
        <p className="mt-2">
          Can't remember your current password?{" "}
          <button
            onClick={() => setShowRecovery(true)}
            className="text-sm font-semibold text-blue-600 underline decoration-2"
          >
            Recover Account
          </button>
        </p>
        <button
          onClick={handlePassUpdate}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Save Password
        </button>
        <hr className="mt-4 mb-8" />
        <div className="mb-10">
          <p className="py-2 text-xl font-semibold">Delete Account</p>
          <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" />
            </svg>
            Proceed with caution
          </p>
          <p className="mt-2">
            Make sure you have taken backup of your account in case you ever
            need to get access to your data. We will completely wipe your data.
            There is no way to access your account after this action.
          </p>
          <button className="mt-2 text-sm font-semibold text-rose-600 underline decoration-2">
            Continue with deletion
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
