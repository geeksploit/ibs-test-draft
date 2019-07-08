import React from 'react';
import GameItem from './GameItem.jsx'

export default class GameList extends React.Component {

    render() {
        const games = this.props.games.map(game => {
            return <GameItem key={game.entity._links.self.href} game={game} onClick={this.props.onItemClick}
                             onDelete={this.props.onDelete}
            />
        });

        if (!games.length) return null;

        return (
            <table>
                <tbody>
                <tr>
                    <th>Title</th>
                    <th>Owner</th>
                    <th>Borrower</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                {games}
                </tbody>
            </table>
        )
    }
}
