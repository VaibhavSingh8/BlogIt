import { useEffect, useState } from "react";
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";
import { useParams, useNavigate } from "react-router-dom";
import databaseService from "../appwriteBackend/database";

const EditPost = () => {
  const [post, setPost] = useState([]);

  const { slug } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      databaseService.getBlog(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
