import React from 'react';
import './TermsPage.scss';

const TermsPage = () => {
  return (
    <div className="terms-page">
      <h1>Terms of Service</h1>
      <iframe src="/terms.html" title="Terms of Service" />
    </div>
  );
};

export default TermsPage;
