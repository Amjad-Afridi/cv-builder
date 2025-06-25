import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, ArrowLeft, CheckCircle2, Plus, Trash2, Zap, Code, Palette, Users, Brain, Trophy, AlertCircle, Shield, Award, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const SkillsPage = ({ cvData, setCvData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [activeCategory, setActiveCategory] = useState('technical');
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Enhanced SEO meta tags
  useEffect(() => {
    document.title = 'Skills & Expertise - Professional CV Builder | CV Builder Pro';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Showcase your skills and expertise to create a compelling CV. Highlight your technical, soft, and specialized skills with our easy-to-use builder.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Showcase your skills and expertise to create a compelling CV. Highlight your technical, soft, and specialized skills with our easy-to-use builder.';
      document.head.appendChild(meta);
    }
  }, []);

  // Skill categories
  const skillCategories = {
    technical: {
      name: 'Technical Skills',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      placeholder: 'e.g., JavaScript, Python, React, Node.js'
    },
    soft: {
      name: 'Soft Skills',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      placeholder: 'e.g., Leadership, Communication, Problem Solving'
    },
    creative: {
      name: 'Creative Skills',
      icon: Palette,
      color: 'from-purple-500 to-violet-500',
      placeholder: 'e.g., Graphic Design, UI/UX, Photography'
    },
    analytical: {
      name: 'Analytical Skills',
      icon: Brain,
      color: 'from-indigo-500 to-blue-500',
      placeholder: 'e.g., Data Analysis, Research, Statistics'
    }
  };

  const expertiseLevels = [
    { value: 1, label: 'Beginner', description: 'Basic understanding' },
    { value: 2, label: 'Novice', description: 'Limited experience' },
    { value: 3, label: 'Intermediate', description: 'Practical experience' },
    { value: 4, label: 'Advanced', description: 'Extensive experience' },
    { value: 5, label: 'Expert', description: 'Mastery level' }
  ];

  const handleSkillChange = (category, index, field, value) => {
    setCvData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].map((skill, i) => 
          i === index ? { ...skill, [field]: value } : skill
        )
      }
    }));
    
    // Clear error when user starts typing
    if (errors[`${category}-${index}-${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`${category}-${index}-${field}`]: ''
      }));
    }
  };

  const addSkill = (category) => {
    setCvData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...(prev.skills[category] || []), {
          name: '',
          level: 3
        }]
      }
    }));
  };

  const removeSkill = (category, index) => {
    setCvData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index)
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let hasSkills = false;
    
    Object.keys(skillCategories).forEach(category => {
      const categorySkills = cvData.skills[category] || [];
      categorySkills.forEach((skill, index) => {
        if (skill.name && skill.name.trim()) {
          hasSkills = true;
          if (skill.name.trim().length < 2) {
            newErrors[`${category}-${index}-name`] = 'Skill name must be at least 2 characters';
          }
        }
      });
    });
    
    if (!hasSkills) {
      newErrors.general = 'Please add at least one skill';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/additional-info');
    }
  };

  const handleBack = () => {
    navigate('/education');
  };

  const getCompletedSkills = () => {
    let completed = 0;
    Object.keys(skillCategories).forEach(category => {
      const categorySkills = cvData.skills[category] || [];
      completed += categorySkills.filter(skill => skill.name && skill.name.trim()).length;
    });
    return completed;
  };

  const getTotalSkills = () => {
    let total = 0;
    Object.keys(skillCategories).forEach(category => {
      total += (cvData.skills[category] || []).length;
    });
    return total;
  };

  const completedSkills = getCompletedSkills();
  const totalSkills = getTotalSkills();
  const progressPercentage = totalSkills > 0 ? (completedSkills / totalSkills) * 100 : 0;

  const hasRequiredSkills = completedSkills > 0;

  // Initialize skills structure if it doesn't exist
  React.useEffect(() => {
    if (!cvData.skills || typeof cvData.skills === 'string') {
      setCvData(prev => ({
        ...prev,
        skills: {
          technical: [],
          soft: [],
          creative: [],
          analytical: []
        }
      }));
    }
  }, [cvData.skills, setCvData]);

  const steps = [
    { id: 1, name: "Personal Info", current: false, completed: true },
    { id: 2, name: "Professional Info", current: false, completed: true },
    { id: 3, name: "Work Experience", current: false, completed: true },
    { id: 4, name: "Education", current: false, completed: true },
    { id: 5, name: "Skills", current: true, completed: false },
    { id: 6, name: "Additional Info", current: false, completed: false }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Skill Validation",
      description: "Our system helps format your skills for maximum impact",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "ATS Optimization",
      description: "Properly structured skills get noticed by applicant tracking systems",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Professional Rating",
      description: "Showcase your expertise levels with our intuitive rating system",
      color: "from-green-500 to-emerald-600"
    }
  ];

  const renderStarRating = (category, index, currentLevel) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleSkillChange(category, index, 'level', star)}
            className={`w-6 h-6 transition-all duration-200 hover:scale-110 ${
              star <= currentLevel 
                ? 'text-yellow-400 hover:text-yellow-500' 
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            <Star 
              className="w-full h-full" 
              fill={star <= currentLevel ? 'currentColor' : 'none'}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {expertiseLevels.find(level => level.value === currentLevel)?.label}
        </span>
      </div>
    );
  };

  // Return early if skills structure is not initialized
  if (!cvData.skills || typeof cvData.skills === 'string') {
    return <div>Loading...</div>;
  }

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
                <span className="text-sm text-gray-600">Step 5 of 6</span>
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
                Skill Building Tips
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
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Skills & Expertise</h2>
                    <p className="text-gray-600 text-lg">Showcase your abilities and expertise levels</p>
                  </div>
                </div>
              </div>

              {/* Category Tabs */}
              <div className="px-8 pt-6 border-b border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(skillCategories).map(([key, category]) => {
                    const IconComponent = category.icon;
                    const skillCount = (cvData.skills[key] || []).length;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveCategory(key)}
                        className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeCategory === key
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {category.name}
                        {skillCount > 0 && (
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                            activeCategory === key 
                              ? 'bg-white/20 text-white/90' 
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {skillCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Skills Form */}
              <div className="p-8">
                {Object.entries(skillCategories).map(([categoryKey, category]) => (
                  activeCategory === categoryKey && (
                    <div key={categoryKey} className="space-y-6">
                      {/* Category Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-white mr-4 shadow-lg`}>
                            <category.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                            <p className="text-sm text-gray-600">Add skills and rate your expertise level</p>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => addSkill(categoryKey)}
                          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                        >
                          <Plus className="w-5 h-5 mr-2" />
                          Add Skill
                        </button>
                      </div>

                      {/* Skills List */}
                      <div className="space-y-4">
                        {(cvData.skills[categoryKey] || []).map((skill, index) => (
                          <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
                              {/* Skill Name */}
                              <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                  Skill Name *
                                </label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={skill.name}
                                    onChange={(e) => handleSkillChange(categoryKey, index, 'name', e.target.value)}
                                    className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 group-hover:border-gray-400
                                      ${errors[`${categoryKey}-${index}-name`] 
                                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                                        : skill.name
                                          ? 'border-green-300 bg-green-50/50 focus:border-green-500 focus:ring-green-500/20'
                                          : 'border-gray-200 bg-white'
                                      }`}
                                    placeholder={category.placeholder}
                                  />
                                  {skill.name && !errors[`${categoryKey}-${index}-name`] && (
                                    <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                                  )}
                                </div>
                                {errors[`${categoryKey}-${index}-name`] && (
                                  <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                                    {errors[`${categoryKey}-${index}-name`]}
                                  </p>
                                )}
                              </div>

                              {/* Expertise Level */}
                              <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                  Expertise Level
                                </label>
                                <div className="flex items-center justify-between">
                                  {renderStarRating(categoryKey, index, skill.level || 3)}
                                  
                                  {/* Remove Button */}
                                  <button
                                    onClick={() => removeSkill(categoryKey, index)}
                                    className="ml-4 flex items-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                                
                                {/* Level Description */}
                                <p className="mt-2 text-xs text-gray-500">
                                  {expertiseLevels.find(level => level.value === (skill.level || 3))?.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Empty State */}
                        {(!cvData.skills[categoryKey] || cvData.skills[categoryKey].length === 0) && (
                          <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200">
                            <category.icon className={`w-12 h-12 mx-auto mb-4 text-${category.color.split(' ')[1].split('-')[1]}-400`} />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No {category.name.toLowerCase()} added yet</h3>
                            <p className="text-gray-600 mb-4">Start building your skill set by adding your first skill</p>
                            <button
                              onClick={() => addSkill(categoryKey)}
                              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 mx-auto shadow-lg hover:shadow-xl"
                            >
                              <Plus className="w-5 h-5 mr-2" />
                              Add Your First Skill
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                ))}
              </div>

              {/* Error Message */}
              {errors.general && (
                <div className="mx-8 mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.general}
                  </p>
                </div>
              )}

              {/* Enhanced Professional Tips */}
              <div className="mx-8 mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <h3 className="font-semibold text-blue-900 mb-4 flex items-center text-lg">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  💡 Skills Rating Guide
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {expertiseLevels.map((level) => (
                    <div key={level.value} className="text-center">
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-4 h-4 ${i < level.value ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm font-medium text-blue-900">{level.label}</p>
                      <p className="text-xs text-blue-700">{level.description}</p>
                    </div>
                  ))}
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
                    Back to Education
                  </button>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                      {completedSkills} skills added
                    </div>
                    <button
                      onClick={handleNext}
                      className={`flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                        hasRequiredSkills
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-2xl'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!hasRequiredSkills}
                    >
                      {hasRequiredSkills ? (
                        <>
                          Continue to Additional Info
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      ) : (
                        <>
                          Add Skills to Continue
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
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

export default SkillsPage;