import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { addComment } from "../../app/slices/commentsSlice";

interface CommentsProps {
  postId: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { comments, loading, error } = useSelector((state: RootState) => state.comments);

  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      dispatch(addComment({ postId, text: commentText }));
      setCommentText("");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full border rounded p-3 mb-2"
          placeholder="Write your comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={3}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      <div>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="border-b py-3">
              <p className="font-semibold">{comment.user?.name}</p>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
