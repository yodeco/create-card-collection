import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import 'isomorphic-fetch';
import PaginationContainer from '../PaginationContainer';
import Pagination from '../../Components/Pagination';

Enzyme.configure({ adapter: new Adapter() });

describe('PaginationContainer', () => {
    let wrapper;

    describe('the lifecycle methods', () => {
        let origAddEventListener;
        let origRemoveEventListener;
        beforeEach(() => {
            origAddEventListener = window.addEventListener;
            origRemoveEventListener = window.removeEventListener;
            window.addEventListener = sinon.spy();
            window.removeEventListener = sinon.spy();
        });

        afterEach(() => {
            window.addEventListener = origAddEventListener;
            window.removeEventListener = origRemoveEventListener;
        });

        it('adds a resize listener to window', () => {
            wrapper = shallow(<PaginationContainer />);
            expect(window.addEventListener.calledWith('resize')).toBe(true);
        });

        it('removes the listener when dismounting', () => {
            wrapper = shallow(<PaginationContainer />);
            wrapper.unmount();
            expect(window.removeEventListener.calledWith('resize')).toBe(true);
        });

        it('sets the state to isMobile: true when the window inner width is less than 600', () => {
            window.innerWidth = 500;
            wrapper = shallow(<PaginationContainer />);
            expect(wrapper.instance().state.isMobile).toBe(true);
        });

        it('does not set state isMobile to true when window inner width is at least 600', () => {
            window.innerWidth = 700;
            wrapper = shallow(<PaginationContainer />);
            expect(wrapper.instance().state.isMobile).toBe(false);
        });
    });

    describe('the rendering behavior', () => {
        it('renders a Pagination component', () => {
            wrapper = shallow(<PaginationContainer />);
            expect(wrapper.find(Pagination)).toHaveLength(1);
        });
    });
});
