import * as React from 'react';
import Async from 'react-promise';
import * as constants from '../constants';
import * as utils from '../utils';
import { Post, PostProps } from './Post';

/**
 * Complete post interface
 *
 * @interface
 */
export interface PostsProps extends PostProps {
  id: number;
  descendants: number;
  time: number;
  type: string;
}

/**
 * Get best stories
 * @returns {Promise<PostsProps[]>} Promise, which resolves best stories
 * (length is limited with MAX_STORIES)
 */
async function getBestStories() {
  const bestStoriesIds:number[] = await getBestStoriesIds();
  return await Promise.all(
      bestStoriesIds.map(
          async (storyId): Promise<number> => await utils.getItem(storyId),
      ),
  );
}

/**
 * Get best stories ids
 * @returns {Promise<number[]>} Array with best stories ids (length is limited with MAX_STORIES)
 */
async function getBestStoriesIds() {
  const bestStoriesIds:number[] = await utils.getJson(constants.BEST_STORIES_URL);
  return bestStoriesIds.slice(0, constants.MAX_STORIES);
}

/**
 * Resolve Posts data after receiving
 * @param {PostsProps[]} posts Posts data
 * @returns {Element[]} Set of JSX Post elements
 */
function resolvePosts(posts:PostsProps[]) {
  return insertPosts(sortPostsByRating(posts));
}

/**
 * Sort Posts by rating
 * @param {PostsProps[]} posts Posts data
 * @returns {PostsProps[]} Sorted Posts data
 * @private
 */
function sortPostsByRating(posts:PostsProps[]) {
  return posts.sort((current:PostsProps, next:PostsProps) => {
    if (!current.score) {
      return next.score;
    }
    if (!next.score) {
      return -current.score;
    }
    return next.score - current.score;
  });
}

/**
 * Insert Posts jsx components to the Post section
 * @param {PostsProps[]} posts Posts data
 * @returns {Element[]} Set of JSX Post elements
 */
function insertPosts(posts:PostsProps[]) {
  if (!posts || !posts.length) {
    return (
      <div className="error">
        The data is empty or currently unavailable
      </div>
    );
  }
  return posts.map((props:PostsProps) => {
    if (!props.id && (props.id !== 0)) {
      return '';
    }
    return <Post key={props.id}
                 by={props.by}
                 title={props.title}
                 url={props.url}
                 score={props.score}
                 kids={props.kids}/>;
  });
}

/**
 * Post section component
 * @returns {Element} JSX Post section element
 * @constructor
 */
export function Posts() {
  return (
    <section>
        <Async promise={getBestStories()}
               then={resolvePosts}/>
    </section>
  );
}
