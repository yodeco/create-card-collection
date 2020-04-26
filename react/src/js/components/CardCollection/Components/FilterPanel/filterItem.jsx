/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

/** Class representing the UI for the Spectrum Accordion. */
export default class FilterItem extends React.Component {
    constructor(props) {
        super(props);
        this.toggleItem = this.toggleItem.bind(this);
    }

    toggleItem() {
        this.props.toggleItem(this.props.id);
    }

    keyDownHandler(e) {
        this.props.onFilterItemKeyDown(e, this.props.id, this.props.index);
    }

    render() {
        const formattedId = this.props.getFormattedId(this.props.id);
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        const label = <label id={`${formattedId}-label`} onClick={this.toggleItem}>{this.props.name}</label>;
        return (
            <li>
                <input
                    onKeyDown={e => this.keyDownHandler(e)}
                    id={formattedId}
                    type="checkbox"
                    name={formattedId}
                    value={formattedId}
                    checked={this.props.checked}
                    aria-labelledby={`${formattedId}-label`} />
                {label}
            </li>
        );
    }
}

FilterItem.propTypes = {
    toggleItem: PropTypes.func.isRequired,
    onFilterItemKeyDown: PropTypes.func.isRequired,
    getFormattedId: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    checked: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};
