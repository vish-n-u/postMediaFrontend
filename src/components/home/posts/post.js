import React from 'react'
import AddPost from './addPost'
import PostModel from './postmodel'
import PostBody from './postBody'

const Post = ({isModelOpen,setIsModelOpen,user,posts,searchText}) => {
  return (
   <>
   <AddPost isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} user={user}/>
        <PostModel isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} user={user}/>
        <PostBody searchText={searchText} posts={posts} user={user}/>
   </>
  )
}

export default Post