import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export class Greeting extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { items: [] };
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/clients`)
            .then(res => {
                const persons = res.data;
                this.setState({ items: persons });
                console.log(this.state.items[0]);
            });
    }

    render() {
        return (
            <div>
                {
                    (Array.isArray(this.state.items) && this.state.items.length)
                        ? (
                            <ul>
                                {this.state.items.map(item => (
                                    <li key={item.id}>Name: {item.name} Description: {item.description} Id Vkontacte: {item.id_vk}</li>
                                ))}
                            </ul>
                        ) : (
                        <div>Loading...</div>
                        )
                }
            </div>
        );
    }
}

