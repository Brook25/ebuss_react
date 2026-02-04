import React, { useEffect, useState } from 'react';
import populatePosts from "./utils.tsx";

function timeLine() {
    
    const [myPosts, setMyPosts] = useState<{myPosts: Object[] | null,
         nextUrl: string | null}>({myPosts: null, nextUrl: null});
    
    
    useEffect(() => {
        populatePosts();
    }, []);

    return (
    <div className="timeline"></div>
    <div className="posts">
     {myPosts.posts && myPosts.posts.map((post) =>
        <div className="post" key={post.id}>
            <p>{post.content}</p>
            <div className="engagements">
            <span className="comments"></span>
            <span className="likes"></span>
            <span className="share"></span>
            </div>
    </div>
        )}
        <span> onClick={populatePosts} See more posts</span>
        </div>
)
}

export default timeLine;