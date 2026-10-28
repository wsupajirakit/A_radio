import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, spacing } from '../theme';

/** Icon plus tappable text (e-mail, phone, address). */
export default function ContactRow({ icon, iconSize, text, fontSize, onPress }) {
  return (
    <View style={styles.row}>
      <View style={styles.iconCol}>
        <Icon name={icon} size={iconSize} color={colors.white} />
      </View>
      <TouchableOpacity style={styles.textCol} onPress={onPress}>
        <Text style={[styles.text, { fontSize }]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

ContactRow.propTypes = {
  icon: PropTypes.string.isRequired,
  iconSize: PropTypes.number.isRequired,
  text: PropTypes.string,
  fontSize: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

ContactRow.defaultProps = { text: '' };

const styles = StyleSheet.create({
  row: { flexDirection: 'row', height: '23%', margin: spacing.sm },
  iconCol: { flex: 1, marginLeft: spacing.md },
  textCol: { flex: 5, justifyContent: 'center' },
  text: { color: colors.white },
});
