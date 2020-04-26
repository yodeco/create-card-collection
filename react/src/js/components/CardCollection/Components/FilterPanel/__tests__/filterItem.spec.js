import React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';
import FilterItem from '../filterItem';

Enzyme.configure({ adapter: new Adapter() });

describe('filterItem', () => {
    let wrapper;
    let defaultProps;
    let toggleItem;
    let onFilterItemKeyDown;
    let getFormattedId;
    let index;
    let checked;
    let id;
    let name;

    beforeEach(() => {
        toggleItem = sinon.spy();
        onFilterItemKeyDown = sinon.spy();
        getFormattedId = sinon.spy();
        index = 1;
        id = 'id';
        name = 'name';
        checked = true;
        defaultProps = {
            toggleItem,
            onFilterItemKeyDown,
            getFormattedId,
            index,
            id,
            name,
            checked,
        };
        wrapper = shallow(<FilterItem {...defaultProps} />);
    });

    describe('rendering behavior', () => {
        it('renders a li element', () => {
            expect(wrapper.find('li')).toHaveLength(1);
        });

        it('renders an input element inside the li element', () => {
            const li = wrapper.find('li');
            expect(li.find('input')).toHaveLength(1);
        });

        it('renders a label inside the input element with the name prop as the text', () => {
            const li = wrapper.find('li');
            expect(li.find('label')).toHaveLength(1);
            expect(li.find('label').text()).toEqual(defaultProps.name);
        });
    });

    describe('the event listeners', () => {
        it('calls toggleItem with id prop when the label is clicked', () => {
            wrapper.find('label').simulate('click');
            expect(toggleItem.calledOnce).toBe(true);
            expect(toggleItem.calledWith(defaultProps.id)).toBe(true);
        });

        it('calls onFilterItemKeyDown when the input is keydowned', () => {
            wrapper.find('input').simulate('keydown');
            expect(onFilterItemKeyDown.calledOnce).toBe(true);
        });
    });
});
