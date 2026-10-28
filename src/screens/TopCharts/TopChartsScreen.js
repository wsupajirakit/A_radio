import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ChartRow, PickerListLayout } from '../../components';
import { STRINGS } from '../../constants';
import { useTopCharts } from '../../hooks';
import { colors, spacing, typography } from '../../theme';

/** Weekly top chart with a date picker. */
export default function TopChartsScreen() {
  const { dates, selected, select, songs, loading, error, reload } = useTopCharts();

  return (
    <PickerListLayout
      title={STRINGS.topChartsTitle}
      picker={{ data: dates, placeholder: STRINGS.pickDate, selectedKey: selected, onChange: select }}
      status={{ loading, error, empty: !loading && songs.length === 0, onRetry: reload }}
    >
      {songs.map((song, index) => (
        <ChartRow key={`${song.num}-${index}`} song={song} />
      ))}
      <View style={styles.legend}>
        <Text style={styles.legendText}>{STRINGS.chartLegend}</Text>
      </View>
    </PickerListLayout>
  );
}

const styles = StyleSheet.create({
  legend: { marginHorizontal: spacing.lg, marginTop: spacing.xxl },
  legendText: { color: colors.white, fontSize: typography.small },
});
