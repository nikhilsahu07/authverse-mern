import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FloatingNavbar = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [solutionsTimeout, setSolutionsTimeout] = useState<number | null>(null);
  const [resourcesTimeout, setResourcesTimeout] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const handleSolutionsMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      // Only on desktop
      if (solutionsTimeout) {
        clearTimeout(solutionsTimeout);
        setSolutionsTimeout(null);
      }
      setShowSolutions(true);
    }
  };

  const handleSolutionsMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      // Only on desktop
      const timeout = setTimeout(() => {
        setShowSolutions(false);
      }, 150);
      setSolutionsTimeout(timeout);
    }
  };

  const handleResourcesMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      // Only on desktop
      if (resourcesTimeout) {
        clearTimeout(resourcesTimeout);
        setResourcesTimeout(null);
      }
      setShowResources(true);
    }
  };

  const handleResourcesMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      // Only on desktop
      const timeout = setTimeout(() => {
        setShowResources(false);
      }, 150);
      setResourcesTimeout(timeout);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } w-[95%] max-w-7xl mx-auto`}
      >
        <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl lg:rounded-full shadow-2xl border border-slate-700/50 px-4 sm:px-6 lg:px-8 py-3 lg:py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 sm:space-x-3 text-blue-300 hover:text-blue-200 transition-colors"
            >
              <img src="/authverse.png" alt="AuthVerse" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
              <span className="font-bold text-lg sm:text-xl">AuthVerse</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link
                to="/"
                className="text-blue-100/90 hover:text-blue-200 transition-colors font-medium text-sm xl:text-base"
              >
                About us
              </Link>

              {/* Solutions Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleSolutionsMouseEnter}
                onMouseLeave={handleSolutionsMouseLeave}
              >
                <button className="flex items-center space-x-1 text-blue-100/90 hover:text-blue-200 transition-colors font-medium text-sm xl:text-base">
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${showSolutions ? 'rotate-180' : ''}`}
                  />
                </button>
                {showSolutions && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[500px] xl:w-[600px] bg-slate-700/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-600/50 py-4 xl:py-5 px-4 xl:px-5 transition-all duration-200 ease-out">
                    <div className="grid grid-cols-3 gap-4 xl:gap-5">
                      {/* Product Section */}
                      <div>
                        <h3 className="font-semibold text-blue-300 text-sm xl:text-base mb-3 xl:mb-4">Product</h3>
                        <div className="space-y-2 xl:space-y-3">
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            Use cases
                          </a>
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            Testimonials
                          </a>
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            Features
                          </a>
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            User stories
                          </a>
                        </div>
                      </div>

                      {/* About Section */}
                      <div>
                        <h3 className="font-semibold text-blue-300 text-sm xl:text-base mb-3 xl:mb-4">About</h3>
                        <div className="space-y-2 xl:space-y-3">
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            Company
                          </a>
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            Team
                          </a>
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            Awards
                          </a>
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            Careers
                          </a>
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            Contacts
                          </a>
                        </div>
                      </div>

                      {/* Latest Arrival Card */}
                      <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl p-3 xl:p-4 text-white">
                        <h3 className="font-semibold text-sm xl:text-base mb-2">Latest arrival</h3>
                        <p className="text-white/90 text-xs mb-3 xl:mb-4 leading-relaxed">
                          New security features and authentication improvements now available.
                        </p>
                        <button className="text-white text-xs font-medium hover:underline">Read article →</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleResourcesMouseEnter}
                onMouseLeave={handleResourcesMouseLeave}
              >
                <button className="flex items-center space-x-1 text-blue-100/90 hover:text-blue-200 transition-colors font-medium text-sm xl:text-base">
                  <span>Resources</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${showResources ? 'rotate-180' : ''}`}
                  />
                </button>
                {showResources && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[400px] xl:w-[500px] bg-slate-700/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-600/50 py-4 xl:py-5 px-4 xl:px-5 transition-all duration-200 ease-out">
                    <div className="grid grid-cols-2 gap-4 xl:gap-5">
                      {/* Learn Section */}
                      <div>
                        <h3 className="font-semibold text-blue-300 text-sm xl:text-base mb-3 xl:mb-4">Learn</h3>
                        <div className="space-y-2 xl:space-y-3">
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            Blog
                          </a>
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            History
                          </a>
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            Cases
                          </a>
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            Articles
                          </a>
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            University
                          </a>
                        </div>
                      </div>

                      {/* Support Section */}
                      <div>
                        <h3 className="font-semibold text-blue-300 text-sm xl:text-base mb-3 xl:mb-4">Support</h3>
                        <div className="space-y-2 xl:space-y-3">
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            Documentation
                          </a>
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            Help Center
                          </a>
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            Community
                          </a>
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            Status Page
                          </a>
                          <a
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-xs xl:text-sm"
                          >
                            Contact Us
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/"
                className="text-blue-100/90 hover:text-blue-200 transition-colors font-medium text-sm xl:text-base"
              >
                Pricing
              </Link>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 xl:px-6 py-2 rounded-full hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 font-medium text-sm xl:text-base"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="text-blue-100/90 hover:text-blue-200 transition-colors font-medium text-sm xl:text-base px-3 xl:px-4 py-2 rounded-full hover:bg-slate-700/50"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 xl:px-6 py-2 rounded-full hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 font-medium text-sm xl:text-base"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-blue-100/90 hover:text-blue-200 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMobileMenu} />
          <div className="fixed top-20 left-4 right-4 bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 py-6 px-6 max-h-[80vh] overflow-y-auto">
            {/* Mobile Navigation Links */}
            <div className="space-y-6">
              <Link
                to="/"
                className="block text-blue-100/90 hover:text-blue-200 transition-colors font-medium text-base py-2"
                onClick={closeMobileMenu}
              >
                About us
              </Link>

              {/* Mobile Solutions Section */}
              <div>
                <button
                  onClick={() => setShowSolutions(!showSolutions)}
                  className="flex items-center justify-between w-full text-blue-100/90 hover:text-blue-200 transition-colors font-medium text-base py-2"
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${showSolutions ? 'rotate-180' : ''}`}
                  />
                </button>

                {showSolutions && (
                  <div className="mt-3 pl-4 space-y-4 border-l border-slate-600/50">
                    <div>
                      <h4 className="font-medium text-blue-300 text-sm mb-2">Product</h4>
                      <div className="space-y-2">
                        {['Use cases', 'Testimonials', 'Features', 'User stories'].map((item) => (
                          <a
                            key={item}
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm py-1"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-300 text-sm mb-2">About</h4>
                      <div className="space-y-2">
                        {['Company', 'Team', 'Awards', 'Careers', 'Contacts'].map((item) => (
                          <a
                            key={item}
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm py-1"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Resources Section */}
              <div>
                <button
                  onClick={() => setShowResources(!showResources)}
                  className="flex items-center justify-between w-full text-blue-100/90 hover:text-blue-200 transition-colors font-medium text-base py-2"
                >
                  <span>Resources</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${showResources ? 'rotate-180' : ''}`}
                  />
                </button>

                {showResources && (
                  <div className="mt-3 pl-4 space-y-4 border-l border-slate-600/50">
                    <div>
                      <h4 className="font-medium text-blue-300 text-sm mb-2">Learn</h4>
                      <div className="space-y-2">
                        {['Blog', 'History', 'Cases', 'Articles', 'University'].map((item) => (
                          <a
                            key={item}
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm py-1"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-300 text-sm mb-2">Support</h4>
                      <div className="space-y-2">
                        {['Documentation', 'Help Center', 'Community', 'Status Page', 'Contact Us'].map((item) => (
                          <a
                            key={item}
                            href="#"
                            className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm py-1"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/"
                className="block text-blue-100/90 hover:text-blue-200 transition-colors font-medium text-base py-2"
                onClick={closeMobileMenu}
              >
                Pricing
              </Link>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-slate-600/50 space-y-3">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="block w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-center px-6 py-3 rounded-full hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 font-medium"
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className="block w-full text-center text-blue-100/90 hover:text-blue-200 transition-colors font-medium px-6 py-3 rounded-full border border-slate-600/50 hover:bg-slate-700/50"
                      onClick={closeMobileMenu}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-center px-6 py-3 rounded-full hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 font-medium"
                      onClick={closeMobileMenu}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingNavbar;
