// src/components/Login.js
import React, { useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  // 환경 변수에서 값 읽어오기
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      handleGoogleLoginSuccess(accessToken);
    }
  }, []);

  const handleGoogleLogin = () => {
    // Google OAuth 인증 URL 생성
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  };

  const handleGoogleLoginSuccess = async (accessToken) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
      );
      const userData = response.data;
      console.log("User data:", userData);
      // 여기서 사용자 정보를 처리하거나 백엔드로 전송
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>Google 로그인</button>
  );
};

export default Login;
