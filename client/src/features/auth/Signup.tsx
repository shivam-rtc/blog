import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Signup = () => {
  const Navigate = useNavigate();
  const {signin}  = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onSubmitHandler = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin(user.email);
    Navigate("/");
  };  

  return (
    <div className="">
      <form onSubmit={onSubmitHandler} className="shadow-sm shadow-gray-500 px-5 py-8 mt-5 outline-1 outline-gray-100 w-full max-w-sm mx-auto rounded-md">
        <h2 className="text-center font-bold text-gray-500">
          Sign up with email
        </h2>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name:
          </label>
          <input
            className="outline-1 p-1 rounded-sm mb-2 shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            type="text"
            name="name"
            value={user.name}
            placeholder="shivam maurya"
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email:
          </label>
          <input
            className="outline-1 p-1 rounded-sm mb-2 shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            type="email"
            name="email"
            placeholder="shivam@gmail.com"
            value={user.email}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password:
          </label>
          <input
            className="outline-1 p-1 rounded-sm mb-2 shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            type="text"
            name="password"
            value={user.password}
            placeholder="shivam maurya"
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <button
            className="bg-blue-500 text-white w-full font-semibold outline-1 py-2 rounded-sm mt-2 hover:text-gray-300"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
