import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

const checkIcon = require('./circle-check.png');

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
  },
});

class ImageItem extends Component {
  constructor(props) {
    super(props);

    let { width } = Dimensions.get('window');
    const { imageMargin, imagesPerRow, containerWidth, imageBorderColor } = this.props;

    if (typeof containerWidth !== 'undefined') {
      width = containerWidth;
    }
    
    const borderMargin = imageBorderColor ? 2 : 0;  // 마진이 있는 경우 (좌우 1px씩 추가)
    this.imageSize = (width - (imagesPerRow + 1) * (imageMargin + borderMargin)) / imagesPerRow;
  }

  handleClick(item) {
    this.props.onClick(item);
  }

  render() {
    const {
      item, selected, selectedMarker, imageMargin, imageBorderColor
    } = this.props;

    const imageBorder = imageBorderColor ? {borderStyle: 'solid', borderWidth: 1, borderColor: imageBorderColor} : undefined;

    const marker = selectedMarker || (<Image
      style={[styles.marker, { width: 25, height: 25 }]}
      source={checkIcon}
    />);

    const { image, type } = item.node;

    return (
      <TouchableOpacity
        activeOpacity={1}                              
        style={{ ...imageBorder, marginBottom: imageMargin, marginRight: imageMargin }}
        onPress={() => this.handleClick({...image, type})}
      >
        <Image
          source={{ uri: image.uri }}
          style={{ height: this.imageSize, width: this.imageSize }}
        />
        {(selected) ? marker : null}
      </TouchableOpacity>
    );
  }
}

ImageItem.defaultProps = {
  item: {},
  selected: false,
};

ImageItem.propTypes = {
  item: PropTypes.object,
  selected: PropTypes.bool,
  selectedMarker: PropTypes.element,
  imageMargin: PropTypes.number,
  imagesPerRow: PropTypes.number,
  onClick: PropTypes.func,
};

export default ImageItem;
