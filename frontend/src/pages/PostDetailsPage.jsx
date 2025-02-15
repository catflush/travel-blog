// src/pages/PostDetailsPage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPost, deletePost, updatePost } from '../../service/api';

function PostDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({
    author: '',
    title: '',
    content: '',
    cover: ''
  });


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPost(id);
        setPost(fetchedPost);
        setUpdatedPost(fetchedPost); // Initialize updatedPost with fetched data
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate('/'); // Redirect to home if post not found
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await deletePost(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post. Please try again.');
    }
  };

  const handleUpdate = async () => {
    try {
      await updatePost(id, updatedPost);
      setPost(updatedPost); // Update the local post state
      setEditMode(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post. Please try again.');
    }
  };


  if (!post) {
    return <div>Loading...</div>; // Or a more informative loading message
  }

  return (
    <div>
    {editMode ? ( // Render form in edit mode
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Author"
            value={updatedPost.author}
            onChange={e => setUpdatedPost({ ...updatedPost, author: e.target.value })}
          />
          <input
            type="text"
            placeholder="Title"
            value={updatedPost.title}
            onChange={e => setUpdatedPost({ ...updatedPost, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            value={updatedPost.content}
            onChange={e => setUpdatedPost({ ...updatedPost, content: e.target.value })}
          />
          <input
            type="text"
            placeholder="Cover Image URL"
            value={updatedPost.cover}
            onChange={e => setUpdatedPost({ ...updatedPost, cover: e.target.value })}
          />
          <button type="submit">Update Post</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : ( // Render post details in view mode
        <>
          <img src={post.cover} alt={post.title} />
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>By: {post.author}</p> {/* Display author */}
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setEditMode(true)}>Update</button>
        </>
      )}
    </div>
  );
}

  /*   <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Post Details</h1>
      <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
      <img src={post.image} alt={post.title} className="w-full h-60 object-cover mb-2" />
      <p className="mb-4">{post.content}</p>
      <button
        onClick={handleUpdate}
        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 mr-2"
      >
        Update Post
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Delete Post
      </button>
    </div> */


export default PostDetailsPage;
