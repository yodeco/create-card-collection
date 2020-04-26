import React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';
import Pagination from '../Pagination';

Enzyme.configure({ adapter: new Adapter() });

describe('the pagination component', () => {
    let wrapper;
    let pageList;
    let onGoToTheLastPage;
    let onGoToNextPage;
    let onGoToPage;
    let onGoToTheFirstPage;
    let onGoToPreviousPage;
    let defaultProps;

    beforeEach(() => {
        pageList = [1, 2, 3, 4, 5];
        onGoToTheLastPage = sinon.spy();
        onGoToNextPage = sinon.spy();
        onGoToPage = sinon.spy();
        onGoToTheFirstPage = sinon.spy();
        onGoToPreviousPage = sinon.spy();
        defaultProps = {
            pageList,
            onGoToTheLastPage,
            onGoToNextPage,
            onGoToPage,
            onGoToTheFirstPage,
            onGoToPreviousPage,
            pageText: 'somePageText',
        };
    });

    describe('rendering behavior', () => {
        describe('the non conditional renders', () => {
            beforeEach(() => {
                wrapper = shallow(<Pagination {...defaultProps} />);
            });

            it('renders a section with the class pagination', () => {
                expect(wrapper.find('section.pagination')).toHaveLength(1);
            });

            it('has a span with id paginationPageText with the pageText prop as content', () => {
                expect(wrapper.find('span#paginationPageText')).toHaveLength(1);
                expect(wrapper.find('span#paginationPageText').text()).toEqual(defaultProps.pageText);
            });
        });

        describe('the conditional renders', () => {
            it('renders all the chevrons if the corresponding props are true', () => {
                const props = {
                    ...defaultProps,
                    showLeftDoubleCheveron: true,
                    showLeftCheveron: true,
                    showRightCheveron: true,
                    showRightDoubleCheveron: true,
                };

                wrapper = shallow(<Pagination {...props} />);

                expect(wrapper.find('.spectrumIcon_chevronDoubleLeft')).toHaveLength(1);
                expect(wrapper.find('#left-chevron')).toHaveLength(1);
                expect(wrapper.find('#right-chevron')).toHaveLength(1);
                expect(wrapper.find('.spectrumIcon_chevronDoubleRight')).toHaveLength(1);
            });

            it('renders none of the chevrons if the corresponding props are false', () => {
                const props = {
                    ...defaultProps,
                    showLeftDoubleCheveron: false,
                    showLeftCheveron: false,
                    showRightCheveron: false,
                    showRightDoubleCheveron: false,
                };

                wrapper = shallow(<Pagination {...props} />);

                expect(wrapper.find('.spectrumIcon_chevronDoubleLeft')).toHaveLength(0);
                expect(wrapper.find('#left-chevron')).toHaveLength(0);
                expect(wrapper.find('#right-chevron')).toHaveLength(0);
                expect(wrapper.find('.spectrumIcon_chevronDoubleRight')).toHaveLength(0);
            });

            it('renders a li for every page', () => {
                const props = {
                    ...defaultProps,
                    pageList: [1, 2, 3],
                };

                wrapper = shallow(<Pagination {...props} />);

                expect(wrapper.find('li')).toHaveLength(3);
            });
        });
    });

    describe('event listeners', () => {
        beforeEach(() => {
            const props = {
                ...defaultProps,
                showLeftDoubleCheveron: true,
                showLeftCheveron: true,
                showRightCheveron: true,
                showRightDoubleCheveron: true,
            };
            wrapper = shallow(<Pagination {...props} />);
        });

        it('calls onGoToPage when li is clicked', () => {
            wrapper.find('li').first().find('a').simulate('click');
            expect(onGoToPage.calledOnce).toBe(true);
        });

        it('calls onGoToTheFirstPage when left double chevron is clicked', () => {
            const button = wrapper.find('.spectrumIcon_chevronDoubleLeft').parent();
            expect(button.is('span')).toBe(true);
            button.simulate('click');
            expect(onGoToTheFirstPage.calledOnce).toBe(true);
        });

        it('calls onGoToPreviousPage when left chevron is clicked', () => {
            const button = wrapper.find('#left-chevron');
            expect(button.is('span')).toBe(true);
            button.simulate('click');
            expect(onGoToPreviousPage.calledOnce).toBe(true);
        });

        it('calls onGoToNextPage when the right chevron is clicked', () => {
            const button = wrapper.find('#right-chevron');
            expect(button.is('span')).toBe(true);
            button.simulate('click');
            expect(onGoToNextPage.calledOnce).toBe(true);
        });

        it('calls onGoToTheLastPage when the right double chevron is clicked', () => {
            const button = wrapper.find('.spectrumIcon_chevronDoubleRight').parent();
            expect(button.is('span')).toBe(true);
            button.simulate('click');
            expect(onGoToTheLastPage.calledOnce).toBe(true);
        });
    });
});
