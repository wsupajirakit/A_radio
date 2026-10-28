import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, View } from 'react-native';
import { spacing } from '../theme';
import PageHeader from './PageHeader';
import ScreenBackground from './ScreenBackground';
import SelectField from './SelectField';
import StatusView from './StatusView';

const BOTTOM_SPACE = 200;

/** Shared layout for list screens: header, picker, status and a scrolling list. */
export default function PickerListLayout({ title, picker, status, children }) {
  return (
    <ScreenBackground variant="plain">
      <PageHeader title={title} />
      <View style={styles.body}>
        <View style={styles.pickerRow}>
          <SelectField {...picker} />
        </View>
        <View style={styles.listArea}>
          <ScrollView contentContainerStyle={styles.content}>
            <StatusView {...status} />
            {children}
          </ScrollView>
        </View>
      </View>
    </ScreenBackground>
  );
}

PickerListLayout.propTypes = {
  title: PropTypes.string.isRequired,
  picker: PropTypes.shape(SelectField.propTypes).isRequired,
  status: PropTypes.shape(StatusView.propTypes).isRequired,
  children: PropTypes.node,
};

PickerListLayout.defaultProps = { children: null };

const styles = StyleSheet.create({
  body: { flex: 1, marginTop: '1%' },
  pickerRow: { marginHorizontal: spacing.gutter, marginTop: '3%' },
  listArea: { flex: 1, marginHorizontal: spacing.gutter, marginTop: '1%' },
  content: { paddingBottom: BOTTOM_SPACE },
});
