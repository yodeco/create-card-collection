import React from 'react';
import PropTypes from 'prop-types';
import FilterItem from './filterItem';

export default class filterGroup extends React.Component {
    constructor(props) {
        super(props);
        this.toggleGroup = this.toggleGroup.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
    }

    toggleGroup() {
        this.props.toggleGroup(this.props.id);
    }

    keyDownHandler(e) {
        this.props.onFilterGroupKeyDown(e, this.props.id);
    }

    render() {
        const isOpen = this.props.isOpen ? 'is-Open' : 'is-Closed';
        return (
            <section
                className={`tag-List_Group ${isOpen}`}>
                <input
                    onKeyDown={e => this.keyDownHandler(e)}
                    className="tag-List_Group-header"
                    onClick={this.toggleGroup}
                    type="checkbox"
                    id={`tag-List_Group-${this.props.nameId}`}
                    role="button"
                    aria-controls={`tag-List_Group-tags-${this.props.nameId}`}
                    aria-labelledby={`tag-List_Group_Label-${this.props.nameId}`}
                    aria-expanded={this.props.isOpen} />
                <label
                    id={`tag-List_Group_Label-${this.props.nameId}`}>
                    <span className="tag-List_Group-header-arrow" />
                    {this.props.name}
                </label>
                <ul
                    className="tag-List_Group-tags"
                    id={`tag-List_Group-tags-${this.props.nameId}`}>
                    {this.props.filterItems.map((item, index) => (
                        <FilterItem
                            key={item.id}
                            index={index}
                            onFilterItemKeyDown={this.props.onFilterItemKeyDown}
                            toggleItem={this.props.toggleItem}
                            getFormattedId={this.props.getFormattedId}
                            name={item.title}
                            id={item.id}
                            checked={item.checked}
                            group={item.category} />
                    ))}
                </ul>
            </section>
        );
    }
}

filterGroup.propTypes = {
    onFilterItemKeyDown: PropTypes.func.isRequired,
    filterItems: PropTypes.arrayOf(PropTypes.any).isRequired,
    name: PropTypes.string,
    toggleItem: PropTypes.func.isRequired,
    getFormattedId: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,
    nameId: PropTypes.string,
    onFilterGroupKeyDown: PropTypes.func.isRequired,
    toggleGroup: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
};

filterGroup.defaultProps = {
    name: 'name',
    isOpen: true,
    nameId: 'name-id',
};
