import React, {useEffect, useState} from 'react';
import userAuth from AuthContext;

const Comment = (comment: commentType) =>  {
  
  const { user } = useAuth();
  
  const [editCommentMap, setEditCommentMap] = useState<Record<number, boolean>>({});

  const loadComments = async (comment: CommentType) => {
    commentData.comments.filter((parentComment) =>
       comment.id === parentComment.commentTo).map((childComment: CommentType) =>
         <Comment id={childComment.id}/>)
  }
  

   const commentItem = async (commentId: number) => {

      const [error, setError] = useState<error: string | null>(null);

      useEffect(() => {
        const timer = setTimeout(() => {
          setError(null);
        }, 4000);
        return () => clearTimeout(timer);
      }, [error]);

     const handledelete = async () => {
      
      const {commentId: {}, ...newcommentData} = commentData;
      setCommentData(newCommentData);

      try {
      const reponse = await fetch(`https://127.0.0.1/playground/comment/${commentId}/`,
         {method: 'DELETE'});
        
       if (response.status !== 200) {
         setError('Action not completed on server.')
       }

      }
      catch (error) {
        setError('Network Error.')
        console.log(error);
      }
    }

      const handleEdit = async (newComment) => {
        setCommentData({...commentData, commentId: { ...commentData.commentId, 'text': newComment} });
        
        try {
          const response = await fetch(`https://127.0.0.1/playground/comment/${commentId}/`, {
            method: 'PATCH'
          });

          if (response.status !== 200)
            setError('Action not completed.');
        }
        catch (error) {
          setError('Network Error.');
          console.log(error);
        }   
   }

   const editComment = async (commentId: string) {
      let newEditComment = { [commentId]: true, ...editCommentMap };
      setEditCommentMap(prev => (
        {...prev, [commentId]: }
      ));
      handleEdit();
   };

   const deleteComment = async (commentId: string) {
     
   }



   return ( 
   <div className="comment-header"> 
     <img src={comment.user.profile_image}/>
     <p>{comment.user.username}</p>
     <p>{comment.created_at}</p>
     <i className="bi bi-three-dots-vertical" onClick={() => { setShowOptions(!showOptions) }}></i>
     {showOptions && <div> 
     {user.id === comment.userId && <i className="bi bi-pencil-square" onClick={() => { editComment(commentId)} }></i>}
     {user.id === comment.userId && <i className="bi bi-trash" onClick={() => { deleteComment(comment.id) }}></i>}
      </div>
      </div>
      </div>}
   </div>
   <div className="comment-content" key={comment.id}>
    {commentEditMap.comment.id === false ? <p>{comment.text}</p> : <textarea>{comment.text}</textarea>}
    <span>{comment.likes}</span>
    <span>share</span>
    <i className="bi bi-reply" onClick={() => { replyToComment(comment.id) }}></i>
      {comment.replies >= 1 && <div onClick={() => { populateComments(comment.id) }}>
      {error && <span>{error}</span>} 
      Show Replies <i className="bi bi-triangle-fill"></i>
      {commentData[id][showReplies] && loadComments(comment)}
      </div>
        }
        </div>
  )
}
}
