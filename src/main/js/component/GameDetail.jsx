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
            <React.Fragment>
                <h2>Game Details</h2>
                <div className="game-detail">
                    <h1 className="game-title">{this.props.game.entity.title}</h1>
                    <div className="game-info owner">
                        <p>Owner</p>
                        <p>
                            <i className="fa fa-user"/>
                            {this.state.owner}</p>
                    </div>

                    <div className="game-info borrower">
                        <p>Borrower</p>
                        <p>
                            <i className="fa fa-user"/>
                            {this.state.borrower}</p>
                    </div>

                    <div className="game-info status">
                        <p>Status</p>
                        <p>
                            <i className="fa fa-info"/>
                            {this.state.status}</p>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}
