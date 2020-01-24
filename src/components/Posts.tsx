import * as React from 'react';
import { useEffect, useState } from 'react';
import * as constants from '../constants';
import * as utils from '../utils';
import { Post, PostProps } from './Post';
import {ErrorMessage} from './ErrorMessage';

export interface IPost extends PostProps {
  id: number;
  descendants: number;
  time: number;
  type: string;
}

export function Posts(): JSX.Element {
  const [bestStories, setBestStories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBestStories = async () => {
      try {
        setError('');
        const bestStories: IPost[] = await _getBestStories();
        if (!bestStories || !bestStories.length) {
          throw new Error('The data is currently unavailable.');
        }
        setBestStories(_sortPostsByRating(bestStories));
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
      <div className="posts">
        {
          bestStories.map((props: IPost) => (
            <Post
              key={props.id}
              by={props.by}
              title={props.title}
              url={props.url}
              score={props.score}
              kids={props.kids}/>
          ))
        }
    </div>
  );
}

async function _getBestStories(): Promise<IPost[]> {
  const bestStoriesIds: number[] = await getBestStoriesIds();
  return Promise.all(bestStoriesIds.map(_getBestStory));
}

async function getBestStoriesIds(): Promise<number[]>  {
  const bestStoriesIds: number[] = await utils.getJson(constants.BEST_STORIES_URL);
  return bestStoriesIds.slice(0, constants.MAX_STORIES);
}

async function _getBestStory(storyId: number): Promise<IPost> {
  return await utils.getItem(storyId);
}

function _sortPostsByRating(posts: IPost[]) {
  return posts.sort((current: IPost, next: IPost) => {
    if (!current.score) {
      return next.score;
    }

    if (!next.score) {
      return -current.score;
    }

    return next.score - current.score;
  });
}
