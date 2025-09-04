import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, Loader } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then(async (post) => {
                if (post) {
                    post.imageUrl = await appwriteService.getFilePreview(post.featuredImage)
                    setPost(post);
                }
                else navigate("/");
            }).catch((e) => {
                console.log("Fetching imageurl POST Error : ", e);
            }).finally(() => {
                setLoader(false);
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        setLoader(true);
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage)
                    .then((deleted) => {
                        if (deleted)
                            navigate("/");
                    })
                    .catch(e => {
                        console.log("Delete image POST Error:", e);
                    })
                    .finally(() => {
                        setLoader(false);
                    });
            }
        }).catch(e => {
            console.log("Delete post POST Error:", e);
        }).finally(() => {
            setLoader(false);
        });
    };

    if (loader) {
        return <Loader />
    }
    else {
        return post ? (
            <div className="py-8">
                <Container>
                    <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="rounded-xl"
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" className="cursor-pointer" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="w-full mb-6">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                    <div className="prose lg:prose-xl max-w-[inherit]">
                        {parse(post.content)}
                    </div>
                </Container>
            </div>
        ) : null;
    }
}