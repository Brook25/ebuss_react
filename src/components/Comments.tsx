import React, {useEffect, useState} from 'react';


const Comment = (comment: commentType) =>  {
  const loadComments = async (comment: CommentType) => {
    commentData.comments.filter((parentComment) =>
       comment.id === parentComment.commentTo).map((childComment: CommentType) =>
         <Comment id={childComment.id}/>)
  }
   
   return ( 
   <div className="comment-header"> 
     <img src={comment.user.profile_image}/>
     <p>{comment.user.username}</p>
     <p>{comment.created_at}</p>
     <i className="bi bi-three-dots-vertical" onClick={() => { setShowOptions(!showOptions) }}></i>
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