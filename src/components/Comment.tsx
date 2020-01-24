import * as React from 'react';
import * as utils from '../utils';

export interface CommentProps {
  by: string;
  text: string;
}

export function Comment(props: CommentProps) {
  return (
    <div className="comment">
      <em>{props.by}</em>
      <p dangerouslySetInnerHTML={utils.markupHTML(props.text)}/>
    </div>
  );
}
