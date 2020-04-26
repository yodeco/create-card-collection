import React from 'react';
import PropTypes from 'prop-types';

/** Class representing the UI for the Spectrum Accordion. */
export default class titleCard extends React.Component {
    static propTypes = {
        wide: PropTypes.string,
        imageSize: PropTypes.string,
        imageVerticalAlignment: PropTypes.string,
        imageHorizontalAlignment: PropTypes.string,
        verticalAlignment: PropTypes.string,
        imageAlt: PropTypes.string,
        backgroundImageUrl: PropTypes.string,
        iconPath: PropTypes.string,
        descriptionColor: PropTypes.string,
        titleColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        description: PropTypes.string,
        title: PropTypes.string,
    };

    static defaultProps = {
        wide: '',
        imageSize: '',
        imageVerticalAlignment: '50%',
        imageHorizontalAlignment: '50%',
        verticalAlignment: '',
        imageAlt: '',
        backgroundImageUrl: '',
        iconPath: '',
        descriptionColor: '',
        titleColor: '',
        backgroundColor: '',
        description: '',
        title: '',
    };

    render() {
        return (
            <div
                className={`card card_static ${this.props.wide}`}
                style={{ backgroundColor: this.props.backgroundColor }}>
                <div
                    style={{
                        justifyContent: this.props.verticalAlignment,
                        backgroundSize: this.props.imageSize,
                        backgroundPosition: `${this.props.imageHorizontalAlignment} ${this.props.imageVerticalAlignment}`,
                        backgroundImage: `url(${this.props.backgroundImageUrl})`,
                    }}
                    className="card_img card_bg">
                    <img
                        className="card_icon"
                        src={this.props.iconPath}
                        alt={this.props.imageAlt} />
                    <h1
                        className="card_title"
                        style={{ color: this.props.titleColor }}>
                        {this.props.title}
                    </h1>
                    <p
                        style={{ color: this.props.descriptionColor }}
                        className="card_description">
                        {this.props.description}
                    </p>
                </div>
            </div>
        );
    }
}
