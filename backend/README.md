# Node.js Service README
This service is a simple Node.js application that uses Express.js for routing, SQLite for database, and other packages like bcrypt for password hashing, cors for handling Cross-Origin Resource Sharing, multer for handling multipart/form-data, which is primarily used for uploading files.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
You need to have Node.js and npm installed on your machine. To check if you have Node.js installed, run this command in your terminal:
```shell
node -v
```

To confirm that you have npm installed you can run this command in your terminal:
```shell
npm -v
```

## Installing
Clone the repository:
```shell
git clone https://github.com/l-schier/Interactive-Design
```

Navigate into the project directory:
```shell
cd backend
```

Install the dependencies:
```shell
npm install
```

## Running the Service
To start the server, run:
```shell
npm start
```
The server will start on port 5000.
## API Endpoints
* POST **/register:** Register a new user.
* POST **/login:** Login a user.
* POST **/createPost:** Create a new post.
* GET **/getPosts:** Get all posts.
* PUT **/upvote/:postId:** Upvote a post.
* PUT **/downvote/:postId:** Downvote a post.

## Login details and test Image
The database comes loaded with a test user with the following credentials:
```yaml
username: test
password: test
```
And an image uploaded wich is located in the uploads folder, this can be used to test uploading and displaying images. The image comes from [Lorem Picsum](https://picsum.photos/).

## Built With
* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [SQLite](https://www.sqlite.org/index.html)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [cors](https://www.npmjs.com/package/cors)
* [multer](https://www.npmjs.com/package/multer)

## Authors
* Group 4?
