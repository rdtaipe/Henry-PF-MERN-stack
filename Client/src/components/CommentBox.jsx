import React, { useState } from 'react';
//hola que hace 
function CommentBox() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (comments.length >= 1) {
      setComments([...comments.slice(1), newComment]);
    } else {
      setComments([...comments, newComment]);
    }
    setNewComment('');
  }

  return (
    <div className="max-w-xl mx-auto rounded-lg overflow-hidden shadow-lg">
      <h2 className="font-bold text-xl text-white p-4 bg-gray-700">Comments:</h2>
      <div className="p-2 bg-gray-700 max-h-30 overflow-y-scroll custom-scrollbar">
  {comments.slice(0).reverse().map((comment, index) => (
    <div key={index} className="flex py-2">
      <div>
        <p className="font-semibold text-gray-100">{`Usuario`}</p>
        <p className="text-gray-100">{comment}</p>
      </div>
    </div>
  ))}
</div>
      <form className="p-4 bg-gray-700" onSubmit={handleCommentSubmit}>
        <div className="flex items-center">
          <input className="w-full rounded-full border border-gray-100 py-2 px-4 focus:outline-none focus:border-blue-400" type="text" value={newComment} onChange={handleCommentChange} placeholder="Product feedback ... " />
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full ml-4" type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}

export default CommentBox;