import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { allPosts } from "../../app/slices/blogSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";

const BlogList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { posts, loading } = useSelector((state: RootState) => state.blog);
console.log("first", posts)
  useEffect(() => {
    dispatch(allPosts());
  }, []);
  
 
  return (
    <>
      <div className="containe place-items-center mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {posts
          ? posts?.map((content) => (
              <Link to={`/details/${content._id}`}>
                <Card key={content._id} course={content} />{" "}
              </Link>
            ))
          : "not found"}
      </div>
    </>
  );
};

export default BlogList;
