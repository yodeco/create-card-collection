import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import sinon from 'sinon';
import LocaleModal from '../LocaleModal';
import ReactModal from '../../Modal/ReactModal';

Enzyme.configure({ adapter: new Adapter() });

describe('Locale Modal', () => {
    describe('Getters', () => {
        beforeEach(() => {
            // Global is actually window in jest.
            global.dexter = {
                geoRouting: {
                    someKey: 'someVal',
                },
            };
        });

        it('The localeMap getting returns the dexter.geoRouting object ', () => {
            const wrapper = shallow(<LocaleModal />);
            expect(wrapper.instance().geoRouting).toBe(window.dexter.geoRouting);
        });

        it('The localeMap getting returns the dexter.geoRouting.localeMap object ', () => {
            const wrapper = shallow(<LocaleModal />);
            expect(wrapper.instance().localeMap).toBe(window.dexter.geoRouting.localeMap);
        });
    });

    describe('the initial state setup', () => {
        let wrapper;

        beforeEach(() => {
            global.dexter = {
                geoRouting: {
                    localeMap: {
                        currentLocale: 'en',
                    },
                    internationalLocale: '',
                    routingPresented: false,
                    akamai: {
                        getCountry: () => null,
                    },
                },
            };
            wrapper = shallow(<LocaleModal />);
        });

        afterEach(() => {
            global.dexter = undefined;
            global.Granite = undefined;
        });

        it('correctly sets targetLangs to an empty array', () => {
            expect(wrapper.instance().state.targetLangs).toEqual([]);
        });

        it('correctly sets modalId to localeModal', () => {
            expect(wrapper.instance().modalId).toBe('localeModal');
        });

        it('calls getAkamaiData if getModalEligible is true and referrer data is nonexistent', () => {
            const referrerStub = sinon.stub(LocaleModal, 'referrerData').get(() => false);
            const eligibleStub = sinon.stub(LocaleModal.prototype, 'getModalEligible').callsFake(() => true);
            const akamaiDataSpy = sinon.stub(LocaleModal.prototype, 'getAkamaiData').callsFake(() => true);
            shallow(<LocaleModal />);

            expect(akamaiDataSpy.calledOnce).toBe(true);

            referrerStub.restore();
            eligibleStub.restore();
            akamaiDataSpy.restore();
        });
    });

    describe('getModalEligible', () => {
        let wrapper;

        beforeEach(() => {
            global.dexter = {
                geoRouting: {
                    localeMap: {
                        currentLocale: 'en',
                    },
                    internationalLocale: '',
                    routingPresented: false,
                },
            };
            global.Granite = undefined;
            sinon.stub(LocaleModal.prototype, 'getAkamaiData').callsFake(() => true);
            wrapper = shallow(<LocaleModal />);
        });

        afterEach(() => {
            global.dexter = undefined;
            global.Granite = undefined;
            LocaleModal.prototype.getAkamaiData.restore();
        });

        it('returns false if geoRouting.localeMap is falsey', () => {
            global.dexter.geoRouting.localeMap = false;
            expect(wrapper.instance().getModalEligible()).toBe(false);
        });

        it('returns false if Granite is not undefined', () => {
            global.Granite = true;
            expect(wrapper.instance().getModalEligible()).toBe(false);
        });

        it('returns false if international locale is truthy', () => {
            global.dexter.geoRouting.internationalLocale = 'fr';
            expect(wrapper.instance().getModalEligible()).toBe(false);
        });

        it('returns false if routing is already presented', () => {
            global.dexter.geoRouting.routingPresented = true;
            expect(wrapper.instance().getModalEligible()).toBe(false);
        });

        it('returns false if cookie locale is the same as current locale', () => {
            global.dexter.geoRouting.localeMap.currentLocale = '';
            expect(wrapper.instance().getModalEligible()).toBe(false);
        });

        it('returns true otherwise', () => {
            expect(wrapper.instance().getModalEligible()).toBe(true);
        });
    });

    describe('getAkamaiData', () => {
        beforeEach(() => {
            global.dexter = {
                geoRouting: {
                    localeMap: {
                        currentLocale: 'en',
                    },
                    internationalLocale: '',
                    routingPresented: true,
                    akamai: {
                        getCountry: () => null,
                    },
                },
            };
        });

        afterEach(() => {
            global.dexter = undefined;
        });

        it('calls getCountry from akamai when getAkamai is called', () => {
            const spy = sinon.spy(global.dexter.geoRouting.akamai, 'getCountry');

            shallow(<LocaleModal />).instance().getAkamaiData();
            // once on constructor and another one on method call above
            expect(spy.calledOnce).toBe(true);

            spy.restore();
        });
    });

    describe('compareLocales', () => {
        beforeEach(() => {
            global.dexter = {
                geoRouting: {
                    localeMap: {
                        currentLocale: 'en',
                        getLocaleUri: () => 'somelocaluri',
                    },
                    internationalLocale: '',
                    routingPresented: true,
                    akamai: {
                        getCountry: () => null,
                    },
                },
            };
        });

        afterEach(() => {
            global.dexter = undefined;
        });

        it('does nothing when current locale is equal to target locale', () => {
            const spy = sinon.spy(LocaleModal.prototype, 'getTargetLocaleContent');
            const wrapper = shallow(<LocaleModal />);
            wrapper.instance().currentLocale = 'locale1';
            wrapper.instance().targetLocale = 'locale1';
            wrapper.instance().compareLocales();
            expect(spy.notCalled).toBe(true);
        });
    });

    describe('getCurrentLocaleUri', () => {
        beforeEach(() => {
            global.dexter = {
                geoRouting: {
                    localeMap: {
                        currentLocale: 'en',
                        getLocaleUri: () => 'somelocaluri',
                    },
                    internationalLocale: '',
                    routingPresented: true,
                    akamai: {
                        getCountry: () => null,
                    },
                },
            };
        });

        afterEach(() => {
            global.dexter = undefined;
        });

        it('sets the currentLocaleUri attribute on the class when calling getCurrentLocaleUri', () => {
            const wrapper = shallow(<LocaleModal />);
            wrapper.instance().getCurrentLocaleUri();
            expect(wrapper.instance().currentLocaleUri).toBe('somelocaluri');
        });
    });

    describe('getTargetLocaleText', () => {
        beforeEach(() => {
            global.dexter = {
                geoRouting: {
                    localeMap: {
                        currentLocale: 'en',
                        getLocaleUri: () => 'somelocaluri',
                    },
                    internationalLocale: '',
                    routingPresented: true,
                    akamai: {
                        getCountry: () => null,
                    },
                },
            };
        });

        afterEach(() => {
            global.dexter = undefined;
        });

        it('appends to the targetLangs state', () => {
            const data = JSON.stringify({
                locales: {
                    fr: {
                        de: {
                            localeModalText: 'sometext',
                            localModalButtonText: 'somebuttontext',
                        },
                        en: {
                            localeModalText: 'someothertext',
                            localModalButtonText: 'somebuttontext',
                        },
                    },
                    de: {
                        fr: {
                            localeModalText: 'sometext',
                            localModalButtonText: 'somebuttontext',
                        },
                        en: {
                            localeModalText: 'someothertext',
                            localModalButtonText: 'somebuttontext',
                        },
                    },
                },
            });
            const wrapper = shallow(<LocaleModal />);
            wrapper.instance().targetLocale = 'de';
            wrapper.instance().getTargetLocaleText(data);
            expect(wrapper.instance().state.targetLangs).toHaveLength(2);
        });
    });

    describe('the route method', () => {
        let mockEvent;
        let wrapper;

        beforeEach(() => {
            global.dexter = {
                geoRouting: {
                    localeMap: {
                        currentLocale: 'en',
                        getLocaleUri: () => 'somelocaluri',
                    },
                    internationalLocale: '',
                    routingPresented: true,
                    akamai: {
                        getCountry: () => null,
                    },
                },
            };

            mockEvent = {
                preventDefault: sinon.spy(),
                target: {
                    getAttribute: sinon.spy(),
                    href: 'value',
                },
            };
            global.setCookie = sinon.spy();

            wrapper = shallow(<LocaleModal />);
            wrapper.instance().route(mockEvent);
        });

        afterEach(() => {
            wrapper = null;
            global.setCookie = undefined;
            global.dexter = undefined;
        });

        it('calls prevent default on the passed event', () => {
            expect(mockEvent.preventDefault.calledOnce).toBe(true);
        });

        it('calls event.target.getAttribute with hreflang', () => {
            expect(mockEvent.target.getAttribute.calledWith('hreflang')).toBe(true);
        });
    });

    describe('triggerModal', () => {
        let wrapper;

        beforeEach(() => {
            global.dexter = {
                geoRouting: {
                    localeMap: {
                        currentLocale: 'en',
                        getLocaleUri: () => 'somelocaluri',
                    },
                    internationalLocale: '',
                    routingPresented: true,
                    akamai: {
                        getCountry: () => null,
                    },
                },
            };

            sinon.stub(LocaleModal.prototype, 'getModal').callsFake(() => null);
            wrapper = shallow(<LocaleModal />);
            wrapper.instance().modal = { open: sinon.spy() };
            wrapper.instance().triggerModal();
        });

        afterEach(() => {
            wrapper = undefined;
            global.dexter = undefined;
            LocaleModal.prototype.getModal.restore();
        });

        it('calls the getModal function', () => {
            expect(LocaleModal.prototype.getModal.calledOnce).toBe(true);
        });

        it('calls the open method on its modal', () => {
            expect(wrapper.instance().modal.open.calledOnce).toBe(true);
        });
    });

    describe('the rendering behavior', () => {
        let wrapper;

        beforeEach(() => {
            global.dexter = {
                geoRouting: {
                    localeMap: {
                        currentLocale: 'en',
                        getLocaleUri: () => 'somelocaluri',
                    },
                    internationalLocale: '',
                    routingPresented: true,
                    akamai: {
                        getCountry: () => null,
                    },
                },
            };
            wrapper = shallow(<LocaleModal />);
        });

        afterEach(() => {
            wrapper = undefined;
            global.dexter = undefined;
        });

        it('renders a ReactModal', () => {
            expect(wrapper.find(ReactModal)).toHaveLength(1);
        });

        it('renders a component called the locale-modal', () => {
            expect(wrapper.find('.locale-modal')).toHaveLength(1);
        });

        it('renders an icon', () => {
            expect(wrapper.find('i.coreIcon')).toHaveLength(1);
        });

        it('renders least one locale-modal_button when state.targetLangs is empty', () => {
            expect(wrapper.find('.locale-modal_button')).toHaveLength(1);
        });

        // it('renders two locale-modale_buttons when state.targetLangs has one entry', () => {
        //     const mockLang = {
        //         targetLocale: 'en',
        //         targetUri: 'someuri',
        //         localeModalButtonText: 'sometext',
        //     };
        //
        //     wrapper.instance().setState(function (prevState) {
        //         this.setState({ targetLangs: prevState.targetLangs.concat(mockLang) });
        //     });
        //     expect(wrapper.find('.locale-modal_button')).toHaveLength(2);
        // });
    });

    describe('getTargetLocaleContent', () => {
        beforeEach(() => {
            global.dexter = {
                geoRouting: {
                    localeMap: {
                        currentLocale: 'en',
                        getLocaleUri: () => 'somelocaluri',
                        localeServletPath: 'localeServletPath',
                        contentRoot: 'contentRoot',
                    },
                    internationalLocale: '',
                    routingPresented: true,
                    akamai: {
                        getCountry: () => null,
                    },
                },
            };

            class XMLHttpRequest {
                open() {
                    return null;
                }
                status = 200;
                send() {
                    this.onload();
                }
            }

            global.originalXHR = global.XMLHttpRequest;
            global.XMLHttpRequest = XMLHttpRequest;

            sinon.spy(global.XMLHttpRequest.prototype, 'open');
        });

        afterEach(() => {
            global.XMLHttpRequest = global.originalXHR;
            global.dexter = undefined;
        });

        it('calls the correct XMLHttpRequest methods', async () => {
            const wrapper = shallow(<LocaleModal />);
            await wrapper.instance().getTargetLocaleContent();
            expect(global.XMLHttpRequest.prototype.open.calledOnce).toBe(true);
        });

        it('calls XMLHttpRequest.send with the correct arguments', async () => {
            const wrapper = shallow(<LocaleModal />);
            await wrapper.instance().getTargetLocaleContent();
            expect(global.XMLHttpRequest.prototype.open.calledWithMatch('GET', 'localeServletPath.model.jsoncontentRoot')).toBe(true);
        });
    });


});
