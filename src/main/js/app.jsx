const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component {

    render() {
        return (
            <span>index</span>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);