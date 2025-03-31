import React from "react";
import { Link } from "react-router-dom";

interface courseProps {
  course: {
    _id?: string;
    title: string;
    content: string;
    category: string[];
    status: "draft" | "published" | string;
    image: string;
  };
}

const Card: React.FC<courseProps> = ({ course }) => {
  return (
    <div className="h-[350px] relative max-w-sm  bg-white border border-gray-200 rounded-sm shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <img
        className="w-full rounded-sm"
        src={`http://localhost:4000/${course?.image?.replace("/uploads", "")}`}
        alt=""
      />
      <div className="p-2">
        <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {course.title}
        </h5>
        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
          Here are the big gest en te rp rise te chn ology acquis itions of 2021
          so
        </p>
        <div className="">
          <Link
            to={`/details/${course._id}`}
            className="absolute bottom-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
