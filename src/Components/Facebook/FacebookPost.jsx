// FacebookPost.js
import React from 'react';

const FacebookPost = ({ accessToken }) => {
  const handlePost = () => {
    fetch('https://graph.facebook.com/me/feed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Your post message here',
        access_token: accessToken,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Post successful:', data);
    })
    .catch(error => {
      console.error('Error posting:', error);
    });
  };

  return (
    <div>
      <button onClick={handlePost}>Post to Facebook</button>
    </div>
  );
};

export default FacebookPost;
