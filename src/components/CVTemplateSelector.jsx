import React, { useState, useCallback } from 'react';
import { Eye, FileText, Briefcase, Award, Palette, X } from 'lucide-react';
import { PDFViewer } from '@react-pdf/renderer';
import ProfessionalTemplate from './cv-templates/ProfessionalTemplate';

// Main Template Selector Component
const CVTemplateSelector = ({ cvData, onClose }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [pdfError, setPdfError] = useState(null);
  const [previewKey, setPreviewKey] = useState(0);

  // Get Professional Template data
  const professionalTemplate = ProfessionalTemplate({ cvData });

  const handlePreview = useCallback((templateType) => {
    console.log('Opening preview for template:', templateType);
    setPdfError(null);
    setPreviewKey(prev => prev + 1); // Force re-render of PDFViewer
    
    if (templateType === 'professional') {
      setSelectedTemplate(professionalTemplate);
    }
    
    setShowPreview(true);
  }, [professionalTemplate]);

  const handleClosePreview = useCallback(() => {
    setShowPreview(false);
    setPdfError(null);
    setSelectedTemplate(null);
  }, []);

  // Available templates configuration
  const templates = [
    {
      id: 'professional',
      name: 'Professional Template',
      description: 'Perfect for corporate roles',
      theme: 'Blue & White Theme',
      recommended: true,
      available: true,
      icon: Briefcase,
      gradient: 'from-blue-600 to-indigo-700',
      templateData: professionalTemplate
    },
    {
      id: 'creative',
      name: 'Creative Template',
      description: 'Stand out with creativity',
      theme: 'Colorful & Dynamic',
      recommended: false,
      available: false,
      icon: Palette,
      gradient: 'from-purple-600 to-pink-700',
      templateData: null
    },
    {
      id: 'minimal',
      name: 'Minimal Template',
      description: 'Clean and simple design',
      theme: 'Black & White',
      recommended: false,
      available: false,
      icon: FileText,
      gradient: 'from-gray-600 to-gray-800',
      templateData: null
    },
    {
      id: 'executive',
      name: 'Executive Template',
      description: 'For senior positions',
      theme: 'Professional Dark',
      recommended: false,
      available: false,
      icon: Award,
      gradient: 'from-slate-600 to-slate-800',
      templateData: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your CV Template</h1>
          <p className="text-lg text-gray-600">Select a professional template to showcase your experience</p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {templates.map((template) => {
            const IconComponent = template.icon;
            
            return (
              <div 
                key={template.id} 
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  !template.available ? 'opacity-60' : 'hover:scale-105'
                }`}
              >
                {/* Template Preview */}
                <div className={`h-48 bg-gradient-to-br ${template.gradient} flex items-center justify-center relative`}>
                  <div className="text-white text-center">
                    <IconComponent className="h-12 w-12 mx-auto mb-3" />
                    <h3 className="text-xl font-bold">{template.name.split(' ')[0]}</h3>
                    <p className="text-white/80 mt-1 text-sm">{template.description}</p>
                  </div>
                  
                  {/* Recommended Badge */}
                  {template.recommended && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <Award className="h-3 w-3" />
                      <span>Top</span>
                    </div>
                  )}
                  
                  {/* Coming Soon Badge */}
                  {!template.available && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                        Coming Soon
                      </div>
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{template.name}</h3>
                    <p className="text-gray-600 text-sm">{template.description}</p>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <Palette className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{template.theme}</span>
                  </div>

                  {/* Action Buttons */}
                  {template.available ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePreview(template.id)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Preview</span>
                      </button>
                      
                      <div className="flex-1">
                        {template.templateData?.downloadComponent}
                      </div>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        disabled
                        className="flex-1 bg-gray-300 text-gray-500 px-3 py-2 rounded-lg cursor-not-allowed flex items-center justify-center space-x-2 text-sm"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Preview</span>
                      </button>
                      
                      <button
                        disabled
                        className="flex-1 bg-gray-300 text-gray-500 px-3 py-2 rounded-lg cursor-not-allowed flex items-center justify-center space-x-2 text-sm"
                      >
                        <FileText className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Templates?</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Professional Design</h3>
                <p className="text-gray-600 text-sm">Carefully crafted layouts that make a strong first impression</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">ATS Friendly</h3>
                <p className="text-gray-600 text-sm">Optimized to pass through Applicant Tracking Systems</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Palette className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Easy to Use</h3>
                <p className="text-gray-600 text-sm">Simple one-click download and preview functionality</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-full h-full h-[100vh] bg-white  shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-white" />
                    <div>
                      <h3 className="text-white font-semibold">CV Preview</h3>
                      <p className="text-slate-300 text-sm">{selectedTemplate.fileName}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {selectedTemplate.downloadComponent}
                  <button
                    onClick={handleClosePreview}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 bg-gray-100 h-full">
              {pdfError ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Preview Error</h3>
                    <p className="text-gray-600 mb-4">{pdfError}</p>
                    <button
                      onClick={() => handlePreview('professional')}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <PDFViewer 
                    key={previewKey}
                    width="100%"
                    height="100%" 
                    showToolbar={false}
                  >
                    {selectedTemplate.document}
                  </PDFViewer>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVTemplateSelector;