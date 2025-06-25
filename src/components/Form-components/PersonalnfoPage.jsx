import React, { useState, useEffect } from 'react';
import { User, ArrowRight, Mail, Phone, MapPin, Globe, Shield, Clock, Star, CheckCircle2, Users, Briefcase, FileText, Zap, Target, TrendingUp, Award, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const PersonalInfoPage = ({ cvData, setCvData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Enhanced SEO meta tags
  useEffect(() => {
    document.title = 'Personal Information - Professional CV Builder | Create ATS-Friendly Resume | CV Builder Pro';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Start building your professional CV with our AI-powered resume builder. Create ATS-friendly resumes that get you hired. Trusted by 1M+ professionals. Free templates included.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Start building your professional CV with our AI-powered resume builder. Create ATS-friendly resumes that get you hired. Trusted by 1M+ professionals. Free templates included.';
      document.head.appendChild(meta);
    }

    // Add additional SEO meta tags
    const addMetaTag = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(property.startsWith('og:') ? 'property' : 'name', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    addMetaTag('keywords', 'resume builder, CV builder, professional resume, ATS resume, job application, career, employment');
    addMetaTag('author', 'CV Builder Pro');
    addMetaTag('robots', 'index, follow');
    addMetaTag('og:title', 'Professional CV Builder - Create Your Perfect Resume');
    addMetaTag('og:description', 'Build professional, ATS-friendly resumes that get you hired. Free templates, AI-powered suggestions, and expert tips.');
    addMetaTag('og:type', 'website');
    addMetaTag('twitter:card', 'summary_large_image');
    addMetaTag('twitter:title', 'Professional CV Builder - Create Your Perfect Resume');
    addMetaTag('twitter:description', 'Build professional, ATS-friendly resumes that get you hired.');

    // Structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "CV Builder Pro",
      "description": "Professional resume and CV builder application",
      "url": window.location.origin,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }, []);

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
    return Object.keys(newErrors).length === 0;
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

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Bank-Level Security",
      description: "Your data is encrypted with 256-bit SSL and never shared with third parties",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Builder",
      description: "Smart suggestions and auto-formatting to create professional resumes",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "ATS-Optimized",
      description: "Guaranteed to pass Applicant Tracking Systems used by 99% of companies",
      color: "from-blue-500 to-cyan-600"
    }
  ];

  const steps = [
    { id: 1, name: "Personal Info", current: true, completed: false },
    { id: 2, name: "Professional Info", current: false, completed: false },
    { id: 3, name: "Work Experience", current: false, completed: false },
    { id: 4, name: "Education", current: false, completed: false },
    { id: 5, name: "Skills", current: false, completed: false },
    { id: 6, name: "Additional Info", current: false, completed: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Enhanced */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Overview - Enhanced */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">Step 1 of 6</span>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {Math.round(progressPercentage)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              
              {/* Enhanced Step Indicators */}
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={step.id} className={`flex items-center text-sm transition-all duration-300 ${
                    step.current ? 'transform scale-105' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mr-3 transition-all duration-300 ${
                      step.current 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg' 
                        : step.completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step.completed ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                    </div>
                    <span className={`${step.current ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Features */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Why Choose CV Builder Pro?
              </h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {feature.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Enhanced */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Enhanced Header */}
              <div className="px-8 py-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Personal Information</h2>
                    <p className="text-gray-600 text-lg">Let's start with your basic contact details to create your professional profile</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Form */}
              <div className="px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* First Name */}
                  <div className="group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      First Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        value={cvData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                          ${errors.firstName 
                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-200 bg-white'
                          }`}
                        placeholder="Enter your first name"
                      />
                      {cvData.firstName && (
                        <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {errors.firstName && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      Last Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        value={cvData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                          ${errors.lastName 
                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-200 bg-white'
                          }`}
                        placeholder="Enter your last name"
                      />
                      {cvData.lastName && (
                        <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {errors.lastName && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={cvData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                          ${errors.email 
                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-200 bg-white'
                          }`}
                        placeholder="your.email@example.com"
                      />
                      {cvData.email && !errors.email && (
                        <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={cvData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                          ${errors.phone 
                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-200 bg-white'
                          }`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {cvData.phone && (
                        <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div className="group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      City
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="city"
                        value={cvData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400 bg-white"
                        placeholder="Enter your city"
                      />
                      {cvData.city && (
                        <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </div>

                  {/* Country */}
                  <div className="group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <Globe className="w-4 h-4 mr-2 text-gray-400" />
                      Country
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="country"
                        value={cvData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400 bg-white"
                        placeholder="Enter your country"
                      />
                      {cvData.country && (
                        <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced Professional Tips */}
                <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <h3 className="font-semibold text-blue-900 mb-4 flex items-center text-lg">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    💡 Professional Tips for Success
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3 text-sm text-blue-800">
                      <div className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                        <span>Use a professional email (firstname.lastname@domain.com)</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                        <span>Include country code for international applications</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                        <span>Keep contact information current and professional</span>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm text-blue-800">
                      <div className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                        <span>Use consistent formatting across all fields</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                        <span>Double-check spelling and grammar</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                        <span>Ensure phone number is easily readable</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Footer */}
              <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <Link 
                    to="/"
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center font-medium"
                  >
                    ← Back to Home
                  </Link>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                      {completedFields}/6 fields completed
                    </div>
                    <button
                      onClick={handleNext}
                      className={`flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                        completedFields >= 4
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-2xl'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={completedFields < 4}
                    >
                      Continue to Professional Info
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default PersonalInfoPage;