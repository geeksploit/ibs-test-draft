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
        });

        follow(client, ['persons']).then(optionCollection => {
            return optionCollection.entity._embedded.persons.map(option =>
                client({
                    method: 'GET',
                    path: option._links.self.href
                })
            );
        }).then(optionPromises => {
            return when.all(optionPromises);
        }).done(options => {
            console.log('options');
            console.log(options);
            this.setState({
                persons: options
            });
        });

        follow(client, ['statuses']).then(optionCollection => {
            return optionCollection.entity._embedded.statuses.map(option =>
                client({
                    method: 'GET',
                    path: option._links.self.href
                })
            );
        }).then(optionPromises => {
            return when.all(optionPromises);
        }).done(options => {
            console.log('options');
            console.log(options);
            this.setState({
                statuses: options
            });
        });
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

    onDelete(deletedGame) {
        client({method: 'DELETE', path: deletedGame.entity._links.self.href}).done(response => {
            this.setState({
                games: this.state.games.filter(game => game !== deletedGame)
            });
            if (this.state.selectedGame === deletedGame) {
                this.setState({
                    selectedGame: null
                })
            }
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
            <div className="game-manager">
                <div>
                    <h2>Board Games</h2>
                    <CreateDialog attributes={this.state.attributes} persons={this.state.persons}
                                  statuses={this.state.statuses} onCreate={this.onCreate}/>
                    <br/>
                    <GameList games={this.state.games} onItemClick={this.onItemClick} onDelete={this.onDelete}/>
                </div>
                <GameDetail game={this.state.selectedGame}/>

            </div>
        )
    }
}
