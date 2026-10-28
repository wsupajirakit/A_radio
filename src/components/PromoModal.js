import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { openUrl } from '../utils';
import { spacing } from '../theme';
import CloseButton from './CloseButton';

const IMAGE_SIZE = 350;

/** Promotional popup shown on launch. */
export default function PromoModal({ visible, popup, onClose }) {
  return (
    <Modal isVisible={visible}>
      <View style={styles.center}>
        {popup && popup.image ? (
          <TouchableOpacity onPress={() => openUrl(popup.link)}>
            <Image style={styles.image} resizeMode="cover" source={{ uri: popup.image }} />
          </TouchableOpacity>
        ) : null}
        <View style={styles.close}>
          <CloseButton onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

PromoModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  popup: PropTypes.shape({ image: PropTypes.string, link: PropTypes.string, title: PropTypes.string }),
  onClose: PropTypes.func.isRequired,
};

PromoModal.defaultProps = { popup: null };

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: IMAGE_SIZE, height: IMAGE_SIZE },
  close: { marginTop: spacing.lg },
});
