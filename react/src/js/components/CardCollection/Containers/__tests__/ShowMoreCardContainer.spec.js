import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import 'isomorphic-fetch';
import ShowMoreCardContainer from '../ShowMoreCardContainer';
import ShowMoreCard from '../../Components/Cards/showMoreCard';
import Keys from '../../Constants/KeyMapping';

Enzyme.configure({ adapter: new Adapter() });

describe('ShowMoreCardContainer', () => {
    it('calls loadMoreCards when clicked', () => {
        const spy = sinon.spy();
        const wrapper = shallow(<ShowMoreCardContainer loadMoreCards={spy} />);
        wrapper.find(ShowMoreCard).simulate('click');
        expect(spy.calledOnce).toBe(true);
    });

    it('calls loadMoreCards when keypress event is fired and keycode is enter or space', () => {
        const spy = sinon.spy();
        const wrapper = shallow(<ShowMoreCardContainer loadMoreCards={spy} />);
        wrapper.find(ShowMoreCard).simulate('keypress', { charCode: Keys.enter });
        wrapper.find(ShowMoreCard).simulate('keypress', { charCode: Keys.space });
        expect(spy.calledTwice).toBe(true);
    });
});
