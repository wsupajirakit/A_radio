import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { colors, radii } from '../theme';

/** White rounded picker built on ModalSelector. */
export default function SelectField({ data, placeholder, selectedKey, onChange }) {
  const selected = data.find((item) => item.key === selectedKey);
  return (
    <View style={styles.box}>
      <ModalSelector
        data={data}
        initValue={selected ? selected.label : placeholder}
        onChange={(item) => onChange(item.key)}
        selectStyle={styles.select}
      />
    </View>
  );
}

const keyType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

SelectField.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ key: keyType.isRequired, label: PropTypes.string.isRequired }),
  ),
  placeholder: PropTypes.string.isRequired,
  selectedKey: keyType,
  onChange: PropTypes.func.isRequired,
};

SelectField.defaultProps = { data: [], selectedKey: null };

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 40,
    marginTop: '1%',
    backgroundColor: colors.white,
    borderRadius: radii.lg,
  },
  select: { borderColor: colors.transparent },
});
