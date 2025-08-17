import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { PostCard, Container } from '../components/index'

const Home = () => {
    const [posts, setPosts] = useState(null)
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        }).catch((e) => {
            console.log("Home post component Error : ", e);
        }).finally(() => {
            setLoader(false)
        })
    }, [])

    if (loader) {
        return <h2 className='w-full py-8'>Loading...</h2>
    }
    else if (posts.length > 0) {
        return <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))
                    }
                </div>
            </Container>
        </div>
    }
    else {
        return <div className='w-full py-8 mt-4 text-center'>
            <Container>
                <h2 className='w-full py-8'>No Posts available</h2>
            </Container>
        </div>
    }
}

export default Home
