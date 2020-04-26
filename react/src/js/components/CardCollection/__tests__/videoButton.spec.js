import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import 'isomorphic-fetch';
import VideoButton from '../videoButton';

Enzyme.configure({ adapter: new Adapter() });

describe('videoButton', () => {
    it('calls showVideoModal when clicked', () => {
        const stub = sinon.stub(VideoButton.prototype, 'showVideoModal').callsFake(() => null);
        const wrapper = shallow(<VideoButton videoUrl="https://www.google.com" />);
        wrapper.find('button').simulate('click');
        expect(stub.calledOnce).toBe(true);
        stub.restore();
    });

    it('calls openModal when showVideoModal is called', () => {
        const stub = sinon.stub(VideoButton.prototype, 'openModal').callsFake(() => null);
        const wrapper = shallow(<VideoButton videoUrl="https://www.google.com" />);
        const preventDefaultSpy = sinon.spy();
        const stopPropagationSpy = sinon.spy();
        wrapper.find('button').simulate('click', {
            preventDefault: preventDefaultSpy,
            stopPropagation: stopPropagationSpy,
        });
        expect(stub.calledOnce).toBe(true);
        expect(preventDefaultSpy.calledOnce).toBe(true);
        expect(stopPropagationSpy.calledOnce).toBe(true);

        stub.restore();
    });
});
