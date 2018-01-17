import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { Comment, CommentProps } from '../components/Comment';

test('Comment component tests: Custom properties work', () => {
  const testProps:CommentProps = {
    by: 'John Doe',
    text: 'I am the test',
  };
  const testComment = renderer.create(
  <Comment by={testProps.by} text={testProps.text}/>)
  .toJSON();
    
  expect(testComment).toMatchSnapshot();
  
});
