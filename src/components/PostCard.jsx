import React, { useState,useEffect } from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'


const PostCard = ({ $id, title, featuredImage }) => {
    const [imageUrl, setImageUrl] = useState(null);
    useEffect(() => {

        appwriteService.getFilePreview(featuredImage)
        .then(url =>{
            setImageUrl(url)
        })
        .catch(e => {
            console.log("Image Url Post Card Error: ", e);
        })
        
    }, [])



    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full flex justify-center mb-4 '>
                    <img src={imageUrl} alt={title} className='rounded-xl' />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
