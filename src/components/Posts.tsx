
function PostsBody(newPostData) {
  
  return newPostData.new_posts.map((post) =>
                                <div className="post" key={post.id}>
                                  <p>{post.content}</p>
                                  {/*{post.image && <img/> }*/}
                                  <div className="engagements">
                                  <span className="comments"></span>
                                  <span className="likes"></span>
                                  <span className="share"></span>
                                  </div>
                                </div>
                                );
 

}
