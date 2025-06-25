import React, { useState, useEffect } from 'react';
import { Briefcase, ArrowRight, ArrowLeft, CheckCircle2, Globe, Github, Linkedin, FileText, Target, User, Shield, Zap, Award, Sparkles, Star, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const ProfessionalInfoPage = ({ cvData, setCvData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [characterCount, setCharacterCount] = useState(cvData.professionalSummary.length);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Enhanced SEO meta tags
  useEffect(() => {
    document.title = 'Professional Information - Build Your Perfect CV | CV Builder Pro';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Define your professional identity with our CV builder. Craft a compelling summary and showcase your expertise to potential employers. Create ATS-friendly resumes that get noticed.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Define your professional identity with our CV builder. Craft a compelling summary and showcase your expertise to potential employers. Create ATS-friendly resumes that get noticed.';
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

    addMetaTag('keywords', 'professional summary, job title, portfolio, GitHub, LinkedIn, CV builder, resume builder');
    addMetaTag('og:title', 'Professional Information - CV Builder Pro');
    addMetaTag('og:description', 'Define your professional identity with our CV builder. Craft a compelling summary and showcase your expertise.');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'professionalSummary') {
      setCharacterCount(value.length);
    }
    
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
    
    if (!cvData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }
    
    if (!cvData.professionalSummary.trim()) {
      newErrors.professionalSummary = 'Professional summary is required';
    } else if (cvData.professionalSummary.trim().length < 50) {
      newErrors.professionalSummary = 'Professional summary should be at least 50 characters';
    } else if (cvData.professionalSummary.trim().length > 500) {
      newErrors.professionalSummary = 'Professional summary should not exceed 500 characters';
    }
    
    // URL validation
    const urlPattern = /^https?:\/\/.+/;
    if (cvData.portfolioUrl && !urlPattern.test(cvData.portfolioUrl)) {
      newErrors.portfolioUrl = 'Please enter a valid URL (starting with http:// or https://)';
    }
    if (cvData.githubUrl && !urlPattern.test(cvData.githubUrl)) {
      newErrors.githubUrl = 'Please enter a valid GitHub URL';
    }
    if (cvData.linkedinUrl && !urlPattern.test(cvData.linkedinUrl)) {
      newErrors.linkedinUrl = 'Please enter a valid LinkedIn URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/experience');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const completedFields = Object.values({
    jobTitle: cvData.jobTitle,
    professionalSummary: cvData.professionalSummary,
    portfolioUrl: cvData.portfolioUrl,
    githubUrl: cvData.githubUrl,
    linkedinUrl: cvData.linkedinUrl
  }).filter(field => field && field.trim()).length;

  const totalFields = 5;
  const progressPercentage = (completedFields / totalFields) * 100;

  const steps = [
    { id: 1, name: "Personal Info", current: false, completed: true },
    { id: 2, name: "Professional Info", current: true, completed: false },
    { id: 3, name: "Work Experience", current: false, completed: false },
    { id: 4, name: "Education", current: false, completed: false },
    { id: 5, name: "Skills", current: false, completed: false },
    { id: 6, name: "Additional Info", current: false, completed: false }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Professional Branding",
      description: "Craft a compelling professional identity that stands out to recruiters and hiring managers",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "ATS Optimization",
      description: "Our system ensures your professional summary contains the right keywords for applicant tracking systems",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Networking Ready",
      description: "Properly formatted links make it easy for employers to check your professional profiles",
      color: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      {/* <section className="relative overflow-hidden mt-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center m-8">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Define Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Professional Brand</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Craft a compelling professional identity that showcases your expertise and attracts the right opportunities.
              </p>
            </div>
          </div>
        </div>
      </section> */}

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
                <span className="text-sm text-gray-600">Step 2 of 6</span>
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
                {steps.map((step) => (
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
                Professional Branding Tips
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
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Professional Information</h2>
                    <p className="text-gray-600 text-lg">Define your professional identity and showcase your expertise to potential employers</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Form */}
              <div className="px-8 py-8">
                <div className="space-y-8">
                  {/* Job Title */}
                  <div className="group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <Target className="w-4 h-4 mr-2 text-gray-400" />
                      Current Job Title / Desired Position *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="jobTitle"
                        value={cvData.jobTitle}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                          ${errors.jobTitle 
                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                            : cvData.jobTitle
                              ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                              : 'border-gray-200 bg-white'
                          }`}
                        placeholder="e.g., Senior Software Engineer, Marketing Director, Data Scientist"
                      />
                      {cvData.jobTitle && !errors.jobTitle && (
                        <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {errors.jobTitle && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                        {errors.jobTitle}
                      </p>
                    )}
                  </div>

                  {/* Professional Summary */}
                  <div className="group">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <FileText className="w-4 h-4 mr-2 text-gray-400" />
                      Professional Summary *
                    </label>
                    <div className="relative">
                      <textarea
                        name="professionalSummary"
                        value={cvData.professionalSummary}
                        onChange={handleInputChange}
                        rows="6"
                        className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400 resize-none
                          ${errors.professionalSummary 
                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                            : cvData.professionalSummary && cvData.professionalSummary.length >= 50
                              ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                              : 'border-gray-200 bg-white'
                          }`}
                        placeholder="Write a compelling summary of your professional background, key skills, achievements, and career goals. Aim for 3-5 concise paragraphs that highlight your unique value proposition..."
                      />
                      {cvData.professionalSummary && cvData.professionalSummary.length >= 50 && !errors.professionalSummary && (
                        <CheckCircle2 className="absolute right-3 top-6 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        {errors.professionalSummary && (
                          <p className="text-sm text-red-600 flex items-center">
                            <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                            {errors.professionalSummary}
                          </p>
                        )}
                      </div>
                      <span className={`text-sm font-medium ${
                        errors.professionalSummary 
                          ? 'text-red-500' 
                          : characterCount < 50 
                            ? 'text-gray-500' 
                            : characterCount > 500 
                              ? 'text-red-500' 
                              : 'text-green-600'
                      }`}>
                        {characterCount}/500
                      </span>
                    </div>
                  </div>

                  {/* URLs Section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Portfolio URL */}
                    <div className="group">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <Globe className="w-4 h-4 mr-2 text-gray-400" />
                        Portfolio URL
                      </label>
                      <div className="relative">
                        <input
                          type="url"
                          name="portfolioUrl"
                          value={cvData.portfolioUrl}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                            ${errors.portfolioUrl 
                              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                              : cvData.portfolioUrl && /^https?:\/\/.+/.test(cvData.portfolioUrl)
                                ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                : 'border-gray-200 bg-white'
                            }`}
                          placeholder="https://yourportfolio.com"
                        />
                        {cvData.portfolioUrl && /^https?:\/\/.+/.test(cvData.portfolioUrl) && !errors.portfolioUrl && (
                          <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                      </div>
                      {errors.portfolioUrl && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                          {errors.portfolioUrl}
                        </p>
                      )}
                    </div>

                    {/* GitHub URL */}
                    <div className="group">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <Github className="w-4 h-4 mr-2 text-gray-400" />
                        GitHub Profile
                      </label>
                      <div className="relative">
                        <input
                          type="url"
                          name="githubUrl"
                          value={cvData.githubUrl}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                            ${errors.githubUrl 
                              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                              : cvData.githubUrl && /^https?:\/\/.+/.test(cvData.githubUrl)
                                ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                : 'border-gray-200 bg-white'
                            }`}
                          placeholder="https://github.com/username"
                        />
                        {cvData.githubUrl && /^https?:\/\/.+/.test(cvData.githubUrl) && !errors.githubUrl && (
                          <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                      </div>
                      {errors.githubUrl && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                          {errors.githubUrl}
                        </p>
                      )}
                    </div>

                    {/* LinkedIn URL */}
                    <div className="group">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <Linkedin className="w-4 h-4 mr-2 text-gray-400" />
                        LinkedIn Profile
                      </label>
                      <div className="relative">
                        <input
                          type="url"
                          name="linkedinUrl"
                          value={cvData.linkedinUrl}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                            ${errors.linkedinUrl 
                              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                              : cvData.linkedinUrl && /^https?:\/\/.+/.test(cvData.linkedinUrl)
                                ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                : 'border-gray-200 bg-white'
                            }`}
                          placeholder="https://linkedin.com/in/username"
                        />
                        {cvData.linkedinUrl && /^https?:\/\/.+/.test(cvData.linkedinUrl) && !errors.linkedinUrl && (
                          <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                      </div>
                      {errors.linkedinUrl && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                          {errors.linkedinUrl}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Professional Tips */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                    <h3 className="font-semibold text-blue-900 mb-4 flex items-center text-lg">
                      <Star className="w-5 h-5 mr-2 text-yellow-500" />
                      💡 Professional Branding Tips
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3 text-sm text-blue-800">
                        <div className="flex items-start">
                          <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                          <span>Use a specific job title that matches your target role (e.g., "Senior UX Designer" instead of just "Designer")</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                          <span>Start your summary with a strong value proposition (e.g., "Results-driven marketing professional with 8+ years experience...")</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                          <span>Include 3-5 key achievements or skills that differentiate you</span>
                        </div>
                      </div>
                      <div className="space-y-3 text-sm text-blue-800">
                        <div className="flex items-start">
                          <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                          <span>Use metrics where possible (e.g., "Increased sales by 30%")</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                          <span>Include relevant keywords from job descriptions to optimize for ATS</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                          <span>Keep professional links updated and ensure they present a consistent brand</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Footer */}
              <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button 
                    onClick={handleBack}
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Personal Info
                  </button>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                      {completedFields}/{totalFields} fields completed
                    </div>
                    <button
                      onClick={handleNext}
                      className={`flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                        cvData.jobTitle && cvData.professionalSummary && cvData.professionalSummary.length >= 50
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-2xl'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!cvData.jobTitle || !cvData.professionalSummary || cvData.professionalSummary.length < 50}
                    >
                      Continue to Work Experience
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfessionalInfoPage;