import React,{ useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


interface PostType {
  postId: number,
  postText: string,
  postImage: string
}


function Post<{postId: number, postText: string, postImg: string}>({ postId, postText, postImg }) {

  const [commentData, setCommentData] = useState<{comments: Array, nextURL: String | null}>(
    { comments: [], nextURL: null }
  );

  const [postData, setPostData] = <{postId: number | null, postText: string | null, postImage: string}>useState(
    {postId: null, postText: null, postImage: null}
  );

  const location = useLocation();

  const postState = location.state as PostType ? location.state : null; 

  if (postState)
    setPostData(postState);

  const populateComments = async () => {
    let response;
    
    if (commentData.comments.length === 0)
      response = await fetch('http://127.0.0.1:8000/playground/post/0/');
    else
      response = await fetch(commentData.nextURL);
    
    const data = await response.json();

    setCommentData({comments: [...commentData.comments, ...data.commentData], nextURL: commentData.nextURL});
  }


  const populatePost = async () => {
    
    try {
      let response;
      if (postData.postId === null)
        response = await fetch(`http://127.0.0.1:8000/playground/post/${postData.postId}/`);
        const dataPost = await response.json();
        setPostData(dataPost.postData);
      
      const responseComments = await fetch(`http://127.0.0.1:8000/playground/post/${postId}/comments/0`);
      const dataComments = await responseComments.json();
      setCommentData({comments: [...commentData.comments, ...dataComments.commentData], nextURL: dataComments.next});
    }
    catch (error) {
      console.log(error);
    }
  }

    useEffect(() => {

      populateComments();
    }, []);


  
  return (
           <div className="post" key={postId}>
             <p>{postText}</p>
              {postImg && <img src={postImg}/>}
              <div className="engagements">
                <span className="comments"></span>
                <span className="likes"></span>
                <span className="share"></span>
                <div className="comments">
                  {commentData.map((comment) => (
                    <div className="comment" key={comment.id}>
                      <p>{comment.text}</p>
                      <span className="likes"></span>
                      <span className="replies"></span>
                      <span className="share"></span>
                    </div>
                  ))}
                  <button onClick={populateComments()}> See more comments </button>
                </div>
            </div>
          </div>
);

}

export default Post;