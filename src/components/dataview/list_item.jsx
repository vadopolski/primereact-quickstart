import React from 'react';
import {Button} from "primereact/components/button/Button";

export const generateListItem = (client, onClickButtonFunc) => client
    ? (
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
                    <Button icon="pi pi-search" onClick={onClickButtonFunc}/>
                </div>
            </div>
        </div>
    )
    : '';
