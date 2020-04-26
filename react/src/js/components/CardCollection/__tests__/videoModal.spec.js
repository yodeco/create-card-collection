import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';
import VideoModal from '../videoModal';

Enzyme.configure({ adapter: new Adapter() });

describe('the videoModal component', () => {
    let wrapper;
    const name = 'my-name';

    beforeEach(() => {
        wrapper = shallow(<VideoModal videoUrl="https://www.google.com" name={name} />);
    });

    it('renders a div with the class .video-{name}', () => {
        expect(wrapper.find(`#video-${name}`)).toHaveLength(1);
    });

    it('renders a div with the class video-{name}-modalTitle', () => {
        expect(wrapper.find(`#video-${name}-modalTitle`)).toHaveLength(1);
    });

    it('renders an iframe', () => {
        expect(wrapper.find('iframe')).toHaveLength(1);
    });

    it('passes the videoUrl prop to the iframe', () => {
        expect(wrapper.find('iframe').prop('data-video-src')).toBe('https://www.google.com');
    });
});
