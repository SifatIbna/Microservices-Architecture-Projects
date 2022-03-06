import React from "react";

export default ({ comments }) => {
  console.log(comments);
  const renderedComments = comments.map((comment) => {

    let content;
    if(comment.status === 'approved'){
      content = comment.content;
    }

    if(comment.status === 'pending') {
      content = "This comment is awaiting for moderation";
    }

    if(comment.status === 'rejected') {
      content = "This comment is Rejected"
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
