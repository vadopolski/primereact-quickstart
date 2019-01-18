import React from 'react';
import {Dropdown} from "primereact/dropdown";
import {DataViewLayoutOptions} from "primereact/dataview";

const generateSortOptions = (sortFields) => {
    const result = sortFields.map(e => {
        return {label: `${e} desc`, value: e}
    });

    return result;
};

export const getHeaderContent = (props) => (
    <div className="p-grid">
        <div className="p-col-6" style={{textAlign: 'left'}}>
            <Dropdown options={generateSortOptions(props.sortFields)} value={props.sortKey}
                      placeholder="Sort By" onChange={props.onSortChange}/>
        </div>
        <div className="p-col-6" style={{textAlign: 'right'}}>
            <DataViewLayoutOptions layout={props.layout}
                                   onChange={props.layoutChange}/>
        </div>
    </div>
);