import React from 'react';
import PropTypes from 'prop-types';
import {Dropdown} from "primereact/dropdown";
import {DataViewLayoutOptions} from "primereact/dataview";

const HeaderContent = (props) => {
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
};

export default React.memo(HeaderContent);

HeaderContent.propTypes = {
	dropDownValue: PropTypes.func,
    tagName: PropTypes.string,
    className: PropTypes.string
};