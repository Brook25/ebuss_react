import React, {useEffect, useState} from 'react';


const Comment = (comment: commentType) =>  {
  const loadComments = async (comment: CommentType) => {
    commentData.comments.filter((parentComment) =>
       comment.id === parentComment.commentTo).map((childComment: CommentType) =>
         <Comment id={childComment.id}/>)
  }
  
   const editComment = async (commentId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/playground/comment/${commentId}/update/`, {
        method: 'PUT',
        body: JSON.stringify({text: comment.text}),
      });
    }
    catch (error) {
      console.log(error);
    }
   }

   const deleteComment = async (commentId: number) => {
     const reponse = await fetch()
   }

   return ( 
   <div className="comment-header"> 
     <img src={comment.user.profile_image}/>
     <p>{comment.user.username}</p>
     <p>{comment.created_at}</p>
     <i className="bi bi-three-dots-vertical" onClick={() => { setShowOptions(!showOptions) }}></i>
     {showOptions && <div> 
     <i className="bi bi-pencil-square" onClick={() => { editComment(comment.id) }}></i>
     <i className="bi bi-trash" onClick={() => { deleteComment(comment.id) }}></i>
      </div>
      </div>
      <i className="bi bi-reply" onClick={() => { replyToComment(comment.id) }}></i>
      <div className="comment-replies">
      {comment.replies.map((reply: ReplyType) => (
        <Comment id={reply.id}/>
      ))}
      </div>
      </div>}
   </div>
   <div className="comment-content" key={comment.id}>
    <p>{comment.text}</p>
    <span>{comment.likes}</span>
    <span>share</span>
      {comment.replies >= 1 && <div onClick={() => { populateComments(comment.id) }}>
      Show Replies <i className="bi bi-triangle-fill"></i>
      {commentData[id][showReplies] && loadComments(comment)}
      </div>
        }
        </div>
  )
}








function Comments(commentId: number) {
  return {
    commentData.comments.map((comment) => (
      
    ) 
    )
  }
}