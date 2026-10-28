import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { STRINGS } from '../constants';
import { colors, spacing, typography } from '../theme';

/**
 * The one loading / error / empty pattern used by every screen.
 * Renders nothing when there is content to show.
 */
export default function StatusView({ loading, error, empty, onRetry }) {
  if (error) {
    return (
      <TouchableOpacity onPress={onRetry} disabled={!onRetry} style={styles.box}>
        <Text style={styles.text}>{STRINGS.loadError}</Text>
      </TouchableOpacity>
    );
  }
  if (loading) {
    return (
      <View style={styles.box}>
        <ActivityIndicator color={colors.white} />
      </View>
    );
  }
  if (empty) {
    return (
      <View style={styles.box}>
        <Text style={styles.text}>{STRINGS.empty}</Text>
      </View>
    );
  }
  return null;
}

StatusView.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  empty: PropTypes.bool,
  onRetry: PropTypes.func,
};

StatusView.defaultProps = { loading: false, error: null, empty: false, onRetry: undefined };

const styles = StyleSheet.create({
  box: { padding: spacing.md, alignItems: 'center' },
  text: { color: colors.white, fontSize: typography.small },
});
