import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userInfo');
    if (user) {
      setUserInfo(JSON.parse(user));
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {userInfo ? (
        <h1>안녕하세요, {userInfo.name}님!</h1>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default Dashboard;
