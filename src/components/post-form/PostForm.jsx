import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import storageService from "../../appwriteBackend/storage";
import databaseService from "../../appwriteBackend/database";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();

  const userData = useSelector((state) => state.userData);

  const submit = async (data) => {
    if (post) {
      // Edit post or Update post
      const file = data.image[0]
        ? storageService.uploadFile(data.image[0])
        : null;

      if (file) {
        storageService.deleteFile(post.featuredImage);
      }

      const dbPost = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // Create post
      const file = await storageService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;

        const createPost = await databaseService.createPost({
          ...data,
          userId: userData.$id,
        });

        navigate(`/post/${createPost.$id}`);
      }
    }
  };

  return <div>PostForm</div>;
};

export default PostForm;
