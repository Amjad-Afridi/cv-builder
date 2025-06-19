import React, { useState } from 'react';
import { User, ArrowRight, CheckCircle, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const PersonalInfoPage = ({ cvData, setCvData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isValidated, setIsValidated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCvData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!cvData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!cvData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!cvData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cvData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!cvData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    setIsValidated(isValid);
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/professional-info');
    }
  };

  const completedFields = Object.values({
    firstName: cvData.firstName,
    lastName: cvData.lastName,
    email: cvData.email,
    phone: cvData.phone,
    city: cvData.city,
    country: cvData.country
  }).filter(field => field && field.trim()).length;

  const totalFields = 6;
  const progressPercentage = (completedFields / totalFields) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Progress */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="w-16 h-1 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold">2</div>
              <div className="w-16 h-1 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold">3</div>
              <div className="w-16 h-1 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold">4</div>
              <div className="w-16 h-1 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold">5</div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Personal Information</h1>
          <p className="text-lg text-gray-600 mb-4">Let's start with your basic details</p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{completedFields}/{totalFields} fields completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Basic Details</h2>
              <p className="text-gray-600">This information will appear at the top of your CV</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* First Name */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <User className="w-4 h-4 mr-2 text-gray-500" />
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={cvData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                    ${errors.firstName 
                      ? 'border-red-400 focus:border-red-500' 
                      : cvData.firstName 
                        ? 'border-green-400 focus:border-green-500' 
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.firstName}
                  </p>
                )}
                {cvData.firstName && !errors.firstName && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Looks good!
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={cvData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                    ${errors.email 
                      ? 'border-red-400 focus:border-red-500' 
                      : cvData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cvData.email)
                        ? 'border-green-400 focus:border-green-500' 
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.email}
                  </p>
                )}
                {cvData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cvData.email) && !errors.email && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Valid email address
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={cvData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                    ${cvData.city 
                      ? 'border-green-400 focus:border-green-500' 
                      : 'border-gray-300 focus:border-blue-500'
                    }`}
                  placeholder="Enter your city"
                />
                {cvData.city && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Added successfully
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Last Name */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <User className="w-4 h-4 mr-2 text-gray-500" />
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={cvData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                    ${errors.lastName 
                      ? 'border-red-400 focus:border-red-500' 
                      : cvData.lastName 
                        ? 'border-green-400 focus:border-green-500' 
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.lastName}
                  </p>
                )}
                {cvData.lastName && !errors.lastName && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Looks good!
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={cvData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                    ${errors.phone 
                      ? 'border-red-400 focus:border-red-500' 
                      : cvData.phone 
                        ? 'border-green-400 focus:border-green-500' 
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.phone}
                  </p>
                )}
                {cvData.phone && !errors.phone && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Looks good!
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Globe className="w-4 h-4 mr-2 text-gray-500" />
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={cvData.country}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                    ${cvData.country 
                      ? 'border-green-400 focus:border-green-500' 
                      : 'border-gray-300 focus:border-blue-500'
                    }`}
                  placeholder="Enter your country"
                />
                {cvData.country && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Added successfully
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
              <span className="w-5 h-5 mr-2">💡</span>
              Pro Tips
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Use a professional email address that includes your name</li>
              <li>• Include your country code in your phone number for international applications</li>
              <li>• Make sure your contact information is current and professional</li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <Link 
              to="/"
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              ← Back to Home
            </Link>
            
            <button
              onClick={handleNext}
              className={`flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg transform hover:scale-105
                ${completedFields >= 4
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              disabled={completedFields < 4}
            >
              Next: Professional Info
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;