// NewPostForm.js
import React, { useState } from 'react';

const NewPostForm = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleAddPost = () => {
    const newPost = { title, content, file };
    onAddPost(newPost);
    // Reset the form fields after adding a post
    setTitle('');
    setContent('');
    setFile(null);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <div style={{ marginRight: '20px' }}>
        {file ? (
          <img src={URL.createObjectURL(file)} alt="Uploaded" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
        ) : (
          <label htmlFor="fileInput" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ marginBottom: '5px' }}>Upload Image</span>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <span style={{ color: '#61dafb', cursor: 'pointer' }}>Choose File</span>
          </label>
        )}
      </div>
      <div>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            style={{ padding: '5px', width: '100%' }}
          />
        </label>
        <br />
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter post content"
            style={{ padding: '5px', width: '100%', height: '100px' }}
          />
        </label>
        <br />
        <button type="button" onClick={handleAddPost} style={{ padding: '5px' }}>
          Add Post
        </button>
      </div>
    </div>
  );
};

export default NewPostForm;
