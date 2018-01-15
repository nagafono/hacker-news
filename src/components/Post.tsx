import * as React from 'react';
import { Comments } from './Comments';
import { CommentProps } from './Comment';

/**
 * Interface with the required properties for Post component
 *
 * @interface
 */
export interface PostProps {
    user: string;
    title: string;
    content: string;
    rating: number;
    comments: CommentProps[];
}

/**
 * Post component
 * @param {PostProps} props Post required properties
 * @returns {Element} JSX Post element
 * @constructor
 */
export function Post(props: PostProps) {
    return (
        <article>
            <h2>
                {props.title}
            </h2>
            {props.rating ? (<h3>Rating: {props.rating}</h3>) : ''}
            <p>
                {props.content}
            </p>
            <strong>
                {props.user}
            </strong>
            {(props.comments && props.comments.length)
                ? (<Comments comments={props.comments}/>)
                : ''}
        </article>
    );
}
