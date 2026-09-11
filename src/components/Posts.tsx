import React, { useEffect, useState } from 'react';
import { PostType } from './Post';

export default function Posts({posts}: {posts: Array<PostType>}) {
  
    return (
        <>
            {posts && posts.map((post) => (
                <div key={post.id} className="post">
                  <p>{post.text}</p>
                  <img src={post.image}/>
                  <div className="engagements">
                  <span className="comments">{post.comments}</span>
                  <span className="likes">{post.likes}</span>
                  <span className="share">{post.share}</span>
                  </div>
                </div>
        ))}
        </>
    )
}