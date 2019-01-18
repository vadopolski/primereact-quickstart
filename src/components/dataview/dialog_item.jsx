import React from 'react';

export const generateDialogItem = (client) => client
    ? (
        <div className="p-grid" style={{
            fontSize: '16px', textAlign: 'center', padding: '20px'
        }}>
            <div className="p-col-36" style={{textAlign: 'center'}}>
                <img src={client.bigPhotoLink}
                     alt={client.name}/>
            </div>

            <div className="p-col-12">{client.name}</div>

            <div className="p-col-12">{client.description}</div>
        </div>
    )
    : '';
