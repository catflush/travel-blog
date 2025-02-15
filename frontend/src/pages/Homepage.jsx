// src/pages/Homepage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../service/api';
/* import Card from '../components/posts/PostCard'; */

const Homepage = () => {

   const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      getPosts().then(setPosts);
    }, []);
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Travel Blog</h1>
        <Link to="/create" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create New Post</Link> {/* Link to CreatePost page */}
        <div className="post-list"> {/* Add a class for styling */}
          {posts.map(post => (
            <div key={post.id} className="post-card"> {/* Add a class to each post */}
              <Link to={`/post/${post.id}`}>
                <img src={post.cover} alt={post.title} /> {/* Display cover image */}
                <h2>{post.title}</h2>
                <p>{post.content.substring(0, 150)}...</p> {/* Content snippet */}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
/* 
  /* const posts = [
    { id: 1, title: 'First Post', image: 'frontend/src/assets/post1.jpg', snippet: 'This is the first post...' },
    { id: 2, title: 'Second Post', image: '/path/to/image2.jpg', snippet: 'This is the second post...' },
    // Add more posts here
  ];
 

  const [posts, setPosts] = useState()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Travel Blog</h1>
{/*       <div>
      {posts.map((post) => <Card post={post} key={post.id}/>)}
      </div>
      <div>
      <Link
        to="/create"
        className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Create New Post
      </Link>
    </div> 
    </div>
  );
};
 */
export default Homepage;
