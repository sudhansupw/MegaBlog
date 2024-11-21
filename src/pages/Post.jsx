import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import { Button, Container } from "../components/index.js";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);


    useEffect(() => {
        if (slug) {
            console.log("hello");
            
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    console.log("hello1");
                    console.log(post);
                    
                } 
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const isAuthor = post && userData ? post.userid === userData.$id : false;
    
    console.log(slug);
    
    console.log("Post:", post);
    // console.log("User Data:", userData);
    // console.log("isAuthor:", isAuthor);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                {post.featuredimage && ( <img
    src={appwriteService.getFilePreview(post.featuredimage)} // Use the function to get the file preview
    alt={post.title}
    className="rounded-xl"
/>
 )}


                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css text-xl font-serif">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}