import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import { PlayerControls, PromoModal, ScreenBackground, StatusView } from '../../components';
import { STREAM_URL } from '../../config';
import { PLAYER } from '../../constants';
import { usePlayerInfo } from '../../hooks';
import { openUrl, smsUrl, telUrl } from '../../utils';

const LOGO_SIZE = 225;

/** Live stream player with a promo popup. */
export default function HomeScreen() {
  const { info, loading, error, reload } = usePlayerInfo();
  const [paused, setPaused] = useState(false);
  const [volume, setVolume] = useState(PLAYER.defaultVolume);
  const [promoVisible, setPromoVisible] = useState(true);

  return (
    <ScreenBackground>
      <PromoModal
        visible={promoVisible}
        popup={info.popup}
        onClose={() => setPromoVisible(false)}
      />
      <View style={styles.container}>
        <Video
          source={{ uri: info.streamUrl || STREAM_URL }}
          paused={paused}
          volume={volume}
          playInBackground
          playWhenInactive
          disableFocus
          ignoreSilentSwitch="ignore"
          style={styles.hiddenVideo}
          onAudioBecomingNoisy={() => setPaused(true)}
          onAudioFocusChanged={({ hasAudioFocus }) => !hasAudioFocus && setPaused(true)}
        />
        {info.logo ? <Image style={styles.logo} source={{ uri: info.logo }} /> : null}
        <StatusView loading={loading} error={error} onRetry={reload} />
        <PlayerControls
          paused={paused}
          volume={volume}
          onTogglePlay={() => setPaused(!paused)}
          onVolumeChange={setVolume}
          onCall={() => openUrl(telUrl(info.phone))}
          onSms={() => openUrl(smsUrl(info.smsNumber))}
        />
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hiddenVideo: { width: 1, height: 1 },
  logo: { width: LOGO_SIZE, height: LOGO_SIZE, alignSelf: 'center' },
});
