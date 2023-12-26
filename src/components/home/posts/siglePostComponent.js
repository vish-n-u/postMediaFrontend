import React, { useState } from 'react'
import { FaCommentAlt } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import {Avatar, Box, Button, Input, Spinner, Text, Textarea, useToast} from "@chakra-ui/react"
import { createCommentsUrl, getCommentsUrl } from '../../../url';
import Comment from '../comments/comment';
const SiglePostComponent = ({post,user}) => {
    const [currPost,setCurrPost] = useState(post)
    const [showCommentInput,setShowCommentInput] = useState(false)
    const [comment,setComment] = useState("")
    const [loading,setLoading] =useState(false)
    // const [isCommentFetching,setIsCommentFetching] = useState(false)

        
    const Toast = useToast()
    function handleCommentClick(){
      setShowCommentInput(!showCommentInput)
      if(currPost.commentIds.length==0) return
      else {
        if(typeof currPost.commentIds[0] =="string"){
          getCommentById(currPost._id,setCurrPost,Toast,user,setLoading)
        }
      }
    }
  return (
    <Box p={4} bg={"white"} my={3} minW={{lg:"xl",md:"xl",base:"97%"}} maxW={{lg:"xl",md:"xl",base:"80%"}}  borderRadius={5} display={"flex"} flexDir={"column"} >
        <Box w={"full"} display={"flex"}  alignItems={"center"}>
            <Avatar   mx={5} name={currPost?.userId?.userName} src={currPost?.userId?.userPic} />
            <Text fontSize='lg' fontWeight={"bold"}>{currPost?.userId?.userName}</Text>
        </Box>
        <Text
            dangerouslySetInnerHTML={{ __html: currPost?.content  }}
            fontSize="lg"
            p={4}
            whiteSpace="pre-line"
        />
        <Box w={"full"}mt={2}  borderTop={1} borderWidth={1} display={"flex"} flexDir={"column"}>
            <Box display={"flex"}  w="full">
                <BiLike size={"20"} cursor={"pointer"} style={{marginLeft:"8px",marginRight:"18px"}}/>
                <FaCommentAlt onClick={handleCommentClick} fontVariant={"outline"}  cursor={"pointer"} size={"20"}/>
            </Box>
                                
        </Box>
       {showCommentInput&& <Box mt={5} display={"flex"} >
            <Avatar   mx={{lg:4,md:4,base:1}} name={user?.userName||"Err name"} src={user?.userPic} />
            <Textarea onChange={(e)=>setComment(e.target.value)} value={comment} type='text' noOfLines={4} maxW={"full"} placeholder='write a comment' mx={{lg:4,md:4,base:1}} p={1}/>

        </Box>}
        {showCommentInput&&comment?.length>0&&<Button isLoading={loading} onClick={()=>{
            setLoading(true);
            createComment(currPost._id,setCurrPost,comment,setComment,Toast,user,setLoading,setShowCommentInput)}} mt={3} alignSelf={"end"} w={14} colorScheme='blue'>Post
        </Button>}

        {showCommentInput&& <> {currPost?.commentIds?.length>0?
       typeof currPost?.commentIds[0]=="string"?
        <Box display={"flex"} h={24}>
          <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
        </Box>:
        <>
        {currPost?.commentIds?.map((comment)=>{
          return <Comment key={comment?._id} comment={comment}/>
        })}
        </>
        :<Text my={5} alignSelf={"center"}>Be the First to comment...</Text>
        }</>
        }


    </Box>
  )
}

export default SiglePostComponent



async function createComment(postId,setCurrPosts,content,setContent,Toast,user,setLoading,setShowCommentInput){

    try{
      if(!content||content.length<1){
        return Toast({
          status: "warning",
          title: "Content Cant be empty or less than 10 characters",
          duration: 3000,
          
        })
      }
//   console.log("user",user.token,content)
      const data = await fetch(createCommentsUrl,{
        method :"POST",
        mode: "cors",
        headers:{
          "Authorization": user.token,
          "Content-Type": "application/json",
        },
        body:JSON.stringify({content,postId})
      })
      const dataJson = await data.json();
      setLoading(false)
      if(data.status==201){
        Toast({
          status: "success",
          title: "Created new comment successfully",
          duration: 3000,
        });
        dataJson.message.commentIds.reverse()
       setCurrPosts(dataJson.message);
       console.log(dataJson.message)
      //  setShowCommentInput(false)
        setContent("")
      }
      else{
        
      return Toast({
        status: "error",
        title: "Internal server error",
        duration: 3000,
      });
      }
    }
    catch(e){
      console.log(e);
      return Toast({
        status: "error",
        title: "Internal server error",
        duration: 3000,
      });
    }
  
  }




  async function getCommentById(postId,setCurrPosts,Toast,user,setLoading){

    try{
     
//   console.log("user",user.token,content)
      const data = await fetch(getCommentsUrl+`/${postId}`)
      const dataJson = await data.json();
      // setLoading(false)
      if(data.status==200){
        dataJson.message?.commentIds?.reverse()
       setCurrPosts(dataJson.message);
      }
      else{
        
      return Toast({
        status: "error",
        title: "Internal server error in fetching comments",
        duration: 3000,
      });
      }
    }
    catch(e){
      console.log(e);
      return Toast({
        status: "error",
        title: "Internal server error",
        duration: 3000,
      });
    }
  
  }
  

