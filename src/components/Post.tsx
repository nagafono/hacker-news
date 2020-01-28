import * as React from 'react';
import * as constants from '../constants';
import { Comments } from './Comments';
import { getText } from '../localization';

interface IPostProps {
  by: string;
  kids: number[];
  score: number;
  title: string;
  url: string;
}

export function Post(props: IPostProps): JSX.Element {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.score ? <h3>{getText('rating')}: {props.score}</h3> : null }
      <p>
        <a href={props.url} target="_blank">{props.url}</a>
      </p>
      <strong>{props.by}</strong>
      {
        props.kids && props.kids.length
          ? <Comments commentIds={props.kids.slice(0, constants.MAX_COMMENTS)}/>
          : null
      }
    </article>
  );
}
