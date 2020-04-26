import React from 'react';
import { If, Then } from 'react-if';
import PropTypes from 'prop-types';

import VideoButton from '../../videoButton';

/** Class representing the UI for the Spectrum Accordion. */
export default class standardCard extends React.Component {
    static propTypes = {
        pageName: PropTypes.string,
        showVideoButton: PropTypes.bool,
        backgroundImageUrl: PropTypes.string,
        backgroundColor: PropTypes.string,
        titleColor: PropTypes.string,
        tagColor: PropTypes.string,
        tagUrl: PropTypes.string,
        tagTitle: PropTypes.string,
        showTagLabel: PropTypes.bool,
        articleTitle: PropTypes.string,
        articleUrl: PropTypes.string,
        videoUrl: PropTypes.string,
        videoPolicy: PropTypes.string,
        byAuthor: PropTypes.string,
    };

    static defaultProps = {
        pageName: '',
        showVideoButton: false,
        backgroundImageUrl: '',
        backgroundColor: '',
        titleColor: '',
        tagColor: '',
        tagUrl: '',
        tagTitle: '',
        showTagLabel: false,
        articleTitle: '',
        articleUrl: '',
        videoUrl: '',
        videoPolicy: '',
        byAuthor: '',
    };

    render() {
        return (
            <div className="card card_standard">
                <div
                    className="card_img"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${this.props.backgroundImageUrl})`,
                    }}>
                    <a className="card_hero" href={this.props.articleUrl}>
                        <If condition={this.props.showVideoButton}>
                            <Then>
                                <VideoButton
                                    name={this.props.pageName}
                                    videoUrl={this.props.videoUrl}
                                    videoPolicy={this.props.videoPolicy} />
                            </Then>
                        </If>
                    </a>
                    <If condition={this.props.showTagLabel}>
                        <Then>
                            <div className="tag_label" style={{ backgroundColor: this.props.tagColor }}>
                                <a href={this.props.tagUrl}>
                                    {this.props.tagTitle}
                                </a>
                            </div>
                        </Then>
                    </If>
                </div>
                <div className="card_bg" style={{ backgroundColor: this.props.backgroundColor }}>
                    <h2 className="card_title" style={{ color: this.props.titleColor }}>
                        <a href={this.props.articleUrl}>{this.props.articleTitle}</a>
                    </h2>
                    <h4 className="card_author">{this.props.byAuthor}</h4>
                </div>
            </div>
        );
    }
}

