import * as React from 'react';

/**
 * Interface with the required properties for Comment component
 *
 * @interface
 */
export interface CommentProps {
  by: string;
  text: string;
}

/**
 * Markup HTML elements
 * @param {string} text HTML string
 * @returns {{__html: string}} HTML markup
 */
function markupHTML(text:string) {
  return { __html: text };
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
        {props.by}
      </em>
      <p dangerouslySetInnerHTML={markupHTML(props.text)}/>
    </div>
  );
}
