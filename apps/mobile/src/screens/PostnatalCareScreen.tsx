import React from 'react';
import GenericFormScreen from '../components/GenericFormScreen';

export default function PostnatalCareScreen() {
  return (
    <GenericFormScreen
      title="Postnatal Care (PNC)"
      icon="👶"
      storageKey="@offline_pnc"
      fields={[
        { label: "Mother's Name *", key: 'motherName', placeholder: 'e.g. Rani Kumari' },
        { label: "Baby's Name", key: 'babyName', placeholder: 'e.g. Baby of Rani' },
        { label: 'Date of Delivery', key: 'deliveryDate', placeholder: 'YYYY-MM-DD' },
        { label: 'PNC Visit Number', key: 'visitNo', placeholder: 'e.g. 1st (within 48h), 2nd (day 3-7)' },
        { label: "Baby's Weight (kg)", key: 'babyWeight', placeholder: 'e.g. 2.8', type: 'numeric' },
        { label: 'Breastfeeding Status', key: 'breastfeeding', placeholder: 'Exclusive / Partial / Not started' },
        { label: "Mother's Condition", key: 'motherCondition', placeholder: 'Good / Moderate / Critical' },
        { label: 'Bleeding (Lochia)', key: 'bleeding', placeholder: 'Normal / Excessive' },
        { label: 'Vitamin A Supplementation', key: 'vitA', placeholder: 'Given / Not given' },
        { label: 'BCG & OPV-0 Status', key: 'vaccines', placeholder: 'Given / Pending' },
        { label: 'Additional Notes', key: 'notes', placeholder: 'Any observations...', type: 'textarea' },
      ]}
    />
  );
}
