import React, {Component} from 'react';
import {Dialog} from 'primereact/dialog';
import {Panel} from 'primereact/panel';
import {DataView, DataViewLayoutOptions} from "primereact/dataview";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {CarService, getCarsLarge} from "./CarService";

export class ClientView extends Component {

    constructor() {
        super();
        this.state = {
            clients: [],
            layout: 'list',
            selectedClient: null,
            visible: false,
            sortKey: null,
            sortOrder: null
        };
        this.itemTemplate = this.itemTemplate.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
    }

    componentDidMount() {
        getCarsLarge().then(data => this.setState({clients: data}));
    }

    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.setState({
                sortOrder: -1,
                sortField: value.substring(1, value.length),
                sortKey: value
            });
        }
        else {
            this.setState({
                sortOrder: 1,
                sortField: value,
                sortKey: value
            });
        }
    }

    renderListItem(client) {
        return (
            <div className="p-col-12 car-details" style={{padding: '2em', borderBottom: '1px solid #d9d9d9'}}>
                <div className="p-grid">
                    <div className="p-col-12 p-md-3">
                        <img src={`https://pp.userapi.com/c637220/v637220434/3d64f/9mXTM1KcI80.jpg`}
                             alt={client.brand}/>
                    </div>
                    <div className="p-col-12 p-md-8 car-data">
                        <div>Vin: <b>{client.vin}</b></div>
                        <div>Year: <b>{client.year}</b></div>
                    </div>

                    <div className="p-col-12 p-md-1 search-icon" style={{marginTop:'40px'}}>
                        <Button icon="pi pi-search" onClick={(e) => this.setState({ selectedClient: client, visible: true })}/>
                    </div>
                </div>
            </div>
        );
    }

    renderGridItem(client) {
        return (
            <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
                <Panel header={client.vin} style={{ textAlign: 'center' }}>
                    <img src={`https://pp.userapi.com/c637220/v637220434/3d64f/9mXTM1KcI80.jpg`}
                         alt={client.brand} />
                    <div className="car-detail">{client.year} - {client.color}</div>
                    <hr className="ui-widget-content" style={{ borderTop: 0 }} />
                    <Button icon="pi pi-search" onClick={(e) => this.setState({ selectedClient: client, visible: true })}/>
                </Panel>
            </div>
        );
    }

    itemTemplate(client, layout) {
        if (!client) {
            return;
        }

        if (layout === 'list')
            return this.renderListItem(client);
        else if (layout === 'grid')
            return this.renderGridItem(client);
    }

    renderClientDialogContent() {
        if (this.state.selectedClient) {
            return (
                <div className="p-grid" style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>
                    <div className="p-col-12" style={{textAlign: 'center'}}>
                        <img src={`https://pp.userapi.com/c637220/v637220434/3d64f/9mXTM1KcI80.jpg`}
                             alt={this.state.selectedClient.brand} />
                    </div>

                    <div className="p-col-4">Vin: </div>
                    <div className="p-col-8">{this.state.selectedClient.vin}</div>

                    <div className="p-col-4">Year: </div>
                    <div className="p-col-8">{this.state.selectedClient.year}</div>
                </div>
            );
        }
        else {
            return null;
        }
    }

    renderHeader() {
        const sortOptions = [
            {label: 'Newest First', value: '!year'},
            {label: 'Oldest First', value: 'year'},
            {label: 'Brand', value: 'brand'}
        ];

        return (
            <div className="p-grid">
                <div className="p-col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={this.state.sortKey} placeholder="Sort By" onChange={this.onSortChange} />
                </div>
                <div className="p-col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={this.state.layout} onChange={(e) => this.setState({layout: e.value})} />
                </div>
            </div>
        );
    }

    render() {
        const header = this.renderHeader();

        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h2>Clients</h2>
                    </div>
                </div>

                <div className="content-section implementation dataview-demo">
                    <DataView value={this.state.clients} layout={this.state.layout} header={header}
                              itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true} rows={20}
                              sortOrder={this.state.sortOrder} sortField={this.state.sortField} />

                    <Dialog header="Client Details" visible={this.state.visible} width="225px" modal={true} onHide={() => this.setState({visible: false})}>
                        {this.renderClientDialogContent()}
                    </Dialog>
                </div>
            </div>
        );
    }
}
