import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Header, Text } from 'native-base';
import { colors, typography } from '../theme';

/** Centered title bar used by list screens. */
export default function PageHeader({ title }) {
  return (
    <Header style={styles.header}>
      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Header>
  );
}

PageHeader.propTypes = { title: PropTypes.string.isRequired };

const styles = StyleSheet.create({
  header: { backgroundColor: colors.primary },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { color: colors.white, fontSize: typography.header },
});
