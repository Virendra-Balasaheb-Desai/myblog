import React, { useEffect, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import appwriteService from "../../appwrite/config"
import { useForm } from 'react-hook-form'
import { Input, Button, Select, RTE, Loader } from "../index"
import { useSelector } from 'react-redux'
const PostForm = ({ post }) => {
    const { register, handleSubmit, watch, getValues, setValue, control } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })
    const [imageUrl, setImageUrl] = useState(null);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setLoader(true)
        try {
            //Edit
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
                if (file) {
                    appwriteService.deleteFile(post.featuredImage)
                }
                const editPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file$id : post.featuredImage
                })
                if (editPost) navigate(`/post/${editPost.$id}`)

            }
            //Create
            else {
                const file = await appwriteService.uploadFile(data.image[0])
                console.log("File : ", file);

                if (file) {
                    data.featuredImage = file.$id
                    console.log("File id : ", file.$id);
                    console.log("User  : ", userData);
                    console.log("User id : ", userData.$id);
                    const createPost = await appwriteService.createPost({
                        ...data,
                        userId: userData.$id

                    })
                    console.log("Post created.");

                    if (createPost) navigate(`/post/${createPost.$id}`)
                }
            }
        } catch (error) {
            console.log("Submitting failed POSTFORM error", error);
        }
        finally {
            setLoader(false)
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof (value) === "string")
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d]+/g, '-').replace(/\s/, '-')
        return ''
    }, [])

    useEffect(() => {
        if (post) {
            appwriteService.getFilePreview(post.featuredImage).then((image) => {
                setImageUrl(image);
            }).catch((e) => {
                console.log("Image Url PostForm Error : ", e);
            }).finally(() => {
                setLoader(false);
            });
            console.log(imageUrl);

        }
        else {
            setLoader(false);
        }
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title,
                    { shouldValidate: true }
                ))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch('slug'), slugTransform, setValue])

    if (loader) {
        return <Loader />
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    disable='true'
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Blog Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <label htmlFor='blog-img'>Blog Image:</label>
                        <img
                            id='blog-img'
                            src={imageUrl}
                            alt={post.title}
                            className="rounded-lg mt-2"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status :"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full cursor-pointer">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm
