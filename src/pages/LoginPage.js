import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { translations, getLanguage, setLanguage as saveLanguage } from '../utils/translations';
import { initializeFontSize } from '../utils/fontSizeUtils';

function LoginPage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('ko');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const t = translations[language];
  
  useEffect(() => {
    const savedLanguage = getLanguage();
    setLanguage(savedLanguage);
    initializeFontSize();
    
    // 글씨 크기 변경 이벤트 리스너
    const handleFontSizeChange = () => {
      initializeFontSize();
    };
    window.addEventListener('fontSizeChanged', handleFontSizeChange);
    
    return () => {
      window.removeEventListener('fontSizeChanged', handleFontSizeChange);
    };
  }, []);

  // 언어 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLanguageDropdown && !event.target.closest('.language-dropdown')) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguageDropdown]);

  useEffect(() => {
    // 구글 로그인 초기화 (로딩 대기)
    const initializeGoogle = () => {
      if (window.google && window.google.accounts) {
        console.log('구글 API 로드 완료');
        window.google.accounts.id.initialize({
          client_id: '168121341640-f4hrqdtftcui9tmamlerm35hqdgjdlf5.apps.googleusercontent.com', // 새 클라이언트 ID로 교체 후 테스트
          callback: handleGoogleLogin,
          auto_select: false,
          cancel_on_tap_outside: true,
          use_fedcm_for_prompt: false, // FedCM 비활성화
          itp_support: true
        });
        console.log('구글 로그인 초기화 완료');
      } else {
        console.log('구글 API 로딩 중...');
        setTimeout(initializeGoogle, 100);
      }
    };

    initializeGoogle();
  }, []);

  const handleGoogleLogin = (response) => {
    console.log('Google 로그인 성공:', response);
    // JWT 토큰을 파싱하여 사용자 정보 추출
    const userInfo = parseJwt(response.credential);
    console.log('사용자 정보:', userInfo);

    // 로컬 스토리지에 사용자 정보 저장
    localStorage.setItem('user', JSON.stringify({
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture
    }));

    navigate('/main');
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const handleGoogleLoginClick = () => {
    if (window.google && window.google.accounts) {
      try {
        // GSI Identity Services 방식만 사용 (JWT credential 기반)
        window.google.accounts.id.prompt((notification) => {
          console.log('Prompt 결과:', notification);
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.log('Prompt가 표시되지 않았습니다.');
            alert('구글 로그인 팝업이 차단되었을 수 있습니다. 팝업 차단을 해제하고 다시 시도해주세요.');
          }
        });
      } catch (error) {
        console.error('Prompt 오류:', error);
        alert('구글 로그인에 문제가 발생했습니다. 페이지를 새로고침하고 다시 시도해주세요.');
      }
    } else {
      console.error('Google API가 로드되지 않았습니다.');
      alert('구글 API가 로드되지 않았습니다. 인터넷 연결을 확인하고 페이지를 새로고침해주세요.');
    }
  };

  const handleSocialLogin = (provider) => {
    if (provider === 'Google') {
      handleGoogleLoginClick();
    } else {
      // 다른 소셜 로그인 처리
      console.log(`${provider} 로그인`);
      navigate('/main');
    }
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
      overflow: 'hidden',
      justifyContent: 'flex-end',
      padding: '0 20px 40px 20px',
      position: 'relative'
    }}>
      {/* 언어 설정 버튼 */}
      <div className="language-dropdown" style={{
        position: 'absolute',
        top: '50px',
        right: '20px',
        zIndex: 1000
      }}>
        <div
          style={{
            padding: '8px 12px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            color: '#333',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
        >
          🌐 {t.language}
        </div>
        {showLanguageDropdown && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            marginTop: '5px',
            minWidth: '120px'
          }}>
            <div
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                borderBottom: '1px solid #f0f0f0',
                backgroundColor: language === 'ko' ? '#f0f8ff' : 'white'
              }}
              onClick={() => {
                setLanguage('ko');
                saveLanguage('ko');
                setShowLanguageDropdown(false);
              }}
            >
              <img src="/image/korea.png" alt="한국어" style={{ width: '20px', height: '14px', marginRight: '8px', objectFit: 'cover' }} />
              한국어
            </div>
            <div
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                backgroundColor: language === 'en' ? '#f0f8ff' : 'white'
              }}
              onClick={() => {
                setLanguage('en');
                saveLanguage('en');
                setShowLanguageDropdown(false);
              }}
            >
              <img src="/image/usa.png" alt="English" style={{ width: '20px', height: '14px', marginRight: '8px', objectFit: 'cover' }} />
              English
            </div>
          </div>
        )}
      </div>
      
      {/* 소셜 로그인 버튼들 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>

        {/* 카카오 로그인 */}
        {language === 'ko' ? (
          <img
            src="/image/kakao_login.png"
            alt="카카오 로그인"
            onClick={() => handleSocialLogin('Kakao')}
            style={{
              width: '100%',
              height: 'auto',
              cursor: 'pointer',
              borderRadius: '10px'
            }}
            onError={(e) => {
              // 이미지 로드 실패시 기본 버튼으로 대체
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
        ) : (
          <button
            onClick={() => handleSocialLogin('Kakao')}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              backgroundColor: '#FEE500',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '18px' }}>💬</span>
            Continue with Kakao
          </button>
        )}
        
        <button
          onClick={() => handleSocialLogin('Kakao')}
          style={{
            padding: '15px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: '#FEE500',
            color: '#000',
            display: 'none'
          }}
        >
          {t.loginWithKakao}
        </button>

        {/* 네이버 로그인 */}
        {language === 'ko' ? (
          <img
            src="/image/naver_login.png"
            alt="네이버 로그인"
            onClick={() => handleSocialLogin('Naver')}
            style={{
              width: '100%',
              height: 'auto',
              cursor: 'pointer',
              borderRadius: '10px'
            }}
            onError={(e) => {
              // 이미지 로드 실패시 기본 버튼으로 대체
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
        ) : (
          <button
            onClick={() => handleSocialLogin('Naver')}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              backgroundColor: '#03C75A',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '18px' }}>N</span>
            Continue with Naver
          </button>
        )}
        
        {/* 구글 로그인 */}
        <button
          onClick={() => handleSocialLogin('Google')}
          style={{
            padding: '15px',
            borderRadius: '10px',
            border: '1px solid #ddd',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: 'white',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          <img
            src="/image/google_icon.png"
            alt="Google"
            style={{ width: '20px', height: '20px' }}
          />
          {language === 'ko' ? 'Google로 로그인' : 'Continue with Google'}
        </button>
      </div>

      {/* Sign up 버튼 */}
      <div style={{ textAlign: 'center' }}>
        <button
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#D2B48C',
            color: 'white',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/signup')}
        >
          {t.signUp}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
