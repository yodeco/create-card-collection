import React from 'react';
import PropTypes from 'prop-types';
import { setStandardCardProps, setFeaturedCardProps, setTitleCardProps, setSubscriptionCardProps } from '../Utilities/CardUtils';
import StandardCard from '../Components/Cards/standardCard';
import TitleCard from '../Components/Cards/titleCard';
import FeaturedCard from '../Components/Cards/featuredCard';
import SubscriptionCard from '../subscriptionCard';

export class CardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        if (this.props.type === undefined || this.props.type === 'standard') {
            setStandardCardProps(this.props, this);
            return (
                <StandardCard
                    pageName={this.pageName}
                    showVideoButton={this.showVideoButton}
                    backgroundImageUrl={this.backgroundImageUrl}
                    backgroundColor={this.backgroundColor}
                    titleColor={this.titleColor}
                    tagColor={this.tagColor}
                    tagUrl={this.tagUrl}
                    tagTitle={this.tagTitle}
                    showTagLabel={this.showTagLabel}
                    articleTitle={this.articleTitle}
                    articleUrl={this.articleUrl}
                    videoUrl={this.videoUrl}
                    videoPolicy={this.videoPolicy}
                    byAuthor={this.byAuthor} />
            );
        } else if (this.props.type === 'featured') {
            setFeaturedCardProps(this.props, this);
            return (
                <FeaturedCard
                    showArticleDescription={this.showArticleDescription}
                    showArticleUrl={this.showArticleUrl}
                    shouldShowCta={this.shouldShowCta}
                    wide={this.wide}
                    imageSize={this.imageSize}
                    imageVerticalAlignment={this.imageVerticalAlignment}
                    imageHorizontalAlignment={this.imageHorizontalAlignment}
                    contentVerticalAlignment={this.contentVerticalAlignment}
                    contentHorizontalAlignment={this.contentHorizontalAlignment}
                    backgroundImageUrl={this.backgroundImageUrl}
                    descriptionColor={this.descriptionColor}
                    titleColor={this.titleColor}
                    backgroundColor={this.backgroundColor}
                    articleTitle={this.articleTitle}
                    articleUrl={this.articleUrl}
                    ctaButtonText={this.ctaButtonText}
                    ctaButtonLink={this.ctaButtonLink}
                    articleDescription={this.articleDescription} />
            );
        } else if (this.props.type === 'static') {
            setTitleCardProps(this.props, this);
            return (
                <TitleCard
                    wide={this.wide}
                    imageSize={this.imageSize}
                    imageVerticalAlignment={this.imageVerticalAlignment}
                    imageHorizontalAlignment={this.imageHorizontalAlignment}
                    verticalAlignment={this.verticalAlignment}
                    imageAlt={this.imageAlt}
                    backgroundImageUrl={this.backgroundImageUrl}
                    iconPath={this.iconPath}
                    descriptionColor={this.descriptionColor}
                    titleColor={this.titleColor}
                    backgroundColor={this.backgroundColor}
                    articleDescription={this.articleDescription}
                    articleTitle={this.articleTitle} />
            );
        } else if (this.props.type === 'subscription') {
            setSubscriptionCardProps(this.props, this);
            return (
                <SubscriptionCard
                    width={this.width}
                    page={this.page}
                    imageAlt={this.imageAlt}
                    byText={this.byText}
                    articleTitle={this.articleTitle}
                    thankYouViewTitle={this.thankYouViewTitle}
                    thankYouViewDescription={this.thankYouViewDescription}
                    thankYouViewCtaButtonText={this.thankYouViewCtaButtonText}
                    thankYouViewCtaButtonLink={this.thankYouViewCtaButtonLink}
                    thankYouViewBackgroundImage={this.thankYouViewBackgroundImage}
                    subscriptionCountry={this.subscriptionCountry}
                    subscriptionAPI={this.subscriptionAPI}
                    serverErrorText={this.serverErrorText}
                    requiredText={this.requiredText}
                    namePlaceholderText={this.namePlaceholderText}
                    invalidEmailText={this.invalidEmailText}
                    emailPlaceholderText={this.emailPlaceholderText}
                    articleDescription={this.articleDescription}
                    ctaButtonText={this.ctaButtonText}
                    consentNoticeText={this.consentNoticeText}
                    adobeCampaignServiceName={this.adobeCampaignServiceName}
                    thankYouDescriptionColor={this.thankYouDescriptionColor}
                    thankYouTitleColor={this.thankYouTitleColor}
                    titleColor={this.titleColor}
                    imageSize={this.imageSize}
                    descriptionColor={this.descriptionColor}
                    imageVerticalAlignment={this.imageVerticalAlignment}
                    imageHorizontalAlignment={this.imageHorizontalAlignment}
                    backgroundImageUrl={this.backgroundImageUrl}
                    backgroundColor={this.backgroundColor} />
            );
        }
        return '';
    }
}

CardContainer.propTypes = {
    type: PropTypes.string,
};

CardContainer.defaultProps = {
    type: '',
};

export default CardContainer;
