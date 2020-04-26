import React from 'react';
import { If, Then, Else } from 'react-if';
import PropTypes from 'prop-types';

export default class FeaturedCard extends React.Component {
    static propTypes = {
        showArticleDescription: PropTypes.bool,
        showArticleUrl: PropTypes.bool,
        shouldShowCta: PropTypes.bool,
        wide: PropTypes.string,
        imageSize: PropTypes.string,
        imageVerticalAlignment: PropTypes.string,
        imageHorizontalAlignment: PropTypes.string,
        contentVerticalAlignment: PropTypes.string,
        contentHorizontalAlignment: PropTypes.string,
        backgroundImageUrl: PropTypes.string,
        descriptionColor: PropTypes.string,
        titleColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        articleTitle: PropTypes.string,
        articleUrl: PropTypes.string,
        ctaButtonText: PropTypes.string,
        ctaButtonLink: PropTypes.string,
        articleDescription: PropTypes.string,
    };

    static defaultProps = {
        showArticleDescription: false,
        showArticleUrl: false,
        shouldShowCta: false,
        wide: '',
        imageSize: '',
        imageVerticalAlignment: '50%',
        imageHorizontalAlignment: ' 50%',
        contentVerticalAlignment: '',
        contentHorizontalAlignment: '',
        backgroundImageUrl: '',
        descriptionColor: '',
        titleColor: '',
        backgroundColor: '',
        articleTitle: '',
        articleUrl: '',
        ctaButtonText: '',
        ctaButtonLink: '',
        articleDescription: '',
    };

    render() {
        return (
            <div
                className={`card card_featured ${this.props.wide}`}
                style={{
                    backgroundColor: this.props.backgroundColor,
                }}>
                <div
                    className="card_img"
                    style={{
                        backgroundColor: this.props.backgroundColor,
                        backgroundImage: `url(${this.props.backgroundImageUrl})`,
                        backgroundSize: this.props.imageSize,
                        backgroundPosition:
                            `${this.props.imageHorizontalAlignment} ${this.props.imageVerticalAlignment}`,
                        justifyContent: this.props.contentHorizontalAlignment,
                        alignItems: this.props.contentVerticalAlignment,
                    }}>
                    <div className="card_bg">
                        <h2
                            className="card_title"
                            style={{
                                color: this.props.titleColor,
                            }}>
                            <If condition={this.props.showArticleUrl}>
                                <Then>
                                    <a href={this.props.articleUrl}>
                                        {this.props.articleTitle}
                                    </a>
                                </Then>
                            </If>
                            <Else>
                                {this.props.articleTitle}
                            </Else>
                        </h2>
                        <If condition={this.props.showArticleDescription}>
                            <p
                                className="card_description"
                                style={{
                                    color: this.props.descriptionColor,
                                }}>
                                {this.props.articleDescription}
                            </p>
                        </If>
                        <If condition={this.props.shouldShowCta}>
                            <div>
                                <a className="spectrum-Button spectrum-Button--cta" href={this.props.ctaButtonLink}>
                                    {this.props.ctaButtonText}
                                </a>
                            </div>
                        </If>
                    </div>
                </div>
            </div>
        );
    }
}
