import React from 'react';
import { PickerListLayout, ProgramCard } from '../../components';
import { STRINGS, WEEKDAYS } from '../../constants';
import { useRadioPrograms } from '../../hooks';

const DAY_OPTIONS = WEEKDAYS.map((label, key) => ({ key, label }));

/** Programme schedule, one weekday at a time. */
export default function ScheduleScreen() {
  const { day, setDay, programs, loading, error, reload } = useRadioPrograms();

  return (
    <PickerListLayout
      title={STRINGS.scheduleTitle}
      picker={{
        data: DAY_OPTIONS,
        placeholder: STRINGS.pickDay,
        selectedKey: day,
        onChange: setDay,
      }}
      status={{ loading, error, empty: !loading && programs.length === 0, onRetry: reload }}
    >
      {programs.map((program, index) => (
        <ProgramCard key={`${program.time.start}-${index}`} program={program} />
      ))}
    </PickerListLayout>
  );
}
