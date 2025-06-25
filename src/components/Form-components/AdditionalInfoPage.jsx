import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ArrowLeft, CheckCircle2, Plus, Trash2, 
  Globe, Award, Heart, Link, AlertCircle, Trophy, Star,
  ChevronDown, ChevronUp, Info, Sparkles, Zap, Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const AdditionalInfoPage = ({ cvData, setCvData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('languages');
  const [isVisible, setIsVisible] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Enhanced SEO meta tags
  useEffect(() => {
    document.title = 'Additional Information - Professional CV Builder | CV Builder Pro';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete your CV with additional information like languages, certifications, interests and references to stand out from the crowd.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Complete your CV with additional information like languages, certifications, interests and references to stand out from the crowd.';
      document.head.appendChild(meta);
    }
  }, []);

  // Additional information sections with enhanced metadata
  const additionalSections = {
    languages: {
      name: 'Languages',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      description: 'Showcase your multilingual abilities',
      placeholder: 'e.g., English, Spanish, French',
      tips: 'Include only languages you can use professionally'
    },
    certifications: {
      name: 'Certifications',
      icon: Award,
      color: 'from-green-500 to-emerald-500',
      description: 'Professional certifications and licenses',
      placeholder: 'e.g., AWS Solutions Architect',
      tips: 'Add relevant certifications that enhance your qualifications'
    },
    interests: {
      name: 'Interests & Hobbies',
      icon: Heart,
      color: 'from-purple-500 to-violet-500',
      description: 'Personal interests that showcase your personality',
      placeholder: 'e.g., Photography, Reading, Hiking',
      tips: 'Choose interests that reveal transferable skills or unique qualities'
    },
    references: {
      name: 'References',
      icon: Link,
      color: 'from-indigo-500 to-blue-500',
      description: 'Professional references who can vouch for you',
      placeholder: 'e.g., John Smith, Senior Manager at Tech Corp',
      tips: 'Always ask permission before listing someone as a reference'
    }
  };

  const languageProficiency = [
    { value: 'native', label: 'Native', description: 'Native speaker', icon: '🗣️' },
    { value: 'fluent', label: 'Fluent', description: 'Fluent speaker', icon: '💬' },
    { value: 'advanced', label: 'Advanced', description: 'Advanced level', icon: '📚' },
    { value: 'intermediate', label: 'Intermediate', description: 'Intermediate level', icon: '✏️' },
    { value: 'beginner', label: 'Beginner', description: 'Basic level', icon: '👶' }
  ];

  // Initialize additional info structure
  useEffect(() => {
    if (!cvData.additionalInfo) {
      setCvData(prev => ({
        ...prev,
        additionalInfo: {
          languages: [],
          certifications: [],
          interests: [],
          references: []
        }
      }));
    }
  }, [cvData.additionalInfo, setCvData]);

  const toggleItemExpansion = (section, index) => {
    setExpandedItems(prev => ({
      ...prev,
      [`${section}-${index}`]: !prev[`${section}-${index}`]
    }));
  };

  const handleItemChange = (section, index, field, value) => {
    setCvData(prev => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        [section]: prev.additionalInfo[section].map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
    
    // Clear error when user starts typing
    if (errors[`${section}-${index}-${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`${section}-${index}-${field}`]: ''
      }));
    }
  };

  const addItem = (section, template) => {
    setCvData(prev => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        [section]: [...(prev.additionalInfo[section] || []), template]
      }
    }));
    
    // Auto-expand newly added items
    const newIndex = (cvData.additionalInfo[section] || []).length;
    setExpandedItems(prev => ({
      ...prev,
      [`${section}-${newIndex}`]: true
    }));
  };

  const removeItem = (section, index) => {
    setCvData(prev => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        [section]: prev.additionalInfo[section].filter((_, i) => i !== index)
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate languages
    cvData.additionalInfo?.languages?.forEach((lang, index) => {
      if (lang.name && lang.name.trim().length < 2) {
        newErrors[`languages-${index}-name`] = 'Language name must be at least 2 characters';
      }
    });

    // Validate certifications
    cvData.additionalInfo?.certifications?.forEach((cert, index) => {
      if (cert.name && cert.name.trim().length < 2) {
        newErrors[`certifications-${index}-name`] = 'Certification name must be at least 2 characters';
      }
    });

    // Validate references
    cvData.additionalInfo?.references?.forEach((ref, index) => {
      if (ref.name && ref.name.trim().length < 2) {
        newErrors[`references-${index}-name`] = 'Reference name must be at least 2 characters';
      }
      if (ref.email && ref.email.trim() && !/\S+@\S+\.\S+/.test(ref.email)) {
        newErrors[`references-${index}-email`] = 'Please enter a valid email address';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/cv-templates');
    }
  };

  const handleBack = () => {
    navigate('/skills');
  };

  const getCompletedItems = () => {
  let completed = 0;
  Object.keys(additionalSections).forEach(section => {
    const sectionItems = cvData.additionalInfo?.[section] || [];
    if (section === 'interests') {
      completed += sectionItems.filter(item => 
        typeof item === 'string' ? item.trim() : false
      ).length;
    } else {
      completed += sectionItems.filter(item => 
        typeof item === 'object' ? Object.values(item).some(val => val && val.toString().trim()) : false
      ).length;
    }
  });
  return completed;
};

  const getTotalItems = () => {
    let total = 0;
    Object.keys(additionalSections).forEach(section => {
      total += (cvData.additionalInfo?.[section] || []).length;
    });
    return total;
  };

  const completedItems = getCompletedItems();
  const totalItems = getTotalItems();
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  const steps = [
    { id: 1, name: "Personal Info", current: false, completed: true },
    { id: 2, name: "Professional Info", current: false, completed: true },
    { id: 3, name: "Work Experience", current: false, completed: true },
    { id: 4, name: "Education", current: false, completed: true },
    { id: 5, name: "Skills", current: false, completed: true },
    { id: 6, name: "Additional Info", current: true, completed: false }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enhanced Credibility",
      description: "Additional information adds depth to your professional profile",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Stand Out",
      description: "Differentiate yourself with unique qualifications",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Complete Picture",
      description: "Show employers the full scope of your capabilities",
      color: "from-yellow-500 to-amber-600"
    }
  ];

  const renderLanguages = () => (
    <div className="space-y-4">
      {cvData.additionalInfo.languages.map((language, index) => (
        <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden ${
          expandedItems[`languages-${index}`] ? 'shadow-sm' : ''
        }`}>
          <div 
            className={`p-6 cursor-pointer flex justify-between items-center ${
              expandedItems[`languages-${index}`] ? 'border-b border-gray-200' : ''
            }`}
            onClick={() => toggleItemExpansion('languages', index)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  {language.name || 'New Language'}
                </h4>
                <p className="text-sm text-gray-600">
                  {languageProficiency.find(l => l.value === language.proficiency)?.label || 'Not specified'}
                </p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              {expandedItems[`languages-${index}`] ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {expandedItems[`languages-${index}`] && (
            <div className="p-6 pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 my-3">
                    Language *
                  </label>
                  <input
                    type="text"
                    value={language.name || ''}
                    onChange={(e) => handleItemChange('languages', index, 'name', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20
                      ${errors[`languages-${index}-name`] 
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                        : language.name 
                          ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                          : 'border-gray-200 focus:border-blue-500'
                      }`}
                    placeholder="e.g., English, Spanish, French"
                  />
                  {errors[`languages-${index}-name`] && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors[`languages-${index}-name`]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Proficiency Level
                  </label>
                  <div className="relative">
                    <select
                      value={language.proficiency || 'intermediate'}
                      onChange={(e) => handleItemChange('languages', index, 'proficiency', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 appearance-none"
                    >
                      {languageProficiency.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={() => removeItem('languages', index)}
                    className="flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-4">
      {cvData.additionalInfo.certifications.map((certification, index) => (
        <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden ${
          expandedItems[`certifications-${index}`] ? 'shadow-sm' : ''
        }`}>
          <div 
            className={`p-6 cursor-pointer flex justify-between items-center ${
              expandedItems[`certifications-${index}`] ? 'border-b border-gray-200' : ''
            }`}
            onClick={() => toggleItemExpansion('certifications', index)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  {certification.name || 'New Certification'}
                </h4>
                <p className="text-sm text-gray-600">
                  {certification.issuer || 'Issuer not specified'}
                </p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              {expandedItems[`certifications-${index}`] ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {expandedItems[`certifications-${index}`] && (
            <div className="p-6 pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 my-3">
                    Certification Name *
                  </label>
                  <input
                    type="text"
                    value={certification.name || ''}
                    onChange={(e) => handleItemChange('certifications', index, 'name', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20
                      ${errors[`certifications-${index}-name`] 
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                        : certification.name 
                          ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                          : 'border-gray-200 focus:border-blue-500'
                      }`}
                    placeholder="e.g., AWS Solutions Architect"
                  />
                  {errors[`certifications-${index}-name`] && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors[`certifications-${index}-name`]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    value={certification.issuer || ''}
                    onChange={(e) => handleItemChange('certifications', index, 'issuer', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="e.g., Amazon Web Services"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Date Obtained
                  </label>
                  <input
                    type="date"
                    value={certification.date || ''}
                    onChange={(e) => handleItemChange('certifications', index, 'date', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div className="flex items-end justify-end">
                  <button
                    onClick={() => removeItem('certifications', index)}
                    className="flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderInterests = () => (
    <div className="space-y-4">
      {cvData.additionalInfo.interests.map((interest, index) => (
        <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-purple-600" />
            </div>
            <input
              type="text"
              value={interest || ''}
              onChange={(e) => handleItemChange('interests', index, '', e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="e.g., Photography, Reading, Hiking"
            />
            <button
              onClick={() => removeItem('interests', index)}
              className="flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderReferences = () => (
    <div className="space-y-4">
      {cvData.additionalInfo.references.map((reference, index) => (
        <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden ${
          expandedItems[`references-${index}`] ? 'shadow-sm' : ''
        }`}>
          <div 
            className={`p-6 cursor-pointer flex justify-between items-center ${
              expandedItems[`references-${index}`] ? 'border-b border-gray-200' : ''
            }`}
            onClick={() => toggleItemExpansion('references', index)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <Link className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  {reference.name || 'New Reference'}
                </h4>
                <p className="text-sm text-gray-600">
                  {reference.title || 'Title not specified'}
                </p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              {expandedItems[`references-${index}`] ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {expandedItems[`references-${index}`] && (
            <div className="p-6 pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 my-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={reference.name || ''}
                    onChange={(e) => handleItemChange('references', index, 'name', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20
                      ${errors[`references-${index}-name`] 
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                        : reference.name 
                          ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                          : 'border-gray-200 focus:border-blue-500'
                      }`}
                    placeholder="e.g., John Smith"
                  />
                  {errors[`references-${index}-name`] && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors[`references-${index}-name`]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 my-3">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={reference.title || ''}
                    onChange={(e) => handleItemChange('references', index, 'title', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="e.g., Senior Manager"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Company
                  </label>
                  <input
                    type="text"
                    value={reference.company || ''}
                    onChange={(e) => handleItemChange('references', index, 'company', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="e.g., Tech Corp Inc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={reference.email || ''}
                    onChange={(e) => handleItemChange('references', index, 'email', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20
                      ${errors[`references-${index}-email`] 
                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-200 focus:border-blue-500'
                      }`}
                    placeholder="john.smith@company.com"
                  />
                  {errors[`references-${index}-email`] && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors[`references-${index}-email`]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={reference.phone || ''}
                    onChange={(e) => handleItemChange('references', index, 'phone', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="flex items-end justify-end">
                  <button
                    onClick={() => removeItem('references', index)}
                    className="flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'languages':
        return renderLanguages();
      case 'certifications':
        return renderCertifications();
      case 'interests':
        return renderInterests();
      case 'references':
        return renderReferences();
      default:
        return null;
    }
  };

  const getAddButtonTemplate = () => {
    switch (activeSection) {
      case 'languages':
        return { name: '', proficiency: 'intermediate' };
      case 'certifications':
        return { name: '', issuer: '', date: '' };
      case 'interests':
        return '';
      case 'references':
        return { name: '', title: '', company: '', email: '', phone: '' };
      default:
        return {};
    }
  };

  // Return early if additional info structure is not initialized
  if (!cvData.additionalInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading your additional information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
     <Header/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Overview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">CV Completion</h3>
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">Step 6 of 6</span>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {Math.round(progressPercentage)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              
              {/* Step Indicators */}
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

            {/* Features */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-500" />
                Why Additional Information Matters
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

            {/* Language Proficiency Guide */}
            {activeSection === 'languages' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-5 h-5 mr-2">🌍</span>
                  Language Proficiency Guide
                </h3>
                <div className="space-y-3">
                  {languageProficiency.map((level) => (
                    <div key={level.value} className="flex items-start">
                      <span className="text-xl mr-3">{level.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{level.label}</h4>
                        <p className="text-sm text-gray-600">{level.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Header */}
              <div className="px-8 py-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Additional Information</h2>
                    <p className="text-gray-600 text-lg">Complete your CV with these optional but valuable sections</p>
                  </div>
                </div>
              </div>

              {/* Section Tabs */}
              <div className="px-8 pt-6  border-b border-gray-100">
                <div className="flex flex-wrap gap-2 mb-4">
                  {Object.entries(additionalSections).map(([key, section]) => {
                    const IconComponent = section.icon;
                    const itemCount = (cvData.additionalInfo[key] || []).length;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveSection(key)}
                        className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeSection === key
                            ? `bg-gradient-to-r ${section.color} text-white shadow-md`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {section.name}
                        {itemCount > 0 && (
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                            activeSection === key 
                              ? 'bg-white/20 text-white/90' 
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {itemCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section Content */}
              <div className="p-8">
                {Object.entries(additionalSections).map(([sectionKey, section]) => (
                  activeSection === sectionKey && (
                    <div key={sectionKey} className="space-y-6">
                      {/* Section Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center text-white mr-4 shadow-lg`}>
                            <section.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">{section.name}</h3>
                            <p className="text-sm text-gray-600">{section.description}</p>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => addItem(sectionKey, getAddButtonTemplate())}
                          className={`flex items-center px-6 py-3 bg-gradient-to-r ${section.color} text-white rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl`}
                        >
                          <Plus className="w-5 h-5 mr-2" />
                          Add {section.name === 'Interests & Hobbies' ? 'Interest' : section.name.slice(0, -1)}
                        </button>
                      </div>

                      {/* Section Form */}
                      {renderSection()}

                      {/* Empty State */}
                      {(!cvData.additionalInfo[sectionKey] || cvData.additionalInfo[sectionKey].length === 0) && (
                        <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200">
                          <section.icon className={`w-12 h-12 mx-auto mb-4 text-${section.color.split(' ')[1].split('-')[1]}-400`} />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No {section.name.toLowerCase()} added yet</h3>
                          <p className="text-gray-600 mb-4">{section.tips}</p>
                          <button
                            onClick={() => addItem(sectionKey, getAddButtonTemplate())}
                            className={`flex items-center px-6 py-3 bg-gradient-to-r ${section.color} text-white rounded-xl hover:opacity-90 transition-all duration-200 mx-auto shadow-lg hover:shadow-xl`}
                          >
                            <Plus className="w-5 h-5 mr-2" />
                            Add Your First {section.name === 'Interests & Hobbies' ? 'Interest' : section.name.slice(0, -1)}
                          </button>
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>

              {/* Error Message */}
              {Object.keys(errors).length > 0 && (
                <div className="mx-8 mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Please fix the errors above to continue
                  </p>
                </div>
              )}

              {/* Professional Tips */}
              <div className="mx-8 mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <h3 className="font-semibold text-blue-900 mb-4 flex items-center text-lg">
                  <span className="w-5 h-5 mr-2">💡</span>
                  Professional Tips for {additionalSections[activeSection]?.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                  <div>
                    <strong>Relevance:</strong> Focus on items that add professional value
                  </div>
                  <div>
                    <strong>Accuracy:</strong> Only include verifiable information
                  </div>
                  <div>
                    <strong>Balance:</strong> Don't overload - quality over quantity
                  </div>
                  <div>
                    <strong>Formatting:</strong> Keep consistent formatting throughout
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button 
                    onClick={handleBack}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Skills
                  </button>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                      {completedItems} items added
                    </div>
                    <button
                      onClick={handleNext}
                      className="flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-2xl"
                    >
                      <Trophy className="w-5 h-5 mr-2" />
                      Complete CV
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

export default AdditionalInfoPage;