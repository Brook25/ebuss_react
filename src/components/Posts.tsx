import React,{ useEffect, useState } from 'react';



function PostsBody<{postId: number, postText: string, postImg: string}>({ postId, postText, postImg }) {

  const [commentData, setCommentData] = useState<{comments: Array, nextURL: String | null}>(
    { comments: [], nextURL: null }
  );

  const populateComments = async () => {
    let response;
    
    if (commentData.comments.length === 0)
      response = await fetch('http://127.0.0.1:8000/playground/posts/0/');
    else
      response = await fetch(commentData.nextURL);
    
    const data = await response.json();

    setCommentData({comments: [...commentData.comments, ...data.commentData], nextURL: commentData.nextURL});
  }


  useEffect(() => {
    populateComments();
  }, [])


  
  return (
           <div className="post" key={postId}>
             <p>{postText}</p>
              {postImg && <img src={postImg}/>}
              <div className="engagements">
              <span className="comments"></span>
              <span className="likes"></span>
              <span className="share"></span>
            </div>
          </div>
);

}
