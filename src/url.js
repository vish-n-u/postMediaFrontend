export const loginUrl =
  process.env.REACT_APP_loginUrl ||
  "http://localhost:5000/postMedia/api/v1/login";
export const registerUrl =
  process.env.REACT_APP_registerUrl ||
  "http://localhost:5000/postMedia/api/v1/register";
export const createPostUrl  = process.env.REACT_APP_createPost ||
"http://localhost:5000/postMedia/api/v1/posts";
export const getPostsUrl  = process.REACT_APP_getPosts ||
"http://localhost:5000/postMedia/api/v1/posts";

export const createCommentsUrl  = process.env.REACT_APP_createComments ||
"http://localhost:5000/postMedia/api/v1/comments";


export const getCommentsUrl  = process.env.REACT_APP_getCommentsUrl ||
"http://localhost:5000/postMedia/api/v1/comment";

export const getSearchResultsUrl = process.env.REACT_APP_createComment ||
"http://localhost:5000/postMedia/api/v1/postsSearch/"