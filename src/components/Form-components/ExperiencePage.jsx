import React, { useState } from 'react';
import { Briefcase, ArrowRight, ArrowLeft, CheckCircle, Plus, Trash2, Calendar, MapPin, Building2, FileText, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExperiencePage = ({ cvData, setCvData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [activeExperience, setActiveExperience] = useState(0);

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
      navigate('/education'); // Navigate to next section
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
              <div className="w-16 h-1 bg-blue-500 rounded"></div>
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div className="w-16 h-1 bg-blue-500 rounded"></div>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div className="w-16 h-1 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold">4</div>
              <div className="w-16 h-1 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold">5</div>
            '
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Work Experience</h1>
          <p className="text-lg text-gray-600 mb-4">Showcase your professional journey and achievements</p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{completedFields}/{totalPossibleFields} fields completed</span>
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
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Professional Experience</h2>
                  <p className="text-gray-600">Add your work history in reverse chronological order</p>
                </div>
              </div>
              
              <button
                onClick={addExperience}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
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
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {exp.jobTitle || exp.company || `Experience ${index + 1}`}
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
                      {experience.current && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Current Position
                        </span>
                      )}
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
                      <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                          Job Title *
                        </label>
                        <input
                          type="text"
                          value={experience.jobTitle}
                          onChange={(e) => handleInputChange(index, 'jobTitle', e.target.value)}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                            ${errors[`${index}-jobTitle`] 
                              ? 'border-red-400 focus:border-red-500' 
                              : experience.jobTitle 
                                ? 'border-green-400 focus:border-green-500' 
                                : 'border-gray-300 focus:border-blue-500'
                            }`}
                          placeholder="e.g., Senior Software Engineer"
                        />
                        {errors[`${index}-jobTitle`] && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors[`${index}-jobTitle`]}
                          </p>
                        )}
                      </div>

                      {/* Location */}
                      <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                          Location
                        </label>
                        <input
                          type="text"
                          value={experience.location}
                          onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                            ${experience.location 
                              ? 'border-green-400 focus:border-green-500' 
                              : 'border-gray-300 focus:border-blue-500'
                            }`}
                          placeholder="e.g., New York, NY or Remote"
                        />
                      </div>

                      {/* Start Date */}
                      <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                          Start Date *
                        </label>
                        <input
                          type="month"
                          value={experience.startDate}
                          onChange={(e) => handleInputChange(index, 'startDate', e.target.value)}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                            ${errors[`${index}-startDate`] 
                              ? 'border-red-400 focus:border-red-500' 
                              : experience.startDate 
                                ? 'border-green-400 focus:border-green-500' 
                                : 'border-gray-300 focus:border-blue-500'
                            }`}
                        />
                        {errors[`${index}-startDate`] && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors[`${index}-startDate`]}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Company */}
                      <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                          Company *
                        </label>
                        <input
                          type="text"
                          value={experience.company}
                          onChange={(e) => handleInputChange(index, 'company', e.target.value)}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                            ${errors[`${index}-company`] 
                              ? 'border-red-400 focus:border-red-500' 
                              : experience.company 
                                ? 'border-green-400 focus:border-green-500' 
                                : 'border-gray-300 focus:border-blue-500'
                            }`}
                          placeholder="e.g., Google, Microsoft, Startup Inc."
                        />
                        {errors[`${index}-company`] && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
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
                        <div>
                          <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                            End Date *
                          </label>
                          <input
                            type="month"
                            value={experience.endDate}
                            onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
                            className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                              ${errors[`${index}-endDate`] 
                                ? 'border-red-400 focus:border-red-500' 
                                : experience.endDate 
                                  ? 'border-green-400 focus:border-green-500' 
                                  : 'border-gray-300 focus:border-blue-500'
                              }`}
                          />
                          {errors[`${index}-endDate`] && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors[`${index}-endDate`]}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Job Description */}
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <FileText className="w-4 h-4 mr-2 text-gray-500" />
                      Job Description & Achievements *
                    </label>
                    <textarea
                      value={experience.description}
                      onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                      rows="6"
                      className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none resize-none
                        ${errors[`${index}-description`] 
                          ? 'border-red-400 focus:border-red-500' 
                          : experience.description && experience.description.length >= 50
                            ? 'border-green-400 focus:border-green-500' 
                            : 'border-gray-300 focus:border-blue-500'
                        }`}
                      placeholder="• Describe your key responsibilities and achievements
• Use bullet points for better readability
• Include specific metrics and results (e.g., 'Increased sales by 25%')
• Mention technologies, tools, or methodologies you used
• Highlight leadership experience and team collaboration"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        {errors[`${index}-description`] && (
                          <p className="text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors[`${index}-description`]}
                          </p>
                        )}
                        {experience.description && experience.description.length >= 50 && !errors[`${index}-description`] && (
                          <p className="text-sm text-green-600 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Great description!
                          </p>
                        )}
                      </div>
                      <span className={`text-sm ${experience.description.length < 50 ? 'text-gray-500' : 'text-green-600'}`}>
                        {experience.description.length}/50 min
                      </span>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Tips Section */}
          <div className="mx-8 mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
              <span className="w-5 h-5 mr-2">💡</span>
              Experience Writing Tips
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Start each bullet point with strong action verbs (Developed, Led, Implemented, Achieved)</li>
              <li>• Quantify your achievements with specific numbers, percentages, or metrics</li>
              <li>• Focus on results and impact rather than just listing duties</li>
              <li>• Tailor your descriptions to match the job you're applying for</li>
              <li>• Keep descriptions concise but comprehensive - aim for 3-5 bullet points per role</li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center p-8 pt-0">
            <button 
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Professional Info
            </button>
            
            <button
              onClick={handleNext}
              className={`flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg transform hover:scale-105
                ${hasRequiredFields
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              disabled={!hasRequiredFields}
            >
              Next: Education
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;