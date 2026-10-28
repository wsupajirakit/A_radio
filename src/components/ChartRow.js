import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import { STRINGS } from '../constants';
import { colors, spacing, typography } from '../theme';

/** One song in the top chart. */
export default function ChartRow({ song }) {
  const { num, name, artists, lastChartNum, onChartLong } = song;
  const weeks = onChartLong ? `   ${STRINGS.weeksOnChartMark} ${onChartLong}` : '';
  return (
    <View style={styles.row}>
      <View style={styles.rankCol}>
        <Text style={styles.rank}>{num}</Text>
      </View>
      <View style={styles.infoCol}>
        <View style={styles.titleLine}>
          <View style={styles.titleCol}>
            <Text style={styles.song}>{name}</Text>
          </View>
          <View style={styles.statsCol}>
            {lastChartNum ? (
              <Text style={styles.small}>{`${STRINGS.lastWeekMark} ${lastChartNum}${weeks}`}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.artistCol}>
          <Text style={styles.small}>{artists}</Text>
        </View>
      </View>
    </View>
  );
}

ChartRow.propTypes = {
  song: PropTypes.shape({
    num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    artists: PropTypes.string,
    lastChartNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChartLong: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

const text = { textAlignVertical: 'center', textAlign: 'left', color: colors.white };

const styles = StyleSheet.create({
  row: { flex: 1, flexDirection: 'row', marginTop: '3%' },
  rankCol: { flex: 0.5, marginTop: '1.3%' },
  rank: { ...text, textAlign: 'center', fontSize: typography.rank },
  infoCol: { flex: 3 },
  titleLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: spacing.md,
  },
  titleCol: { flex: 3 },
  statsCol: { flex: 1.5 },
  song: { ...text, fontSize: typography.title },
  small: { ...text, fontSize: typography.caption },
  artistCol: { width: 200 },
});
