import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import lavaangLogo from '../assets/images/Lavaang.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIPad, setIsIPad] = useState(false);

  useEffect(() => {
    // Enhanced iPad detection
    const detectIPad = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Detect iPad devices by common resolutions and user agent
      const iPadDetected = (
        // iPad Mini: 768x1024
        (width === 768 && height === 1024) ||
        // iPad Air: 820x1180  
        (width === 820 && height === 1180) ||
        // iPad Pro 11": 834x1194
        (width === 834 && height === 1194) ||
        // iPad Pro 12.9": 1024x1366
        (width === 1024 && height === 1366) ||
        // Landscape orientations
        (height === 768 && width === 1024) ||
        (height === 820 && width === 1180) ||
        (height === 834 && width === 1194) ||
        (height === 1024 && width === 1366) ||
        // General iPad detection
        (navigator.userAgent.includes('iPad') || 
         (navigator.userAgent.includes('Macintosh') && 'ontouchend' in document))
      );
      
      setIsIPad(iPadDetected);
    };

    detectIPad();
    
    // Throttled resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(detectIPad, 300);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', () => {
      setTimeout(detectIPad, 500);
    }, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', detectIPad);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Dynamic navbar height based on device
  const getNavbarHeight = () => {
    if (typeof window === 'undefined') return '80px';
    
    const width = window.innerWidth;
    
    // Mobile phones
    if (width < 640) return '70px';
    // iPad specific heights for better proportion
    if (isIPad) {
      if (width < 900) return '85px'; // Portrait iPad
      return '90px'; // Landscape iPad
    }
    // Tablets and small laptops
    if (width < 1024) return '80px';
    // Desktop
    return '96px';
  };

  // Dynamic logo size based on device
  const getLogoSize = () => {
    if (typeof window === 'undefined') return 'h-14';
    
    const width = window.innerWidth;
    
    // Mobile phones
    if (width < 640) return 'h-12';
    // iPad specific sizing
    if (isIPad) {
      if (width < 900) return 'h-16'; // Portrait iPad
      return 'h-18'; // Landscape iPad
    }
    // Tablets
    if (width < 1024) return 'h-14';
    // Desktop
    return 'h-20';
  };

  return (
    <nav 
      className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50"
      style={{ 
        height: getNavbarHeight(),
        transition: 'height 0.3s ease-in-out'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">

          {/* Logo Section - Left Side with iPad optimizations */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src={lavaangLogo}
              alt="Lavaang Logo"
              className={`w-auto object-contain ${getLogoSize()}`}
              style={{
                maxHeight: isIPad ? '72px' : '64px',
                transition: 'all 0.3s ease-in-out'
              }}
            />
          </div>

          {/* Navigation Links - Responsive for iPad */}
          <div className={`hidden ${isIPad ? 'sm:block' : 'md:block'}`}>
            <div className={`flex items-baseline ${isIPad ? 'space-x-4 ml-6' : 'space-x-6 ml-8 md:space-x-8 md:ml-10'}`}>
              <a
                href="#"
                className={`text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-all duration-200 hover:bg-blue-50 rounded-md ${
                  isIPad ? 'text-base' : 'text-sm md:text-base'
                }`}
                style={{
                  minHeight: '44px', // iOS recommended touch target
                  display: 'flex',
                  alignItems: 'center',
                  touchAction: 'manipulation'
                }}
              >
                Home
              </a>
              <a
                href="#about"
                className={`text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-all duration-200 hover:bg-blue-50 rounded-md ${
                  isIPad ? 'text-base' : 'text-sm md:text-base'
                }`}
                style={{
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  touchAction: 'manipulation'
                }}
              >
                About Us
              </a>
              <a
                href="#contact"
                className={`text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-all duration-200 hover:bg-blue-50 rounded-md ${
                  isIPad ? 'text-base' : 'text-sm md:text-base'
                }`}
                style={{
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  touchAction: 'manipulation'
                }}
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Mobile Menu Button - Hidden on iPad */}
          <div className={`${isIPad ? 'hidden' : 'sm:hidden'}`}>
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              style={{
                minHeight: '44px',
                minWidth: '44px',
                touchAction: 'manipulation'
              }}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Only for phones, not iPads */}
      <div className={`${isIPad ? 'hidden' : 'sm:hidden'} transition-all duration-300 ease-in-out ${
        isMobileMenuOpen
          ? 'max-h-48 opacity-100'
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 block px-3 py-3 text-base font-medium transition-colors duration-200 hover:bg-blue-50 rounded-md"    
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              minHeight: '44px',
              touchAction: 'manipulation'
            }}
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-700 hover:text-blue-600 block px-3 py-3 text-base font-medium transition-colors duration-200 hover:bg-blue-50 rounded-md"    
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              minHeight: '44px',
              touchAction: 'manipulation'
            }}
          >
            About Us
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:text-blue-600 block px-3 py-3 text-base font-medium transition-colors duration-200 hover:bg-blue-50 rounded-md"    
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              minHeight: '44px',
              touchAction: 'manipulation'
            }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;