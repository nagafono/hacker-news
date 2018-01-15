import * as React from 'react';
import { Comment, CommentProps } from './Comment';

/**
 * Insert Comment jsx components to the Comment section
 * @param {CommentProps[]} comments Array of Comments required properties
 * @returns {Element[]} Set of JSX Comment elements
 */
function insertComments(comments:CommentProps[]) {
    return comments.map((props, key) =>
        <Comment key={key} user={props.user}
                 comment={props.comment}/>,
    );
}

/**
 * Comment section component
 * @param {{Comments: CommentProps[]}} props Array of Comments required properties
 * @returns {Element} JSX Comment section elements
 * @constructor
 */
export function Comments(props: {comments: CommentProps[]}) {
    const { comments } = props;
    return (
        <footer>
            <h3>
                Comments
            </h3>
            {insertComments(comments)}
        </footer>
    );
}
