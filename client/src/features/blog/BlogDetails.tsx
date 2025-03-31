import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { getPostById } from "../../app/slices/blogSlice";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { postDetail, loading, error } = useSelector(
    (state: RootState) => state.blog
  );

  React.useEffect(() => {
    if (id) {
      dispatch(getPostById(id));
    }
  }, [id, dispatch]);

  console.log("postSetail", postDetail);
  console.log("id", id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg m-3">
      {postDetail && (
        <>
          <h1 className="text-3xl font-bold text-gray-900">
            {postDetail.title}
          </h1>

          <div className="flex items-center mt-2 text-gray-600">
            <p className="font-semibold">{postDetail.author.name}</p>
            <span className="mx-2">|</span>
            <p className="text-sm">
              {new Date(postDetail.createdAt).toLocaleDateString()}
            </p>
          </div>

          {postDetail.image && (
            <img
              src={`http://localhost:4000/${postDetail?.image?.replace(
                "/uploads",
                ""
              )}`}
              alt={postDetail.title}
              className="w-full h-80 object-cover mt-4 rounded-md"
            />
          )}

          <p className="mt-6 text-gray-700 leading-relaxed">
            {postDetail.content}
          </p>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900">Comments</h2>
            <div className="mt-4">
              {postDetail?.comments.length > 0 ? (
                postDetail?.comments.map((comment, index) => (
                  <div key={index} className="border-b py-3">
                    <p className="font-semibold">{comment.user.name}</p>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogDetails;
