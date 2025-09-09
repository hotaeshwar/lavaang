import React, { useEffect, useRef, useState } from 'react';
import expertCareImage from '../assets/images/ExpertCare.png';

const LandingPage = () => {
  const imageRef = useRef(null);
  const [screenInfo, setScreenInfo] = useState({ width: 0, height: 0, deviceType: 'desktop' });

  useEffect(() => {
    const updateScreenInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      let deviceType = 'desktop';

      // Mobile detection
      if (width < 768) {
        deviceType = 'mobile';
      } 
      // iPad detection - more comprehensive
      else if (
        (width >= 768 && width <= 1024 && height >= 1024) ||
        (height >= 768 && height <= 1024 && width >= 1024) ||
        navigator.userAgent.includes('iPad') ||
        (navigator.userAgent.includes('Macintosh') && 'ontouchend' in document)
      ) {
        deviceType = 'ipad';
      }

      setScreenInfo({ width, height, deviceType });
    };

    updateScreenInfo();
    window.addEventListener('resize', updateScreenInfo);

    return () => window.removeEventListener('resize', updateScreenInfo);
  }, []);

  // Get image positioning based on device
  const getImageStyles = () => {
    const { deviceType, width, height } = screenInfo;

    const baseStyles = {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      WebkitTransform: 'translateZ(0)',
      WebkitBackfaceVisibility: 'hidden',
      imageRendering: 'optimizeSpeed',
      transition: 'none',
      animation: 'none',
      zIndex: '0'
    };

    if (deviceType === 'mobile') {
      return {
        ...baseStyles,
        objectFit: 'contain',
        objectPosition: 'center center',
        height: 'auto',
        minHeight: '100%'
      };
    } else if (deviceType === 'ipad') {
      // Special handling for iPad to show full image
      return {
        ...baseStyles,
        objectFit: 'contain', // Changed to contain to show full image
        objectPosition: 'center center',
        backgroundColor: '#f3f4f6' // Match container background
      };
    } else {
      return {
        ...baseStyles,
        objectFit: 'cover',
        objectPosition: 'center center'
      };
    }
  };

  const getContainerStyles = () => {
    const { deviceType } = screenInfo;
    
    return {
      height: deviceType === 'mobile' ? 'auto' : 'calc(100vh - 80px)',
      minHeight: deviceType === 'mobile' ? '60vh' : 'calc(100vh - 80px)',
      width: '100vw',
      position: 'relative',
      marginTop: '80px',
      paddingBottom: deviceType === 'mobile' ? '20px' : '0'
    };
  };

  return (
    <div 
      className="relative w-full overflow-hidden bg-gray-50"
      style={getContainerStyles()}
    >
      {/* Image container */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img
          ref={imageRef}
          className="w-full h-full block"
          src={expertCareImage}
          alt="Lavaang Dental - Expert Care"
          loading="eager"
          style={getImageStyles()}
        />
      </div>

      {/* Minimal gradient overlay for readability - reduced for iPad */}
      {screenInfo.deviceType !== 'ipad' && (
        <div 
          className="absolute bottom-0 left-0 w-full z-10"
          style={{
            height: screenInfo.deviceType === 'mobile' ? '10%' : '15%',
            background: `linear-gradient(to top, ${
              screenInfo.deviceType === 'mobile' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.2)'
            } 0%, transparent 100%)`
          }}
        />
      )}
    </div>
  );
};

export default LandingPage;