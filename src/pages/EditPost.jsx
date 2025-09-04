import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from "../appwrite/config"
import { PostForm, Container, Loader } from '../components/index'

const EditPost = () => {
    const [post, setPost] = useState(null)
    const [loader, setLoader] = useState(true)
    const { slug } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    post.slug = slug;
                    setPost(post)
                }
            }).catch((e) => {
                console.log("Edit post component Error : ", e);
            }).finally(() => {
                setLoader(false)
            })
        }
        else {
            navigate("/")
        }
    }, [slug, navigate])

    if (loader) {
        return <Loader />
    }
    else if (post) {
        return <>
            <Container>
                <PostForm post={post} />
            </Container>
        </>
    }
    else {
        return <h2 className='w-full py-8'>No Post</h2>
    }
}

export default EditPost
