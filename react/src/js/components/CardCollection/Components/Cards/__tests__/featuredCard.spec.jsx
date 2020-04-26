import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import {
    setFeaturedCardProps,
    showFeaturedCardCta,
    shouldShowArticleUrl,
    shouldShowArticleDescription,
} from '../../../Utilities/CardUtils';
import FeaturedCard from '../featuredCard';

Enzyme.configure({ adapter: new Adapter() });

describe('Featured Card Card Tests', () => {
    describe('When the featured card is passed in all empty strings for props', () => {
        it('all props correctly set to the empty string in the outputted HTML', () => {
            const wrapper = shallow(<FeaturedCard
                showArticleDescription={false}
                showArticleUrl={false}
                shouldShowCta={false}
                wide=""
                imageSize=""
                imageVerticalAlignment=""
                imageHorizontalAlignment=""
                contentVerticalAlignment=""
                contentHorizontalAlignment=""
                backgroundImageUrl=""
                descriptionColor=""
                titleColor=""
                backgroundColor=""
                articleTitle=""
                articleUrl=""
                ctaButtonText=""
                ctaButtonLink=""
                articleDescription="" />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    describe('When the featured card is passed in all empty strings for props, but has a flag to show a CTA', () => {
        it('the CTA is shown', () => {
            const wrapper = shallow(<FeaturedCard
                showArticleDescription={false}
                showArticleUrl={false}
                shouldShowCta
                wide=""
                imageSize=""
                imageVerticalAlignment=""
                imageHorizontalAlignment=""
                contentVerticalAlignment=""
                contentHorizontalAlignment=""
                backgroundImageUrl=""
                descriptionColor=""
                titleColor=""
                backgroundColor=""
                articleTitle=""
                articleUrl=""
                ctaButtonText="Watch Now"
                ctaButtonLink="http://www.adobethinktank.com"
                articleDescription="" />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    describe('When the featured card is passed in all empty strings for props, ' +
        'but has a flag to show an Article Description', () => {
        it('the Article Description is shown', () => {
            const wrapper = shallow(<FeaturedCard
                showArticleDescription
                showArticleUrl={false}
                shouldShowCta={false}
                wide=""
                imageSize=""
                imageVerticalAlignment=""
                imageHorizontalAlignment=""
                contentVerticalAlignment=""
                contentHorizontalAlignment=""
                backgroundImageUrl=""
                descriptionColor=""
                titleColor=""
                backgroundColor=""
                articleTitle=""
                articleUrl=""
                ctaButtonText=""
                ctaButtonLink=""
                articleDescription="Join the conversation with experts on how AI is fueling the next digital enterprise transformation." />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    describe('When the featured card is passed in all empty strings for props, ' +
        'but has a flag to show an Article Url', () => {
        it('the Article Url is shown', () => {
            const wrapper = shallow(<FeaturedCard
                showArticleDescription={false}
                showArticleUrl
                shouldShowCta={false}
                wide=""
                imageSize=""
                imageVerticalAlignment=""
                imageHorizontalAlignment=""
                contentVerticalAlignment=""
                contentHorizontalAlignment=""
                backgroundImageUrl=""
                descriptionColor=""
                titleColor=""
                backgroundColor=""
                articleTitle=""
                articleUrl="https://www-author.dev02.corp.adobe.com/content/www/us/en/insights/3-ways-to-solve-disruption-in-fsi.html"
                ctaButtonText=""
                ctaButtonLink=""
                articleDescription="Join the conversation with experts on how AI is fueling the next digital enterprise transformation." />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    describe('If the card collection passes an empty prop object to a title card', () => {
        it('The background color is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const featuredCardPropsObj = {};

            setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);
            expect(featuredCardPropsObj.backgroundColor).toBe('');
        });

        it('The title color is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const featuredCardPropsObj = {};

            setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);
            expect(featuredCardPropsObj.titleColor).toBe('');
        });

        it('The description color is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const featuredCardPropsObj = {};

            setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);
            expect(featuredCardPropsObj.descriptionColor).toBe('');
        });

        it('The image size defaults to the empty string', () => {
            const cardCollectionPropsObj = {};
            const featuredCardPropsObj = {};

            setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);
            expect(featuredCardPropsObj.imageSize).toBe('');
        });

        it('The content vertical alignment defaults to the empty string', () => {
            const cardCollectionPropsObj = {};
            const featuredCardPropsObj = {};

            setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);
            expect(featuredCardPropsObj.contentVerticalAlignment).toBe('');
        });

        it('The content horizontal alignment defaults to the empty string', () => {
            const cardCollectionPropsObj = {};
            const featuredCardPropsObj = {};

            setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);
            expect(featuredCardPropsObj.contentHorizontalAlignment).toBe('');
        });

        it('The article title is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const featuredCardPropsObj = {};

            setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);
            expect(featuredCardPropsObj.articleTitle).toBe('');
        });

        it('The article description is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const featuredCardPropsObj = {};

            setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);
            expect(featuredCardPropsObj.articleDescription).toBe('');
        });

        it('The article url is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const featuredCardPropsObj = {};

            setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);
            expect(featuredCardPropsObj.articleUrl).toBe('');
        });

        it('The cta button text is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const featuredCardPropsObj = {};

            setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);
            expect(featuredCardPropsObj.ctaButtonText).toBe('');
        });

        it('The cta button link is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const featuredCardPropsObj = {};

            setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);
            expect(featuredCardPropsObj.ctaButtonLink).toBe('');
        });

        it('The background image url is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const featuredCardPropsObj = {};

            setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);
            expect(featuredCardPropsObj.backgroundImageUrl).toBe('');
        });

        it('The width of the card defaults to 1', () => {
            const cardCollectionPropsObj = {};
            const featuredCardPropsObj = {};

            setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);
            expect(featuredCardPropsObj.width).toBe(1);
        });

        it('The wide class flag is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const featuredCardPropsObj = {};

            setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);
            expect(featuredCardPropsObj.wide).toBe('');
        });
    });

    describe('The title is set to', () => {
        describe('Think Tank', () => {
            it('The anchor is populated with insights', () => {
                const cardCollectionPropsObj = { article: { title: 'Think Tank: The Future of AI in the Enterprise' } };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('A Japanese String', () => {
            it('The anchor is populated with the Japanese String', () => {
                const cardCollectionPropsObj = { article: { title: 'Think Tank：エンタープライズにおけるAIの未来' } };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('The description is set to', () => {
        describe('A long string', () => {
            it('The p tag is populated with this long string', () => {
                const cardCollectionPropsObj = {
                    article: {
                        description: 'Join the conversation with experts on how AI is fueling the ' +
                        'next digital enterprise transformation.',
                    },
                };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('A long Japanese string', () => {
            it('The p tag is populated with this long Japanese string', () => {
                const cardCollectionPropsObj = {
                    article: {
                        description: 'AIが次のデジタルエンタープライズトランスフォーメーションにどのように貢献しているかについて、' +
                        'エキスパートと会話してください。',
                    },
                };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('The background color is set to', () => {
        describe('A hexadecimal value', () => {
            it('The containing div uses this background color', () => {
                const cardCollectionPropsObj = {
                    styles: {
                        backgroundColor: '#D83790',
                    },
                };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('The title color is set to', () => {
        describe('A hexadecimal value', () => {
            it('The h2 uses this background color', () => {
                const cardCollectionPropsObj = {
                    styles: {
                        titleColor: '#D83790',
                    },
                };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('The description color is set to', () => {
        describe('A hexadecimal value', () => {
            it('The p tag uses this background color', () => {
                const cardCollectionPropsObj = {
                    styles: {
                        descriptionColor: '#D83790',
                    },
                };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('Testing the wide card functionality', () => {
        describe('When the width of the card is 2', () => {
            it('The wide class is added to the parent div', () => {
                const cardCollectionPropsObj = {
                    width: 2,
                };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('When the width of the card is 1', () => {
            it('The wide class is NOT added to the parent div', () => {
                const cardCollectionPropsObj = {
                    width: 1,
                };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('When the width of the card is 3', () => {
            it('The wide class is NOT added to the parent div, because this is an unsupported feature', () => {
                const cardCollectionPropsObj = {
                    width: 3,
                };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('When the width of the card is null', () => {
            it('This fails an equality check and the wide class is NOT added to the parent div', () => {
                const cardCollectionPropsObj = {
                    width: null,
                };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('When the content vertical alignment is set ', () => {
        describe('To top', () => {
            it('align items is set to flex-start', () => {
                const cardCollectionPropsObj = { styles: { contentVerticalAlignment: 'flex-start' } };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('To middle', () => {
            it('align items is set to center', () => {
                const cardCollectionPropsObj = { styles: { contentVerticalAlignment: 'center' } };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('To bottom', () => {
            it('align items is set to flex-end', () => {
                const cardCollectionPropsObj = { styles: { contentVerticalAlignment: 'flex-end' } };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('When the content horizontal alignment is set ', () => {
        describe('To left', () => {
            it('justify content is set to flex-start', () => {
                const cardCollectionPropsObj = { styles: { contentHorizontalAlignment: 'flex-start' } };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('To center', () => {
            it('justify content is set to center', () => {
                const cardCollectionPropsObj = { styles: { contentHorizontalAlignment: 'center' } };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('To right', () => {
            it('justify content is set to flex-end', () => {
                const cardCollectionPropsObj = { styles: { contentHorizontalAlignment: 'flex-end' } };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('When the background image size is set ', () => {
        describe('To cover', () => {
            it('the background size is set to cover', () => {
                const cardCollectionPropsObj = { styles: { imageSize: 'cover' } };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('When the background url is set ', () => {
        describe('To an actual image path', () => {
            it('the background url is populated with that url path', () => {
                const cardCollectionPropsObj = {
                    background: '/content/dam/www/us/en/adobeio/apis/' +
                    'creative-cloud/photoshop/PS-serverless-340%20X%20180px.jpg',
                };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('When the CTA Text is set ', () => {
        describe('To Subscribe', () => {
            it('the anchor tag should be updated accordingly', () => {
                const cardCollectionPropsObj = {
                    article: {
                        ctaButtonText: 'Subscribe',
                    },
                };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('When the CTA Link is set ', () => {
        describe('To An Adobe Link', () => {
            it('the anchor tag should point to that link', () => {
                const cardCollectionPropsObj = {
                    article: {
                        ctaButtonLink: 'http://www.adobethinktank.com/',
                    },
                };
                const featuredCardPropsObj = {};

                setFeaturedCardProps(cardCollectionPropsObj, featuredCardPropsObj);

                const wrapper = shallow(<FeaturedCard
                    {...featuredCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('Testing Should Show Video Url Method', () => {
        describe('When passed in a valid prop object', () => {
            it('The cta should show', () => {
                const props = {
                    article: {
                        ctaButtonText: 'Subscribe',
                        ctaButtonLink: 'http://www.adobethinktank.com/',
                    },
                };
                const flag = showFeaturedCardCta(props);
                expect(flag).toBe(true);
            });
        });

        describe('Whenever the cta button link is missing', () => {
            it('The cta should not show', () => {
                const props = {
                    article: {
                        ctaButtonText: 'Subscribe',
                    },
                };
                const flag = showFeaturedCardCta(props);
                expect(flag).toBe(false);
            });
        });

        describe('Whenever the video.url property is missing', () => {
            it('The cta should not show', () => {
                const props = {
                    article: {
                        ctaButtonLink: 'http://www.adobethinktank.com/',
                    },
                };
                const flag = showFeaturedCardCta(props);
                expect(flag).toBe(false);
            });
        });

        describe('When passed in an empty prop object', () => {
            it('The cta should not show', () => {
                const props = {};
                const flag = showFeaturedCardCta(props);
                expect(flag).toBe(false);
            });
        });
    });

    describe('Testing Should Show Article Description', () => {
        describe('When passed in a valid prop object', () => {
            it('The cta should show', () => {
                const props = {
                    article: {
                        description: 'Join the conversation with experts on how AI ' +
                        'is fueling the next digital enterprise transformation.',
                    },
                };
                const flag = shouldShowArticleDescription(props);
                expect(flag).toBe(true);
            });
        });

        describe('When passed in an invalid prop object (no empty strings)', () => {
            it('The cta should show', () => {
                const props = {
                    article: {
                        description: '',
                    },
                };
                const flag = shouldShowArticleDescription(props);
                expect(flag).toBe(false);
            });
        });

        describe('When passed in an empty prop object', () => {
            it('The cta should not show', () => {
                const props = {};
                const flag = shouldShowArticleDescription(props);
                expect(flag).toBe(false);
            });
        });
    });

    describe('Testing Should Show Article Url', () => {
        describe('When passed in a valid prop object', () => {
            it('The cta should show', () => {
                const props = {
                    article: {
                        url: 'http://localhost:4502/content/www/us/en/' +
                        'insights/amplifying-human-creativity-with-artificial-intelligence.html',
                    },
                };
                const flag = shouldShowArticleUrl(props);
                expect(flag).toBe(true);
            });
        });

        describe('When passed in an invalid prop object (no empty strings)', () => {
            it('The cta should show', () => {
                const props = {
                    article: {
                        url: '',
                    },
                };
                const flag = shouldShowArticleUrl(props);
                expect(flag).toBe(false);
            });
        });

        describe('When passed in an empty prop object', () => {
            it('The cta should not show', () => {
                const props = {};
                const flag = shouldShowArticleUrl(props);
                expect(flag).toBe(false);
            });
        });
    });
});

