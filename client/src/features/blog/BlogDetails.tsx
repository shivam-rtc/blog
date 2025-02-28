import React from "react";
import { useParams } from "react-router-dom";
import { courses } from "../../data";

const BlogDetails = () => {
  const { id } = useParams();
  const course = courses?.find((item) => item.id === Number(id)) ?? null;
  return (
    <div className="container mt-2 p-10 mx-auto text-gray-400 bg-amber-100">
      <h1 className="text-lg">{course?.title}</h1>
      <p>coursed ID: {id}</p>
    </div>
  );
};

export default BlogDetails;
