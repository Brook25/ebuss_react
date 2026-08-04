import React,{ useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PostType {
  id: number | null,
  text: string,
  image: string,
  comments?: number,
  hasNext: boolean
}


interface CommentType extends PostType {
  postTo: number | null,
  commentTo: number | null,
  replies: number,
  showReplies: boolean
}



function Post(post: PostType) {

  const user = useAuth();

  const [commentMetaData, setCommentMetaData] = useState<{metaData: Object | null}>({metaData: null});

  const [commentData, setCommentData] = useState<CommentType[]>([]);

  const [postData, setPostData] = useState<{postId: number | null, postText: string | null, postImage: string | null}>(
    {postId: null, postText: null, postImage: null}
  );

  const [openCommentBox, setOpenCommentBox] = useState<boolean>(false);

  
  const location = useLocation();

  const postState = location.state as PostType ? location.state : null; 

  
  

  useEffect(() => {
    
    (async () => {
    try {
    
    if (postState)
      setPostData(postState);
    else {
      const responsePost = await fetch(`http://127.0.0.1:8000/playground/post/${postData.postId}/`);
      const dataPost = await responsePost.json();
      setPostData(dataPost.postData);
    }
  }
  catch (error) {
    console.log(error);
  }

  const populateComments = async (commentId: number) => {
    let response;
    
    if (commentData.comments.length === 0)
      /* Add URL to fetch comments */
      response = await fetch('http://127.0.0.1:8000/playground/post/c/0/');
    else
      response = await fetch(commentData.nextURL);
    
    const data = await response.json();

    setCommentData({comments: [...commentData.comments, ...data.commentData], nextURL: commentData.nextURL});
  }
    })();
  }, []);

  /* Add text area on line 83 to add comment based on the value of OpenCommentBox */
  
  return (
           <div className="post" key={postId}>
             <p>{postText}</p>
              {postImg && <img src={postImg}/>}
              <div className="engagements">
                <span className="comments" onClick={() => {setOpenCommentBox(true)}}></span>              
                <span className="likes"></span>
                <span className="share"></span>
                {openCommentBox && <textarea placeholder='say something...'></textarea>}
                <div className="comments">
                  {commentData.map((comment) => (
                      <Comment
                        key={comment.id}
                        comment={comment}
                        allComments={commentData.comments}
                        onUpdate={(comment: CommntType) => setCommentData((prev: CommentType[]) => [...prev, comment])}
                        />
                        ))
                         }
                        </div>
                    </div>
                  <button onClick={populateComments}> See more comments </button>
                </div>
  );
  }
}

export default Post;