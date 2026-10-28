import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import { STRINGS } from '../constants';
import { colors, spacing, typography } from '../theme';

/** Dark pill button used to close modals. */
export default function CloseButton({ onPress, label }) {
  return (
    <Button style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </Button>
  );
}

CloseButton.propTypes = { onPress: PropTypes.func.isRequired, label: PropTypes.string };
CloseButton.defaultProps = { label: STRINGS.close };

const styles = StyleSheet.create({
  button: { backgroundColor: colors.buttonDark, paddingHorizontal: spacing.xl },
  label: { fontSize: typography.button, color: colors.accent },
});
