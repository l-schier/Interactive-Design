// Import your server and relevant functions here
const server = require('./server'); // Replace with the actual import path
const { createPost, getPost, deletePost } = server;

describe('Backend Server Tests', () => {
  // Mock data for testing
  const samplePostData = {
    title: 'Test Post',
    description: 'This is a test post',
    image: 'test-image.jpg',
    bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };

  let postId; // To store the ID of the created post

  // Test creating a new post
  it('should create a new post', async () => {
    const createdPost = await createPost(samplePostData);
    postId = createdPost.id; // Store the post ID for future tests
    expect(createdPost.title).toBe(samplePostData.title);
    expect(createdPost.description).toBe(samplePostData.description);
    expect(createdPost.image).toBe(samplePostData.image);
    expect(createdPost.bodyText).toBe(samplePostData.bodyText);
  });

  // Test getting a specific post
  it('should retrieve a specific post', async () => {
    const retrievedPost = await getPost(postId);
    expect(retrievedPost.id).toBe(postId);
    expect(retrievedPost.title).toBe(samplePostData.title);
    expect(retrievedPost.description).toBe(samplePostData.description);
    expect(retrievedPost.image).toBe(samplePostData.image);
    expect(retrievedPost.bodyText).toBe(samplePostData.bodyText);
  });

  // Test deleting a post
  it('should delete a post', async () => {
    const deleteResult = await deletePost(postId);
    expect(deleteResult.success).toBe(true);
  });
});
