import './CoveraLogo.css';

import React from 'react';

function CoveraLogo() {
  return (
    <a
      href="https://www.coverahealth.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="/assets/CoveraIcon.png"
        className="header-logo-image"
        alt="Covera Health"
      />
      <img
        src="/assets/CoveraLogo.png"
        className="header-logo-text"
        alt="Covera Health"
      />
    </a>
  );
}

export default CoveraLogo;
