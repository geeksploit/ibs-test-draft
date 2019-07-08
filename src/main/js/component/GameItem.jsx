import React from 'react';

export default class GameItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            owner: '...',
            borrower: '...',
            status: '...'
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
        event.stopPropagation();
        this.props.onDelete(this.props.game);
    }

    componentDidMount() {
        this.props.game.entity.owner.then(response => {
            this.setState({
                owner: response.entity.firstName
            })
        });
        this.props.game.entity.borrower.then(response => {
            this.setState({
                borrower: response.entity.firstName
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
        this.props.game.entity.status.then(response => {
            this.setState({
                status: response.entity.name
            })
        });
    }

    render() {
        return (
            <tr onClick={() => {
                this.props.onClick(this.props.game)
            }}>
                <td>{this.props.game.entity.title}</td>
                <td>{this.state.owner}</td>
                <td>{this.state.borrower}</td>
                <td>{this.state.status}</td>
                <td>
                    <button onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        )
    }
}
