import React from 'react';
import ReactDOM from 'react-dom';
import GameManager from './component/GameManager.jsx';

class App extends React.Component {

    render() {
        return (
            <GameManager/>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);