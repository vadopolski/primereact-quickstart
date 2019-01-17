import React from 'react';
import PropTypes from 'prop-types';

const HeaderLine = (props) => {
    const CustomTag = `h${props.tagName}`;

    return (
        <div className={props.className}>
            <CustomTag>{props.headerName}</CustomTag>
        </div>
    );
};

export default React.memo(HeaderLine);

HeaderLine.propTypes = {
	headerName: PropTypes.string,
    tagName: PropTypes.string,
    className: PropTypes.string
};