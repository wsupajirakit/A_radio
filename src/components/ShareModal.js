import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { APP_NAME, SHARE_URL } from '../config';
import { STRINGS } from '../constants';
import { colors, typography } from '../theme';
import { openUrl } from '../utils';
import CloseButton from './CloseButton';

const facebookShareUrl = () =>
  `https://www.facebook.com/share.php?u=${encodeURIComponent(SHARE_URL)}`;
const tweetUrl = () =>
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(APP_NAME)}&url=${encodeURIComponent(
    SHARE_URL,
  )}`;

const BUTTON_WIDTH_RATIO = 1 / 1.45;
const GAP = 18;

/** Share sheet (Facebook / Twitter) for the station page. */
export default function ShareModal({ visible, title, onClose }) {
  return (
    <Modal isVisible={visible}>
      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.buttons}>
          <SocialIcon
            title={STRINGS.shareFacebook}
            button
            type="facebook"
            onPress={() => openUrl(facebookShareUrl())}
          />
          <SocialIcon
            title={STRINGS.shareTwitter}
            button
            type="twitter"
            onPress={() => openUrl(tweetUrl())}
          />
        </View>
        <View style={styles.close}>
          <CloseButton onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

ShareModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

ShareModal.defaultProps = { title: '' };

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.white, fontSize: typography.title },
  buttons: { marginTop: GAP, width: Dimensions.get('window').width * BUTTON_WIDTH_RATIO },
  close: { marginTop: GAP },
});
