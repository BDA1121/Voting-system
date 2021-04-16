import React from "react";

const CommentLoader = prop =>{
    return (<div className='ui container comments'>
    <div className='comment'>
        <a href="/" className="avatar">
            <img alt="avatar"  />
        </a>
        <div className='content'>
        <a href="/" className="author">
            {prop.names}
        </a>
        <div className='metadata'>
        <span className="date">{prop.time}</span>
        </div>
    </div>
    </div>
</div>
);
}
export default CommentLoader;