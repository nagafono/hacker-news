import * as React from 'react';
import * as utils from '../utils';

interface ICommentProps {
  by: string;
  text: string;
}

export function Comment(props: ICommentProps) {
  return (
    <div className="comment">
      <em>{props.by}</em>
      <p dangerouslySetInnerHTML={utils.markupHTML(props.text)}/>
    </div>
  );
}
