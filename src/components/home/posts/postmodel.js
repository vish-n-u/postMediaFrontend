import { Avatar, Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, 
  ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, Toast, useDisclosure,useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { createPostUrl, } from '../../../url'

const PostModel = ({isModelOpen,setIsModelOpen,user}) => {
   
  let { isOpen, onOpen, onClose } = useDisclosure()
  const [content,setContent] = useState("")
  const Toast = useToast()
  console.log("Content",content)
    if(isModelOpen) isOpen=true
    if(!isModelOpen) isOpen=false
    if(!isModelOpen) return
        return (
          <>
            <Button hidden={true} w={"50%"} position={"absolute"} top={50}  onClick={onOpen}>Open Modal</Button>
      
            <Modal size="3xl" isOpen={isOpen} onClose={()=>{
                onClose()
                setIsModelOpen(false)
            }}>
              <ModalOverlay />
              <ModalContent >
                {/* <ModalHeader>Modal Title</ModalHeader> */}
                <ModalCloseButton />
                <ModalBody display={'flex'} flexDir={"column"}>
                    <Box display={"flex"} alignItems={"center"}  my={10}>
                        <Avatar   mx={5} name={user.userName} src={user.pic} />
                        <Text fontSize='lg' fontWeight={"bold"}>{user.userName}</Text>
                    </Box>
                    <Textarea onChange={(e)=>{
                      setContent(e.target.value);
                    }} my={5} placeholder='Here is a sample placeholder' value={content}/>
                </ModalBody>
      
                <ModalFooter>
                  <Button variant='ghost' mr={3} onClick={()=>{
                onClose()
                setIsModelOpen(false)
            }}>
                    Close
                  </Button>
                  <Button isDisabled={content.length>10?false:true} onClick={()=>{
                    createPost(content,setContent,isOpen,setIsModelOpen,Toast,user)
                  }} colorScheme='blue'>Post</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )
      

}



async function createPost(content,setContent,isOpen,setIsOpen,Toast,user){

  try{
    if(!content||content.length<10){
      return Toast({
        status: "warning",
        title: "Content Cant be empty or less than 10 characters",
        duration: 3000,
        
      })
    }
console.log("user",user.token,content)
    const data = await fetch(createPostUrl,{
      method :"POST",
      mode: "cors",
      headers:{
        "Authorization": user.token,
        "Content-Type": "application/json",
      },
      body:JSON.stringify({content})
    })
    const dataJson = await data.json();
    if(data.status==201){
      Toast({
        status: "success",
        title: "Created new post successfully",
        duration: 3000,
      });
      isOpen =false
      setIsOpen(false)
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

export default PostModel