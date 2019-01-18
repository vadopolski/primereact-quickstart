import React, {Component} from 'react';

import {DataView} from "primereact/dataview";
import {getClientsFromFile, getClientsFromNetwork} from "../utils/client_service";
import HeaderLine from "../header/header_line";
import {getHeaderContent} from "../header/header_content";
import {Dialog} from "primereact/components/dialog/Dialog";
import {generateListItem} from "./list_item";
import {generateDialogItem} from "./dialog_item";
import {generateGridItem} from "./grid_item";


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

    itemTemplate(client, layout) {
        if (!client) {
            return;
        }
        if (layout === 'list'){
            return generateListItem(client, (e) => this.setState({ selectedClient: client, visible: true }));
        }
        else if (layout === 'grid')
            return generateGridItem(client, (e) => this.setState({ selectedClient: client, visible: true }));
    }

    render() {
        const sortFields = ['!name', 'name', 'id'];

        const pageHeader = getHeaderContent(
            {
                dropDownValue: this.state.sortKey,
                sortFields: sortFields,
                sortKey: this.state.sortKey,
                onSortChange: this.onSortChange,
                layout: this.state.layout,
                layoutChange: (e) => this.setState({layout: e.value}),
            }
        );

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
                                          header={pageHeader}
                                          itemTemplate={this.itemTemplate}
                                          paginatorPosition={'both'}
                                          paginator={true} rows={8}
                                          sortOrder={this.state.sortOrder}
                                          sortField={this.state.sortField} />
                            ) : (
                                <div>Loading...</div>
                            )
                    }

                    <Dialog header="Client Details"
                            contentStyle={{ maxHeight: "800px" }}
                            visible={this.state.visible}
                            modal={true}
                            onHide={() => this.setState({visible: false})}>
                        {generateDialogItem(this.state.selectedClient)}
                    </Dialog>
                </div>
            </div>
        );
    }
}