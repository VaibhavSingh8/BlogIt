import { useEffect, useState } from "react";
import databaseService from "../appwriteBackend/database";
import Container from "../components/container/Container";
import BlogCard from "../components/BlogCard";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    databaseService.getAllBlogs([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
