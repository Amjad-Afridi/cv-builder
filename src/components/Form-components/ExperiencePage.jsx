import React, { useState, useEffect } from 'react';
import { Briefcase, ArrowRight, ArrowLeft, CheckCircle2, Plus, Trash2, Calendar, MapPin, Building2, FileText, AlertCircle, User, Shield, Zap, Award, Sparkles, Star, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const ExperiencePage = ({ cvData, setCvData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [activeExperience, setActiveExperience] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Enhanced SEO meta tags
  useEffect(() => {
    document.title = 'Work Experience - Professional CV Builder | CV Builder Pro';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Add your professional work experience to create a compelling CV. Highlight your achievements and career progression with our easy-to-use builder.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Add your professional work experience to create a compelling CV. Highlight your achievements and career progression with our easy-to-use builder.';
      document.head.appendChild(meta);
    }
  }, []);

  const handleInputChange = (index, field, value) => {
    setCvData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
    
    // Clear error when user starts typing
    if (errors[`${index}-${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`${index}-${field}`]: ''
      }));
    }
  };

  const handleCurrentJobChange = (index, isChecked) => {
    setCvData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === index ? { ...exp, current: isChecked, endDate: isChecked ? '' : exp.endDate } : exp
      )
    }));
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experiences: [...prev.experiences, {
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    }));
    setActiveExperience(cvData.experiences.length);
  };

  const removeExperience = (index) => {
    if (cvData.experiences.length > 1) {
      setCvData(prev => ({
        ...prev,
        experiences: prev.experiences.filter((_, i) => i !== index)
      }));
      if (activeExperience >= cvData.experiences.length - 1) {
        setActiveExperience(Math.max(0, activeExperience - 1));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    cvData.experiences.forEach((exp, index) => {
      if (!exp.jobTitle.trim()) {
        newErrors[`${index}-jobTitle`] = 'Job title is required';
      }
      if (!exp.company.trim()) {
        newErrors[`${index}-company`] = 'Company name is required';
      }
      if (!exp.startDate.trim()) {
        newErrors[`${index}-startDate`] = 'Start date is required';
      }
      if (!exp.current && !exp.endDate.trim()) {
        newErrors[`${index}-endDate`] = 'End date is required for past positions';
      }
      if (!exp.description.trim()) {
        newErrors[`${index}-description`] = 'Job description is required';
      } else if (exp.description.trim().length < 50) {
        newErrors[`${index}-description`] = 'Description should be at least 50 characters';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/education');
    }
  };

  const handleBack = () => {
    navigate('/professional-info');
  };

  const getCompletedFields = () => {
    return cvData.experiences.reduce((total, exp) => {
      let completed = 0;
      if (exp.jobTitle.trim()) completed++;
      if (exp.company.trim()) completed++;
      if (exp.location.trim()) completed++;
      if (exp.startDate.trim()) completed++;
      if (exp.current || exp.endDate.trim()) completed++;
      if (exp.description.trim() && exp.description.length >= 50) completed++;
      return total + completed;
    }, 0);
  };

  const totalPossibleFields = cvData.experiences.length * 6;
  const completedFields = getCompletedFields();
  const progressPercentage = totalPossibleFields > 0 ? (completedFields / totalPossibleFields) * 100 : 0;

  const hasRequiredFields = cvData.experiences.every(exp => 
    exp.jobTitle.trim() && exp.company.trim() && exp.startDate.trim() && 
    (exp.current || exp.endDate.trim()) && exp.description.trim().length >= 50
  );

  const steps = [
    { id: 1, name: "Personal Info", current: false, completed: true },
    { id: 2, name: "Professional Info", current: false, completed: true },
    { id: 3, name: "Work Experience", current: true, completed: false },
    { id: 4, name: "Education", current: false, completed: false },
    { id: 5, name: "Skills", current: false, completed: false },
    { id: 6, name: "Additional Info", current: false, completed: false }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Achievement-Focused",
      description: "Highlight your professional accomplishments with our guided format",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "ATS Optimization",
      description: "Our system helps format your experience for applicant tracking systems",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Professional Formatting",
      description: "Create polished experience sections that impress recruiters",
      color: "from-green-500 to-emerald-600"
    }
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
                <span className="text-sm text-gray-600">Step 3 of 6</span>
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
                Experience Writing Tips
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Work Experience</h2>
                      <p className="text-gray-600 text-lg">Showcase your professional journey and key achievements</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={addExperience}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Experience
                  </button>
                </div>
              </div>

              {/* Experience Tabs */}
              {cvData.experiences.length > 1 && (
                <div className="px-8 pt-6 border-b border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {cvData.experiences.map((exp, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveExperience(index)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeExperience === index
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {exp.jobTitle || exp.company || `Experience ${index + 1}`}
                        {exp.current && (
                          <span className="ml-2 px-2 py-0.5 bg-white/20 text-white/90 text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Form */}
              <div className="p-8">
                {cvData.experiences.map((experience, index) => (
                  activeExperience === index && (
                    <div key={index} className="space-y-6">
                      {/* Experience Header */}
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-gray-800">
                          Experience {index + 1}
                        </h3>
                        {cvData.experiences.length > 1 && (
                          <button
                            onClick={() => removeExperience(index)}
                            className="flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                          {/* Job Title */}
                          <div className="group">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                              <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                              Job Title *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={experience.jobTitle}
                                onChange={(e) => handleInputChange(index, 'jobTitle', e.target.value)}
                                className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                                  ${errors[`${index}-jobTitle`] 
                                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                                    : experience.jobTitle
                                      ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                      : 'border-gray-200 bg-white'
                                  }`}
                                placeholder="e.g., Senior Software Engineer"
                              />
                              {experience.jobTitle && !errors[`${index}-jobTitle`] && (
                                <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                              )}
                            </div>
                            {errors[`${index}-jobTitle`] && (
                              <p className="mt-2 text-sm text-red-600 flex items-center">
                                <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                                {errors[`${index}-jobTitle`]}
                              </p>
                            )}
                          </div>

                          {/* Location */}
                          <div className="group">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                              Location
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={experience.location}
                                onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                                className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                                  ${experience.location
                                    ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                    : 'border-gray-200 bg-white'
                                  }`}
                                placeholder="e.g., New York, NY or Remote"
                              />
                              {experience.location && (
                                <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                              )}
                            </div>
                          </div>

                          {/* Start Date */}
                          <div className="group">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                              Start Date *
                            </label>
                            <div className="relative">
                              <input
                                type="month"
                                value={experience.startDate}
                                onChange={(e) => handleInputChange(index, 'startDate', e.target.value)}
                                className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                                  ${errors[`${index}-startDate`] 
                                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                                    : experience.startDate
                                      ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                      : 'border-gray-200 bg-white'
                                  }`}
                              />
                              {experience.startDate && !errors[`${index}-startDate`] && (
                                <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                              )}
                            </div>
                            {errors[`${index}-startDate`] && (
                              <p className="mt-2 text-sm text-red-600 flex items-center">
                                <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                                {errors[`${index}-startDate`]}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                          {/* Company */}
                          <div className="group">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                              <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                              Company *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={experience.company}
                                onChange={(e) => handleInputChange(index, 'company', e.target.value)}
                                className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                                  ${errors[`${index}-company`] 
                                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                                    : experience.company
                                      ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                      : 'border-gray-200 bg-white'
                                  }`}
                                placeholder="e.g., Google, Microsoft, Startup Inc."
                              />
                              {experience.company && !errors[`${index}-company`] && (
                                <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                              )}
                            </div>
                            {errors[`${index}-company`] && (
                              <p className="mt-2 text-sm text-red-600 flex items-center">
                                <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                                {errors[`${index}-company`]}
                              </p>
                            )}
                          </div>

                          {/* Current Job Checkbox */}
                          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <input
                              type="checkbox"
                              id={`current-${index}`}
                              checked={experience.current}
                              onChange={(e) => handleCurrentJobChange(index, e.target.checked)}
                              className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label htmlFor={`current-${index}`} className="text-sm font-medium text-blue-900">
                              I currently work here
                            </label>
                          </div>

                          {/* End Date */}
                          {!experience.current && (
                            <div className="group">
                              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                End Date *
                              </label>
                              <div className="relative">
                                <input
                                  type="month"
                                  value={experience.endDate}
                                  onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
                                  className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                                    ${errors[`${index}-endDate`] 
                                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                                      : experience.endDate
                                        ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                        : 'border-gray-200 bg-white'
                                    }`}
                                />
                                {experience.endDate && !errors[`${index}-endDate`] && (
                                  <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                                )}
                              </div>
                              {errors[`${index}-endDate`] && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                  <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                                  {errors[`${index}-endDate`]}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Job Description */}
                      <div className="group">
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <FileText className="w-4 h-4 mr-2 text-gray-400" />
                          Job Description & Achievements *
                        </label>
                        <div className="relative">
                          <textarea
                            value={experience.description}
                            onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                            rows="6"
                            className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400 resize-none
                              ${errors[`${index}-description`] 
                                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                                : experience.description && experience.description.length >= 50
                                  ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                  : 'border-gray-200 bg-white'
                              }`}
                            placeholder="• Describe your key responsibilities and achievements
• Use bullet points for better readability
• Include specific metrics and results
• Mention technologies, tools, or methodologies
• Highlight leadership experience"
                          />
                          {experience.description && experience.description.length >= 50 && !errors[`${index}-description`] && (
                            <CheckCircle2 className="absolute right-3 top-6 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div>
                            {errors[`${index}-description`] && (
                              <p className="text-sm text-red-600 flex items-center">
                                <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                                {errors[`${index}-description`]}
                              </p>
                            )}
                            {experience.description && experience.description.length >= 50 && !errors[`${index}-description`] && (
                              <p className="text-sm text-green-600 flex items-center">
                                <span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mr-2">✓</span>
                                Strong description!
                              </p>
                            )}
                          </div>
                          <span className={`text-sm font-medium ${
                            errors[`${index}-description`] 
                              ? 'text-red-500' 
                              : experience.description.length < 50 
                                ? 'text-gray-500' 
                                : 'text-green-600'
                          }`}>
                            {experience.description.length}/50 min
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>

              {/* Enhanced Professional Tips */}
              <div className="mx-8 mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <h3 className="font-semibold text-blue-900 mb-4 flex items-center text-lg">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  💡 Professional Experience Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3 text-sm text-blue-800">
                    <div className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                      <span>Start each bullet point with strong action verbs (Developed, Led, Implemented)</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                      <span>Quantify your achievements with specific numbers, percentages, or metrics</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                      <span>Focus on results and impact rather than just listing duties</span>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm text-blue-800">
                    <div className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                      <span>Tailor your descriptions to match the job you're applying for</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                      <span>Keep descriptions concise but comprehensive (3-5 bullet points per role)</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                      <span>Include relevant keywords from job descriptions</span>
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
                    Back to Professional Info
                  </button>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                      {completedFields}/{totalPossibleFields} fields completed
                    </div>
                    <button
                      onClick={handleNext}
                      className={`flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                        hasRequiredFields
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-2xl'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!hasRequiredFields}
                    >
                      Continue to Education
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

export default ExperiencePage;