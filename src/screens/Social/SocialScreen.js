import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { ScreenBackground, ShareModal, StatusView } from '../../components';
import { SOCIAL_NETWORKS, STRINGS } from '../../constants';
import { usePlayerInfo } from '../../hooks';
import { colors, spacing, typography } from '../../theme';
import { openUrl } from '../../utils';

const LINK_HEIGHT = 48;

/** Website and social links; tapping the logo opens the share sheet. */
export default function SocialScreen() {
  const { info, loading, error, reload } = usePlayerInfo();
  const [shareVisible, setShareVisible] = useState(false);

  return (
    <ScreenBackground>
      <ShareModal visible={shareVisible} title={info.appTitle} onClose={() => setShareVisible(false)} />
      <View style={styles.page}>
        <View style={styles.logoArea}>
          <TouchableOpacity onPress={() => setShareVisible(true)}>
            {info.logo ? <Image style={styles.logo} source={{ uri: info.logo }} /> : null}
          </TouchableOpacity>
          <StatusView loading={loading} error={error} onRetry={reload} />
        </View>
        <View style={styles.links}>
          <SocialIcon
            button
            light
            style={styles.link}
            fontStyle={[styles.linkText, styles.websiteText]}
            title={STRINGS.websitePrefix + info.webName}
            onPress={() => openUrl(info.website)}
          />
          {SOCIAL_NETWORKS.map((network) => {
            const entry = info.social[network] || {};
            return (
              <SocialIcon
                key={network}
                button
                type={network}
                style={styles.link}
                fontStyle={styles.linkText}
                title={entry.name || ''}
                onPress={() => openUrl(entry.url)}
              />
            );
          })}
        </View>
      </View>
    </ScreenBackground>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  page: { flex: 1, margin: '5%' },
  logoArea: { height: '30%', justifyContent: 'center', alignItems: 'center', marginTop: '2%' },
  logo: { width: 165, height: 125, marginTop: height / 9, alignSelf: 'center' },
  links: { marginTop: '8%', width: '80%', alignSelf: 'center' },
  link: { height: LINK_HEIGHT },
  linkText: { color: colors.white, fontSize: typography.label },
  websiteText: { color: colors.black },
});
