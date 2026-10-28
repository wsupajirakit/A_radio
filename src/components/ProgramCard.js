import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text, Thumbnail } from 'native-base';
import { STRINGS } from '../constants';
import { colors, radii, spacing, typography } from '../theme';

/** One programme slot with its DJs. */
export default function ProgramCard({ program }) {
  const djs = program.dj || [];
  return (
    <View style={styles.card}>
      <Text style={styles.time}>
        {`${STRINGS.timeLabel} : ${program.time.start} - ${program.time.end}`}
      </Text>
      <View style={styles.djRow}>
        {djs.map((dj) => (
          <View key={`${dj.name}-${dj.image}`} style={styles.dj}>
            <Thumbnail source={{ uri: dj.image }} />
            <Text style={styles.djName}>{dj.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

ProgramCard.propTypes = {
  program: PropTypes.shape({
    time: PropTypes.shape({ start: PropTypes.string, end: PropTypes.string }).isRequired,
    dj: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, image: PropTypes.string })),
  }).isRequired,
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.md,
    backgroundColor: colors.card,
    marginTop: spacing.md,
    width: '100%',
    minHeight: 120,
    paddingTop: spacing.xs,
  },
  time: { fontSize: typography.body, color: colors.white, textAlign: 'center' },
  djRow: { flexDirection: 'row', marginTop: spacing.md },
  dj: { marginLeft: spacing.lg, alignItems: 'center' },
  djName: { marginTop: spacing.xs, fontSize: typography.caption, color: colors.white },
});
