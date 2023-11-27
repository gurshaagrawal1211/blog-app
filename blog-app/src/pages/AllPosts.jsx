import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/appwriteConfig";


const AllPosts = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        try{
            appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                //console.log({posts})
            }
            })
        }
        catch(error){
            console.log("error" , error)
        }
    }, [])
    console.log(posts)
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts