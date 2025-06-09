import './TermsPage.scss';
import React from 'react';

const TermsPage = () => {
  return (
    <div className="container">
      <iframe
        src="/terms.html"
        title="Terms of Service"
        width="100%"
        height="1000px"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default TermsPage;
