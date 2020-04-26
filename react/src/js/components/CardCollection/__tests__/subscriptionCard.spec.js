import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import 'isomorphic-fetch';
import SubscriptionCard from '../subscriptionCard';
import keymap from '../Constants/KeyMapping';

Enzyme.configure({ adapter: new Adapter() });

const mockResponse = (status, statusText, response) => new window.Response(response, {
    status,
    statusText,
    headers: {
        'Content-type': 'application/json',
    },
});

describe('the SubscriptionCard component', () => {
    beforeEach(() => {
        window.fetch = jest.fn().mockImplementation(() => Promise
            .resolve(mockResponse(200, null, JSON.stringify({ ok: true, successful: true }))));
    });


    describe('the rendering behavior', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<SubscriptionCard subscriptionAPI="https://example.com/" adobeCampaignServiceName="serviceName" subscriptionCountry="en" consentNoticeText="notice" />);
        });

        afterEach(() => {
            wrapper = null;
        });

        describe('the class rendering behavior', () => {
            it('does not add the flip class to card_subscription if state.flipCard is false', () => {
                expect(wrapper.find('.flip')).toHaveLength(0);
            });

            it('adds the flip class to card_subscription if state.flipCard is true', () => {
                wrapper.instance().setState({ flipCard: true });
                wrapper.update();

                expect(wrapper.find('.flip')).toHaveLength(1);
            });
        });

        describe('the deterministic rendering behavior', () => {
            it('renders a .flipper element', () => {
                expect(wrapper.find('.flipper')).toHaveLength(1);
            });

            it('renders a .thankyou_view', () => {
                expect(wrapper.find('.thankyou_view')).toHaveLength(1);
            });

            it('renders the article title and description', () => {
                expect(wrapper.text()).toContain('articleTitle');
                expect(wrapper.text()).toContain('articleDescription');
            });
        });
    });

    describe('the component interactions', () => {
        let wrapper;
        describe('the interactions of .card_name input', () => {
            let submitStub;
            let input;
            let blurSpy;

            beforeEach(() => {
                submitStub = sinon.stub(SubscriptionCard.prototype, 'submit').callsFake(() => null);
                wrapper = shallow(<SubscriptionCard subscriptionAPI="https://example.com/" adobeCampaignServiceName="serviceName" subscriptionCountry="en" consentNoticeText="notice" />);
                input = wrapper.find('.card_name input');
                blurSpy = sinon.spy();
            });

            afterEach(() => {
                submitStub.restore();
            });

            it('blurs the target when we press escape on the .card_name input', () => {
                input.simulate('keydown', { target: { blur: blurSpy }, keyCode: keymap.escape });
                expect(blurSpy.calledOnce).toBe(true);
                expect(submitStub.notCalled).toBe(true);
            });

            it('calls submit when we press enter on the .card_name input', () => {
                input.simulate('keydown', { target: { blur: blurSpy }, keyCode: keymap.enter });
                expect(blurSpy.notCalled).toBe(true);
                expect(submitStub.calledOnce).toBe(true);
            });

            it('updates the name state when a change event is emitted', () => {
                expect(wrapper.instance().state.name).toEqual('');
                input.simulate('change', { target: { value: 'target text' } });
                wrapper.update();
                expect(wrapper.instance().state.name).toEqual('target text');
                expect(wrapper.find('.card_name input').prop('value')).toEqual('target text');
            });
        });

        describe('the interactions of .card_email input', () => {
            let submitStub;
            let input;
            let blurSpy;

            beforeEach(() => {
                submitStub = sinon.stub(SubscriptionCard.prototype, 'submit').callsFake(() => null);
                wrapper = shallow(<SubscriptionCard subscriptionAPI="https://example.com/" adobeCampaignServiceName="serviceName" subscriptionCountry="en" consentNoticeText="notice" />);
                input = wrapper.find('.card_email input');
                blurSpy = sinon.spy();
            });

            afterEach(() => {
                submitStub.restore();
            });

            it('blurs the target when we press escape on the .card_name input', () => {
                input.simulate('keydown', { target: { blur: blurSpy }, keyCode: keymap.escape });
                expect(blurSpy.calledOnce).toBe(true);
                expect(submitStub.notCalled).toBe(true);
            });

            it('calls submit when we press enter on the .card_name input', () => {
                input.simulate('keydown', { target: { blur: blurSpy }, keyCode: keymap.enter });
                expect(blurSpy.notCalled).toBe(true);
                expect(submitStub.calledOnce).toBe(true);
            });

            it('updates the name state when a change event is emitted', () => {
                expect(wrapper.instance().state.email).toEqual('');
                input.simulate('change', { target: { value: 'target text' } });
                wrapper.update();
                expect(wrapper.instance().state.email).toEqual('target text');
                expect(wrapper.find('.card_email input').prop('value')).toEqual('target text');
            });
        });

        describe('the server error text', () => {
            let promise;
            beforeEach(() => {
                // Customize mock fetch output
                promise = Promise.resolve(mockResponse(500, null, 'someinvalidjson'));
                window.fetch = jest.fn().mockImplementation(() => promise);
                wrapper = shallow(<SubscriptionCard subscriptionAPI="https://example.com/" adobeCampaignServiceName="serviceName" subscriptionCountry="en" consentNoticeText="notice" />);
            });

            afterEach(() => {
                // Reinstate mock fetch
                wrapper = null;
                window.fetch = jest.fn().mockImplementation(() => Promise
                    .resolve(mockResponse(
                        200,
                        null,
                        JSON.stringify({ ok: true, successful: true }),
                    )));
            });

            it('renders serverErrorText if fetch fails', async () => {
                await wrapper.instance().subscribe();
                wrapper.instance().forceUpdate();
                wrapper.update();
                expect(wrapper.find('.server_error')).toHaveLength(1);
            });
        });


        describe('submission behavior', () => {
            let preventDefaultSpy;
            let mockEvent;
            let submitButton;
            let emailInput;
            let nameInput;

            beforeEach(() => {
                preventDefaultSpy = sinon.spy();
                mockEvent = { preventDefault: preventDefaultSpy };
                wrapper = shallow(<SubscriptionCard subscriptionAPI="https://example.com/" adobeCampaignServiceName="serviceName" subscriptionCountry="en" consentNoticeText="notice" />);
                submitButton = wrapper.find('.cta').find('a');
                emailInput = wrapper.find('.card_email input');
                nameInput = wrapper.find('.card_name input');
            });

            afterEach(() => {
                wrapper = null;
            });

            describe('the good cases', () => {
                beforeEach(() => {
                    emailInput.simulate('change', {
                        target: {
                            value: 'myemail@example.com',
                        },
                    });

                    nameInput.simulate('change', {
                        target: {
                            value: 'myname',
                        },
                    });

                    submitButton.simulate('click');
                    wrapper.update();
                });


                it('sets flipCard state to true', () => {
                    expect(wrapper.instance().state.flipCard).toBe(true);
                });

                it('does a fetch call to the API url.', () => {
                    expect(window.fetch).toHaveBeenCalledTimes(1);
                });

                it('sets isServerError to false (provided there was no server error)', () => {
                    expect(wrapper.instance().isServerError).toBe(false);
                });
            });

            describe('the bad cases', () => {
                beforeEach(() => {
                    emailInput.simulate('change', {
                        target: {
                            value: 'invalidemailexample.com',
                        },
                    });

                    nameInput.simulate('change', {
                        target: {
                            value: '',
                        },
                    });

                    submitButton.simulate('click');
                    wrapper.update();
                });

                it('does not set flipCard state to true', () => {
                    expect(wrapper.instance().state.flipCard).toBe(false);
                });
            });

            it('calls preventDefault on the event', () => {
                submitButton.simulate('click', mockEvent);
                expect(preventDefaultSpy.calledOnce).toBe(true);
            });
        });
    });
});

