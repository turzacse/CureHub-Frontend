// FacebookPermissions.js
import React from 'react';

const FacebookPermissions = ({ accessToken }) => {
  const handleRequestPermissions = () => {
    // Redirect to the permissions request URL
    window.location.href = `https://www.facebook.com/v12.0/dialog/oauth?client_id=YOUR_FACEBOOK_APP_ID&redirect_uri=YOUR_REDIRECT_URI&scope=publish_pages,manage_pages`;
  };

  return (
    <div>
      <button onClick={handleRequestPermissions}>Request Permissions</button>
    </div>
  );
};

export default FacebookPermissions;
