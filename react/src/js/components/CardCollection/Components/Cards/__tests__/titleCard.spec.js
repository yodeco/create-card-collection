import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16/build/index';
import React from 'react';
import toJson from 'enzyme-to-json';
import { setTitleCardProps } from '../../../Utilities/CardUtils';
import TitleCard from '../titleCard';

Enzyme.configure({ adapter: new Adapter() });

describe('Title Card Tests', () => {
    describe('When the title card is passed in all empty strings for props', () => {
        it('all props correctly set to the empty string in the outputted HTML', () => {
            const wrapper = shallow(<TitleCard
                wide=""
                width={1}
                customImageSize=""
                imageSize=""
                imageVerticalAlignment=""
                imageHorizontalAlignment=""
                verticalAlignment=""
                imageAlt=""
                backgroundImageUrl=""
                iconPath=""
                descriptionColor=""
                titleColor=""
                backgroundColor=""
                description=""
                title="" />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    describe('If the card collection passes an empty prop object to a title card', () => {
        it('The horizontal image alignment is defaulted to 50%', () => {
            const cardCollectionPropsObj = {};
            const titleCardPropsObj = {};

            setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);
            expect(titleCardPropsObj.imageHorizontalAlignment).toBe('50%');
        });

        it('The vertical image alignment is defaulted to 50%', () => {
            const cardCollectionPropsObj = {};
            const titleCardPropsObj = {};

            setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);
            expect(titleCardPropsObj.imageVerticalAlignment).toBe('50%');
        });

        it('The title is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const titleCardPropsObj = {};

            setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);
            expect(titleCardPropsObj.articleTitle).toBe('');
        });

        it('The description is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const titleCardPropsObj = {};

            setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);
            expect(titleCardPropsObj.articleDescription).toBe('');
        });

        it('The background color is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const titleCardPropsObj = {};

            setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);
            expect(titleCardPropsObj.backgroundColor).toBe('');
        });

        it('The title color is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const titleCardPropsObj = {};

            setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);
            expect(titleCardPropsObj.titleColor).toBe('');
        });

        it('The description color is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const titleCardPropsObj = {};

            setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);
            expect(titleCardPropsObj.descriptionColor).toBe('');
        });

        it('The icon path is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const titleCardPropsObj = {};

            setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);
            expect(titleCardPropsObj.iconPath).toBe('');
        });

        it('The background image url is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const titleCardPropsObj = {};

            setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);
            expect(titleCardPropsObj.backgroundImageUrl).toBe('');
        });

        it('The image alt text is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const titleCardPropsObj = {};

            setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);
            expect(titleCardPropsObj.imageAlt).toBe('');
        });

        it('The vertical alignment is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const titleCardPropsObj = {};

            setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);
            expect(titleCardPropsObj.verticalAlignment).toBe('');
        });

        it('The custom image size flag is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const titleCardPropsObj = {};

            setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);
            expect(titleCardPropsObj.customImageSize).toBe('');
        });

        it('The wide class flag is defaulted to the empty string', () => {
            const cardCollectionPropsObj = {};
            const titleCardPropsObj = {};

            setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);
            expect(titleCardPropsObj.wide).toBe('');
        });

        it('The image size defaults to the empty string', () => {
            const cardCollectionPropsObj = {};
            const titleCardPropsObj = {};

            setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);
            expect(titleCardPropsObj.imageSize).toBe('');
        });

        it('The width of the card defaults to 1', () => {
            const cardCollectionPropsObj = {};
            const titleCardPropsObj = {};

            setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);
            expect(titleCardPropsObj.width).toBe(1);
        });
    });

    describe('The title is set to', () => {
        describe('Insights', () => {
            it('The h1 is populated with insights', () => {
                const cardCollectionPropsObj = { article: { title: 'Insights' } };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('A Japanese String', () => {
            it('The h1 is populated with the Japanese String', () => {
                const cardCollectionPropsObj = { article: { title: 'のダウンロード' } };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('The description is set to', () => {
        describe('A long string', () => {
            it('The p tag is populated with this long string', () => {
                const cardCollectionPropsObj = {
                    article: {
                        description: 'Here we explore what it takes to make experience your business.' +
                        ' It’s more than technology. It’s vision and imagination. Strategy and guts. ' +
                        'And in these articles we dig into all. Enjoy.',
                    },
                };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('A long Japanese string', () => {
            it('The p tag is populated with this long Japanese string', () => {
                const cardCollectionPropsObj = {
                    article: {
                        description: 'ここからAdobe IDでログインしてお問い合わせ内容を選択すると、' +
                        'チャットや電話サポートへご案内します',
                    },
                };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('The icon path is set to', () => {
        describe('A path to an JPG', () => {
            it('The img src is updated to point to this', () => {
                const cardCollectionPropsObj = {
                    iconPath:
                        '/content/dam/www/us/en/insights/15-mind-blowing-stats-about-the-future-of-advertising/' +
                        'future_of_advertising_marquee_1440x600.jpg',
                };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('An empty string', () => {
            it('The img src the image source attribute is not written out', () => {
                const cardCollectionPropsObj = {
                    iconPath: '',
                };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('The image alt text is set to', () => {
        describe('A long string', () => {
            it('The image alt tag is populated with this long string', () => {
                const cardCollectionPropsObj = {
                    imageAlt: 'Here we explore what it takes to make experience your business.' +
                    ' It’s more than technology. It’s vision and imagination. Strategy and guts. ' +
                    'And in these articles we dig into all. Enjoy.',
                };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('A long Japanese string', () => {
            it('The image alt tag is populated with this long Japanese string', () => {
                const cardCollectionPropsObj = {
                    imageAlt: 'ここからAdobe IDでログインしてお問い合わせ内容を選択すると、' +
                    'チャットや電話サポートへご案内します',
                };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
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
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('The title color is set to', () => {
        describe('A hexadecimal value', () => {
            it('The h1 uses this background color', () => {
                const cardCollectionPropsObj = {
                    styles: {
                        titleColor: '#D83790',
                    },
                };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
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
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
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
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('When the width of the card is 1', () => {
            it('The wide class is NOT added to the parent div', () => {
                const cardCollectionPropsObj = {
                    width: 1,
                };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('When the width of the card is 3', () => {
            it('The wide class is NOT added to the parent div, because this is an unsupported feature', () => {
                const cardCollectionPropsObj = {
                    width: 3,
                };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('When the width of the card is null', () => {
            it('This fails an equality check and the wide class is NOT added to the parent div', () => {
                const cardCollectionPropsObj = {
                    width: null,
                };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('When the content vertical alignment is set ', () => {
        describe('To default', () => {
            it('justify content is set to stretch', () => {
                const cardCollectionPropsObj = { styles: { contentVerticalAlignment: 'stretch' } };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('To top', () => {
            it('justify content is set to flex-start', () => {
                const cardCollectionPropsObj = { styles: { contentVerticalAlignment: 'flex-start' } };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('To middle', () => {
            it('justify content is set to center', () => {
                const cardCollectionPropsObj = { styles: { contentVerticalAlignment: 'center' } };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('To bottom', () => {
            it('justify content is set to flex-end', () => {
                const cardCollectionPropsObj = { styles: { contentVerticalAlignment: 'flex-end' } };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('When the background image size is set ', () => {
        describe('To cover', () => {
            it('the background size is set to cover', () => {
                const cardCollectionPropsObj = { styles: { imageSize: 'cover' } };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('To contain', () => {
            it('the background size is set to contain', () => {
                const cardCollectionPropsObj = { styles: { imageSize: 'contain' } };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('To a custom size', () => {
            it('the background size is set to that custom size', () => {
                const cardCollectionPropsObj = { styles: { imageSize: '1000' } };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('When the background image horizontal alignment ', () => {
        describe('To left', () => {
            it('the horizontal alignment is set to the left', () => {
                const cardCollectionPropsObj = { styles: { imageHorizontalAlignment: 'left' } };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('To center', () => {
            it('the horizontal alignment is set to the center', () => {
                const cardCollectionPropsObj = { styles: { imageHorizontalAlignment: 'center' } };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('To right', () => {
            it('the horizontal alignment is set to the right', () => {
                const cardCollectionPropsObj = { styles: { imageHorizontalAlignment: 'right' } };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });

    describe('When the background image vertical alignment ', () => {
        describe('To top', () => {
            it('the vertical alignment is set to the top', () => {
                const cardCollectionPropsObj = { styles: { imageVerticalAlignment: 'top' } };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('To middle', () => {
            it('the vertical alignment is set to the center', () => {
                const cardCollectionPropsObj = { styles: { imageVerticalAlignment: 'center' } };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('To bottom', () => {
            it('the vertical alignment is set to the bottom', () => {
                const cardCollectionPropsObj = { styles: { imageVerticalAlignment: 'bottom' } };
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
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
                const titleCardPropsObj = {};

                setTitleCardProps(cardCollectionPropsObj, titleCardPropsObj);

                const wrapper = shallow(<TitleCard
                    {...titleCardPropsObj} />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });
    });
});

