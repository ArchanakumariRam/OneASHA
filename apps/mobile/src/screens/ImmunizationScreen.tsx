import React from 'react';
import GenericFormScreen from '../components/GenericFormScreen';

export default function ImmunizationScreen() {
  return (
    <GenericFormScreen
      title="Immunization Record"
      icon="💉"
      storageKey="@offline_immunizations"
      fields={[
        { label: "Child's Name *", key: 'childName', placeholder: 'e.g. Aarav Kumar' },
        { label: "Child's Age (months) *", key: 'ageMonths', placeholder: 'e.g. 9', type: 'numeric' },
        { label: "Mother's Name", key: 'motherName', placeholder: 'e.g. Sunita Devi' },
        { label: 'Vaccine Administered *', key: 'vaccine', placeholder: 'e.g. OPV-1, BCG, Pentavalent-2' },
        { label: 'Date of Vaccination', key: 'date', placeholder: 'YYYY-MM-DD' },
        { label: 'Next Due Vaccine', key: 'nextVaccine', placeholder: 'e.g. OPV-2' },
        { label: 'Next Due Date', key: 'nextDate', placeholder: 'YYYY-MM-DD' },
        { label: 'Notes / Adverse Reactions', key: 'notes', placeholder: 'Any reactions observed...', type: 'textarea' },
      ]}
    />
  );
}
