import React, { useState } from 'react';

const NewPostForm = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleAddClick = () => {
    // Assuming you want to include title, content, and file in the post
    const newPost = { title, content, file };
    onAddPost(newPost);
    // Reset form fields
    setTitle('');
    setContent('');
    setFile(null);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Create a New Post</h2>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <label>Content:</label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <br />
      <label>Upload Image:</label>
      <input type="file" onChange={handleFileChange} />
      <br />
      <button type="button" onClick={handleAddClick}>
        Add Post
      </button>
    </div>
  );
};

export default NewPostForm;
