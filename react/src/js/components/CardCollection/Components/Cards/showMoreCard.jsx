import React from 'react';
import PropTypes from 'prop-types';

/** Class representing the UI for the Spectrum Accordion. */
const showMoreCard = props => (
    <div className="card card_showmore">
        <svg
            onClick={props.onClick}
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 0 48 48"
            width="48">
            <path
                d="M37 20H26V9a1 1 0 0 0-1-1H21a1 1 0 0 0-1 1V20H9a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1H20V37a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V26H37a1 1 0 0 0 1-1V21A1 1 0 0 0 37 20Z"
                fill="#1473E6" />
        </svg>
        <span
            onClick={props.onClick}
            onKeyPress={ev => props.onKeyPress(ev)}
            role="button"
            tabIndex="0">
            {props.showMoreText || 'Show more'}
        </span>
    </div>
);

showMoreCard.propTypes = {
    onClick: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    showMoreText: PropTypes.string,
};

showMoreCard.defaultProps = {
    showMoreText: 'Show more',
};

export default showMoreCard;
