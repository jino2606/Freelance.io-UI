import React from 'react';
import { BASE_URL } from '../../services/baseUrl';

function UserAvatar({ userData, heightxwidth = 3, fontSize = '14px' }) {
  const size = `${heightxwidth}rem`;

  const getInitials = () => {
    if (!userData) return '?';
    const f = userData.firstname?.[0] || userData.username?.[0] || '';
    const l = userData.lastname?.[0] || '';
    return `${f}${l}`.toUpperCase() || '?';
  };

  const hasImage = userData?.profileImg?.length > 0 && userData.profileImg[0]?.filename;

  return (
    <div
      className="avatar"
      style={{ width: size, height: size, fontSize }}
    >
      {hasImage ? (
        <img
          src={`${BASE_URL}/uploads/${userData.profileImg[0].filename}`}
          alt={`${userData?.firstname || 'User'}'s avatar`}
          loading="lazy"
        />
      ) : (
        getInitials()
      )}
    </div>
  );
}

export default UserAvatar;
