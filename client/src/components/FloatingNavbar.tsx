import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FloatingNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [solutionsTimeout, setSolutionsTimeout] = useState<number | null>(null);
  const [resourcesTimeout, setResourcesTimeout] = useState<number | null>(null);

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
    if (solutionsTimeout) {
      clearTimeout(solutionsTimeout);
      setSolutionsTimeout(null);
    }
    setShowSolutions(true);
  };

  const handleSolutionsMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowSolutions(false);
    }, 150);
    setSolutionsTimeout(timeout);
  };

  const handleResourcesMouseEnter = () => {
    if (resourcesTimeout) {
      clearTimeout(resourcesTimeout);
      setResourcesTimeout(null);
    }
    setShowResources(true);
  };

  const handleResourcesMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowResources(false);
    }, 150);
    setResourcesTimeout(timeout);
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="bg-slate-800/95 backdrop-blur-xl rounded-full shadow-2xl border border-slate-700/50 px-8 py-3 min-w-[1000px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 text-blue-300 hover:text-blue-200 transition-colors">
            <img src="/src/assets/authverse.png" alt="AuthVerse" className="w-8 h-8 object-contain" />
            <span className="font-bold text-xl">AuthVerse</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-blue-100/90 hover:text-blue-200 transition-colors font-medium text-base">
              About us
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative" onMouseEnter={handleSolutionsMouseEnter} onMouseLeave={handleSolutionsMouseLeave}>
              <button className="flex items-center space-x-1 text-blue-100/90 hover:text-blue-200 transition-colors font-medium text-base">
                <span>Solutions</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${showSolutions ? 'rotate-180' : ''}`}
                />
              </button>
              {showSolutions && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[600px] bg-slate-700/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600/50 py-8 px-8 transition-all duration-200 ease-out">
                  <div className="grid grid-cols-3 gap-8">
                    {/* Product Section */}
                    <div>
                      <h3 className="font-semibold text-blue-100 text-base mb-4">Product</h3>
                      <div className="space-y-3">
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          Use cases
                        </a>
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          Testimonials
                        </a>
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          Features
                        </a>
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          User stories
                        </a>
                      </div>
                    </div>

                    {/* About Section */}
                    <div>
                      <h3 className="font-semibold text-blue-100 text-base mb-4">About</h3>
                      <div className="space-y-3">
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          Company
                        </a>
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          Team
                        </a>
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          Awards
                        </a>
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          Careers
                        </a>
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          Contacts
                        </a>
                      </div>
                    </div>

                    {/* Latest Arrival Card */}
                    <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl p-4 text-white">
                      <h3 className="font-semibold text-base mb-2">Latest arrival</h3>
                      <p className="text-white/90 text-xs mb-4 leading-relaxed">
                        New security features and authentication improvements now available.
                      </p>
                      <button className="text-white text-xs font-medium hover:underline">Read article →</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative" onMouseEnter={handleResourcesMouseEnter} onMouseLeave={handleResourcesMouseLeave}>
              <button className="flex items-center space-x-1 text-blue-100/90 hover:text-blue-200 transition-colors font-medium text-base">
                <span>Resources</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${showResources ? 'rotate-180' : ''}`}
                />
              </button>
              {showResources && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[500px] bg-slate-700/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600/50 py-8 px-8 transition-all duration-200 ease-out">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Learn Section */}
                    <div>
                      <h3 className="font-semibold text-blue-100 text-base mb-4">Learn</h3>
                      <div className="space-y-3">
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          Blog
                        </a>
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          History
                        </a>
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          Cases
                        </a>
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          Articles
                        </a>
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          University
                        </a>
                      </div>
                    </div>

                    {/* Support Section */}
                    <div>
                      <h3 className="font-semibold text-blue-100 text-base mb-4">Support</h3>
                      <div className="space-y-3">
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          Documentation
                        </a>
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          Help Center
                        </a>
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          Community
                        </a>
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          Status Page
                        </a>
                        <a href="#" className="block text-blue-200/70 hover:text-blue-200 transition-colors text-sm">
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link to="/" className="text-blue-100/90 hover:text-blue-200 transition-colors font-medium text-base">
              Pricing
            </Link>
            <Link to="/" className="text-blue-100/90 hover:text-blue-200 transition-colors font-medium text-base">
              Contacts
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            to="/signup"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2.5 rounded-full hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl text-base hover:scale-105"
          >
            Try for free →
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default FloatingNavbar;
