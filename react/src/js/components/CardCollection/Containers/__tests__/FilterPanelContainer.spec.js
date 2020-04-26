import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import 'isomorphic-fetch';

import FilterPanelContainer from '../FilterPanelContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('FilterPanelContainer', () => {
    beforeEach(() => {

    });

    afterEach(() => {

    });

    describe('behavior when active filters are empty', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<FilterPanelContainer />);
        });

        it('does not render filters if there are no active filters', () => {
            expect(wrapper.find('.tag-List_active-FilterList')).toHaveLength(0);
        });

        it('does not show a tag-List_Clear button when there are no active filters', () => {
            expect(wrapper.find('.tag-List_Clear')).toHaveLength(0);
        });
    });

    describe('behavior when active filters are not empty', () => {
        let wrapper;
        let stub;

        beforeEach(() => {
            stub = sinon.stub(FilterPanelContainer.prototype, 'getActiveFilters');
            stub.callsFake(() => [...Array(5).keys()].map(num => ({ id: num, title: `FilterTitle${num}` })));
            sinon.stub(FilterPanelContainer.prototype, 'clearActiveFilters');
            wrapper = shallow(<FilterPanelContainer clearText="clearText" />);
        });

        afterEach(() => {
            stub.restore();
            FilterPanelContainer.prototype.clearActiveFilters.restore();
        });

        it('displays active filters in tag-List_active-FilterList as li items', () => {
            expect(wrapper.find('.tag-List_active-FilterList')).toHaveLength(1);
        });

        it('shows a tag-List_Clear button displaying the clearText prop', () => {
            expect(wrapper.find('.tag-List_Clear')).toHaveLength(1);
            expect(wrapper.find('.tag-List_Clear').text()).toEqual('clearText');
        });

        it('clears active filters when tag-List_Clear is clicked', () => {
            wrapper.find('.tag-List_Clear').simulate('click');
            expect(FilterPanelContainer.prototype.clearActiveFilters.calledOnce).toBe(true);
        });
    });

    describe('the method behavior', () => {
        let wrapper;
        let stub;

        beforeEach(() => {
            stub = sinon.stub(FilterPanelContainer.prototype, 'getActiveFilters');
            stub.callsFake(() => [...Array(5).keys()].map(num => ({ id: num, title: `FilterTitle${num}` })));
            sinon.spy(FilterPanelContainer.prototype, 'clearActiveFilters');
            wrapper = shallow(<FilterPanelContainer clearText="clearText" />);
        });

        afterEach(() => {
            stub.restore();
            FilterPanelContainer.prototype.clearActiveFilters.restore();
        });

        describe('getShowActiveFilters', () => {
            it('returns true if activeFilters has more than 0 length', () => {
                expect(wrapper.instance().getShowActiveFilters()).toBe(true);
            });

            it('returns false if activeFilters is empty', () => {
                stub.callsFake(() => []);
                wrapper = shallow(<FilterPanelContainer clearText="clearText" />);
                expect(wrapper.instance().getShowActiveFilters()).toBe(false);
            });
        });

        describe('getNameId', () => {
            it('returns a lowercased and whitespace stripped version of the argument', () => {
                expect(wrapper.instance().getNameId('abcd')).toEqual('abcd');
                expect(wrapper.instance().getNameId('a b cd')).toEqual('abcd');
                expect(wrapper.instance().getNameId('ABc D')).toEqual('abcd');
                expect(wrapper.instance().getNameId('AB  C     D')).toEqual('abcd');
                expect(wrapper.instance().getNameId('         \n    ')).toEqual('');
            });
        });

        describe('getParentId', () => {
            it('prepends tag-List_Group- to the result of getNameId', () => {
                sinon.stub(FilterPanelContainer.prototype, 'getNameId');
                FilterPanelContainer.prototype.getNameId.callsFake(() => 'title');
                wrapper = shallow(<FilterPanelContainer clearText="clearText" />);
                expect(wrapper.instance().getParentId('sometext')).toEqual('tag-List_Group-title');
                FilterPanelContainer.prototype.getNameId.restore();
            });
        });

        describe('getParentFilterItemId', () => {
            it('prepends tag-List_Group-tags- to the result of getNameId', () => {
                sinon.stub(FilterPanelContainer.prototype, 'getNameId');
                FilterPanelContainer.prototype.getNameId.callsFake(() => 'title');
                wrapper = shallow(<FilterPanelContainer clearText="clearText" />);
                expect(wrapper.instance().getParentFilterItemId('sometext')).toEqual('tag-List_Group-tags-title');
                FilterPanelContainer.prototype.getNameId.restore();
            });
        });

        describe('getDomId', () => {
            it('just calls getParentId', () => {
                sinon.spy(FilterPanelContainer.prototype, 'getParentId');
                wrapper = shallow(<FilterPanelContainer clearText="clearText" />);
                wrapper.instance().getDomId('sometext');
                expect(FilterPanelContainer.prototype.getParentId.calledOnce).toBe(true);
                FilterPanelContainer.prototype.getParentId.restore();
            });
        });

        describe('getFormattedId', () => {
            it('transforms spaces and series of special characters into dashes', () => {
                expect(wrapper.instance().getFormattedId('a piece of text with under_scores and ??? special-characters')).toEqual('a-piece-of-text-with-under_scores-and-special-characters');
            });
        });

        describe('getFirstFilterItem and getLastFilterItem', () => {
            let el;
            beforeEach(() => {
                el = {
                    firstElementChild: { firstChild: 'firstValue' },
                    lastElementChild: { firstChild: 'lastValue' },
                };
            });

            it('correctly gets value when getFirstFilterItem is called', () => {
                expect(wrapper.instance().getFirstFilterItem(el)).toEqual('firstValue');
            });

            it('correctly gets value when getLastFilterItem is called', () => {
                expect(wrapper.instance().getLastFilterItem(el)).toEqual('lastValue');
            });
        });

        describe('capitalizeFirstLetter', () => {
            it('capitalizes the first letter', () => {
                const input = 'mytext';
                expect(wrapper.instance().capitalizeFirstLetter(input)).toBe('Mytext');
            });
        });
    });

    describe('the event listeners', () => {
        describe('filterItemKeyDownHandler', () => {
            it('calls toggleItem when the keycode is Enter', () => {
                const stub = sinon.stub(FilterPanelContainer.prototype, 'toggleItem').callsFake(() => null);
                const wrapper = shallow(<FilterPanelContainer />);
                const spy = sinon.spy();
                wrapper.instance().filterItemKeyDownHandler({ key: 'Enter', preventDefault: spy }, 'id', 'index');
                expect(FilterPanelContainer.prototype.toggleItem.calledWith('id')).toBe(true);
                expect(spy.calledOnce).toBe(true);
                stub.restore();
            });

            it('focuses the filter item parent when the keycode is ArrowLeft', () => {
                const stub1 = sinon.stub(FilterPanelContainer.prototype, 'getFilterItemFromStoreById').callsFake(() => ({ parentId: 1 }));
                const stub2 = sinon.stub(FilterPanelContainer.prototype, 'getHtmlElement').callsFake(() => null);
                const stub3 = sinon.stub(FilterPanelContainer.prototype, 'focusHtmlElement').callsFake(() => null);
                const wrapper = shallow(<FilterPanelContainer />);
                wrapper.instance().filterItemKeyDownHandler({ key: 'ArrowLeft' }, 'id', 'index');
                expect(stub1.calledOnce).toBe(true);
                expect(stub2.calledOnce).toBe(true);
                expect(stub3.calledOnce).toBe(true);
                [stub1, stub2, stub3].forEach(stub => stub.restore());
            });

            it('focuses the new category when keycode is ArrowDown', () => {
                const stub1 = sinon.stub(FilterPanelContainer.prototype, 'getFilterItemFromStoreById').callsFake(() => ({ index: 1, category: 'category1' }));
                const stub2 = sinon.stub(FilterPanelContainer.prototype, 'getFilterItemFromStoreByIndex').callsFake(() => ({ category: 'category2' }));
                const stub3 = sinon.spy(FilterPanelContainer.prototype, 'getDomId');
                const stub4 = sinon.stub(FilterPanelContainer.prototype, 'getHtmlElement').callsFake(() => 'html');
                const stub5 = sinon.stub(FilterPanelContainer.prototype, 'focusHtmlElement').callsFake(() => null);

                const wrapper = shallow(<FilterPanelContainer />);
                wrapper.instance().filterItemKeyDownHandler({ key: 'ArrowDown', preventDefault: () => null }, 'id', 'index');

                expect(stub5.calledWith('html')).toBe(true);
                expect(stub4.calledWith('tag-List_Group-category2')).toBe(true);
                expect(stub3.calledOnce).toBe(true);
                expect(stub2.calledWith(2)).toBe(true);
                expect(stub1.calledOnce).toBe(true);

                [stub1, stub2, stub3, stub4, stub5].forEach(stub => stub.restore());
            });

            it('focuses the previous category when keycode is ArrowDown', () => {
                const stub1 = sinon.stub(FilterPanelContainer.prototype, 'getFilterItemFromStoreById').callsFake(() => ({ index: 1, category: 'category1' }));
                const stub2 = sinon.stub(FilterPanelContainer.prototype, 'getFilterItemFromStoreByIndex').callsFake(() => ({ category: 'category2', id: 'someid' }));
                const stub3 = sinon.stub(FilterPanelContainer.prototype, 'getHtmlElement').callsFake(() => 'html');
                const stub4 = sinon.stub(FilterPanelContainer.prototype, 'focusHtmlElement').callsFake(() => null);

                const wrapper = shallow(<FilterPanelContainer />);
                wrapper.instance().filterItemKeyDownHandler({ key: 'ArrowUp', preventDefault: () => null }, 'id', 'index');

                expect(stub4.calledWith('html')).toBe(true);
                expect(stub3.calledWith('someid')).toBe(true);

                expect(stub2.calledWith(0)).toBe(true);
                expect(stub1.calledOnce).toBe(true);

                [stub1, stub2, stub3, stub4].forEach(stub => stub.restore());
            });
        });

        describe('filterGroupKeyDownHandler', () => {
            it('toggles the group when enter is pressed', () => {
                const stub = sinon.stub(FilterPanelContainer.prototype, 'toggleGroup').callsFake(() => null);
                const wrapper = shallow(<FilterPanelContainer />);
                const spy = sinon.spy();
                wrapper.instance().filterGroupKeyDownHandler({ key: 'Enter', preventDefault: spy }, 'id', 'index');
                expect(FilterPanelContainer.prototype.toggleGroup.calledWith('id')).toBe(true);
                expect(spy.calledOnce).toBe(true);
                stub.restore();
            });

            it('focuses the next filter group when ArrowDown is pressed', () => {
                const mockFilterGroup = {
                    isOpen: false,
                    category: 'category',
                };

                const getGroup = sinon.stub(FilterPanelContainer.prototype, 'getFilterGroup').callsFake(() => ({
                    ...mockFilterGroup,
                    isOpen: true,
                }));


                const getParent = sinon.stub(FilterPanelContainer.prototype, 'getParentFilterItemId').callsFake(() => 'domid');
                const getHTML = sinon.stub(FilterPanelContainer.prototype, 'getHtmlElement').callsFake(() => 'html');
                const focusHTML = sinon.stub(FilterPanelContainer.prototype, 'focusHtmlElement').callsFake(() => null);

                const getFirstFilterItem = sinon.stub(FilterPanelContainer.prototype, 'getFirstFilterItem').callsFake(() => 'firstitem');

                const wrapper = shallow(<FilterPanelContainer />);
                wrapper.instance().filterGroupKeyDownHandler({ key: 'ArrowDown', preventDefault: () => null }, 'id', 'index');

                expect(focusHTML.calledWith('firstitem')).toBe(true);
                expect(getHTML.calledWith('domid')).toBe(true);
                expect(getFirstFilterItem.calledWith('html')).toBe(true);
                expect(getParent.calledWith('category')).toBe(true);
                expect(getGroup.calledTwice).toBe(true);

                [getGroup, getParent, getHTML, getHTML, focusHTML, getFirstFilterItem].forEach(stub => stub.restore());
            });

            it('focuses the previous filter group when ArrowUp is pressed', () => {
                const mockFilterGroup = {
                    isOpen: false,
                    category: 'category',
                };

                const getGroup = sinon.stub(FilterPanelContainer.prototype, 'getFilterGroup').callsFake(() => ({
                    ...mockFilterGroup,
                    isOpen: true,
                }));


                const getParent = sinon.stub(FilterPanelContainer.prototype, 'getParentFilterItemId').callsFake(() => 'domid');
                const getHTML = sinon.stub(FilterPanelContainer.prototype, 'getHtmlElement').callsFake(() => 'html');
                const focusHTML = sinon.stub(FilterPanelContainer.prototype, 'focusHtmlElement').callsFake(() => null);

                const getLastFilterItem = sinon.stub(FilterPanelContainer.prototype, 'getLastFilterItem').callsFake(() => 'firstitem');

                const wrapper = shallow(<FilterPanelContainer />);
                wrapper.instance().filterGroupKeyDownHandler({ key: 'ArrowUp', preventDefault: () => null }, 'id', 'index');

                expect(focusHTML.calledWith('firstitem')).toBe(true);
                expect(getHTML.calledWith('domid')).toBe(true);
                expect(getLastFilterItem.calledWith('html')).toBe(true);
                expect(getParent.calledWith('category')).toBe(true);
                expect(getGroup.calledTwice).toBe(true);

                [getGroup, getParent, getHTML, getHTML, focusHTML, getLastFilterItem].forEach(stub => stub.restore());
            });

            it('closes the group when ArrowLeft is pressed', () => {

            });

            it('opens the group when ArrowRight is pressed', () => {

            });
        });
    });
});
