import React from 'react';
import GenericFormScreen from '../components/GenericFormScreen';

export default function HealthSurveyScreen() {
  return (
    <GenericFormScreen
      title="Household Health Survey"
      icon="📋"
      storageKey="@offline_surveys"
      fields={[
        { label: 'Household ID / Name *', key: 'household', placeholder: 'e.g. H-402 / Kumar Family' },
        { label: 'Village / Ward', key: 'village', placeholder: 'e.g. Rampur' },
        { label: 'Number of Members', key: 'members', placeholder: 'e.g. 5', type: 'numeric' },
        { label: 'Number of Children (< 5 yrs)', key: 'children', placeholder: 'e.g. 2', type: 'numeric' },
        { label: 'Number of Pregnant Women', key: 'pregnantWomen', placeholder: 'e.g. 1', type: 'numeric' },
        { label: 'Drinking Water Source', key: 'waterSource', placeholder: 'e.g. Tap / Hand pump / Well' },
        { label: 'Toilet Availability', key: 'toilet', placeholder: 'Yes / No / Shared' },
        { label: 'Any Chronic Disease in Family', key: 'chronicDisease', placeholder: 'e.g. TB, Diabetes, Hypertension' },
        { label: 'Any Recent Illness / Fever', key: 'recentIllness', placeholder: 'Describe if any...' },
        { label: 'Sanitation Rating', key: 'sanitation', placeholder: 'Good / Average / Poor' },
        { label: 'Survey Notes', key: 'notes', placeholder: 'Additional observations...', type: 'textarea' },
      ]}
    />
  );
}
