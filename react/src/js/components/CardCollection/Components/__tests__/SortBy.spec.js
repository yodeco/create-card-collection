import React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SortBy from '../SortBy';

Enzyme.configure({ adapter: new Adapter() });

describe('SortBy', () => {
    let wrapper;
    let defaultProps;
    let setPopularButtonRef;
    let onSortByPopular;
    let setNameButtonRef;
    let onSortByName;
    let onPopupKeydown;
    let onToggle;
    let onToggleSort;
    let setToggleSortButtonRef;

    beforeEach(() => {
        setPopularButtonRef = sinon.spy();
        onSortByPopular = sinon.spy();
        setNameButtonRef = sinon.spy();
        onSortByName = sinon.spy();
        onPopupKeydown = sinon.spy();
        onToggle = sinon.spy();
        onToggleSort = sinon.spy();
        setToggleSortButtonRef = sinon.spy();

        defaultProps = {
            setPopularButtonRef,
            onSortByPopular,
            setNameButtonRef,
            onSortByName,
            onPopupKeydown,
            onToggle,
            onToggleSort,
            setToggleSortButtonRef,
        };

        wrapper = shallow(<SortBy {...defaultProps} />);
    });

    describe('the rendering behavior', () => {
        it('renders a wrapper div with class card-collection_sort', () => {
            expect(wrapper.find('div.card-collection_sort')).toHaveLength(1);
        });

        it('displays total results in a span with id total-results', () => {
            const totalResults = wrapper.find('span#total-results');
            expect(totalResults).toHaveLength(1);
            expect(totalResults.text()).toEqual('1 results'); // these are the default props
        });

        it('renders a button with class sortby_label', () => {
            expect(wrapper.find('button.sortby_label')).toHaveLength(1);
        });

        it('renders a popup with class sortby_popup', () => {
            expect(wrapper.find('.sortby_popup')).toHaveLength(1);
        });

        it('renders two li elements with buttons inside with classes popular and name respectively', () => {
            const li = wrapper.find('li');
            expect(li).toHaveLength(2);
            expect(li.find('button.popular')).toHaveLength(1);
            expect(li.find('button.name')).toHaveLength(1);
        });
    });

    describe('the event listeners', () => {
        it('calls the onToggle prop when sortby_label is clicked', () => {
            wrapper.find('.sortby_label').simulate('click');
            expect(onToggle.calledOnce).toBe(true);
        });

        it('calls the onToggleSort prop when the sortby_label is keydowned', () => {
            wrapper.find('.sortby_label').simulate('keydown');
            expect(onToggleSort.calledOnce).toBe(true);
        });

        it('calls onPopupKeydown when sortby_popup is keydowned', () => {
            wrapper.find('.sortby_popup').simulate('keydown');
            expect(onPopupKeydown.calledOnce).toBe(true);
        });

        it('calls onSortByPopular when .popular is clicked', () => {
            wrapper.find('.popular').simulate('click');
            expect(onSortByPopular.calledOnce).toBe(true);
        });

        it('calls onSortByName when .name is clicked', () => {
            wrapper.find('.name').simulate('click');
            expect(onSortByName.calledOnce).toBe(true);
        });
    });
});
