import React from 'react';
import GenericFormScreen from '../components/GenericFormScreen';

export default function AntenatalCareScreen() {
  return (
    <GenericFormScreen
      title="Antenatal Care (ANC)"
      icon="🤰"
      storageKey="@offline_anc"
      fields={[
        { label: "Mother's Name *", key: 'name', placeholder: 'e.g. Kavita Verma' },
        { label: 'Age', key: 'age', placeholder: 'e.g. 24', type: 'numeric' },
        { label: 'Phone Number', key: 'phone', placeholder: 'e.g. 9876543210', type: 'phone' },
        { label: 'ANC Visit Number', key: 'visitNo', placeholder: 'e.g. 1st, 2nd, 3rd, 4th' },
        { label: 'Gestational Age (weeks)', key: 'gestWeeks', placeholder: 'e.g. 20', type: 'numeric' },
        { label: 'Hemoglobin (Hb) g/dL', key: 'hb', placeholder: 'e.g. 10.5', type: 'numeric' },
        { label: 'Blood Pressure (mmHg)', key: 'bp', placeholder: 'e.g. 120/80' },
        { label: 'Weight (kg)', key: 'weight', placeholder: 'e.g. 58', type: 'numeric' },
        { label: 'High-Risk Indicators', key: 'riskFactor', placeholder: 'e.g. Severe Anemia, High BP, Twins', type: 'textarea' },
        { label: 'TT Vaccination Status', key: 'tt', placeholder: 'TT-1 done / TT-2 due' },
        { label: 'Iron-Folic Acid Tablets Given', key: 'ifa', placeholder: 'e.g. 30 tablets given' },
        { label: 'Next Visit Date', key: 'nextVisit', placeholder: 'YYYY-MM-DD' },
        { label: 'Additional Notes', key: 'notes', placeholder: 'Any observations...', type: 'textarea' },
      ]}
    />
  );
}
