import React, {Component} from 'react';
import {Dialog} from 'primereact/dialog';
import {Panel} from 'primereact/panel';
import {DataView, DataViewLayoutOptions} from "primereact/dataview";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {getClientsFromFile, getClientsFromNetwork} from "../utils/client_service";
import HeaderLine from "../header/header_line";
import HeaderContent from "../header/header_content";

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
        getClientsFromFile().then(data => {
            this.setState((prevState) => ({clients: data}));
        });
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
            <div className="p-col-12 client-details" style={{padding: '2em', borderBottom: '1px solid #d9d9d9'}}>
                <div className="p-grid">
                    <div className="p-col-12 p-md-3">
                        <img src={client.smallPhotoLink}
                             alt={client.name}/>
                    </div>
                    <div className="p-col-12 p-md-8 client-data">
                        <div>Name: <b>{client.name}</b></div>
                        <div>Description: <b>{client.description}</b></div>
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
                <Panel header={client.name} style={{ textAlign: 'center' }}>
                    <img src={client.smallPhotoLink}
                         alt={client.name} />
                    <div className="client-detail">{client.name}</div>
                    <hr className="ui-widget-content" style={{ borderTop: 0 }} />
                    <Button icon="pi pi-search"
                            onClick={(e) => this.setState({ selectedClient: client, visible: true })}/>
                </Panel>
            </div>
        );
    }

    itemTemplate(client, layout) {
        if (!client) {
            return;
        }
        if (layout === 'list'){
            return this.renderListItem(client);
        }
        else if (layout === 'grid')
            return this.renderGridItem(client);
    }

    renderClientDialogContent() {
        if (this.state.selectedClient) {
            return (
                <div className="p-grid" style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>
                    <div className="p-col-36" style={{textAlign: 'center'}}>
                        <img src={this.state.selectedClient.bigPhotoLink}
                             alt={this.state.selectedClient.name} />
                    </div>

                    <div className="p-col-12">{this.state.selectedClient.name}</div>

                    <div className="p-col-12">{this.state.selectedClient.description}</div>
                </div>
            );
        }
        else {
            return null;
        }
    }

    renderHeader() {
        const sortOptions = [
            {label: 'Name desc', value: '!name'},
            {label: 'Name Asc', value: 'name'},
            {label: 'Rating', value: 'id'}
        ];

        return (
            <div className="p-grid">
                <div className="p-col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={this.state.sortKey}
                              placeholder="Sort By" onChange={this.onSortChange} />
                </div>
                <div className="p-col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={this.state.layout}
                                           onChange={(e) => this.setState({layout: e.value})} />
                </div>
            </div>
        );
    }

    render() {
        const pageHeader = this.renderHeader();

        return (
            <div className="layout-wrapper">
                <HeaderLine
                    headerName={'Clients'}
                    tagName={'2'}
                    className={'content-section introduction'}
                />

                <div className="content-section">
                    {
                        (Array.isArray(this.state.clients) && this.state.clients.length)
                            ? (
                                <DataView value={this.state.clients}
                                          layout={this.state.layout}
                                          header={pageHeader} itemTemplate={this.itemTemplate}
                                          paginatorPosition={'both'}
                                          paginator={true} rows={5}
                                          sortOrder={this.state.sortOrder}
                                          sortField={this.state.sortField} />
                            ) : (
                                <div>Loading...</div>
                            )
                    }

                    <Dialog header="Client Details"
                            visible={this.state.visible}
                            width="650px" modal={true}
                            onHide={() => this.setState({visible: false})}>
                        {this.renderClientDialogContent()}
                    </Dialog>
                </div>
            </div>
        );
    }
}