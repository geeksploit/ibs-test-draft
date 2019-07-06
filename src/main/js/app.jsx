const React = require('react');
const ReactDOM = require('react-dom');

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