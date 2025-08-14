import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { translations, getLanguage } from '../utils/translations';

function SignupPage() {
  const navigate = useNavigate();
  const [language] = useState(getLanguage());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const t = translations[language];

  // 샘플 사용자 데이터 (클라이언트 사이드)
  const sampleUsers = [
    { id: 1, email: 'user1@example.com', password: 'password123', name: '김철수' },
    { id: 2, email: 'user2@example.com', password: 'password123', name: '이영희' },
    { id: 3, email: 'user3@example.com', password: 'password123', name: '박민수' },
    { id: 4, email: 'user4@example.com', password: 'password123', name: '정수진' },
    { id: 5, email: 'user5@example.com', password: 'password123', name: '최동현' }
  ];

  // 이메일/비밀번호 로그인 처리 (클라이언트 사이드)
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 로딩 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      if (!email || !password) {
        setError('이메일과 비밀번호를 입력해주세요.');
        return;
      }

      const user = sampleUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        return;
      }

      // 로그인 성공
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name
      }));
      localStorage.setItem('token', 'sample-jwt-token');
      
      console.log('로그인 성공:', user);
      navigate('/main');

    } catch (error) {
      console.error('로그인 오류:', error);
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 샘플 사용자 정보 자동 입력
  const fillSampleUser = () => {
    setEmail('user1@example.com');
    setPassword('password123');
  };

  return (
    <div style={{
      height: '100vh',
      backgroundImage: 'url(/image/background.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 20px',
      position: 'relative'
    }}>
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '50px',
          left: '20px',
          background: 'rgba(255,255,255,0.9)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '18px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ←
      </button>

      {/* 로그인 폼 */}
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: '20px',
        padding: '40px 30px',
        margin: '0 auto',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          fontSize: '24px',
          color: '#333'
        }}>
          {language === 'ko' ? '로그인' : 'Login'}
        </h2>

        {/* 테스트 계정 안내 */}
        <div style={{
          backgroundColor: '#f0f8ff',
          borderRadius: '10px',
          padding: '15px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
            {language === 'ko' ? '📝 테스트 계정 (5개 계정 모두 비밀번호: password123)' : '📝 Test Accounts (All passwords: password123)'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
            {sampleUsers.map((user, index) => (
              <button
                key={index}
                onClick={() => {
                  setEmail(user.email);
                  setPassword(user.password);
                }}
                style={{
                  padding: '5px 10px',
                  borderRadius: '15px',
                  border: '1px solid #007AFF',
                  backgroundColor: 'white',
                  color: '#007AFF',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                {user.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="email"
            placeholder={language === 'ko' ? '이메일' : 'Email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '16px',
              outline: 'none'
            }}
          />
          <input
            type="password"
            placeholder={language === 'ko' ? '비밀번호' : 'Password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '16px',
              outline: 'none'
            }}
          />
          
          {error && (
            <div style={{
              padding: '10px',
              backgroundColor: '#ffebee',
              color: '#c62828',
              borderRadius: '8px',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: isLoading ? '#ccc' : '#007AFF',
              color: 'white',
              fontSize: '16px',
              fontWeight: '500',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading 
              ? (language === 'ko' ? '로그인 중...' : 'Logging in...') 
              : (language === 'ko' ? '로그인' : 'Login')
            }
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
