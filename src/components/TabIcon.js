import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

const DEFAULT_OFFSET = -1.5;

/** Bottom-tab icon tinted by the navigator. */
export default function TabIcon({ source, size, offset, tintColor }) {
  return <Image source={source} style={{ width: size, height: size, tintColor, marginTop: offset }} />;
}

TabIcon.propTypes = {
  source: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  offset: PropTypes.number,
  tintColor: PropTypes.string,
};

TabIcon.defaultProps = { offset: DEFAULT_OFFSET, tintColor: undefined };

/** Factory returning a react-navigation `tabBarIcon` renderer. */
export const createTabIcon = (source, size, offset) => ({ tintColor }) => (
  <TabIcon source={source} size={size} offset={offset} tintColor={tintColor} />
);
