import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ContactRow, ScreenBackground, StatusView } from '../../components';
import { ICON_SIZES, STRINGS } from '../../constants';
import { usePlayerInfo } from '../../hooks';
import { colors, spacing } from '../../theme';
import { mailUrl, mapUrl, openUrl, telUrl } from '../../utils';

const { height } = Dimensions.get('window');
const FONT = { body: height / 42, address: height / 50, policy: height / 52 };

/** Station logo, e-mail, phone, address and the platform privacy policy. */
export default function ContactScreen() {
  const { info, loading, error, reload } = usePlayerInfo();
  const privacyUrl =
    Platform.OS === 'android' ? info.privacyPolicy.android : info.privacyPolicy.ios;

  return (
    <ScreenBackground>
      <View style={styles.page}>
        <View style={styles.logoArea}>
          {info.logo ? <Image style={styles.logo} source={{ uri: info.logo }} /> : null}
          <StatusView loading={loading} error={error} onRetry={reload} />
        </View>
        <View style={styles.details}>
          <ContactRow
            icon="paper-plane"
            iconSize={ICON_SIZES.contactMail}
            fontSize={FONT.body}
            text={info.email}
            onPress={() => openUrl(mailUrl(info.email))}
          />
          <ContactRow
            icon="phone"
            iconSize={ICON_SIZES.contact}
            fontSize={FONT.body}
            text={info.phone}
            onPress={() => openUrl(telUrl(info.phone))}
          />
          <ContactRow
            icon="map-pin"
            iconSize={ICON_SIZES.contact}
            fontSize={FONT.address}
            text={info.address}
            onPress={() => openUrl(mapUrl(info.address))}
          />
          <TouchableOpacity style={styles.policy} onPress={() => openUrl(privacyUrl)}>
            <Text style={styles.policyText}>{STRINGS.privacyPolicy}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, margin: '5%' },
  logoArea: { height: '40%', justifyContent: 'center', alignItems: 'center', marginTop: '2%' },
  logo: { width: 190, height: 150, marginTop: height / 10, alignSelf: 'center' },
  details: { margin: spacing.md, height: '50%', marginTop: '10%' },
  policy: { marginTop: '10%', alignItems: 'center' },
  policyText: { fontSize: FONT.policy, color: colors.muted },
});
