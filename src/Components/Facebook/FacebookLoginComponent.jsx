// FacebookLogin.js
import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginComponent = ({ onLoginSuccess, onLoginFailure }) => {
  const responseFacebook = (response) => {
    if (response.accessToken) {
      // Pass the accessToken to parent or state management
      onLoginSuccess(response.accessToken);
    } else {
      onLoginFailure(response);
    }
  };

  return (
    <FacebookLogin
      appId="1318570642454875"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      icon="fa-facebook"
    />
  );
};

export default FacebookLoginComponent;
