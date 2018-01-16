import * as React from 'react';
import Async from 'react-promise';
import { Comment, CommentProps } from './Comment';
import * as utils from '../utils';

/**
 * Complete comment interface
 *
 * @interface
 */
export interface CommentsProps extends CommentProps {
  id: number;
  kids: number[];
  parent: number;
  time: number;
  type: string;
}

/**
 * Get post comments
 * @param {number[]} commentIds Array with comment ids
 * @returns {Promise<CommentsProps[]>} Promise, which resolves queries for comments
 */
async function getComments(commentIds:number[]) {
  const comments: CommentsProps[] = await Promise.all(
    commentIds.map(
      async (commentId:number): Promise<CommentsProps> => await utils.getItem(commentId),
    ),
  );
  return comments;
}

/**
 * Insert Comment jsx components to the Comment section
 * @param {CommentProps[]} comments Array of Comments required properties
 * @returns {Element[]} Set of JSX Comment elements
 */
function insertComments(comments:CommentsProps[]) {
  return comments.map((props:CommentsProps) => {
    if (!props.id && (props.id !== 0)) {
      return '';
    }
    return <Comment key={props.id}
                 by={props.by}
                 text={props.text}/>;
  });
}

/**
 * Comment section component
 * @param {{Comments: CommentProps[]}} props Array of Comments required properties
 * @returns {Element} JSX Comment section elements
 * @constructor
 */
export function Comments(props: {commentIds: number[]}) {
  const { commentIds } = props;
  return (
    <footer>
      <h3>
        Comments
      </h3>

      <Async promise={getComments(commentIds)}
               then={insertComments}/>
    </footer>
  );
}
