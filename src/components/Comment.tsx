import * as React from 'react';

/**
 * Interface with the required properties for Comment component
 *
 * @interface
 */
export interface CommentProps {
    user: string;
    comment: string;
}

/**
 * Comment component
 * @param {CommentProps} props Comment required properties
 * @returns {Element} JSX Comment element
 * @constructor
 */
export function Comment(props: CommentProps) {
    return (
        <div className="comment">
            <em>
                {props.user}
            </em>
            <p>
                {props.comment}
            </p>
        </div>
    );
}
