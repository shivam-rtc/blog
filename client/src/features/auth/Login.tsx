import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = React.useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(user.email);
    navigate("/");
  };

  return (
    <div>
      <div className="">
        <form onSubmit={onSubmitHandler} className="shadow-sm shadow-gray-500 px-5 py-8 mt-5 outline-1 outline-gray-100 w-full max-w-sm mx-auto rounded-md">
          <h2 className="text-center font-bold text-gray-500">
            Sign up with email
          </h2>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email:
            </label>
            <input
              className="outline-1 p-1 rounded-sm mb-2 shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              type="text"
              placeholder="shivam@gmail.com"
              name="email"
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
              placeholder="shivam maurya"
              name="password"
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <input
              className="bg-blue-500 text-white w-full font-semibold outline-1 py-2 rounded-sm mt-2 hover:text-gray-300"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
