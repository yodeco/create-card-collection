/**
 * Locale Modal
 *
 * This modal is the React equivalent of a Dexter DOM modal.
 * Its usage is heavily dependent on using it with a Dexter DOM modal class.
 */
import React from 'react';
import ReactModal from '../Modal/ReactModal';
import { setCookie } from '../../../../../publish/src/js/utilities/cookie';
import PropTypes from 'prop-types';
import Modal from '../../../../../publish/src/js/components/modal/modal';

export default class LocaleModal extends React.Component {
    constructor(props) {
        super(props);
        this.modalId = 'localeModal';
        this.getModal = this.getModal.bind(this);
        this.triggerModal = this.triggerModal.bind(this);
        this.currentLocaleUri = '';
        // Setup an array of all available langs for target country
        this.state = {
            targetLangs: [],
        };

        // Do nothing if the session is not eligible.
        if (this.getModalEligible()) {
            // If we have referrer data, don't get akamai info.
            if (!this.referrerData) {
                this.getAkamaiData();
            }
        }
    }

    get geoRouting() {
        return window.dexter.geoRouting;
    }

    get localeMap() {
        return window.dexter.geoRouting.localeMap;
    }

    get referrerData() {
        if (window.dexter.geoRouting.referrerLocale) {
            this.targetLocale = window.dexter.geoRouting.referrerLocale;
            this.compareLocales();
            return true;
        }
        return false;
    }

    /**
     * Determine if the session is modal eligible.
     *
     * @return {boolean} modalEligble
     */
    getModalEligible() {
        const isAuthor = (typeof Granite !== 'undefined');
        if (this.geoRouting.localeMap) {
            const { routingPresented } = this.geoRouting;
            const cookieLocale = this.geoRouting.internationalLocale;
            this.currentLocale = this.localeMap.currentLocale;

            return !isAuthor &&
                !routingPresented &&
                !cookieLocale &&
                cookieLocale !== this.currentLocale;
        }
        return false;
    }

    /**
     * Get Akamai data and compare locales.
     */
    getAkamaiData() {
        this.geoRouting.akamai.getCountry((akamaiLocale) => {
            this.targetLocale = akamaiLocale;
            this.compareLocales();
        });
    }

    /**
     * Assign the current locale uri
     *
     * NOTE: Due to an IE11 / Babel issue, we HAVE to pass in `this.currentLocaleUri` as a
     *       parameter to this method.
     */
    getCurrentLocaleUri() {
        this.currentLocaleUri = this.geoRouting.localeMap.getLocaleUri(this.currentLocale);
    }

    /**
     * Get the target locale content based on the locale root.
     *
     * This is using XHR instead of fetch because of the charset
     * being returned incorrectly. This is a bug with Jetty.
     * @returns {Promise} responsePromise
     */
    getTargetLocaleContent() {
        this.targetLocaleUri = this.localeMap.getLocaleUri(this.targetLocale);
        const { localeServletPath } = this.localeMap;
        const { contentRoot } = this.localeMap;
        const targetLocaleContent = `${localeServletPath}.model.json${contentRoot}`;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject(new Error('Not 200'));
                }
            };
            xhr.onerror = () => {
                reject(new Error('On Error'));
            };
            xhr.open('GET', targetLocaleContent);
            xhr.send();
        });
    }

    /**
     * Get the target locale content based on the country root.
     * @param {Object} data the data passed from the responsePromise.
     */
    getTargetLocaleText(responseText) {
        const data = JSON.parse(responseText);
        const localesArray = Object.keys(data.locales);
        // Iterate through each country
        localesArray.forEach((countryName) => {
            const country = data.locales[countryName];

            // If the target locale is found in the country setup the country content.
            if (country[this.targetLocale]) {
                // Set the target locale text
                this.targetLocaleText = country[this.targetLocale].localeModalText;
                // Iterate through the country langs to setup the buttons
                const countryLangs = Object.keys(country);
                countryLangs.forEach((langName) => {
                    this.setState(prevState => ({
                        targetLangs: [...prevState.targetLangs, {
                            targetLocale: langName,
                            targetUri: this.localeMap.getLocaleUri(langName),
                            localeModalText: country[langName].localeModalText,
                            localeModalButtonText: country[langName].localeModalButtonText,
                        }],
                    }));
                });
            }
        });
    }

    /**
     * Get the modal via DOM and map it to a Dexter DOM Modal.
     * This allows the modal to leverage all the base features of DOM modals.
     */
    getModal() {
        const domModal = document.querySelector(`.modalContainer #${this.modalId}`);
        this.modal = new Modal(domModal);
    }

    /**
     * Compare the current page locale to the target locale. If they do not
     * match get the target locale text and modal, then open the modal.
     */
    compareLocales() {
        if (this.currentLocale !== this.targetLocale) {
            this.getTargetLocaleContent().then((responseText) => {
                this.getCurrentLocaleUri();
                this.getTargetLocaleText(responseText);
                this.triggerModal();
                setCookie('georouting_presented', true, 30);
            }).catch((err) => {
                window.dexter.geoRouting.errors = err;
            });
        }
    }

    /**
     * Explicity close our modal and prevent the anchor from doing anything.
     * We keep an anchor and event for accessiblity and consistency reasons.
     * @param {Event} event the event.
     */
    closeModal(event) {
        event.preventDefault();
        setCookie('international', this.currentLocale, 365);
        this.modal.close();
    }

    /**
     * Set the international cookie and route the visitor to the desired location.
     * @param {Event} event the event.
     */
    route(event) {
        event.preventDefault();
        const targetLocale = event.target.getAttribute('hreflang');
        setCookie('international', targetLocale, 365);
        window.location = event.target.href;
    }

    triggerModal() {
        this.getModal();
        this.modal.open();
    }

    render() {
        const { targetLangs } = this.state;
        const modalId = 'localeModal';

        return (
            <ReactModal
                overlayColor="rgba(0,0,0,0.5)"
                widthClasses="mobile-width-100 tablet-width-640"
                heightClasses="mobile-height-auto"
                id={modalId}
                name="Locale Modal"
                description="We have detected you are visiting a different region on adobe.com">
                <div className="locale-modal">
                    <i
                        className="coreIcon coreIcon_globe coreIcon_size-locale"
                        aria-hidden="true" />
                    <div className="locale-modal_content">
                        {
                            targetLangs.map(targetLang => (
                                <p key={targetLang.localeModalText}>
                                    {targetLang.localeModalText}
                                </p>))
                        }
                        <p> {this.props.currentLocaleText} </p>
                        {
                            targetLangs.map(targetLang => (
                                <a
                                    key={targetLang.targetLocale}
                                    className="locale-modal_button"
                                    hrefLang={targetLang.targetLocale}
                                    href={targetLang.targetUri}
                                    onClick={event => this.route(event)}>
                                    {targetLang.localeModalButtonText}
                                </a>
                            ))
                        }
                        <a
                            className="locale-modal_button"
                            href={this.currentLocaleUri}
                            hrefLang={this.currentLocale}
                            onClick={event => this.closeModal(event)}>
                            {this.props.currentLocaleButtonText}
                        </a>
                    </div>
                </div>
            </ReactModal>
        );
    }
}


LocaleModal.propTypes = {
    currentLocaleButtonText: PropTypes.string,
    currentLocaleText: PropTypes.string,
};

LocaleModal.defaultProps = {
    currentLocaleButtonText: '',
    currentLocaleText: '',
};
