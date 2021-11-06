import React from 'react';

function CommentSection(data) {

    let comments = data.comments;

    try {
        // comments[0].id = "id"
        return (<div>
            not failing
            {/* {Object.keys(comments).map(function (comment, index) {
                return (
                    <div>
                        {JSON.stringify(comment)}
                    </div>
                );
            })} */}

            {JSON.stringify(comments[0].id)}
        </div>)
    } catch (e) {
        return <div>faul</div>
    }
}

export default CommentSection;