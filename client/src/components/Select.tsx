import React from "react";
interface SelectProps {
  title: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: {
    id: number;
    option: string;
  }[];
}

const Select: React.FC<SelectProps> = ({ title, options,onChange }) => {
 

  return (
    <>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
      {title}
      </label>
      <select
      onChange={onChange}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {
          options.map((opt)=>  <option key={opt.id} value={opt.option}>{opt.option}</option>)
        }
      </select>

      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>
    </>
  );
};

export default Select;
