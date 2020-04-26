import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Keys from './Constants/KeyMapping';

export default class SubscriptionCard extends Component {
    constructor(props) {
        super(props);
        this.isServerError = false;
        // this.inputName = '';
        this.isRequiredInputName = false;
        this.isRequiredInputEmail = false;
        this.isValidInputEmail = true;
        this.isServerError = false;

        this.state = {
            email: '',
            name: '',
            flipCard: false,
        };

        this.isEmpty = this.isEmpty.bind(this);
        this.isValidEmail = this.isValidEmail.bind(this);
    }

    get isEmailInValid() {
        return !this.isRequiredInputEmail && !this.isValidInputEmail;
    }

    /**
     * sets current full path url and assign it to this.currentURL
     * @memberof SubscriptionCard
     */
    getCurrentUrl() {
        return window.location.href.split('?')[0];
    }

    /**
     * Parse the first and last name out of the inputName field.
     * The first space delimits the firstName, all other spaces go into the lastName
     *
     * @returns {array} array with [firstName, lastName]
     * @memberof SubscriptionCard
     */
    getFirstAndLastName() {
        const splitName = this.state.name.split(' ');
        const [firstName, ...lastNameArr] = splitName;
        const lastName = lastNameArr.length ? lastNameArr.join(' ') : '';
        return [firstName, lastName];
    }

    isEmpty(str) {
        return !str.length;
    }

    isValidEmail(emailInput) {
        const emailRE = /(^[^,?!<>{}@#$%\[\]\u0022\u0027]+@[^,.?{}()!@#$%^&*<>?~`+\u0022\u0027\[\]]{3,}\.[^0-9,.?{}()!@#$%^&*<>?~`+\u0022\u0027\[\]]{2,6}$)/; // eslint-disable-line
        return emailRE.test(emailInput);
    }

    // attached() {
    //     shrinkText(this.card.getElementsByClassName('shrinktext')); // eslint-disable-line
    //
    //     if (this.consentNoticeText) {
    //         this.consentNoticeTextDiv.innerHTML = this.consentNoticeText;
    //     }
    // }

    validateFields() {
        this.isRequiredInputName = this.isEmpty(this.state.name);
        this.isRequiredInputEmail = this.isEmpty(this.state.email);
        this.isValidInputEmail = this.isValidEmail(this.state.email);

        return !this.isRequiredInputName && !this.isRequiredInputEmail && this.isValidInputEmail;
    }

    /**
     * Front of card CTA on-click handler
     *
     * @param {event} event click/keyboard press event
     * @returns {boolean} returns false to stop event propagation
     * @memberof SubscriptionCard
     */
    submit(event) {
        if (event) {
            event.preventDefault();
        }
        if (this.validateFields()) {
            this.setState({
                flipCard: true,
            });
            this.currentURL = this.getCurrentUrl();
            this.subscribe();
            this.toggleCardTabindex();
            this.triggerAnalytics();
        }
        return false;
    }

    /**
     * Handle tabindex binding when flipping the card
     */
    toggleCardTabindex() {
        const frontInteractiveEls = [ // eslint-disable-line
            this.cardNameInputEl,
            this.cardEmailInputEl,
            this.subscribeCtaEl,
        ];
        if (this.state.flipCard) { // show back
            // this.thankYouLinkEl.setAttribute('tabIndex', '');
            // frontInteractiveEls.forEach(el => el.setAttribute('tabIndex', '-1'));
        } else {
            // this.thankYouLinkEl.setAttribute('tabIndex', '-1');
            // frontInteractiveEls.forEach(el => el.setAttribute('tabIndex', ''));
        }
    }

    /**
     * Reinitialize assetInfo, create an object assetShown,
     * add relevant data to it and push it to digitalData object.
     * Finally send event and trigger it.
     *
     * @memberof SubscriptionCard
     */
    triggerAnalytics() {
        // const assetInfo = {};
        // const defaultTitle = 'Newsletter Signup';
        // assetInfo.assetShown = {};
        // assetInfo.assetShown.name = this.title || defaultTitle;
        // assetInfo.assetShown.type = 'card_subscription';
        //
        // DigitalData.setAssetInfo(assetInfo);
        // DigitalData.sendEventAndTrigger(this.title || defaultTitle, 'event');
    }
    /**
     * Handle special keys for for input.  Esc will blur focus; Enter submits the form.
     * @param {*} event keyboardEvent
     */
    handleInputKeyDown({ target, keyCode }) {
        if (keyCode === Keys.escape) {
            target.blur();
        } else if (keyCode === Keys.enter) {
            this.submit();
        }
    }
    /**
     * Sign up user for subscription.  Form inputs are assumed to have been verified
     * previous to calling this method.
     *
     * @returns {promise} the subscription fetch promise
     * @memberof SubscriptionCard
     */
    subscribe() {
        const currentURL = this.getCurrentUrl();
        const subscriptionApi = this.props.subscriptionAPI;
        const sname = this.props.adobeCampaignServiceName;
        const { subscriptionCountry } = this.props;
        const { consentNoticeText } = this.props;

        const [firstName, lastName] = this.getFirstAndLastName();
        const body = JSON.stringify({
            email: this.state.email,
            sname,
            first_name: firstName,
            last_name: lastName,
            country: subscriptionCountry,
            consent_notice: consentNoticeText,
            current_url: currentURL,

        });
        if (this.isServerError) {
            // reset serverError state
            this.isServerError = false;
        }

        return fetch(subscriptionApi, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'text/plain',
            },
            body,
        })
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(new Error(`Server Response: ${response.status} ${response.statusText}`));
                }
                return response.json();
            })
            // Only return a rejected Promise if there is an error
            .then((data) => {
                if (!data.successful) {
                    return Promise.reject(new Error(`Service Response: ${data.reason}`));
                }
                return null;
            })
            .catch((err) => {
                console.log(`Subscription Error: ${err}`); // eslint-disable-line
                this.serverError();
            });
    }

    updateEmail(evt) {
        this.setState({
            email: evt.target.value,
        });
    }

    updateName(evt) {
        this.setState({
            name: evt.target.value,
        });
    }

    serverError() {
        this.setState({
            flipCard: false,
        });
        this.isServerError = true;
        this.toggleCardTabindex();
    }

    render() {
        /* eslint-disable */
        const flipClass = this.state.flipCard ? 'flip' : '';
        let requiredClass = this.isRequiredInputEmail ? 'required' : '';
        return (
            <div
                className={"card card_subscription " + flipClass}>
                <div className="flipper">
                    <div
                        className="card_img subscribe_view front"
                        style={{
                            backgroundColor: this.props.backgroundColor,
                            backgroundImage: `url(${this.props.backgroundImageUrl})`,
                            backgroundSize: this.props.imageSize,
                            backgroundPosition: `${this.props.imageHorizontalAlignment} ${this.props.imageVerticalAlignment}`
                        }}>
                        <div className="card_bg">
                            <div>
                                <h2
                                    className="card_title shrinktext"
                                    style={{
                                        color: this.props.titleColor
                                    }}>
                                    {this.props.articleTitle}
                                </h2>
                            </div>
                            <div>
                                <p
                                    className="card_description shrinktext"
                                    style={{
                                        color: this.props.descriptionColor
                                    }}>
                                    {this.props.articleDescription}
                                </p>
                            </div>
                        </div>
                        <div className="card_input">
                            <div className="card_name">
                                <input
                                    onKeyDown={ev => this.handleInputKeyDown(ev)}
                                    type="text"
                                    id="name"
                                    name="user_name"
                                    value={this.state.name}
                                    onChange={evt => this.updateName(evt)}
                                    placeholder={this.props.namePlaceholderText}
                                    required />
                                <div
                                    className="error_requiredText">
                                    {this.props.requiredText}
                                </div>
                            </div>
                            <div className="card_email">
                                <input
                                    onKeyDown={ev => this.handleInputKeyDown(ev)}
                                    type="text"
                                    id="email"
                                    name="user_email"
                                    value={this.state.email}
                                    onChange={evt => this.updateEmail(evt)}
                                    className={requiredClass}
                                    placeholder={this.props.emailPlaceholderText}
                                    required />
                                <div className="error_invalidEmailText">
                                    {this.props.invalidEmailText}
                                </div>
                                <div className="error_requiredText">
                                    {this.props.requiredText}
                                </div>
                            </div>
                        </div>
                        {this.isServerError && <div className="server_error">
                            {this.props.serverErrorText}
                        </div>}
                        <div
                            dangerouslySetInnerHTML={{__html: this.props.consentNoticeText}}
                            className="card_consentNotice" />
                        <div className="cta">
                            <a onClick={(ev) => this.submit(ev)}
                               href="" className="spectrum-Button spectrum-Button--cta" target="_self">
                                {this.props.ctaButtonText}
                            </a>
                        </div>
                    </div>
                    <div className="thankyou_view back">
                        <div
                            className="card_img"
                            style={{
                                backgroundSize: "cover",
                                backgroundImage: `url(${this.props.thankYouViewBackgroundImage})`
                            }}/>
                        <div
                            className="card_bg"
                            style={{
                                backgroundColor: this.props.backgroundColor
                            }}>
                            <h2
                                className="card_title shrinktext"
                                style={{
                                    color: this.props.thankYouTitleColor,
                                }}>
                                {this.props.thankYouViewTitle}
                            </h2>
                            <p
                                className="card_description shrinktext"
                                style={{
                                    color: this.props.thankYouDescriptionColor,
                                }}>
                                {this.props.thankYouViewDescription}
                                <a href={this.props.thankYouViewCtaButtonLink}
                                   className="spectrum-Link"
                                   target="_self"
                                   tabIndex="-1">
                                    {this.props.thankYouViewCtaButtonText}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

SubscriptionCard.propTypes = {
    subscriptionAPI: PropTypes.string.isRequired,
    adobeCampaignServiceName: PropTypes.string.isRequired,
    subscriptionCountry: PropTypes.string.isRequired,
    consentNoticeText: PropTypes.string.isRequired,
    articleTitle: PropTypes.string,
    requiredText: PropTypes.string,
    namePlaceholderText: PropTypes.string,
    emailPlaceholderText: PropTypes.string,
    invalidEmailText: PropTypes.string,
    serverErrorText: PropTypes.string,
};

SubscriptionCard.defaultProps = {
    articleTitle: 'articleTitle',
    articleDescription: 'articleDescription',
    requiredText: 'Required Field',
    namePlaceholderText: 'Your name',
    emailPlaceholderText: 'Email address',
    invalidEmailText: 'Must be a valid Email address',
    serverErrorText: 'Something went wrong.'
};
