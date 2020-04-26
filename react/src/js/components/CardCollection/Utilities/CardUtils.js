import * as _ from 'lodash';


export function shouldShowArticleUrl(props) {
    const articleUrl = _.get(props, 'article.url', '');
    return articleUrl !== '';
}

export function shouldShowArticleDescription(props) {
    const articleDescription = _.get(props, 'article.description', '');
    return articleDescription !== '';
}


export function showFeaturedCardCta(props) {
    const ctaButtonText = _.get(props, 'article.ctaButtonText', '');
    const ctaButtonLink = _.get(props, 'article.ctaButtonLink', '');
    return ctaButtonText !== '' && ctaButtonLink !== '';
}

/*
 * Get the page name sans domain and html
 */
export function getPageName(articleUrl) {
    const pageNameIndex = articleUrl.lastIndexOf('/');
    const pageNamePlusExt = articleUrl.substring(pageNameIndex + 1);
    return pageNamePlusExt.split('.')[0];
}

export function shouldShowTagLabel(props) {
    const tagTitle = _.get(props, 'tag.title', '');
    return tagTitle !== '';
}

export function shouldShowVideoUrl(props) {
    const videoUrl = _.get(props, 'video.url', '');
    return videoUrl !== '';
}


export function getByAuthorText(author, byText) {
    let authorStr = author || '';
    if (authorStr.length && byText && byText.includes('{authorName}')) {
        authorStr = byText.replace('{authorName}', authorStr);
    }
    return authorStr;
}


export function setSubscriptionCardProps(props, obj) {
    /* image properties */
    obj.imageSize = _.get(props, 'styles.imageSize', '');
    obj.backgroundImageUrl = _.get(props, 'background', '');
    obj.imageHorizontalAlignment = _.get(props, 'styles.imageHorizontalAlignment', '50%');
    obj.imageVerticalAlignment = _.get(props, 'styles.imageVerticalAlignment', '50%');
    obj.imageAlt = _.get(props, 'imageAlt', '');
    obj.imageSize = obj.imageSize === 'custom' ? obj.customImageSize : obj.imageSize;

    /* title card styles */
    obj.backgroundColor = _.get(props, 'styles.backgroundColor', '');
    obj.descriptionColor = _.get(props, 'styles.descriptionColor', '');
    obj.titleColor = _.get(props, 'styles.titleColor', '');
    obj.thankYouTitleColor = _.get(props, 'styles.thankYouView.titleColor', '');
    obj.thankYouDescriptionColor = _.get(props, 'styles.thankYouView.descriptionColor', '');

    /* article properties */
    obj.adobeCampaignServiceName = _.get(props, 'article.adobeCampaignServiceName', '');
    obj.consentNoticeText = _.get(props, 'article.consentNoticeText', '');
    obj.ctaButtonText = _.get(props, 'article.ctaButtonText', '');
    obj.articleDescription = _.get(props, 'article.description', '');
    obj.emailPlaceholderText = _.get(props, 'article.emailPlaceholderText', '');
    obj.invalidEmailText = _.get(props, 'article.invalidEmailText', '');
    obj.namePlaceholderText = _.get(props, 'article.namePlaceholderText', '');
    obj.requiredText = _.get(props, 'article.requiredText', '');
    obj.serverErrorText = _.get(props, 'article.serverErrorText', '');
    obj.subscriptionAPI = _.get(props, 'article.subscriptionAPI', '');
    if (obj.subscriptionAPI === '') {
        obj.subscriptionAPI = 'https://www.adobe.com/api2/subscribe_v1';
    }
    obj.subscriptionCountry = _.get(props, 'article.subscriptionCountry', '');
    obj.thankYouViewBackgroundImage = _.get(props, 'article.thankYouView.background', '');
    obj.thankYouViewCtaButtonLink = _.get(props, 'article.thankYouView.ctaButtonLink', '');
    obj.thankYouViewCtaButtonText = _.get(props, 'article.thankYouView.ctaButtonText', '');
    obj.thankYouViewDescription = _.get(props, 'article.thankYouView.description', '');
    obj.thankYouViewTitle = _.get(props, 'article.thankYouView.title', '');
    obj.articleTitle = _.get(props, 'article.title', '');

    /* card properties */
    obj.byText = _.get(props, 'byText', '');
    obj.page = _.get(props, 'page', '');
    obj.width = _.get(props, 'width', 1);
}

export function setTitleCardProps(props, obj) {
    /* title card styles */
    obj.backgroundColor = _.get(props, 'styles.backgroundColor', '');
    obj.titleColor = _.get(props, 'styles.titleColor', '');
    obj.descriptionColor = _.get(props, 'styles.descriptionColor', '');
    obj.imageSize = _.get(props, 'styles.imageSize', '');
    obj.verticalAlignment = _.get(props, 'styles.contentVerticalAlignment', '');
    obj.imageHorizontalAlignment = _.get(props, 'styles.imageHorizontalAlignment', '50%');
    obj.imageVerticalAlignment = _.get(props, 'styles.imageVerticalAlignment', '50%');
    obj.customImageSize = _.get(props, 'styles.customImageSize', '');

    /* article properties */
    obj.articleTitle = _.get(props, 'article.title', '');
    obj.articleDescription = _.get(props, 'article.description', '');

    /* image properties */
    obj.iconPath = _.get(props, 'iconPath', '');
    obj.backgroundImageUrl = _.get(props, 'background', '');
    obj.imageAlt = _.get(props, 'imageAlt', '');
    obj.imageSize = obj.imageSize === 'custom' ? obj.customImageSize : obj.imageSize;

    /* card properties */
    obj.width = _.get(props, 'width', 1);
    obj.wide = obj.width === 2 ? 'wide' : '';
}

export function setFeaturedCardProps(props, obj) {
    /* featured card styles */
    obj.backgroundColor = _.get(props, 'styles.backgroundColor', '');
    obj.titleColor = _.get(props, 'styles.titleColor', '');
    obj.descriptionColor = _.get(props, 'styles.descriptionColor', '');
    obj.imageSize = _.get(props, 'styles.imageSize', '');
    obj.contentVerticalAlignment = _.get(props, 'styles.contentVerticalAlignment', '');
    obj.contentHorizontalAlignment = _.get(props, 'styles.contentHorizontalAlignment', '');

    /* article properties */
    obj.articleTitle = _.get(props, 'article.title', '');
    obj.articleDescription = _.get(props, 'article.description', '');
    obj.articleUrl = _.get(props, 'article.url', '');
    obj.ctaButtonLink = _.get(props, 'article.ctaButtonLink', '');
    obj.ctaButtonText = _.get(props, 'article.ctaButtonText', '');

    obj.shouldShowCta = showFeaturedCardCta(props);
    obj.showArticleUrl = shouldShowArticleUrl(props);
    obj.showArticleDescription = shouldShowArticleDescription(props);

    /* image properties */
    obj.backgroundImageUrl = _.get(props, 'background', '');
    obj.imageHorizontalAlignment = _.get(props, 'styles.imageHorizontalAlignment', '50%');
    obj.imageVerticalAlignment = _.get(props, 'styles.imageVerticalAlignment', '50%');

    /* card properties */
    obj.width = _.get(props, 'width', 1);
    obj.wide = obj.width === 2 ? 'wide' : '';
}

export function setStandardCardProps(props, obj) {
    /* article styles */
    obj.backgroundImageUrl = _.get(props, 'background', '');
    obj.backgroundColor = _.get(props, 'styles.backgroundColor', '');
    obj.titleColor = _.get(props, 'styles.titleColor', '');

    /* tag properties */
    obj.tagColor = _.get(props, 'tag.color', '');
    obj.tagUrl = _.get(props, 'tag.url', '');
    obj.tagTitle = _.get(props, 'tag.title', '');
    obj.showTagLabel = shouldShowTagLabel(props);

    /* article properties */
    obj.articleTitle = _.get(props, 'article.title', '');
    obj.articleUrl = _.get(props, 'article.url', '');
    obj.author = _.get(props, 'article.author', '');

    /* video properties */
    obj.videoUrl = _.get(props, 'video.url', '');
    obj.videoPolicy = _.get(props, 'video.policy', '');
    obj.showVideoButton = shouldShowVideoUrl(props);
    obj.pageName = getPageName(obj.articleUrl); // Needed for video modal

    obj.byText = _.get(props, 'byText', '');
    obj.byAuthor = getByAuthorText(obj.author, obj.byText);
}
