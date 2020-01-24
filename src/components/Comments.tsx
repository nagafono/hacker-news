import * as React from 'react';
import { useEffect, useState } from 'react';
import Async from 'react-promise';
import { Comment, CommentProps } from './Comment';
import * as utils from '../utils';
import { ErrorMessage } from './ErrorMessage';

/**
 * Complete comment interface
 *
 * @interface
 */
export interface IComment extends CommentProps {
  id: number;
  kids: number[];
  parent: number;
  time: number;
  type: string;
}

interface ICommentsProps {
  commentIds: number[];
}

export function Comments(props: ICommentsProps): JSX.Element {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBestStories = async () => {
      try {
        setError('');
        const comments: IComment[] = await _getComments(props.commentIds);
        setComments(comments);
      } catch (e) {
        setError(e.message);
      }
    };

    loadBestStories();
  }, []);

  if (error) {
    return <ErrorMessage error={error}/>;
  }

  return (
    <footer>
      <h3>Comments</h3>
      {
        comments.map((props: IComment) => (
          <Comment
            key={props.id}
            by={props.by}
            text={props.text}/>
        ))
      }
    </footer>
  );
}

async function _getComments(commentIds: number[]): Promise<IComment[]> {
  return await Promise.all(commentIds.map(_getComment));
}

async function _getComment(commentId: number): Promise<IComment> {
  return await utils.getItem(commentId);
}
