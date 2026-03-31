import React, {useEffect, useState} from 'react';


const Comment = (id) => {
  
  const loadComments = async (comment) => {
    commentData.comments.filter((parentComment) =>
       comment.id === parentComment.commentTo).map((childComment) =>
         <Comment id={childComment.id}/>)
  }
   
  <div className="comments" key={id}>
      <p>{comment.text}</p>
      <span>likes</span>
      <span>share</span>
        {comment.replies >= 1 && <div onClick={() => { populateComments(id) }}>
        Show Replies <i className="bi bi-triangle-fill"></i>
        {commentData[id][showReplies] && loadComments()}
        </div>
        }
}







function Comments(commentId: number) {
  return {
    commentData.comments.map((comment) => (
      
    ) 
    )
  }
}