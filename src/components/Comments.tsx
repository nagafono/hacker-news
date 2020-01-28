import * as React from 'react';
import { useEffect, useState } from 'react';
import { Comment } from './Comment';
import * as utils from '../utils';
import { ErrorMessage } from './ErrorMessage';
import { IComment } from '../interfaces';
import { getText } from '../localization';

interface ICommentsProps {
  commentIds: number[];
}

export function Comments(props: ICommentsProps): JSX.Element {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadComments = async () => {
      try {
        setError('');
        const comments: IComment[] = await _getComments(props.commentIds, setError);
        setComments(comments);
      } catch (e) {
        utils.handleDefaultError(e, setError);
      }
    };

    loadComments();
  }, []);

  if (error) {
    return <ErrorMessage error={error}/>;
  }

  return (
    <footer>
      <h3>{getText('comments')}</h3>
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

async function _getComments(commentIds: number[], errorCb: any): Promise<IComment[]> {
  try {
    return await Promise.all(commentIds.map(_getComment));
  } catch (e) {
    utils.handleDefaultError(e, errorCb);
  }
}

async function _getComment(commentId: number): Promise<IComment> {
  try {
    return await utils.getItem(commentId);
  } catch (e) {
    throw new Error(e);
  }
}
