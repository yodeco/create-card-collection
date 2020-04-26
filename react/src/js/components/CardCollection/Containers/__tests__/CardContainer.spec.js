import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';
import Card from '../CardContainer';
import StandardCard from '../../Components/Cards/standardCard';
import FeaturedCard from '../../Components/Cards/featuredCard';
import TitleCard from '../../Components/Cards/titleCard';
import SubscriptionCard from '../../subscriptionCard';

Enzyme.configure({ adapter: new Adapter() });

describe('CardContainer', () => {
    describe('the process by which it takes props and passes it onto its children', () => {
        it('renders the standard card with the correct props', () => {
            const props = {
                background: 'https://placehold.it/150x150',
                styles: {
                    backgroundColor: '#fff',
                    titleColor: '#aaa',
                },
                tag: {
                    color: '#fff',
                    url: 'https://www.google.com',
                    title: 'tagTitle',
                },
                article: {
                    title: 'articleTitle',
                    url: 'https://www.google.com/some-page-name.html',
                    author: 'Linus Torvalds',
                },
                video: {
                    url: 'http://www.youtube.com',
                    policy: 'allow-all',
                },
                byText: 'written by {authorName}',
                type: 'standard',
            };
            const wrapper = shallow(<Card {...props} />);
            expect(wrapper.find(StandardCard).props()).toEqual({
                pageName: 'some-page-name',
                showVideoButton: true,
                backgroundImageUrl: 'https://placehold.it/150x150',
                backgroundColor: '#fff',
                titleColor: '#aaa',
                tagColor: '#fff',
                tagUrl: 'https://www.google.com',
                tagTitle: 'tagTitle',
                showTagLabel: true,
                articleTitle: 'articleTitle',
                articleUrl: 'https://www.google.com/some-page-name.html',
                videoUrl: 'http://www.youtube.com',
                videoPolicy: 'allow-all',
                byAuthor: 'written by Linus Torvalds',
            });
        });

        it('renders the FeaturedCard with the correct props', () => {
            const props = {
                background: 'https://placehold.it/150x150',
                styles: {
                    backgroundColor: '#fff',
                    titleColor: '#aaa',
                    descriptionColor: '#eee',
                    imageSize: 'large',
                    contentVerticalAlignment: '50%',
                    contentHorizontalAlignment: '50%',
                    imageHorizontalAlignment: '30%',
                    imageVerticalAlignment: '30%',
                },
                article: {
                    title: 'articleTitle',
                    description: 'article description',
                    url: 'https://www.google.com/some-page-name.html',
                    author: 'Linus Torvalds',
                    ctaButtonLink: '#',
                    ctaButtonText: 'clickme',
                },
                width: 2,
                type: 'featured',
            };
            const wrapper = shallow(<Card {...props} />);
            expect(wrapper.find(FeaturedCard).props()).toEqual({
                showArticleDescription: true,
                showArticleUrl: true,
                shouldShowCta: true,
                wide: 'wide',
                imageSize: 'large',
                imageVerticalAlignment: '30%',
                imageHorizontalAlignment: '30%',
                contentVerticalAlignment: '50%',
                contentHorizontalAlignment: '50%',
                backgroundImageUrl: 'https://placehold.it/150x150',
                descriptionColor: '#eee',
                titleColor: '#aaa',
                backgroundColor: '#fff',
                articleTitle: 'articleTitle',
                articleUrl: 'https://www.google.com/some-page-name.html',
                ctaButtonText: 'clickme',
                ctaButtonLink: '#',
                articleDescription: 'article description',
            });
        });

        it('renders the TitleCard with the correct props', () => {
            const props = {
                background: 'https://placehold.it/150x150',
                styles: {
                    backgroundColor: '#fff',
                    titleColor: '#aaa',
                    descriptionColor: '#eee',
                    imageSize: 'custom',
                    customImageSize: 'large',
                    contentVerticalAlignment: '50%',
                    imageHorizontalAlignment: '30%',
                    imageVerticalAlignment: '30%',
                },
                article: {
                    title: 'articleTitle',
                    description: 'article description',
                },
                iconPath: '/icon.png',
                imageAlt: 'alt',
                width: 2,
                type: 'static',
            };
            const wrapper = shallow(<Card {...props} />);
            expect(wrapper.find(TitleCard).props()).toEqual({
                wide: 'wide',
                imageSize: 'large',
                imageVerticalAlignment: '30%',
                imageHorizontalAlignment: '30%',
                verticalAlignment: '50%',
                imageAlt: 'alt',
                backgroundImageUrl: 'https://placehold.it/150x150',
                iconPath: '/icon.png',
                descriptionColor: '#eee',
                titleColor: '#aaa',
                backgroundColor: '#fff',
                articleDescription: 'article description',
                articleTitle: 'articleTitle',
                description: '',
                title: '',
            });
        });

        it('renders the SubscriptionCard with the correct props', () => {
            const props = {
                background: 'https://placehold.it/150x150',
                styles: {
                    backgroundColor: '#fff',
                    titleColor: '#aaa',
                    descriptionColor: '#eee',
                    imageSize: 'custom',
                    customImageSize: 'large',
                    // contentVerticalAlignment: '50%',
                    imageHorizontalAlignment: '30%',
                    imageVerticalAlignment: '30%',
                    thankYouView: {
                        titleColor: '#fff',
                        descriptionColor: '#bbb',
                    },
                },
                article: {
                    title: 'articleTitle',
                    description: 'article description',
                    adobeCampaignServiceName: 'serviceName',
                    consentNoticeText: 'give consent',
                    ctaButtonText: 'clickme',
                    emailPlaceholderText: 'your email',
                    invalidEmailText: 'wrong email',
                    namePlaceholderText: 'your name',
                    requiredText: 'this field is required',
                    serverErrorText: 'error',
                    subscriptionAPI: 'https://www.google.com/api/',
                    subscriptionCountry: 'en',
                    thankYouView: {
                        background: '#fff',
                        ctaButtonLink: '#',
                        ctaButtonText: 'click me more',
                        description: 'the thank you view',
                        title: 'some title',

                    },

                },
                iconPath: '/icon.png',
                imageAlt: 'alt',
                width: 2,
                page: 1,
                byText: 'written by {authorName}',
                type: 'subscription',
            };
            const wrapper = shallow(<Card {...props} />);
            expect(wrapper.find(SubscriptionCard).props()).toEqual({
                width: 2,
                page: 1,
                imageAlt: 'alt',
                byText: 'written by {authorName}',
                articleTitle: 'articleTitle',
                thankYouViewTitle: 'some title',
                thankYouViewDescription: 'the thank you view',
                thankYouViewCtaButtonText: 'click me more',
                thankYouViewCtaButtonLink: '#',
                thankYouViewBackgroundImage: '#fff',
                subscriptionCountry: 'en',
                subscriptionAPI: 'https://www.google.com/api/',
                serverErrorText: 'error',
                requiredText: 'this field is required',
                namePlaceholderText: 'your name',
                invalidEmailText: 'wrong email',
                emailPlaceholderText: 'your email',
                articleDescription: 'article description',
                ctaButtonText: 'clickme',
                consentNoticeText: 'give consent',
                adobeCampaignServiceName: 'serviceName',
                thankYouDescriptionColor: '#bbb',
                thankYouTitleColor: '#fff',
                titleColor: '#aaa',
                imageSize: undefined,
                descriptionColor: '#eee',
                imageVerticalAlignment: '30%',
                imageHorizontalAlignment: '30%',
                backgroundImageUrl: 'https://placehold.it/150x150',
                backgroundColor: '#fff',
            });
        });
    });

    describe('the conditional rendering behavior', () => {
        it('renders an empty string if given no props', () => {
            const wrapper = shallow(<Card type="" />);
            expect(wrapper.text()).toEqual('');
        });
    });
});
