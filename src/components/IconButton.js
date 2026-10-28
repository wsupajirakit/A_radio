import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';

/** Tappable image icon. */
export default function IconButton({ source, size, tintColor, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={source} style={[{ width: size, height: size, tintColor }, style]} />
    </TouchableOpacity>
  );
}

IconButton.propTypes = {
  source: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
  size: PropTypes.number.isRequired,
  tintColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
};

IconButton.defaultProps = { tintColor: undefined, style: undefined };
