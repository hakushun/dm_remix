import { useState, useEffect } from "react";
import { type Comment } from "~/types/comment";

type Props = {
  postId: number;
};

export function Comments({ postId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      const comments = await response.json();
      setComments(comments);
    }
    (async () => {
      await fetchComments();
      setLoading(false);
    })();
  }, [postId]);

  return loading ? (
    <div>loading...</div>
  ) : (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <h4>{comment.name}</h4>
          <p>{comment.body}</p>
          <cite>From: {comment.email}</cite>
        </li>
      ))}
    </ul>
  );
}
