import React, { useState } from 'react';
import { Star, ArrowRight, ArrowLeft, CheckCircle, Plus, Trash2, Zap, Code, Palette, Users, Brain, Trophy, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SkillsPage = ({ cvData, setCvData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [activeCategory, setActiveCategory] = useState('technical');

  // Skill categories
  const skillCategories = {
    technical: {
      name: 'Technical Skills',
      icon: Code,
      color: 'blue',
      placeholder: 'e.g., JavaScript, Python, React, Node.js'
    },
    soft: {
      name: 'Soft Skills',
      icon: Users,
      color: 'green',
      placeholder: 'e.g., Leadership, Communication, Problem Solving'
    },
    creative: {
      name: 'Creative Skills',
      icon: Palette,
      color: 'purple',
      placeholder: 'e.g., Graphic Design, UI/UX, Photography'
    },
    analytical: {
      name: 'Analytical Skills',
      icon: Brain,
      color: 'indigo',
      placeholder: 'e.g., Data Analysis, Research, Statistics'
    }
  };

  const expertiseLevels = [
    { value: 1, label: 'Beginner', description: 'Basic understanding' },
    { value: 2, label: 'Novice', description: 'Limited experience' },
    { value: 3, label: 'Intermediate', description: 'Some experience' },
    { value: 4, label: 'Advanced', description: 'Extensive experience' },
    { value: 5, label: 'Expert', description: 'Highly experienced' }
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
      navigate('/cv-templates'); // Navigate to preview or final step
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

  // Return early if skills structure is not initialized
  if (!cvData.skills || typeof cvData.skills === 'string') {
    return <div>Loading...</div>;
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header with Progress */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div className="w-16 h-1 bg-green-500 rounded"></div>
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div className="w-16 h-1 bg-green-500 rounded"></div>
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div className="w-16 h-1 bg-green-500 rounded"></div>
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div className="w-16 h-1 bg-blue-500 rounded"></div>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Skills & Expertise</h1>
          <p className="text-lg text-gray-600 mb-4">Showcase your abilities and expertise levels</p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{completedSkills} skills added</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Skills & Competencies</h2>
                  <p className="text-gray-600">Rate your proficiency level for each skill</p>
                </div>
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
                        ? `bg-${category.color}-600 text-white shadow-md`
                        : `bg-gray-100 text-gray-600 hover:bg-${category.color}-50 hover:text-${category.color}-700`
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {category.name}
                    {skillCount > 0 && (
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        activeCategory === key 
                          ? 'bg-white text-gray-700' 
                          : `bg-${category.color}-100 text-${category.color}-700`
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
                      <div className={`w-10 h-10 bg-${category.color}-100 rounded-lg flex items-center justify-center mr-3`}>
                        <category.icon className={`w-5 h-5 text-${category.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                        <p className="text-sm text-gray-600">Add skills and rate your expertise level</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => addSkill(categoryKey)}
                      className={`flex items-center px-4 py-2 bg-${category.color}-600 text-white rounded-lg hover:bg-${category.color}-700 transition-colors duration-200 shadow-md hover:shadow-lg`}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Skill
                    </button>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {(cvData.skills[categoryKey] || []).map((skill, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
                          {/* Skill Name */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                              Skill Name *
                            </label>
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => handleSkillChange(categoryKey, index, 'name', e.target.value)}
                              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 bg-white focus:outline-none
                                ${errors[`${categoryKey}-${index}-name`] 
                                  ? 'border-red-400 focus:border-red-500' 
                                  : skill.name 
                                    ? 'border-green-400 focus:border-green-500' 
                                    : 'border-gray-300 focus:border-blue-500'
                                }`}
                              placeholder={category.placeholder}
                            />
                            {errors[`${categoryKey}-${index}-name`] && (
                              <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
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
                                className="ml-4 flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
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
                      <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                        <category.icon className={`w-12 h-12 text-${category.color}-400 mx-auto mb-4`} />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No {category.name.toLowerCase()} added yet</h3>
                        <p className="text-gray-600 mb-4">Start building your skill set by adding your first skill</p>
                        <button
                          onClick={() => addSkill(categoryKey)}
                          className={`flex items-center px-4 py-2 bg-${category.color}-600 text-white rounded-lg hover:bg-${category.color}-700 transition-colors duration-200 mx-auto`}
                        >
                          <Plus className="w-4 h-4 mr-2" />
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

          {/* Tips Section */}
          <div className="mx-8 mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
              <span className="w-5 h-5 mr-2">💡</span>
              Skills Rating Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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

          {/* Navigation */}
          <div className="flex justify-between items-center p-8 pt-0">
            <button 
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Education
            </button>
            
            <button
              onClick={handleNext}
              className={`flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg transform hover:scale-105
                ${hasRequiredSkills
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              disabled={!hasRequiredSkills}
            >
              {hasRequiredSkills ? (
                <>
                  <Trophy className="w-5 h-5 mr-2" />
                  Complete CV
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
  );
};

export default SkillsPage;