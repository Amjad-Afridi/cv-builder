import React, { useState } from 'react';
import { GraduationCap, ArrowRight, ArrowLeft, CheckCircle, Plus, Trash2, Calendar, MapPin, BookOpen, Award, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EducationPage = ({ cvData, setCvData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [activeEducation, setActiveEducation] = useState(0);

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
      navigate('/skills'); // Navigate to next section (skills/final step)
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
              <div className="w-16 h-1 bg-blue-500 rounded"></div>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div className="w-16 h-1 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold">5</div>
            
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Education</h1>
          <p className="text-lg text-gray-600 mb-4">Share your educational background and achievements</p>
          
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
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Educational Background</h2>
                  <p className="text-gray-600">Add your educational qualifications in reverse chronological order</p>
                </div>
              </div>
              
              <button
                onClick={addEducation}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
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
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {edu.degree || edu.institution || `Education ${index + 1}`}
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
                      {education.current && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Currently Studying
                        </span>
                      )}
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
                      <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
                          Degree/Qualification *
                        </label>
                        <select
                          value={education.degree}
                          onChange={(e) => handleInputChange(index, 'degree', e.target.value)}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                            ${errors[`${index}-degree`] 
                              ? 'border-red-400 focus:border-red-500' 
                              : education.degree 
                                ? 'border-green-400 focus:border-green-500' 
                                : 'border-gray-300 focus:border-blue-500'
                            }`}
                        >
                          <option value="">Select your degree</option>
                          {degreeOptions.map((degree) => (
                            <option key={degree} value={degree}>{degree}</option>
                          ))}
                        </select>
                        {errors[`${index}-degree`] && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors[`${index}-degree`]}
                          </p>
                        )}
                      </div>

                      {/* Field of Study */}
                      <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
                          Field of Study *
                        </label>
                        <input
                          type="text"
                          value={education.fieldOfStudy}
                          onChange={(e) => handleInputChange(index, 'fieldOfStudy', e.target.value)}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                            ${errors[`${index}-fieldOfStudy`] 
                              ? 'border-red-400 focus:border-red-500' 
                              : education.fieldOfStudy 
                                ? 'border-green-400 focus:border-green-500' 
                                : 'border-gray-300 focus:border-blue-500'
                            }`}
                          placeholder="e.g., Computer Science, Business Administration"
                        />
                        {errors[`${index}-fieldOfStudy`] && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors[`${index}-fieldOfStudy`]}
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
                          value={education.location}
                          onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                            ${education.location 
                              ? 'border-green-400 focus:border-green-500' 
                              : 'border-gray-300 focus:border-blue-500'
                            }`}
                          placeholder="e.g., Boston, MA or Online"
                        />
                      </div>

                      {/* Start Year */}
                      <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                          Start Year *
                        </label>
                        <input
                          type="number"
                          min="1950"
                          max="2030"
                          value={education.startYear}
                          onChange={(e) => handleInputChange(index, 'startYear', e.target.value)}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                            ${errors[`${index}-startYear`] 
                              ? 'border-red-400 focus:border-red-500' 
                              : education.startYear 
                                ? 'border-green-400 focus:border-green-500' 
                                : 'border-gray-300 focus:border-blue-500'
                            }`}
                          placeholder="e.g., 2020"
                        />
                        {errors[`${index}-startYear`] && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors[`${index}-startYear`]}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Institution */}
                      <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <Award className="w-4 h-4 mr-2 text-gray-500" />
                          Institution *
                        </label>
                        <input
                          type="text"
                          value={education.institution}
                          onChange={(e) => handleInputChange(index, 'institution', e.target.value)}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                            ${errors[`${index}-institution`] 
                              ? 'border-red-400 focus:border-red-500' 
                              : education.institution 
                                ? 'border-green-400 focus:border-green-500' 
                                : 'border-gray-300 focus:border-blue-500'
                            }`}
                          placeholder="e.g., Harvard University, Community College"
                        />
                        {errors[`${index}-institution`] && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors[`${index}-institution`]}
                          </p>
                        )}
                      </div>

                      {/* GPA */}
                      <div>
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <span className="w-4 h-4 mr-2 text-gray-500">📊</span>
                          GPA (Optional)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="4.0"
                          value={education.gpa}
                          onChange={(e) => handleInputChange(index, 'gpa', e.target.value)}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                            ${errors[`${index}-gpa`] 
                              ? 'border-red-400 focus:border-red-500' 
                              : education.gpa 
                                ? 'border-green-400 focus:border-green-500' 
                                : 'border-gray-300 focus:border-blue-500'
                            }`}
                          placeholder="e.g., 3.75 (4.0 scale)"
                        />
                        {errors[`${index}-gpa`] && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
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
                        <div>
                          <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                            End Year *
                          </label>
                          <input
                            type="number"
                            min="1950"
                            max="2030"
                            value={education.endYear}
                            onChange={(e) => handleInputChange(index, 'endYear', e.target.value)}
                            className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                              ${errors[`${index}-endYear`] 
                                ? 'border-red-400 focus:border-red-500' 
                                : education.endYear 
                                  ? 'border-green-400 focus:border-green-500' 
                                  : 'border-gray-300 focus:border-blue-500'
                              }`}
                            placeholder="e.g., 2024"
                          />
                          {errors[`${index}-endYear`] && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors[`${index}-endYear`]}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Honors and Awards */}
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <Award className="w-4 h-4 mr-2 text-gray-500" />
                      Honors & Awards (Optional)
                    </label>
                    <input
                      type="text"
                      value={education.honors}
                      onChange={(e) => handleInputChange(index, 'honors', e.target.value)}
                      className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                        ${education.honors 
                          ? 'border-green-400 focus:border-green-500' 
                          : 'border-gray-300 focus:border-blue-500'
                        }`}
                      placeholder="e.g., Magna Cum Laude, Dean's List, Academic Scholarship"
                    />
                    {education.honors && (
                      <p className="mt-2 text-sm text-green-600 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Great achievement!
                      </p>
                    )}
                  </div>

                  {/* Additional Description */}
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
                      Additional Details (Optional)
                    </label>
                    <textarea
                      value={education.description}
                      onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                      rows="4"
                      className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none resize-none
                        ${education.description 
                          ? 'border-green-400 focus:border-green-500' 
                          : 'border-gray-300 focus:border-blue-500'
                        }`}
                      placeholder="• Relevant coursework, projects, or thesis topics
• Leadership roles in student organizations
• Research experience or publications
• Study abroad programs
• Notable achievements or activities"
                    />
                    {education.description && (
                      <p className="mt-2 text-sm text-green-600 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Additional details added!
                      </p>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Tips Section */}
          <div className="mx-8 mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
              <span className="w-5 h-5 mr-2">💡</span>
              Education Tips
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• List your education in reverse chronological order (most recent first)</li>
              <li>• Include GPA only if it's 3.5 or higher (on a 4.0 scale)</li>
              <li>• Mention relevant coursework for entry-level positions</li>
              <li>• Include honors, awards, and scholarships to stand out</li>
              <li>• For high school: only include if you don't have higher education</li>
              <li>• Add certifications and online courses in additional details</li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center p-8 pt-0">
            <button 
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Experience
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
              Next: Skills
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;