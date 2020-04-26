import React from 'react';
import PropTypes from 'prop-types';
import ShowMoreCard from '../Components/Cards/showMoreCard';
import Keys from '../Constants/KeyMapping';

class ShowMoreCardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onClick() {
        this.props.loadMoreCards();
    }

    onKeyPress(ev) {
        if (ev.charCode === Keys.enter || ev.charCode === Keys.space) {
            this.props.loadMoreCards();
        }
    }

    render() {
        return (
            <ShowMoreCard
                onClick={this.onClick}
                onKeyPress={this.onKeyPress} />
        );
    }
}

ShowMoreCardContainer.propTypes = {
    loadMoreCards: PropTypes.func.isRequired,
};

export default ShowMoreCardContainer;
