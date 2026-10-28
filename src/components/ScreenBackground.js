import React from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, StyleSheet } from 'react-native';

const SOURCES = {
  default: require('../assets/images/background.jpg'),
  plain: require('../assets/images/background-plain.jpg'),
};

/** Full-screen background image. */
export default function ScreenBackground({ variant, children }) {
  return (
    <ImageBackground style={styles.fill} resizeMode="stretch" source={SOURCES[variant]}>
      {children}
    </ImageBackground>
  );
}

ScreenBackground.propTypes = {
  variant: PropTypes.oneOf(['default', 'plain']),
  children: PropTypes.node,
};

ScreenBackground.defaultProps = { variant: 'default', children: null };

const styles = StyleSheet.create({ fill: { width: '100%', height: '100%', flex: 1 } });
