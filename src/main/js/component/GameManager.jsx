import React from 'react';
import when from 'when';

import client from '../client';
import follow from '../follow';

import CreateDialog from './CreateDialog.jsx';
import GameList from './GameList.jsx';
import GameDetail from './GameDetail.jsx';

export default class GameManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            attributes: [],
            games: [],
            selectedGame: null
        };
        this.onCreate = this.onCreate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
    }

    loadFromServer(pageSize) {
        // follow(client, ['games']).then(gameCollection => {
        //     return gameCollection.entity._embedded.games.map(game =>
        //         client({
        //             method: 'GET',
        //             path: game._links.self.href
        //         })
        //     );
        // }).then(gamePromises => {
        //     return when.all(gamePromises);
        // }).done(games => {
        //     this.setState({
        //         games: games
        //     });
        // })
        //


        follow(client, ['games']).then(gameCollection => {
            return client({
                method: 'GET',
                path: gameCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                return gameCollection;
            });
        }).then(gameCollection => {
            return gameCollection.entity._embedded.games.map(game =>
                client({
                    method: 'GET',
                    path: game._links.self.href
                })
            );
        }).then(gamePromises => {
            return when.all(gamePromises);
        }).done(games => {
            this.setState({
                games: games,
                attributes: Object.keys(this.schema.properties)
            });
        })

        //     .done(gameCollection => {
        //     this.setState({
        //         games: gameCollection.entity._embedded.games,
        //         attributes: Object.keys(this.schema.properties)});
        // });
    }

    onCreate(newGame) {
        follow(client, ['games']).then(gamesCollection => {
            return client({
                method: 'POST',
                path: gamesCollection.entity._links.self.href,
                entity: newGame,
                headers: {'Content-Type': 'application/json'}
            })
        }).then(response => {
            return follow(client, ['games']);
        }).done(response => {
            this.loadFromServer();
        });
    }

    onDelete(game) {
        client({method: 'DELETE', path: game.entity._links.self.href}).done(response => {
            this.loadFromServer();
        });
    }

    onItemClick(event) {
        this.setState({
            selectedGame: event
        })
    }

    componentDidMount() {
        this.loadFromServer();
    }

    render() {
        return (
            <div>
                <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
                <GameList games={this.state.games} onItemClick={this.onItemClick} onDelete={this.onDelete}/>
                <GameDetail game={this.state.selectedGame}/>
            </div>
        )
    }
}
