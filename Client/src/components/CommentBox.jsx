import React, { useState } from 'react';

function CommentBox() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    setComments([...comments, newComment]);
    setNewComment('');
  }

  return (
    <div>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <label>
          Comment:
          <input type="text" value={newComment} onChange={handleCommentChange} />
        </label>
        <button type="submit">Guardar comentario</button>
      </form>
    </div>
  );
}

export default CommentBox;