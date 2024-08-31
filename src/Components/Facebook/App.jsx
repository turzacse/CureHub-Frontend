// App.js
import React, { useState } from 'react';
// import FacebookLoginComponent from './FacebookLogin';
import FacebookPost from './FacebookPost';
import FacebookPermissions from './FacebookPermissions';
import FacebookLoginComponent from './FacebookLoginComponent';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  const handleLoginSuccess = (token) => {
    setAccessToken(token);
  };

  const handleLoginFailure = (response) => {
    console.error('Login failed:', response);
  };

  return (
    <div className='flex justify-center items-center gap-5 mt-20'>
      {!accessToken ? (
        <FacebookLoginComponent
          onLoginSuccess={handleLoginSuccess}
          onLoginFailure={handleLoginFailure}
        />
      ) : (
        <>
          <FacebookPermissions accessToken={accessToken} />
          <FacebookPost accessToken={accessToken} />
        </>
      )}
    </div>
  );
};

export default App;
