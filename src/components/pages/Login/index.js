/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {useEffect, useState} from 'react';
// import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {useGoogleLogin} from '@react-oauth/google';
import styles from './styles.module.scss';

function Login() {
  const [token, setToken] = useState(null);
  const sheetId = '1MZSr4FaRCqBg9vwot6SkCdEx9lK4ShM63tdiQOLFESI';

  useEffect(() => {
    console.log('google api loading');
  });

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('tokenResponse:', tokenResponse);
      console.log('scope:', tokenResponse.scope);
      setToken(tokenResponse.access_token);
    },
    scope: 'https://www.googleapis.com/auth/spreadsheets',
  });

  function appendSheetData() {
    const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1:append?valueInputOption=USER_ENTERED`;
    if (!token) {
      console.log('no token!');
      return;
    }

    const body = {
      values: [
        ['Data 1', 'Data 2', 'Data 3', 'Data 4'], // Data to append
      ],
    };
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Append response:', data);
        })
        .catch((error) => {
          console.error('Error appending data:', error);
        });
  }

  return (
    <div className={styles.loginContainer}>
      <h1>Google Sheets API Login</h1>
      {/* <GoogleLogin
        scope="https://www.googleapis.com/auth/spreadsheets"
        onSuccess={(credentialResponse) => {
          console.log('credentialResponse:', credentialResponse);
          setToken(credentialResponse.credential);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      /> */}
      <button className={styles.loginButton} onClick={() => login()}>Sign in with Google</button>
      <button onClick={() => appendSheetData()} disabled={!token}>
        Append Dummy Row Test
      </button>
      <NavLink to="/">
        <div>Back</div>
      </NavLink>
    </div>
  );
}

export default Login;
