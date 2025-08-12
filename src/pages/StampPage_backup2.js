import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { translations, getLanguage } from '../utils/translations';

function StampPage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('ko');
  const [selectedCategory, setSelectedCategory] = useState('culturalHeritage');
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapLevel, setMapLevel] = useState(13); // 최대 축소 레벨
  const [markers, setMarkers] = useState([]);
  const t = translations[language];
  
  useEffect(() => {
    const savedLanguage = getLanguage();
    setLanguage(savedLanguage);
  }, []);

  // 사용자 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('위치 정보를 가져올 수 없습니다:', error);
          // 기본 위치 (서울시청)
          setUserLocation({
            lat: 37.5665,
            lng: 126.9780
          });
        }
      );
    } else {
      // 기본 위치 설정
      setUserLocation({
        lat: 37.5665,
        lng: 126.9780
      });
    }
  }, []);

  // 카테고리별 데이터
  const categoryData = {
    culturalHeritage: [
      { 
        id: 1, 
        name: '경복궁', 
        lat: 37.5796, 
        lng: 126.9770,
        description: '조선 왕조의 정궁',
        popular: true,
        distance: '2.1km',
        image: '/heritage/gyeongbokgung.jpg',
        rating: 4.8,
        reviews: 15420,
        openTime: '09:00 - 18:00',
        price: '3,000원',
        category: '궁궐',
        address: '서울특별시 종로구 사직로 161'
      },
      { 
        id: 2, 
        name: '창덕궁', 
        lat: 37.5794, 
        lng: 126.9910,
        description: '유네스코 세계문화유산',
        popular: true,
        distance: '3.2km',
        image: '/heritage/changdeokgung.jpg',
        rating: 4.7,
        reviews: 12350,
        openTime: '09:00 - 17:30',
        price: '3,000원',
        category: '궁궐',
        address: '서울특별시 종로구 율곡로 99'
      },
      { 
        id: 3, 
        name: '덕수궁', 
        lat: 37.5658, 
        lng: 126.9751,
        description: '대한제국의 황궁',
        popular: false,
        distance: '1.8km',
        image: '/heritage/deoksugung.jpg',
        rating: 4.5,
        reviews: 8920,
        openTime: '09:00 - 21:00',
        price: '1,000원',
        category: '궁궐',
        address: '서울특별시 중구 세종대로 99'
      },
      { 
        id: 4, 
        name: '종묘', 
        lat: 37.5741, 
        lng: 126.9935,
        description: '조선 왕실의 사당',
        popular: true,
        distance: '2.9km',
        image: '/heritage/jongmyo.jpg',
        rating: 4.6,
        reviews: 6780,
        openTime: '09:00 - 18:00',
        price: '1,000원',
        category: '사당',
        address: '서울특별시 종로구 훈정동 1'
      },
      { 
        id: 5, 
        name: '불국사', 
        lat: 35.7898, 
        lng: 129.3320,
        description: '신라 불교 문화의 정수',
        popular: true,
        distance: '267km',
        image: '/heritage/bulguksa.jpg',
        rating: 4.9,
        reviews: 23450,
        openTime: '07:00 - 18:00',
        price: '6,000원',
        category: '사찰',
        address: '경상북도 경주시 진현동 15-1'
      }
    ],
    touristSpot: [
      { 
        id: 6, 
        name: '남산타워', 
        lat: 37.5512, 
        lng: 126.9882,
        description: '서울의 랜드마크',
        popular: true,
        distance: '4.2km',
        image: '/tourist/namsan_tower.jpg',
        rating: 4.4,
        reviews: 18920,
        openTime: '10:00 - 23:00',
        price: '16,000원',
        category: '전망대',
        address: '서울특별시 용산구 남산공원길 105'
      },
      { 
        id: 7, 
        name: '한강공원', 
        lat: 37.5219, 
        lng: 127.0411,
        description: '서울 시민의 휴식처',
        popular: true,
        distance: '6.8km',
        image: '/tourist/hangang_park.jpg',
        rating: 4.3,
        reviews: 12340,
        openTime: '24시간',
        price: '무료',
        category: '공원',
        address: '서울특별시 영등포구 여의동로 330'
      },
      { 
        id: 8, 
        name: '명동', 
        lat: 37.5636, 
        lng: 126.9834,
        description: '쇼핑과 맛집의 거리',
        popular: true,
        distance: '1.5km',
        image: '/tourist/myeongdong.jpg',
        rating: 4.2,
        reviews: 25670,
        openTime: '10:00 - 22:00',
        price: '무료',
        category: '쇼핑거리',
        address: '서울특별시 중구 명동2가'
      },
      { 
        id: 9, 
        name: '홍대', 
        lat: 37.5563, 
        lng: 126.9236,
        description: '젊음과 문화의 거리',
        popular: false,
        distance: '8.2km',
        image: '/tourist/hongdae.jpg',
        rating: 4.1,
        reviews: 15430,
        openTime: '24시간',
        price: '무료',
        category: '문화거리',
        address: '서울특별시 마포구 와우산로'
      },
      { 
        id: 10, 
        name: '제주도 성산일출봉', 
        lat: 33.4584, 
        lng: 126.9424,
        description: '제주도의 대표 관광지',
        popular: true,
        distance: '452km',
        image: '/tourist/seongsan.jpg',
        rating: 4.8,
        reviews: 34560,
        openTime: '07:00 - 20:00',
        price: '5,000원',
        category: '자연명소',
        address: '제주특별자치도 서귀포시 성산읍 성산리'
      }
    ],
    experienceCenter: [
      { 
        id: 11, 
        name: '국립중앙박물관', 
        lat: 37.5240, 
        lng: 126.9803,
        description: '한국 역사와 문화 체험',
        popular: true,
        distance: '5.1km',
        image: '/experience/national_museum.jpg',
        rating: 4.7,
        reviews: 18920,
        openTime: '10:00 - 18:00',
        price: '무료',
        category: '박물관',
        address: '서울특별시 용산구 서빙고로 137'
      },
      { 
        id: 12, 
        name: '서울역사박물관', 
        lat: 37.5707, 
        lng: 126.9697,
        description: '서울의 역사 체험',
        popular: false,
        distance: '2.3km',
        image: '/experience/seoul_museum.jpg',
        rating: 4.4,
        reviews: 7650,
        openTime: '09:00 - 18:00',
        price: '무료',
        category: '박물관',
        address: '서울특별시 종로구 새문안로 55'
      },
      { 
        id: 13, 
        name: '국립민속박물관', 
        lat: 37.5796, 
        lng: 126.9770,
        description: '한국 전통 문화 체험',
        popular: true,
        distance: '2.1km',
        image: '/experience/folk_museum.jpg',
        rating: 4.5,
        reviews: 11230,
        openTime: '09:00 - 18:00',
        price: '무료',
        category: '박물관',
        address: '서울특별시 종로구 삼청로 37'
      },
      { 
        id: 14, 
        name: '전쟁기념관', 
        lat: 37.5341, 
        lng: 126.9777,
        description: '한국 전쟁사 체험',
        popular: false,
        distance: '3.8km',
        image: '/experience/war_memorial.jpg',
        rating: 4.6,
        reviews: 9870,
        openTime: '09:00 - 18:00',
        price: '무료',
        category: '기념관',
        address: '서울특별시 용산구 이태원로 29'
      },
      { 
        id: 15, 
        name: '국립과천과학관', 
        lat: 37.4344, 
        lng: 126.9969,
        description: '과학 기술 체험',
        popular: true,
        distance: '18.5km',
        image: '/experience/science_museum.jpg',
        rating: 4.8,
        reviews: 16540,
        openTime: '09:30 - 17:30',
        price: '4,000원',
        category: '과학관',
        address: '경기도 과천시 상하벌로 110'
      }
    ]
  };

  // 헬퍼 함수들
  const getCurrentData = () => categoryData[selectedCategory];
  const getNearbyPlaces = () => getCurrentData().slice(0, 3);
  const getPopularPlaces = () => getCurrentData().filter(place => place.popular).slice(0, 3);

  // 기존 마커들 제거
  const clearMarkers = () => {
    markers.forEach(marker => {
      marker.setMap(null);
    });
    setMarkers([]);
  };

  // 마커 추가
  const addMarkers = (kakaoMap) => {
    const currentData = getCurrentData();
    const newMarkers = [];
    
    currentData.forEach(place => {
      // 축소 레벨에 따른 마커 표시 여부 결정
      // 레벨 10 이상 (매우 축소): 인기 장소만 표시
      // 레벨 8 이하 (확대): 모든 장소 표시
      const shouldShow = mapLevel <= 8 || place.popular;
      
      if (shouldShow) {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(place.lat, place.lng),
          map: kakaoMap
        });

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, 'click', function() {
          console.log('Marker clicked:', place.name);
          setSelectedPlace(place);
        });

        newMarkers.push(marker);
      }
    });
    
    setMarkers(newMarkers);
  };

  // 카카오 지도 초기화
  useEffect(() => {
    if (viewMode === 'map' && window.kakao && window.kakao.maps) {
      const container = mapRef.current;
      if (!container) return;

      const options = {
        center: new window.kakao.maps.LatLng(36.5, 127.5), // 한국 중심
        level: 13, // 최대 축소 레벨로 시작
        scrollwheel: true,
        disableDoubleClick: false,
        disableDoubleClickZoom: false
      };
      
      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap);

      // 지도 레벨 변경 이벤트 (디바운스 적용)
      let levelChangeTimeout;
      window.kakao.maps.event.addListener(kakaoMap, 'zoom_changed', function() {
        clearTimeout(levelChangeTimeout);
        levelChangeTimeout = setTimeout(() => {
          const level = kakaoMap.getLevel();
          console.log('Map level changed to:', level);
          setMapLevel(level);
        }, 100); // 100ms 디바운스
      });

      // 사용자 위치가 있으면 사용자 위치 마커 추가
      if (userLocation) {
        const userMarker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
          map: kakaoMap
        });

        // 사용자 위치 정보창
        const userInfoWindow = new window.kakao.maps.InfoWindow({
          content: '<div style="padding:5px;font-size:12px;">현재 위치</div>'
        });
        userInfoWindow.open(kakaoMap, userMarker);
      }

      // 마커 추가
      addMarkers(kakaoMap);

      // 지도 크기 재조정
      setTimeout(() => {
        kakaoMap.relayout();
      }, 100);
    }
  }, [viewMode, selectedCategory]);

  // 지도 레벨 변경 시 마커 업데이트
  useEffect(() => {
    if (map && viewMode === 'map') {
      clearMarkers();
      addMarkers(map);
    }
  }, [mapLevel]);

  const categoryButtons = [
    { key: 'culturalHeritage', label: t.culturalHeritage },
    { key: 'touristSpot', label: t.touristSpot },
    { key: 'experienceCenter', label: t.experienceCenter }
  ];

  return (
    <div style={{ 
      height: '100vh', 
      backgroundColor: '#f5f5f5', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '15px 20px',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexShrink: 0
      }}>
        <button 
          onClick={() => navigate('/main')}
          style={{
            position: 'absolute',
            left: '20px',
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#333'
          }}
        >
          ←
        </button>
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{t.stampCollection}</span>
      </div>

      {/* Category Buttons */}
      <div style={{
        backgroundColor: 'white',
        padding: '15px 20px',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        gap: '10px',
        flexShrink: 0
      }}>
        {categoryButtons.map(button => (
          <button
            key={button.key}
            onClick={() => {
              setSelectedCategory(button.key);
              setSelectedPlace(null); // 카테고리 변경 시 선택된 장소 초기화
            }}
            style={{
              flex: 1,
              padding: '10px 15px',
              border: selectedCategory === button.key ? '2px solid #4CAF50' : '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: selectedCategory === button.key ? '#e8f5e8' : 'white',
              color: selectedCategory === button.key ? '#4CAF50' : '#333',
              fontWeight: selectedCategory === button.key ? 'bold' : 'normal',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {button.label}
          </button>
        ))}
      </div>

      {/* View Mode Switch */}
      <div style={{
        backgroundColor: 'white',
        padding: '10px 20px',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <span style={{ fontSize: '14px', color: '#666' }}>
          {getCurrentData().length}개의 장소
        </span>
        <div style={{
          display: 'flex',
          backgroundColor: '#f0f0f0',
          borderRadius: '20px',
          padding: '2px'
        }}>
          <button
            onClick={() => {
              setViewMode('map');
              setSelectedPlace(null);
            }}
            style={{
              padding: '6px 12px',
              border: 'none',
              borderRadius: '18px',
              backgroundColor: viewMode === 'map' ? '#4CAF50' : 'transparent',
              color: viewMode === 'map' ? 'white' : '#666',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            {t.mapView}
          </button>
          <button
            onClick={() => {
              setViewMode('list');
              setSelectedPlace(null);
            }}
            style={{
              padding: '6px 12px',
              border: 'none',
              borderRadius: '18px',
              backgroundColor: viewMode === 'list' ? '#4CAF50' : 'transparent',
              color: viewMode === 'list' ? 'white' : '#666',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            {t.listView}
          </button>
        </div>
      </div>
      {/* Content Area */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', paddingBottom: '70px' }}>
        {viewMode === 'map' ? (
          // Map View
          <>
            <div 
              ref={mapRef}
              style={{ 
                width: '100%', 
                height: '100%' 
              }}
            />
            
            {/* Selected Place Card */}
            {selectedPlace && (
              <div style={{
                position: 'absolute',
                bottom: '20px', // 네비게이션 바 위에 위치
                left: '15px',
                right: '15px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                overflow: 'hidden',
                zIndex: 1000,
                maxHeight: '140px' // 최대 높이 설정
              }}>
                <div style={{ display: 'flex', height: '140px' }}>
                  {/* Image */}
                  <div style={{ width: '140px', flexShrink: 0 }}>
                    <img 
                      src={selectedPlace.image}
                      alt={selectedPlace.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.src = '/image/placeholder.jpg';
                      }}
                    />
                  </div>
                  
                  {/* Info */}
                  <div style={{ 
                    flex: 1, 
                    padding: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minWidth: 0 // 텍스트 오버플로우 방지
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ 
                          margin: 0, 
                          fontSize: '16px', 
                          fontWeight: 'bold',
                          color: '#333'
                        }}>
                          {selectedPlace.name}
                        </h3>
                        <button
                          onClick={() => setSelectedPlace(null)}
                          style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '18px',
                            cursor: 'pointer',
                            color: '#999',
                            padding: '0',
                            marginLeft: '8px'
                          }}
                        >
                          ×
                        </button>
                      </div>
                      
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        margin: '4px 0'
                      }}>
                        <span style={{ 
                          fontSize: '12px', 
                          color: '#666',
                          backgroundColor: '#f0f0f0',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>
                          {selectedPlace.category}
                        </span>
                        <span style={{ fontSize: '12px', color: '#666' }}>
                          {selectedPlace.distance}
                        </span>
                      </div>
                      
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '4px',
                        margin: '4px 0'
                      }}>
                        <span style={{ color: '#ff9800', fontSize: '14px' }}>★</span>
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                          {selectedPlace.rating}
                        </span>
                        <span style={{ fontSize: '12px', color: '#666' }}>
                          ({selectedPlace.reviews.toLocaleString()}개 평가)
                        </span>
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {selectedPlace.openTime}
                        </div>
                        <div style={{ 
                          fontSize: '16px', 
                          fontWeight: 'bold',
                          color: '#333'
                        }}>
                          {selectedPlace.price}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => navigate(`/detail/${selectedPlace.id}`)}
                        style={{
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        상세보기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          // List View - MainPage 스타일과 유사하게
          <div style={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            backgroundColor: '#f5f5f5'
          }}>
            {/* Nearby Places */}
            <div style={{ 
              flex: 1, 
              padding: '15px 20px',
              backgroundColor: 'white',
              marginBottom: '8px'
            }}>
              <h3 style={{ 
                margin: '0 0 15px 0', 
                fontSize: '16px', 
                fontWeight: 'bold',
                color: '#333'
              }}>
                📍 {t.nearbyPlaces}
              </h3>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px',
                maxHeight: 'calc(50vh - 80px)',
                overflowY: 'auto'
              }}>
                {getNearbyPlaces().map(place => (
                  <div 
                    key={place.id}
                    style={{
                      display: 'flex',
                      padding: '12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      backgroundColor: '#f9f9f9',
                      cursor: 'pointer'
                    }}
                    onClick={() => navigate(`/detail/${place.id}`)}
                  >
                    <img 
                      src={place.image}
                      alt={place.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '6px',
                        objectFit: 'cover',
                        marginRight: '12px'
                      }}
                      onError={(e) => {
                        e.target.src = '/image/placeholder.jpg';
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        marginBottom: '4px'
                      }}>
                        <h4 style={{ 
                          margin: 0, 
                          fontSize: '14px', 
                          fontWeight: 'bold',
                          color: '#333'
                        }}>
                          {place.name}
                        </h4>
                        <span style={{ 
                          fontSize: '12px', 
                          color: '#4CAF50',
                          fontWeight: 'bold'
                        }}>
                          {place.distance}
                        </span>
                      </div>
                      <p style={{ 
                        margin: '0 0 4px 0', 
                        fontSize: '12px', 
                        color: '#666',
                        lineHeight: '1.4'
                      }}>
                        {place.description}
                      </p>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '4px'
                      }}>
                        <span style={{ color: '#ff9800', fontSize: '12px' }}>★</span>
                        <span style={{ fontSize: '12px' }}>{place.rating}</span>
                        <span style={{ fontSize: '11px', color: '#999' }}>
                          ({place.reviews.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Places */}
            <div style={{ 
              flex: 1, 
              padding: '15px 20px',
              backgroundColor: 'white'
            }}>
              <h3 style={{ 
                margin: '0 0 15px 0', 
                fontSize: '16px', 
                fontWeight: 'bold',
                color: '#333'
              }}>
                🔥 {t.popularPlaces}
              </h3>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px',
                maxHeight: 'calc(50vh - 80px)',
                overflowY: 'auto'
              }}>
                {getPopularPlaces().map(place => (
                  <div 
                    key={place.id}
                    style={{
                      display: 'flex',
                      padding: '12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      backgroundColor: '#fff8e1',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                    onClick={() => navigate(`/detail/${place.id}`)}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      backgroundColor: '#ff9800',
                      color: 'white',
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      fontWeight: 'bold'
                    }}>
                      인기
                    </div>
                    <img 
                      src={place.image}
                      alt={place.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '6px',
                        objectFit: 'cover',
                        marginRight: '12px'
                      }}
                      onError={(e) => {
                        e.target.src = '/image/placeholder.jpg';
                      }}
                    />
                    <div style={{ flex: 1, paddingRight: '40px' }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        marginBottom: '4px'
                      }}>
                        <h4 style={{ 
                          margin: 0, 
                          fontSize: '14px', 
                          fontWeight: 'bold',
                          color: '#333'
                        }}>
                          {place.name}
                        </h4>
                        <span style={{ 
                          fontSize: '12px', 
                          color: '#666'
                        }}>
                          {place.distance}
                        </span>
                      </div>
                      <p style={{ 
                        margin: '0 0 4px 0', 
                        fontSize: '12px', 
                        color: '#666',
                        lineHeight: '1.4'
                      }}>
                        {place.description}
                      </p>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '4px'
                      }}>
                        <span style={{ color: '#ff9800', fontSize: '12px' }}>★</span>
                        <span style={{ fontSize: '12px' }}>{place.rating}</span>
                        <span style={{ fontSize: '11px', color: '#999' }}>
                          ({place.reviews.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Bar */}
      <div className="nav-bar">
        <div 
          className="nav-item"
          onClick={() => navigate(-1)} // 뒤로가기
          style={{ cursor: 'pointer' }}
        >
          <div 
            className="nav-icon" 
            style={{ backgroundImage: 'url(/image/back.png)' }}
          ></div>
          <span style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>뒤로</span>
        </div>
        <div 
          className="nav-item"
          onClick={() => navigate('/camera')}
          style={{ cursor: 'pointer' }}
        >
          <div 
            className="nav-icon" 
            style={{ backgroundImage: 'url(/image/nav_camera.png)' }}
          ></div>
          <span style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>{t.camera}</span>
        </div>
        <div 
          className="nav-item"
          onClick={() => navigate('/settings')}
          style={{ cursor: 'pointer' }}
        >
          <div 
            className="nav-icon" 
            style={{ backgroundImage: 'url(/image/settings.png)' }}
          ></div>
          <span style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>{t.settings}</span>
        </div>
      </div>
    </div>
  );
}

export default StampPage;
