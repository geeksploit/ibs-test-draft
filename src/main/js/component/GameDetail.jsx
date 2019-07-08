import React from 'react';

export default class GameDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            owner: '...',
            borrower: '...',
            status: '...'
        };
    }

    componentWillReceiveProps(nextProps) {

        if (!nextProps.game) return;

        nextProps.game.entity.owner.then(response => {
            this.setState({
                owner: response.entity.firstName + " " + response.entity.lastName
            })
        });
        nextProps.game.entity.borrower.then(response => {
            this.setState({
                borrower: response.entity.firstName + " " + response.entity.lastName
            })
        }).catch(error => {
            switch (error.status.code) {
                case 404:
                    this.setState({
                        borrower: 'not borrowed'
                    });
                    break;
                default:
                    console.log(error);
            }
        });
        nextProps.game.entity.status.then(response => {
            this.setState({
                status: response.entity.name
            })
        });
    }

    render() {
        if (!this.props.game) return null;

        return (
            <div>
                <h1>{this.props.game.entity.title}</h1>
                <ul>
                    <li>{this.state.owner}</li>
                    <li>{this.state.borrower}</li>
                    <li>{this.state.status}</li>
                </ul>
            </div>
        )
    }
}
