import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Post } from '../components/Post';
import { ReactTestRendererJSON } from 'react-test-renderer';

test('Post component tests: Custom properties work', () => {
  const testProps = {
    by: 'Kyle Smith',
    kids : [22144541, 22156944, 22144674],
    score: 500,
    title: 'Test post',
    url: 'https://www.google.com',
  };
  const testPost: ReactTestRendererJSON = renderer.create(
      <Post
          by={testProps.by}
          title={testProps.title}
          url={testProps.url}
          score={testProps.score}
          kids={testProps.kids} />).toJSON();

  expect(testPost).toMatchSnapshot();
});
