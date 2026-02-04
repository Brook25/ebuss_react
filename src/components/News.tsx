import React, { useEffect, useState } from 'react';
import "./News.css";

function News() {
  const [postsData, setPostsData] = useState<{posts: Object[] | null,
    nextUrl: string | null}>({newPosts: null, nextUrl: null});

  const populatePosts = async () => {
  try {
    let response;

    if (!postsData.newPosts)
      response = await fetch('http://127.0.0.1:8000/playground/news/posts/0/');

    else
      response = await fetch(newPostsData.nextUrl);

    const allPosts = await response.json();
    console.log('Array:', ...allPosts.new_posts);
    setPostsData({newPosts: [newPostsData.newPosts, ...allPosts.new_posts], nextUrl: allPosts.next});
  } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    populatePosts();
  }, []);


  return (
    <>
     <div className="posts">
       {newPostsData.newPosts && newPostsData.newPosts.map((post) =>
                                <div className="post" key={post.id}>
                                  <p>{post.content}</p>
                                  {/*{post.image && <img/> }*/}
                                  <div className="engagements">
                                  <span className="comments"></span>
                                  <span className="likes"></span>
                                  <span className="share"></span>
                                  </div>
                                </div>
      )}
      <a href="#" onClick={populatePosts}>see more posts</a>
     </div>
     <div className="trendingNews">
     </div>
     <div className="newDealsForYou">
     </div>
  </>
  );
}

export default News;
