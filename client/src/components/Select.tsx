import React from "react";
import { tags } from "../data";

interface SelectProps {
  title: string;
  options: {
    id: number;
    option: string;
  }[];
}

const Select: React.FC<SelectProps> = ({ title, options }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value);
    console.log("Selected Tag:", event.target.value);
  };
  return (
    <div>
      <form className="max-w-sm">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {title}
        </label>
        <select
        multiple
          id="tags"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose a tag</option>
          {options?.map((tag) => (
            <option value={tag.option}>{tag.option}</option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default Select;
