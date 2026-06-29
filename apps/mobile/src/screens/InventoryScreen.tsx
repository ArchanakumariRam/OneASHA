import React from 'react';
import GenericFormScreen from '../components/GenericFormScreen';

export default function InventoryScreen() {
  return (
    <GenericFormScreen
      title="Medicine Kit Inventory"
      icon="💊"
      storageKey="@offline_inventory"
      fields={[
        { label: 'Report Date', key: 'date', placeholder: 'YYYY-MM-DD' },
        { label: 'Iron-Folic Acid Tablets (remaining)', key: 'ifa', placeholder: 'e.g. 120 tablets', type: 'numeric' },
        { label: 'ORS Packets (remaining)', key: 'ors', placeholder: 'e.g. 15 packets', type: 'numeric' },
        { label: 'Calcium Tablets (remaining)', key: 'calcium', placeholder: 'e.g. 60 tablets', type: 'numeric' },
        { label: 'Paracetamol Tablets (remaining)', key: 'paracetamol', placeholder: 'e.g. 30 tablets', type: 'numeric' },
        { label: 'Chlorine Tablets (remaining)', key: 'chlorine', placeholder: 'e.g. 20 tablets', type: 'numeric' },
        { label: 'Condoms (remaining)', key: 'condoms', placeholder: 'e.g. 50 pieces', type: 'numeric' },
        { label: 'Oral Pills (remaining)', key: 'oralPills', placeholder: 'e.g. 10 strips', type: 'numeric' },
        { label: 'Items Urgently Needed', key: 'urgentNeeds', placeholder: 'List items running low...', type: 'textarea' },
        { label: 'Additional Notes', key: 'notes', placeholder: 'Any stock issues...', type: 'textarea' },
      ]}
    />
  );
}
