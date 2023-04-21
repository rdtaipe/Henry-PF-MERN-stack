import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentBox() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  }

  useEffect(() => {
    axios.get('http://localhost:5000/comments')
      .then((response) => {
        setComments([response.data[response.data.length - 1]]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() !== '') {
      axios.post('http://localhost:5000/comments/send', {
        message: newComment,
        name:"yo"
      })
        .then((response) => {
          setComments([response.data]);
          setNewComment('');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className="max-w-xl mx-auto rounded-lg overflow-hidden shadow-lg">
      <h2 className="font-bold text-xl text-white p-4 bg-gray-700">Comments:</h2>
      <div className="p-2 bg-gray-700 max-h-30 overflow-y-scroll custom-scrollbar">
        {comments.length > 0 &&
          <div key={comments[0]._id} className="flex py-2">
            <div>
              <p className="font-semibold text-gray-100">{comments[0].name}</p>
              <p className="text-gray-100">{comments[0].message}</p>
            </div>
          </div>
        }
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