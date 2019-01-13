import React, {Component} from 'react';
import {Button} from 'primereact/button';
import logo from './logo.png';
import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import {ClientView} from "./components/dataview";

class App extends Component {

    constructor() {
        super();
        this.state = {count: 0};
        this.increment = this.increment.bind(this);
    }

    increment() {
        this.setState({count: this.state.count + 1});
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1>Mne Idet Project</h1>
                </div>
                <div className="layout-wrapper">
                    <div id="layout-content">
                        <ClientView/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
