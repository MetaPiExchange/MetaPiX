import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="container">
      <iframe
        src="/privacy.html"
        title="Privacy Policy"
        width="100%"
        height="1000px"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default PrivacyPage;
