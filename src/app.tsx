import './styles/style.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Posts } from './components/Posts';

function App() {
    return <Posts/>;
}

ReactDOM.render(
    <App />,
    document.getElementById('news'),
);
