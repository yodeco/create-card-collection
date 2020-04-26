import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16/build/index';
import React from 'react';
import toJson from 'enzyme-to-json';
import { setStandardCardProps, getByAuthorText, shouldShowTagLabel, getPageName, shouldShowVideoUrl } from '../../../Utilities/CardUtils';
import StandardCard from '../standardCard';

Enzyme.configure({ adapter: new Adapter() });

describe('Standard Card Tests', () => {
    describe('Whenever the standard card is passed in all empty strings for props', () => {
        it('all props correctly set to the empty string (and false) in the outputted HTML', () => {
            const wrapper = shallow(<StandardCard
                pageName=""
                showVideoButton={false}
                backgroundImageUrl=""
                backgroundColor=""
                titleColor=""
                tagColor=""
                tagUrl=""
                tagTitle=""
                showTagLabel={false}
                articleTitle=""
                articleUrl=""
                videoUrl=""
                videoPolicy=""
                byAuthor="" />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('all props correctly set to the empty string (and true) in the outputted HTML', () => {
            const wrapper = shallow(<StandardCard
                pageName=""
                showVideoButton
                backgroundImageUrl=""
                backgroundColor=""
                titleColor=""
                tagColor=""
                tagUrl=""
                tagTitle=""
                showTagLabel
                articleTitle=""
                articleUrl=""
                videoUrl=""
                videoPolicy=""
                byAuthor="" />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    describe('Whenever the standard card is passed in the correct flags for the video button', () => {
        it('The video button will render with the correct props', () => {
            const wrapper = shallow(<StandardCard
                pageName="customer-experience-24-hour-fitness"
                showVideoButton
                backgroundImageUrl=""
                backgroundColor=""
                titleColor=""
                tagColor=""
                tagUrl=""
                tagTitle=""
                showTagLabel={false}
                articleTitle=""
                articleUrl=""
                videoUrl="https://video.tv.adobe.com/v/22288?autoplay=true&quality=9"
                videoPolicy="autoplay; fullscreen"
                byAuthor="" />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    describe('Whenever the standard card is passed in the correct flags for the tag label to show', () => {
        it('The tag label button will render with the correct props', () => {
            const wrapper = shallow(<StandardCard
                pageName=""
                showVideoButton={false}
                backgroundImageUrl=""
                backgroundColor=""
                titleColor=""
                tagColor="#bb121a"
                tagUrl="http://localhost:4502/content/www/us/en/insights/media-entertainment.html"
                tagTitle="Media & Entertainment"
                showTagLabel
                articleTitle=""
                articleUrl=""
                videoUrl=""
                videoPolicy=""
                byAuthor="" />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    describe('Getting Standard Card Props from Card collection', () => {
        describe('When the card collection passes an empty object', () => {
            it('The page name is defaulted to the empty string', () => {
                const cardCollectionPropsObj = {};
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.pageName).toBe('');
            });

            it('The background image url is defaulted to the empty string', () => {
                const cardCollectionPropsObj = {};
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.backgroundImageUrl).toBe('');
            });


            it('The background color is defaulted to the empty string', () => {
                const cardCollectionPropsObj = {};
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.backgroundColor).toBe('');
            });

            it('The title color is defaulted to the empty string', () => {
                const cardCollectionPropsObj = {};
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.titleColor).toBe('');
            });

            it('The tag color is defaulted to the empty string', () => {
                const cardCollectionPropsObj = {};
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.tagColor).toBe('');
            });

            it('The tag url is defaulted to the empty string', () => {
                const cardCollectionPropsObj = {};
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.tagUrl).toBe('');
            });

            it('The tag title is defaulted to the empty string', () => {
                const cardCollectionPropsObj = {};
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.tagTitle).toBe('');
            });

            it('The article title is defaulted to the empty string', () => {
                const cardCollectionPropsObj = {};
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.articleTitle).toBe('');
            });

            it('The article url is defaulted to the empty string', () => {
                const cardCollectionPropsObj = {};
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.articleUrl).toBe('');
            });

            it('The video url is defaulted to the empty string', () => {
                const cardCollectionPropsObj = {};
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.videoUrl).toBe('');
            });

            it('The video policy is defaulted to the empty string', () => {
                const cardCollectionPropsObj = {};
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.videoPolicy).toBe('');
            });

            it('The by author is defaulted to the empty string', () => {
                const cardCollectionPropsObj = {};
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.byAuthor).toBe('');
            });
        });

        describe('When the card collection passes a byText prop', () => {
            it('It is successfully mapped to a standard card prop', () => {
                const cardCollectionPropsObj = { byText: 'by {authorName}' };
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.byText).toBe('by {authorName}');
            });
        });
    });

    describe('Getting article properties', () => {
        describe('When the card collection passes a article Url', () => {
            it('It is successfully mapped to a standard card prop', () => {
                const cardCollectionPropsObj = {
                    article: {
                        url: 'http://localhost:4502/content/www/us/en/insights/5-digital-trends-for-financial-marketers.html',
                    },
                };
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.articleUrl).toBe('http://localhost:4502/content/www/us/en/insights/5-digital-trends-for-financial-marketers.html');
            });
        });

        describe('When the card collection passes a article title', () => {
            it('It is successfully mapped to a standard card prop', () => {
                const cardCollectionPropsObj = {
                    article: {
                        title: '5 Digital Trends Financial Marketers Can’t Afford To Ignore',
                    },
                };
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.articleTitle).toBe('5 Digital Trends Financial Marketers Can’t Afford To Ignore');
            });
        });

        describe('When the card collection passes a article author', () => {
            it('It is successfully mapped to a standard card prop', () => {
                const cardCollectionPropsObj = {
                    article: {
                        author: 'John Doe',
                    },
                };
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.author).toBe('John Doe');
            });
        });
    });

    describe('Getting tag properties', () => {
        describe('When the card collection passes a tag color', () => {
            it('It is successfully mapped to a standard card prop', () => {
                const cardCollectionPropsObj = {
                    tag: {
                        color: '#ffffff',
                    },
                };
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.tagColor).toBe('#ffffff');
            });
        });

        describe('When the card collection passes a tag title', () => {
            it('It is successfully mapped to a standard card prop', () => {
                const cardCollectionPropsObj = {
                    tag: {
                        title: 'Advertising',
                    },
                };
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.tagTitle).toBe('Advertising');
            });
        });

        describe('When the card collection passes a tag url', () => {
            it('It is successfully mapped to a standard card prop', () => {
                const cardCollectionPropsObj = {
                    tag: {
                        url: 'http://localhost:4502/content/www/us/en/insights/advertising.html',
                    },
                };
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.tagUrl).toBe('http://localhost:4502/content/www/us/en/insights/advertising.html');
            });
        });
    });

    describe('Getting article styles', () => {
        describe('When the card collection passes a background image url', () => {
            it('It is successfully mapped to a standard card prop', () => {
                const cardCollectionPropsObj = {
                    background: '/content/dam/www/us/en/insights/cropped_images/The%20number%205%20.png',
                };
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.backgroundImageUrl).toBe('/content/dam/www/us/en/insights/cropped_images/The%20number%205%20.png');
            });
        });

        describe('When the card collection passes a background color', () => {
            it('It is successfully mapped to a standard card prop', () => {
                const cardCollectionPropsObj = {
                    styles: {
                        backgroundColor: '#ffffff',
                    },
                };
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.backgroundColor).toBe('#ffffff');
            });
        });

        describe('When the card collection passes a title color', () => {
            it('It is successfully mapped to a standard card prop', () => {
                const cardCollectionPropsObj = {
                    styles: {
                        titleColor: '#ffffff',
                    },
                };
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.titleColor).toBe('#ffffff');
            });
        });
    });

    describe('Getting video properties', () => {
        describe('When the card collection passes a video url', () => {
            it('It is successfully mapped to a standard card prop', () => {
                const cardCollectionPropsObj = {
                    video: {
                        url: 'https://video.tv.adobe.com/v/22288?autoplay=true&quality=9',
                    },
                };
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.videoUrl).toBe('https://video.tv.adobe.com/v/22288?autoplay=true&quality=9');
            });

            describe('When the card collection passes a video policy', () => {
                it('It is successfully mapped to a standard card prop', () => {
                    const cardCollectionPropsObj = {
                        video: {
                            policy: 'autoplay; fullscreen',
                        },
                    };
                    const standardCardPropsObj = {};

                    setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                    expect(standardCardPropsObj.videoPolicy).toBe('autoplay; fullscreen');
                });
            });
        });

        describe('When the card collection passes a background color', () => {
            it('It is successfully mapped to a standard card prop', () => {
                const cardCollectionPropsObj = {
                    styles: {
                        backgroundColor: '#ffffff',
                    },
                };
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.backgroundColor).toBe('#ffffff');
            });
        });

        describe('When the card collection passes a title color', () => {
            it('It is successfully mapped to a standard card prop', () => {
                const cardCollectionPropsObj = {
                    styles: {
                        titleColor: '#ffffff',
                    },
                };
                const standardCardPropsObj = {};

                setStandardCardProps(cardCollectionPropsObj, standardCardPropsObj);
                expect(standardCardPropsObj.titleColor).toBe('#ffffff');
            });
        });
    });

    describe('Testing Getting Author Text Method', () => {
        describe('When using an English By Text and an Actual Author Name', () => {
            it('The author text is shown correctly', () => {
                const author = 'Giselle Abramovich'; // what the JSON returns
                const byText = 'by {authorName}';
                const authorText = getByAuthorText(author, byText);
                expect(authorText).toBe('by Giselle Abramovich');
            });
        });

        describe('When using an English By Text and "by Adobe"', () => {
            it('The author text is shown correctly', () => {
                const author = ' Adobe'; // what the JSON returns
                const byText = 'by {authorName}';
                const authorText = getByAuthorText(author, byText);
                /* There is CSS on the page that transforms this to upper-case */
                /* The extra space is ignored by HTML */
                expect(authorText).toBe('by  Adobe');
            });
        });

        describe('When using a Japanese By Text and "by Unite Editing Unit"', () => {
            it('The author text is shown correctly', () => {
                const author = 'UNITE 編集部'; // what the JSON returns
                const byText = '作者 {authorName}';
                const authorText = getByAuthorText(author, byText);
                expect(authorText).toBe('作者 UNITE 編集部');
            });
        });
    });

    describe('Testing Should Show Tag Label Method', () => {
        describe('When passed in a valid prop object', () => {
            it('The tag should be shown flag returns true', () => {
                const props = {
                    tag: {
                        title: 'Advertising',
                    },
                };
                const showTagLabel = shouldShowTagLabel(props);
                expect(showTagLabel).toBe(true);
            });
        });

        describe('When passed in a invalid prop object', () => {
            it('The tag should be shown flag returns false', () => {
                const props = {
                    tags: {
                        title: 'Advertising',
                    },
                };
                const showTagLabel = shouldShowTagLabel(props);
                expect(showTagLabel).toBe(false);
            });
        });

        describe('When passed in an empty prop object', () => {
            it('The tag should be shown flag returns false', () => {
                const props = {};
                const showTagLabel = shouldShowTagLabel(props);
                expect(showTagLabel).toBe(false);
            });
        });
    });

    describe('Testing Get Page Name Method', () => {
        describe('When passed in an empty string', () => {
            it('The page name method should return an empty string', () => {
                const articleUrl = '';
                const pageName = getPageName(articleUrl);
                expect(pageName).toBe('');
            });
        });

        describe('When passed in an article URL', () => {
            it('The page name method should return just the page name without any extensions', () => {
                const articleUrl =
                    'http://localhost:4502/content/www/us/en/insights/5-digital-trends-for-financial-marketers.html';
                const pageName = getPageName(articleUrl);
                expect(pageName).toBe('5-digital-trends-for-financial-marketers');
            });
        });

        describe('When passed in a relative path URL', () => {
            it('The page name method should return just the page name without any extensions', () => {
                const articleUrl =
                    '/content/www/us/en/insights/5-digital-trends-for-financial-marketers.html';
                const pageName = getPageName(articleUrl);
                expect(pageName).toBe('5-digital-trends-for-financial-marketers');
            });
        });
    });

    describe('Testing Should Show Video Url Method', () => {
        describe('When passed in a valid prop object', () => {
            it('The tag should be shown flag returns true', () => {
                const props = {
                    video: {
                        url: 'https://video.tv.adobe.com/v/22288?autoplay=true&quality=9',
                    },
                };
                const showVideoUrl = shouldShowVideoUrl(props);
                expect(showVideoUrl).toBe(true);
            });
        });

        describe('Whenever the video.url property is missing', () => {
            it('The tag should be shown flag returns false', () => {
                const props = {
                    video: {
                        policy: 'fullscreen auto',
                    },
                };
                const showVideoUrl = shouldShowVideoUrl(props);
                expect(showVideoUrl).toBe(false);
            });
        });

        describe('When passed in an empty prop object', () => {
            it('The tag should be shown flag returns false', () => {
                const props = {};
                const showVideoUrl = shouldShowVideoUrl(props);
                expect(showVideoUrl).toBe(false);
            });
        });
    });
});
