import * as React from 'react';
import Async from 'react-promise';
import { Post, PostProps } from './Post';

/**
 * Interface with the properties which are expected to be received
 * for the Post section element
 *
 * @interface
 */
interface PostsProps extends PostProps {
    id: number;
}

/**
 * Get JSON with Posts data
 * @returns {PostsProps[]} PostsProps interface with Posts data; empty array in the case of error
 */
async function getJson() {
    try {
        // in general, url can be declared in the separate constants module
        // but because of simplicity the declaration is left here
        const url = '/hacker-news/data/Posts.json';
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        // can be also done with throw new Error() but without UI representation of the error
        console.error(`ERROR: getJson() - ${error}`);
        return [];
    }
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
        if (!current.rating) {
            return next.rating;
        }
        if (!next.rating) {
            return -current.rating;
        }
        return next.rating - current.rating;
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
    return posts.map((props) => {
        if (!props.id && (props.id !== 0)) {
            return '';
        }
        return <Post key={props.id}
                     user={props.user}
                     title={props.title}
                     content={props.content}
                     rating={props.rating}
                     comments={props.comments}/>;
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
            <Async promise={getJson()}
                   then={resolvePosts}/>
        </section>
    );
}
