import React from 'react';
import { FileText, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Star, Shield, Award, Users } from 'lucide-react';

const Footer = ({ onNavigate }) => {
  const handleNavClick = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="ml-3">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  CV Builder Pro
                </h3>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Create professional, ATS-friendly resumes that get you hired. Trusted by over 1 million job seekers worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleNavClick('/')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Build Resume
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('/templates')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Resume Templates
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('/examples')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Resume Examples
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('/career-advice')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Career Advice
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('/cover-letter')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Cover Letter Builder
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleNavClick('/help')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('/contact')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('/faq')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('/privacy')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('/terms')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 text-sm">
                <Mail className="w-4 h-4 mr-3 text-blue-400" />
                support@cvbuilderpro.com
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <Phone className="w-4 h-4 mr-3 text-blue-400" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-start text-gray-300 text-sm">
                <MapPin className="w-4 h-4 mr-3 mt-0.5 text-blue-400" />
                123 Business Ave, Suite 100<br />
                New York, NY 10001
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-xs text-gray-400">
                <Shield className="w-4 h-4 mr-2 text-green-400" />
                SSL Secured
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <Award className="w-4 h-4 mr-2 text-yellow-400" />
                Industry Leading
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-white mb-1">1M+</div>
              <div className="text-sm text-gray-400">Resumes Created</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">95%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-gray-400">Companies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-2 md:mb-0">
              © {currentYear} CV Builder Pro. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <button 
                onClick={() => handleNavClick('/sitemap')}
                className="hover:text-white transition-colors duration-200"
              >
                Sitemap
              </button>
              <button 
                onClick={() => handleNavClick('/accessibility')}
                className="hover:text-white transition-colors duration-200"
              >
                Accessibility
              </button>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-400" />
                <span>Trusted Platform</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;