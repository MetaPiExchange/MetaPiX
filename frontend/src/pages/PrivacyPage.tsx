import React from 'react';
import './PrivacyPage.scss';

const PrivacyPage = () => {
  return (
    <div className="privacy-page">
      <h1>Privacy Policy</h1>
      <iframe src="/privacy.html" title="Privacy Policy" />
    </div>
  );
};

export default PrivacyPage;
