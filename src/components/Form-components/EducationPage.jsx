import React, { useState, useEffect } from 'react';
import { GraduationCap, ArrowRight, ArrowLeft, CheckCircle2, Plus, Trash2, Calendar, MapPin, BookOpen, Award, AlertCircle, Shield, Zap, Sparkles, Star, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const EducationPage = ({ cvData, setCvData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [activeEducation, setActiveEducation] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Enhanced SEO meta tags
  useEffect(() => {
    document.title = 'Education - Professional CV Builder | CV Builder Pro';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Add your educational background to create a comprehensive CV. Highlight your degrees, institutions, and academic achievements with our easy-to-use builder.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Add your educational background to create a comprehensive CV. Highlight your degrees, institutions, and academic achievements with our easy-to-use builder.';
      document.head.appendChild(meta);
    }
  }, []);

  const handleInputChange = (index, field, value) => {
    setCvData(prev => ({
      ...prev,
      educations: prev.educations.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
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

  const handleCurrentStudyChange = (index, isChecked) => {
    setCvData(prev => ({
      ...prev,
      educations: prev.educations.map((edu, i) => 
        i === index ? { ...edu, current: isChecked, endYear: isChecked ? '' : edu.endYear } : edu
      )
    }));
  };

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      educations: [...prev.educations, {
        degree: '',
        institution: '',
        fieldOfStudy: '',
        startYear: '',
        endYear: '',
        current: false,
        gpa: '',
        location: '',
        description: '',
        honors: ''
      }]
    }));
    setActiveEducation(cvData.educations.length);
  };

  const removeEducation = (index) => {
    if (cvData.educations.length > 1) {
      setCvData(prev => ({
        ...prev,
        educations: prev.educations.filter((_, i) => i !== index)
      }));
      if (activeEducation >= cvData.educations.length - 1) {
        setActiveEducation(Math.max(0, activeEducation - 1));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    cvData.educations.forEach((edu, index) => {
      if (!edu.degree?.trim()) {
        newErrors[`${index}-degree`] = 'Degree/qualification is required';
      }
      if (!edu.institution?.trim()) {
        newErrors[`${index}-institution`] = 'Institution name is required';
      }
      if (!edu.fieldOfStudy?.trim()) {
        newErrors[`${index}-fieldOfStudy`] = 'Field of study is required';
      }
      if (!edu.startYear?.trim()) {
        newErrors[`${index}-startYear`] = 'Start year is required';
      }
      if (!edu.current && !edu.endYear?.trim()) {
        newErrors[`${index}-endYear`] = 'End year is required for completed education';
      }
      
      // Validate year format
      const yearPattern = /^\d{4}$/;
      if (edu.startYear && !yearPattern.test(edu.startYear)) {
        newErrors[`${index}-startYear`] = 'Please enter a valid 4-digit year';
      }
      if (edu.endYear && !yearPattern.test(edu.endYear)) {
        newErrors[`${index}-endYear`] = 'Please enter a valid 4-digit year';
      }
      
      // Validate year range
      if (edu.startYear && edu.endYear && parseInt(edu.startYear) > parseInt(edu.endYear)) {
        newErrors[`${index}-endYear`] = 'End year must be after start year';
      }
      
      // Validate GPA if provided
      if (edu.gpa && (isNaN(edu.gpa) || parseFloat(edu.gpa) < 0 || parseFloat(edu.gpa) > 4.0)) {
        newErrors[`${index}-gpa`] = 'Please enter a valid GPA (0.0 - 4.0)';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/skills');
    }
  };

  const handleBack = () => {
    navigate('/experience');
  };

  const getCompletedFields = () => {
    return cvData.educations.reduce((total, edu) => {
      let completed = 0;
      if (edu.degree?.trim()) completed++;
      if (edu.institution?.trim()) completed++;
      if (edu.fieldOfStudy?.trim()) completed++;
      if (edu.startYear?.trim()) completed++;
      if (edu.current || edu.endYear?.trim()) completed++;
      if (edu.location?.trim()) completed++;
      if (edu.gpa?.trim()) completed++;
      if (edu.description?.trim()) completed++;
      if (edu.honors?.trim()) completed++;
      return total + completed;
    }, 0);
  };

  const totalPossibleFields = cvData.educations.length * 9;
  const completedFields = getCompletedFields();
  const progressPercentage = totalPossibleFields > 0 ? (completedFields / totalPossibleFields) * 100 : 0;

  const hasRequiredFields = cvData.educations.every(edu => 
    edu.degree?.trim() && edu.institution?.trim() && edu.fieldOfStudy?.trim() && 
    edu.startYear?.trim() && (edu.current || edu.endYear?.trim())
  );

  const degreeOptions = [
    'High School Diploma',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctoral Degree (PhD)',
    'Professional Degree (JD, MD, etc.)',
    'Certificate',
    'Diploma',
    'Other'
  ];

  const steps = [
    { id: 1, name: "Personal Info", current: false, completed: true },
    { id: 2, name: "Professional Info", current: false, completed: true },
    { id: 3, name: "Work Experience", current: false, completed: true },
    { id: 4, name: "Education", current: true, completed: false },
    { id: 5, name: "Skills", current: false, completed: false },
    { id: 6, name: "Additional Info", current: false, completed: false }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Academic Excellence",
      description: "Showcase your educational achievements with our structured format",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Degree Validation",
      description: "Our system helps format your education for maximum impact",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Academic Branding",
      description: "Create polished education sections that impress recruiters",
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
                <span className="text-sm text-gray-600">Step 4 of 6</span>
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
                Education Tips
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
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Education</h2>
                      <p className="text-gray-600 text-lg">Showcase your academic background and achievements</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={addEducation}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Education
                  </button>
                </div>
              </div>

              {/* Education Tabs */}
              {cvData.educations.length > 1 && (
                <div className="px-8 pt-6 border-b border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {cvData.educations.map((edu, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveEducation(index)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeEducation === index
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {edu.degree || edu.institution || `Education ${index + 1}`}
                        {edu.current && (
                          <span className="ml-2 px-2 py-0.5 bg-white/20 text-white/90 text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Form */}
              <div className="p-8">
                {cvData.educations.map((education, index) => (
                  activeEducation === index && (
                    <div key={index} className="space-y-6">
                      {/* Education Header */}
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-gray-800">
                          Education {index + 1}
                        </h3>
                        {cvData.educations.length > 1 && (
                          <button
                            onClick={() => removeEducation(index)}
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
                          {/* Degree */}
                          <div className="group">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                              <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                              Degree/Qualification *
                            </label>
                            <div className="relative">
                              <select
                                value={education.degree}
                                onChange={(e) => handleInputChange(index, 'degree', e.target.value)}
                                className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                                ${errors[`${index}-degree`] 
                                  ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                                  : education.degree
                                    ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                    : 'border-gray-200 bg-white'
                                }`}
                              >
                                <option value="">Select your degree</option>
                                {degreeOptions.map((degree) => (
                                  <option key={degree} value={degree}>{degree}</option>
                                ))}
                              </select>
                              {education.degree && !errors[`${index}-degree`] && (
                                <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                              )}
                            </div>
                            {errors[`${index}-degree`] && (
                              <p className="mt-2 text-sm text-red-600 flex items-center">
                                <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                                {errors[`${index}-degree`]}
                              </p>
                            )}
                          </div>

                          {/* Field of Study */}
                          <div className="group">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                              <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
                              Field of Study *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={education.fieldOfStudy}
                                onChange={(e) => handleInputChange(index, 'fieldOfStudy', e.target.value)}
                                className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                                  ${errors[`${index}-fieldOfStudy`] 
                                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                                    : education.fieldOfStudy
                                      ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                      : 'border-gray-200 bg-white'
                                  }`}
                                placeholder="e.g., Computer Science, Business Administration"
                              />
                              {education.fieldOfStudy && !errors[`${index}-fieldOfStudy`] && (
                                <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                              )}
                            </div>
                            {errors[`${index}-fieldOfStudy`] && (
                              <p className="mt-2 text-sm text-red-600 flex items-center">
                                <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                                {errors[`${index}-fieldOfStudy`]}
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
                                value={education.location}
                                onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                                className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                                  ${education.location
                                    ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                    : 'border-gray-200 bg-white'
                                  }`}
                                placeholder="e.g., Boston, MA or Online"
                              />
                              {education.location && (
                                <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                              )}
                            </div>
                          </div>

                          {/* Start Year */}
                          <div className="group">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                              Start Year *
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                min="1950"
                                max="2030"
                                value={education.startYear}
                                onChange={(e) => handleInputChange(index, 'startYear', e.target.value)}
                                className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                                  ${errors[`${index}-startYear`] 
                                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                                    : education.startYear
                                      ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                      : 'border-gray-200 bg-white'
                                  }`}
                                placeholder="e.g., 2020"
                              />
                              {education.startYear && !errors[`${index}-startYear`] && (
                                <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                              )}
                            </div>
                            {errors[`${index}-startYear`] && (
                              <p className="mt-2 text-sm text-red-600 flex items-center">
                                <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                                {errors[`${index}-startYear`]}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                          {/* Institution */}
                          <div className="group">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                              <Award className="w-4 h-4 mr-2 text-gray-400" />
                              Institution *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={education.institution}
                                onChange={(e) => handleInputChange(index, 'institution', e.target.value)}
                                className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                                  ${errors[`${index}-institution`] 
                                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                                    : education.institution
                                      ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                      : 'border-gray-200 bg-white'
                                  }`}
                                placeholder="e.g., Harvard University, Community College"
                              />
                              {education.institution && !errors[`${index}-institution`] && (
                                <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                              )}
                            </div>
                            {errors[`${index}-institution`] && (
                              <p className="mt-2 text-sm text-red-600 flex items-center">
                                <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                                {errors[`${index}-institution`]}
                              </p>
                            )}
                          </div>

                          {/* GPA */}
                          <div className="group">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                              <span className="w-4 h-4 mr-2 text-gray-400">📊</span>
                              GPA (Optional)
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                max="4.0"
                                value={education.gpa}
                                onChange={(e) => handleInputChange(index, 'gpa', e.target.value)}
                                className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                                  ${errors[`${index}-gpa`] 
                                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                                    : education.gpa
                                      ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                      : 'border-gray-200 bg-white'
                                  }`}
                                placeholder="e.g., 3.75 (4.0 scale)"
                              />
                              {education.gpa && !errors[`${index}-gpa`] && (
                                <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                              )}
                            </div>
                            {errors[`${index}-gpa`] && (
                              <p className="mt-2 text-sm text-red-600 flex items-center">
                                <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                                {errors[`${index}-gpa`]}
                              </p>
                            )}
                          </div>

                          {/* Currently Studying Checkbox */}
                          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <input
                              type="checkbox"
                              id={`current-study-${index}`}
                              checked={education.current}
                              onChange={(e) => handleCurrentStudyChange(index, e.target.checked)}
                              className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label htmlFor={`current-study-${index}`} className="text-sm font-medium text-blue-900">
                              I am currently studying here
                            </label>
                          </div>

                          {/* End Year */}
                          {!education.current && (
                            <div className="group">
                              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                End Year *
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  min="1950"
                                  max="2030"
                                  value={education.endYear}
                                  onChange={(e) => handleInputChange(index, 'endYear', e.target.value)}
                                  className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                                    ${errors[`${index}-endYear`] 
                                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                                      : education.endYear
                                        ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                        : 'border-gray-200 bg-white'
                                    }`}
                                  placeholder="e.g., 2024"
                                />
                                {education.endYear && !errors[`${index}-endYear`] && (
                                  <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                                )}
                              </div>
                              {errors[`${index}-endYear`] && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                  <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                                  {errors[`${index}-endYear`]}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Honors and Awards */}
                      <div className="group">
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <Award className="w-4 h-4 mr-2 text-gray-400" />
                          Honors & Awards (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={education.honors}
                            onChange={(e) => handleInputChange(index, 'honors', e.target.value)}
                            className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                              ${education.honors
                                ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                : 'border-gray-200 bg-white'
                              }`}
                            placeholder="e.g., Magna Cum Laude, Dean's List, Academic Scholarship"
                          />
                          {education.honors && (
                            <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                          )}
                        </div>
                      </div>

                      {/* Additional Description */}
                      <div className="group">
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
                          Additional Details (Optional)
                        </label>
                        <div className="relative">
                          <textarea
                            value={education.description}
                            onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                            rows="4"
                            className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400 resize-none
                              ${education.description
                                ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                : 'border-gray-200 bg-white'
                              }`}
                            placeholder="• Relevant coursework, projects, or thesis topics
• Leadership roles in student organizations
• Research experience or publications
• Study abroad programs
• Notable achievements or activities"
                          />
                          {education.description && (
                            <CheckCircle2 className="absolute right-3 top-6 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                          )}
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
                  💡 Education Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3 text-sm text-blue-800">
                    <div className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                      <span>List education in reverse chronological order (most recent first)</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                      <span>Include GPA only if it's 3.5 or higher (on a 4.0 scale)</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                      <span>Mention relevant coursework for entry-level positions</span>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm text-blue-800">
                    <div className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                      <span>Include honors, awards, and scholarships to stand out</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                      <span>For high school: only include if you don't have higher education</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                      <span>Add certifications and online courses in additional details</span>
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
                    Back to Experience
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
                      Continue to Skills
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

export default EducationPage;