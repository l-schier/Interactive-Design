// usersData.js
const users = [];

// Function to get users
export const getUsers = () => users;

// Function to add a new user
export const addUser = (user) => {
  users.push(user);
};

// Function to set users (update the entire array)
export const setUsers = (newUsers) => {
  users.length = 0; // Clear the existing array
  users.push(...newUsers); // Push new users to the array
};
