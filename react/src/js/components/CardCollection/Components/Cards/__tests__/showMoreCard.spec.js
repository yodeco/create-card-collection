import React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';
import ShowMoreCard from '../showMoreCard';

Enzyme.configure({ adapter: new Adapter() });

describe('showMoreCard', () => {
    let wrapper;
    let onClick;
    let onKeyPress;
    let showMoreText;

    beforeEach(() => {
        onClick = sinon.spy();
        onKeyPress = sinon.spy();
        showMoreText = 'showmoretext';
        wrapper = shallow(<ShowMoreCard
            onClick={onClick}
            onKeyPress={onKeyPress}
            showMoreText={showMoreText} />);
    });
    describe('the rendering behavior', () => {
        it('renders a div.card_showmore', () => {
            expect(wrapper.find('.card_showmore')).toHaveLength(1);
        });

        it('renders the show more text', () => {
            expect(wrapper.find('span').text()).toEqual(showMoreText);
        });
    });

    describe('the event listeners', () => {
        it('calls onClick when the show more button is clicked', () => {
            wrapper.find('span').simulate('click');
            expect(onClick.calledOnce).toBe(true);
        });

        it('calls onClick when the svg is clicked', () => {
            wrapper.find('svg').simulate('click');
            expect(onClick.calledOnce).toBe(true);
        });

        it('calls onKeyPress when the span is keypressed', () => {
            wrapper.find('span').simulate('keypress');
            expect(onKeyPress.calledOnce).toBe(true);
        });
    });
});
