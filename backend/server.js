// Import necessary dependencies and configure database connection
const database = require('./database'); // Replace with the actual import path

// Create a new post
async function createPost(postData) {
  try {
    // Insert the post data into the database and get the generated post ID
    const result = await database.insert('Posts', postData);
    const postId = result.insertId;
    return { id: postId, ...postData };
  } catch (error) {
    throw new Error('Failed to create a new post');
  }
}

// Retrieve a specific post by ID
async function getPost(postId) {
  try {
    // Query the database to get the post data
    const post = await database.query('SELECT * FROM Posts WHERE id = ?', [postId]);
    if (post.length === 0) {
      throw new Error('Post not found');
    }
    return post[0]; // Return the first (and only) result
  } catch (error) {
    throw new Error('Failed to retrieve the post');
  }
}

// Delete a post by ID
async function deletePost(postId) {
  try {
    // Delete the post from the database
    await database.query('DELETE FROM Posts WHERE id = ?', [postId]);
    return { success: true };
  } catch (error) {
    throw new Error('Failed to delete the post');
  }
}

module.exports = {
  createPost,
  getPost,
  deletePost,
};
