import React from 'react';
import {Panel} from "primereact/components/panel/Panel";
import {Button} from "primereact/components/button/Button";

export const generateGridItem = (client, onClickButtonFunc) => client
    ? (
        <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
            <Panel header={client.name} style={{ textAlign: 'center' }}>
                <img src={client.smallPhotoLink}
                     alt={client.name} />
                <div className="client-detail">{client.name}</div>
                <hr className="ui-widget-content" style={{ borderTop: 0 }} />
                <Button icon="pi pi-search"
                        onClick={onClickButtonFunc  }/>
            </Panel>
        </div>
    )
    : '';
