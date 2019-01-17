import React from 'react';
import PropTypes from 'prop-types';
import {Dropdown} from "primereact/dropdown";
import {DataViewLayoutOptions} from "primereact/dataview";

const HeaderContent = (props) => {

    return (
        <div className="p-grid">
            <div className="p-col-6" style={{textAlign: 'left'}}>
                <Dropdown options={props.sortOptions} value={props.sortKey}
                          placeholder="Sort By" onChange={props.onSortChange} />
            </div>
            <div className="p-col-6" style={{textAlign: 'right'}}>
                <DataViewLayoutOptions layout={props.layout}
                                       onChange={props.layoutChange} />
            </div>
        </div>
    );
};

export default React.memo(HeaderContent);

HeaderContent.propTypes = {
	dropDownValue: PropTypes.string,
    sortOptions: PropTypes.array,
    sortKey: PropTypes.string,
    onSortChange: PropTypes.func,
    layout: PropTypes.func,
    layoutChange: PropTypes.func
};