import * as React from 'react';
import * as constants from '../constants';
import { Comments } from './Comments';
import { CommentProps } from './Comment';

/**
 * Interface with the required properties for Post component
 *
 * @interface
 */
export interface PostProps {
  by: string;
  kids: number[];
  score: number;
  title: string;
  url: string;
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
            {props.score ? (<h3>Rating: {props.score}</h3>) : ''}
            <p>
                <a href={props.url} target="_blank">
                    {props.url}
                </a>
            </p>
            <strong>
                {props.by}
            </strong>
            {(props.kids && props.kids.length)
                ? (<Comments commentIds={props.kids.slice(0, constants.MAX_COMMENTS)}/>)
                : ''}
        </article>
  );
}
