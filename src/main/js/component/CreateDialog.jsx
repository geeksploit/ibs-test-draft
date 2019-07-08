import React from 'react';
import ReactDOM from 'react-dom';

export default class CreateDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const newGame = {};
        this.props.attributes.forEach(attribute => {
            newGame[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });
        this.props.onCreate(newGame);

        // clear out the dialog's inputs
        this.props.attributes.forEach(attribute => {
            ReactDOM.findDOMNode(this.refs[attribute]).value = '';
        });

        // Navigate away from the dialog to hide it.
        window.location = "#";
    }

    render() {
        const persons = this.props.persons ? this.props.persons.map(person => {
            return (<option key={person.entity._links.self.href}
                            value={person.entity._links.self.href}>{person.entity.firstName + " " + person.entity.lastName}</option>);
        }) : null;


        const statuses = this.props.statuses ? this.props.statuses.map(status => {
            return (<option key={status.entity._links.self.href}
                            value={status.entity._links.self.href}>{status.entity.name}</option>);
        }) : null;


        const inputs = this.props.attributes.map(attribute => {
            switch (attribute) {
                case 'owner':
                case 'borrower':
                    return (
                        <p key={attribute}>
                            <label>
                                <select placeholder={attribute} ref={attribute} className="field">
                                    {persons}
                                </select>
                                &nbsp;{attribute}</label>
                        </p>
                    );
                case 'status':
                    return (
                        <p key={attribute}>
                            <select placeholder={attribute} ref={attribute} className="field">
                                {statuses}
                            </select>
                        </p>
                    );
                default:
                    return (
                        <p key={attribute}>
                            <input type="text" placeholder={attribute} ref={attribute} className="field"/>
                        </p>
                    );
            }
        });

        return (
            <div>
                <a href="#createGame">Create</a>

                <div id="createGame" className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Create new game</h2>

                        <form>
                            {inputs}
                            <button onClick={this.handleSubmit}>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}