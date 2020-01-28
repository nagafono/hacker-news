import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Comment } from '../components/Comment';
import { ReactTestRendererJSON } from 'react-test-renderer';

test('Comment component tests: Custom properties work', () => {
  const testProps = {
    by: 'John Doe',
    text: 'I am the test',
  };
  const testComment: ReactTestRendererJSON = renderer.create(
    <Comment by={testProps.by} text={testProps.text}/>).toJSON();

  expect(testComment).toMatchSnapshot();
});
