
  const populatePosts = async () => {
  try {
    let response;

    if (!postsData.posts)
      response = await fetch('http://127.0.0.1:8000/playground/news/posts/0/');

    else
      response = await fetch(postsData.nextUrl);

    const newPosts = await response.json();
    console.log('Array:', ...allPosts.new_posts);
    setPostsData({newPosts: [posts, ...newPosts.posts], nextUrl: allPosts.next});
  } catch(error) {
      console.log(error);
    }
  };

  export default populatePosts;