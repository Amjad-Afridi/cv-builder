import React, { useState } from 'react';
import { Briefcase, ArrowRight, ArrowLeft, CheckCircle, Globe, Github, Linkedin, FileText, Target } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ProfessionalInfoPage = ({ cvData, setCvData }) => {
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
    
    if (!cvData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }
    
    if (!cvData.professionalSummary.trim()) {
      newErrors.professionalSummary = 'Professional summary is required';
    } else if (cvData.professionalSummary.trim().length < 50) {
      newErrors.professionalSummary = 'Professional summary should be at least 50 characters';
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
    const isValid = Object.keys(newErrors).length === 0;
    setIsValidated(isValid);
    return isValid;
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
  const requiredFieldsCompleted = cvData.jobTitle.trim() && cvData.professionalSummary.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Progress */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div className="w-16 h-1 bg-blue-500 rounded"></div>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div className="w-16 h-1 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold">3</div>
              <div className="w-16 h-1 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold">4</div>
              <div className="w-16 h-1 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center font-bold">5</div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Professional Information</h1>
          <p className="text-lg text-gray-600 mb-4">Tell us about your professional background</p>
          
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
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Professional Details</h2>
              <p className="text-gray-600">Showcase your professional identity and expertise</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Job Title */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <Target className="w-4 h-4 mr-2 text-gray-500" />
                Current Job Title / Desired Position *
              </label>
              <input
                type="text"
                name="jobTitle"
                value={cvData.jobTitle}
                onChange={handleInputChange}
                className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                  ${errors.jobTitle 
                    ? 'border-red-400 focus:border-red-500' 
                    : cvData.jobTitle 
                      ? 'border-green-400 focus:border-green-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                placeholder="e.g., Senior Software Engineer, Marketing Manager, Data Scientist"
              />
              {errors.jobTitle && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="w-4 h-4 mr-1">⚠️</span>
                  {errors.jobTitle}
                </p>
              )}
              {cvData.jobTitle && !errors.jobTitle && (
                <p className="mt-2 text-sm text-green-600 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Great job title!
                </p>
              )}
            </div>

            {/* Professional Summary */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <FileText className="w-4 h-4 mr-2 text-gray-500" />
                Professional Summary *
              </label>
              <textarea
                name="professionalSummary"
                value={cvData.professionalSummary}
                onChange={handleInputChange}
                rows="6"
                className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none resize-none
                  ${errors.professionalSummary 
                    ? 'border-red-400 focus:border-red-500' 
                    : cvData.professionalSummary && cvData.professionalSummary.length >= 50
                      ? 'border-green-400 focus:border-green-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                placeholder="Write a compelling summary of your professional background, key achievements, and career goals. Highlight your unique value proposition and what makes you stand out in your field..."
              />
              <div className="flex justify-between items-center mt-2">
                <div>
                  {errors.professionalSummary && (
                    <p className="text-sm text-red-600 flex items-center">
                      <span className="w-4 h-4 mr-1">⚠️</span>
                      {errors.professionalSummary}
                    </p>
                  )}
                  {cvData.professionalSummary && cvData.professionalSummary.length >= 50 && !errors.professionalSummary && (
                    <p className="text-sm text-green-600 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Excellent summary!
                    </p>
                  )}
                </div>
                <span className={`text-sm ${cvData.professionalSummary.length < 50 ? 'text-gray-500' : 'text-green-600'}`}>
                  {cvData.professionalSummary.length}/50 min
                </span>
              </div>
            </div>

            {/* URLs Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Portfolio URL */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Globe className="w-4 h-4 mr-2 text-gray-500" />
                  Portfolio URL
                </label>
                <input
                  type="url"
                  name="portfolioUrl"
                  value={cvData.portfolioUrl}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                    ${errors.portfolioUrl 
                      ? 'border-red-400 focus:border-red-500' 
                      : cvData.portfolioUrl && /^https?:\/\/.+/.test(cvData.portfolioUrl)
                        ? 'border-green-400 focus:border-green-500' 
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                  placeholder="https://yourportfolio.com"
                />
                {errors.portfolioUrl && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.portfolioUrl}
                  </p>
                )}
                {cvData.portfolioUrl && /^https?:\/\/.+/.test(cvData.portfolioUrl) && !errors.portfolioUrl && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Valid URL
                  </p>
                )}
              </div>

              {/* GitHub URL */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Github className="w-4 h-4 mr-2 text-gray-500" />
                  GitHub Profile
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  value={cvData.githubUrl}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                    ${errors.githubUrl 
                      ? 'border-red-400 focus:border-red-500' 
                      : cvData.githubUrl && /^https?:\/\/.+/.test(cvData.githubUrl)
                        ? 'border-green-400 focus:border-green-500' 
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                  placeholder="https://github.com/username"
                />
                {errors.githubUrl && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.githubUrl}
                  </p>
                )}
                {cvData.githubUrl && /^https?:\/\/.+/.test(cvData.githubUrl) && !errors.githubUrl && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Valid GitHub URL
                  </p>
                )}
              </div>

              {/* LinkedIn URL */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Linkedin className="w-4 h-4 mr-2 text-gray-500" />
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={cvData.linkedinUrl}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none
                    ${errors.linkedinUrl 
                      ? 'border-red-400 focus:border-red-500' 
                      : cvData.linkedinUrl && /^https?:\/\/.+/.test(cvData.linkedinUrl)
                        ? 'border-green-400 focus:border-green-500' 
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                  placeholder="https://linkedin.com/in/username"
                />
                {errors.linkedinUrl && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.linkedinUrl}
                  </p>
                )}
                {cvData.linkedinUrl && /^https?:\/\/.+/.test(cvData.linkedinUrl) && !errors.linkedinUrl && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Valid LinkedIn URL
                  </p>
                )}
              </div>
            </div>

            {/* Tips Section */}
            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                <span className="w-5 h-5 mr-2">💡</span>
                Professional Tips
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Your job title should reflect your current role or the position you're targeting</li>
                <li>• Include specific achievements, metrics, and technologies in your summary</li>
                <li>• Add portfolio links to showcase your work (especially for creative/technical roles)</li>
                <li>• Ensure all URLs are complete and working before submitting</li>
                <li>• Use action words and quantify your accomplishments where possible</li>
              </ul>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button 
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Personal Info
            </button>
            
            <button
              onClick={handleNext}
              className={`flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg transform hover:scale-105
                ${requiredFieldsCompleted
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              disabled={!requiredFieldsCompleted}
            >
              Next: Work Experience
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfoPage;