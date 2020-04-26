import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import SortByContainer from '../SortByContainer';
import SortBy from '../../Components/SortBy';
import Keys from '../../Constants/KeyMapping';
import { store } from '../../index'

Enzyme.configure({ adapter: new Adapter() });

describe('<SortByContainer />', () => {
    describe('the rendering behavior', () => {
        it('correctly renders <SortBy /> component', () => {
            const popupState = { open: null, sortedBy: null };
            const wrapper = shallow(<SortByContainer popupState={popupState} />);
            expect(wrapper.find(SortBy)).toHaveLength(1);
        });

        it('correctly passes all the props to SortBy', () => {
            const props = {
                ariaControlsId: 'someid',
                displayResults: true,
                totalResults: 5,
                sort: 'something',
                nameSortText: 'something else',
                popularSortText: 'randomstr',
                resultsText: 'randomothestr',
                sortByText: 'Sort by',
                sortingOptionsText: 'Sorting Options',
            };

            const wrapper = shallow(<SortByContainer popupState={{ sortedBy: 'name', isOpen: true }} {...props} />);
            for (let prop in props){
                if (props.hasOwnProperty(prop)){
                    expect(wrapper.find(SortBy).prop(prop)).toEqual(props[prop]);
                }
            }
        });
    });

    describe('the component methods', () => {
        it('calls the togglePopup prop when triggerToggle() is called', () => {
            const dispatch = sinon.stub(store, 'dispatch');
            const wrapper = shallow(<SortByContainer
                totalResults={0} />);
            wrapper.instance().triggerToggle();
            expect(dispatch.calledOnce).toEqual(true);
            dispatch.restore();
        });

        it('calls the setPopularSelected prop when setPopupStateAsPopular() is called', () => {
            const dispatch = sinon.stub(store, 'dispatch');
            const wrapper = shallow(<SortByContainer
                totalResults={0} />);
            wrapper.instance().setPopupStateAsPopular();
            expect(dispatch.calledOnce).toEqual(true);
            dispatch.restore();
        });

        it('calls the setNameSelected prop when setPopupStateAsName() is called', () => {
            const dispatch = sinon.stub(store, 'dispatch');
            const wrapper = shallow(<SortByContainer
                totalResults={0} />);
            wrapper.instance().setPopupStateAsName();
            expect(dispatch.calledOnce).toEqual(true);
            dispatch.restore();
        });

        it('correctly determines whether the event should be prevented', () => {
            const wrapper = shallow(<SortByContainer totalResults={0} />);

            expect(wrapper.instance().shouldPreventDefaultEvent(Keys.down)).toBe(true);
            expect(wrapper.instance().shouldPreventDefaultEvent(Keys.up)).toBe(true);
            expect(wrapper.instance().shouldPreventDefaultEvent(Keys.left)).toBe(true);
            expect(wrapper.instance().shouldPreventDefaultEvent(Keys.right)).toBe(false);
        });
    });

    describe('the event listeners', () => {
        it('calls preventDefault() on the event when toggleSortHandler is called with keyCode down and does not call triggerToggle', () => {
            const popup = { open: true, sortedBy: null };
            const mockPreventDefault = sinon.spy();
            const mockEvent = {
                preventDefault: mockPreventDefault,
                keyCode: Keys.down,
            };

            const triggerToggle = sinon.spy(SortByContainer.prototype, 'triggerToggle');

            const wrapper = mount(<SortByContainer
                popupState={popup}
                togglePopup={() => null} />);

            wrapper.find(SortBy).prop('onToggleSort')(mockEvent);

            expect(mockPreventDefault.calledOnce).toBe(true);
            expect(triggerToggle.calledOnce).toBe(false);
            SortByContainer.prototype.triggerToggle.restore(); // Unwraps the spy
        });

        it('calls focusNameButton when popupKeyDownHandler is called with keycode down', () => {
            const popup = { open: true, sortedBy: null };
            const mockEvent = {
                preventDefault: () => null,
                keyCode: Keys.down,
            };

            const wrapper = mount(<SortByContainer
                popupState={popup}
                togglePopup={() => null} />);

            wrapper.find(SortBy).prop('onPopupKeydown')(mockEvent);
        });
    });
});
