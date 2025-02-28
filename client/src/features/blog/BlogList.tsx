import React from "react";
import Card from "../../components/Card";
import { courses } from "../../data";

const BlogList = () => {
  return (
    <>
      <div className="containe place-items-center mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {courses.map((course) => (
          <Card key={course.id} course={course} />
        ))}
      </div>
    </>
  );
};

export default BlogList;
