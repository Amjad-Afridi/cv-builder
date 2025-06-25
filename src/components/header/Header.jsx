import React, { useState } from 'react';
import { FileText, Menu, X, Star, Award, Users, Zap } from 'lucide-react';

const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo - Fixed responsive design */}
          <button 
            onClick={() => handleNavClick('/')} 
            className="flex items-center group cursor-pointer flex-shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300 group-hover:shadow-xl">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            {/* Logo text - properly responsive */}
            <div className="ml-2 sm:ml-3">
              <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                <span className="sm:hidden">CV Builder</span>
                <span className="hidden sm:inline">CV Builder Pro</span>
              </h1>
              {/* <p className="text-xs sm:text-sm text-gray-500 -mt-1 hidden sm:block lg:block">
                Professional Resume Builder
              </p> */}
            </div>
          </button>

          {/* Desktop Navigation - Better spacing */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button 
              onClick={() => handleNavClick('/templates')}
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium flex items-center px-3 py-2 rounded-lg hover:bg-blue-50 group"
            >
              <Award className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              <span>Templates</span>
            </button>
            <button 
              onClick={() => handleNavClick('/examples')}
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium flex items-center px-3 py-2 rounded-lg hover:bg-blue-50 group"
            >
              <Star className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              <span>Examples</span>
            </button>
            <button 
              onClick={() => handleNavClick('/features')}
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium flex items-center px-3 py-2 rounded-lg hover:bg-blue-50 group"
            >
              <Zap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              <span>Features</span>
            </button>
            <button 
              onClick={() => handleNavClick('/support')}
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium flex items-center px-3 py-2 rounded-lg hover:bg-blue-50 group"
            >
              <Users className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              <span>Support</span>
            </button>
            <button 
              onClick={() => handleNavClick('/')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 xl:px-6 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ml-4"
            >
              <span className="hidden xl:inline">Build CV</span>
              <span className="xl:hidden">Build</span>
            </button>
          </nav>

          {/* Tablet Navigation - Icon only with tooltips */}
          <nav className="hidden md:flex lg:hidden items-center space-x-1">
            <button 
              onClick={() => handleNavClick('/templates')}
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 p-2 rounded-lg hover:bg-blue-50 group relative"
              title="Templates"
            >
              <Award className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
            <button 
              onClick={() => handleNavClick('/examples')}
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 p-2 rounded-lg hover:bg-blue-50 group relative"
              title="Examples"
            >
              <Star className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
            <button 
              onClick={() => handleNavClick('/features')}
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 p-2 rounded-lg hover:bg-blue-50 group relative"
              title="Features"
            >
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
            <button 
              onClick={() => handleNavClick('/support')}
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 p-2 rounded-lg hover:bg-blue-50 group relative"
              title="Support"
            >
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
            <button 
              onClick={() => handleNavClick('/')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ml-2"
            >
              Build
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Fixed positioning and styling */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <nav className="py-4 space-y-1">
              <button 
                onClick={() => handleNavClick('/templates')}
                className="flex items-center w-full text-left py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium rounded-lg mx-2"
              >
                <Award className="w-5 h-5 mr-3 text-gray-400" />
                Templates
              </button>
              <button 
                onClick={() => handleNavClick('/examples')}
                className="flex items-center w-full text-left py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium rounded-lg mx-2"
              >
                <Star className="w-5 h-5 mr-3 text-gray-400" />
                Examples
              </button>
              <button 
                onClick={() => handleNavClick('/features')}
                className="flex items-center w-full text-left py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium rounded-lg mx-2"
              >
                <Zap className="w-5 h-5 mr-3 text-gray-400" />
                Features
              </button>
              <button 
                onClick={() => handleNavClick('/support')}
                className="flex items-center w-full text-left py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium rounded-lg mx-2"
              >
                <Users className="w-5 h-5 mr-3 text-gray-400" />
                Support
              </button>
              <div className="px-2 pt-2">
                <button 
                  onClick={() => handleNavClick('/')}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-semibold text-center hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md"
                >
                  Build CV
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;