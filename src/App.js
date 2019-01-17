import React, {Component} from 'react';
import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import {ClientView} from "./components/dataview";
import HeaderLine from "./components/header/header_line";

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
                <HeaderLine
                    projectName={'Mne Idet Project'}
                    tagName={'1'}
                    className={'App-header'}
                />
                <ClientView/>
            </div>
        );
    }
}

export default App;