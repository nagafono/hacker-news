import * as React from 'react';
import { useEffect, useState } from 'react';
import * as constants from '../constants';
import * as utils from '../utils';
import { Post } from './Post';
import { ErrorMessage } from './ErrorMessage';
import { IPost } from '../interfaces';
import { getText } from '../localization';

export function Posts(): JSX.Element {
  const [bestStories, setBestStories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBestStories = async () => {
      try {
        setError('');
        const bestStories: IPost[] = await _getBestStories(setError);
        if (!bestStories || !bestStories.length) {
          throw new Error(getText('error_no_stories'));
        }
        setBestStories(_sortPostsByRating(bestStories));
      } catch (e) {
        utils.handleDefaultError(e, setError);
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

async function _getBestStories(errorCb: any): Promise<IPost[]> {
  try {
    const bestStoriesIds: number[] = await _getBestStoriesIds(errorCb);
    return await Promise.all(bestStoriesIds.map(_getBestStory));
  } catch (e) {
    utils.handleDefaultError(e, errorCb);
  }
}

async function _getBestStoriesIds(errorCb: any): Promise<number[]>  {
  try {
    const bestStoriesIds: number[] = await utils.get(constants.BEST_STORIES_URL);
    return bestStoriesIds.slice(0, constants.MAX_STORIES);
  } catch (e) {
    throw new Error(e);
  }
}

async function _getBestStory(storyId: number, errorCb: any): Promise<IPost> {
  try {
    return await utils.getItem(storyId);
  } catch (e) {
    throw new Error(e);
  }
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
