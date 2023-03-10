import './Comment.css';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";

const Comment = ({ comment, setUpdated }) => {
  const createdBy = comment.author._id;
  const currentUser = window.localStorage.getItem("user_id");

  const handleDelete = async (e) => {
    e.preventDefault();

    let response = await fetch(`/comments/${comment._id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status === 204) {
      setUpdated(true);
    }
  }
  
  return (
    <div className="comment">
      <div className="comment-header">
          <div className="c-profile-picture-div">
            <img className="c-profile-picture" src={comment.author.profilePicture} />
          </div>
          <div className="comment-name-timestamp-container">
            <Link to={`/users/${comment.author._id}`} className="comment-author-link" >
              <h4 className="comment-author">{comment.author.name}</h4>
            </Link>
            <p className="comment-timestamp">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
          </div>
        { createdBy === currentUser ?
          <button className="delete-comment-button" onClick={handleDelete}>Delete</button> : null
        }
      </div>    
      <p className="comment-message">{ comment.message }</p>
      <img
        className='comment-image'
        src={comment.image}
      />
    </div>
  );
}


export default Comment;