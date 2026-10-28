import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View } from 'react-native';
import Slider from 'react-native-slider';
import { ICON_SIZES, PLAYER } from '../constants';
import { colors, radii, spacing } from '../theme';
import IconButton from './IconButton';

const ICONS = {
  play: require('../assets/images/play.jpg'),
  pause: require('../assets/images/pause.png'),
  call: require('../assets/images/tel.png'),
  sms: require('../assets/images/sms.png'),
};

/** Bottom bar: volume slider, call, play/pause and SMS. */
export default function PlayerControls({
  paused,
  volume,
  onTogglePlay,
  onVolumeChange,
  onCall,
  onSms,
}) {
  const controlSize = Dimensions.get('window').width * PLAYER.controlWidthRatio;
  return (
    <View style={styles.bar}>
      <View style={styles.inner}>
        <Slider
          value={volume}
          onValueChange={onVolumeChange}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          minimumTrackTintColor={colors.primary}
        />
      </View>
      <View style={[styles.inner, styles.buttons]}>
        <IconButton
          source={ICONS.call}
          size={ICON_SIZES.call}
          tintColor={colors.white}
          onPress={onCall}
        />
        <IconButton
          source={paused ? ICONS.play : ICONS.pause}
          size={controlSize}
          onPress={onTogglePlay}
        />
        <IconButton
          source={ICONS.sms}
          size={ICON_SIZES.sms}
          tintColor={colors.white}
          onPress={onSms}
        />
      </View>
    </View>
  );
}

PlayerControls.propTypes = {
  paused: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  onTogglePlay: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  onCall: PropTypes.func.isRequired,
  onSms: PropTypes.func.isRequired,
};

const shadow = { shadowColor: colors.black, shadowOffset: { width: 0, height: 1 } };

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    height: '21%',
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  inner: { marginHorizontal: spacing.md, width: '95%' },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  track: {
    ...shadow,
    height: 10,
    borderRadius: radii.sm,
    backgroundColor: colors.white,
    shadowRadius: 1,
    shadowOpacity: 0.15,
  },
  thumb: {
    ...shadow,
    width: 20,
    height: 20,
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryDark,
    borderWidth: 5,
    borderRadius: radii.lg,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
});
