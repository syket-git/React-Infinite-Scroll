import "./styles.css";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
export default function App() {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10`
      )
        .then((r) => r.json())
        .then((data) => {
          setPosts(data);
          setLoading(false);
        });
    };
    fetchPosts();
  }, []);

  const fetchMoreData = async () => {
    setLimit(limit + 10);
    await fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${limit}`
    )
      .then((r) => r.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (limit > 100) {
      setHasMore(false);
    }
  }, [limit]);

  if (loading) {
    return <h2>Loading....</h2>;
  }

  return (
    <div className="App">
      <h1>Rewact Infinite scroll</h1>
      {posts?.length}

      <InfiniteScroll
        dataLength={limit}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {posts.map((post, index) => (
          <div
            key={index}
            style={{ marginBottom: "20px", border: "2px solid lightgray" }}
          >
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
