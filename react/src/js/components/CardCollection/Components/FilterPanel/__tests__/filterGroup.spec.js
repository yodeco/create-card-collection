import React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';
import FilterGroup from '../filterGroup';
import FilterItem from '../filterItem';

Enzyme.configure({ adapter: new Adapter() });

describe('<FilterGroup />', () => {
    let wrapper;
    let defaultProps;
    let onFilterGroupKeyDown;
    let toggleGroup;

    beforeEach(() => {
        onFilterGroupKeyDown = sinon.spy();
        toggleGroup = sinon.spy();
        const onFilterItemKeyDown = sinon.spy();
        const toggleItem = sinon.spy();
        const getFormattedId = sinon.spy();
        const filterItems = [
            {
                id: 'filterItemId',
                title: 'title',
                checked: true,
                category: 'category',
            },
            {
                id: 'filterItemId',
                title: 'title',
                checked: true,
                category: 'category',
            },
        ];
        const id = 'id';

        defaultProps = {
            onFilterItemKeyDown,
            toggleItem,
            getFormattedId,
            onFilterGroupKeyDown,
            toggleGroup,
            filterItems,
            id,
        };

        wrapper = shallow(<FilterGroup {...defaultProps} />);
    });

    describe('the rendering behavior', () => {
        it('renders a .tag-List_Group', () => {
            expect(wrapper.find('.tag-List_Group')).toHaveLength(1);
        });

        it('renders an checkbox input with class tag-List_Group-header', () => {
            expect(wrapper.find('input[type="checkbox"].tag-List_Group-header')).toHaveLength(1);
        });

        it('renders a label with id tag-List_Group_Label-{this.props.nameId} with the name prop as the text inside, with an span', () => {
            const label = wrapper.find(`label#tag-List_Group_Label-${'name-id'}`);
            expect(label).toHaveLength(1); // name-id is the default nameId prop
            expect(label.text()).toEqual('name'); // name is the default name prop
            const span = label.find('span');
            expect(span).toHaveLength(1);
        });

        it('renders two filter items when passed two filter Items', () => {
            expect(wrapper.find(FilterItem)).toHaveLength(2);
        });

        it('adds is-Open to the section element when isOpen is true', () => {
            expect(wrapper.find('section').hasClass('is-Open')).toBe(true);
        });

        it('adds is-Closed to the section element when isOpen is false', () => {
            const props = {
                ...defaultProps,
                isOpen: false,
            };
            wrapper = shallow(<FilterGroup {...props} />);
            expect(wrapper.find('section').hasClass('is-Closed')).toBe(true);
        });
    });

    describe('the event listeners', () => {
        it('calls toggleGroup when the input element is clicked', () => {
            wrapper.find('input').simulate('click');
            expect(toggleGroup.calledOnce).toBe(true);
        });

        it('calls onFilterGroupKeyDown when a keydown is fired on the input element', () => {
            wrapper.find('input').simulate('keydown');
            expect(onFilterGroupKeyDown.calledOnce).toBe(true);
        });
    });
});
