import React from 'react';

function Avatar({ userData, fontSize = '2rem' }) {
  const getInitials = () => {
    if (!userData) return '?';
    const f = userData.firstname?.[0] || userData.username?.[0] || '';
    const l = userData.lastname?.[0] || '';
    return `${f}${l}`.toUpperCase() || '?';
  };

  return (
    <span style={{ fontSize, fontWeight: 600 }}>{getInitials()}</span>
  );
}

export default Avatar;
