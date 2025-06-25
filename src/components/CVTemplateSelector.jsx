import React, { useState, useMemo, useCallback } from 'react';
import { Download, Eye, FileText, Briefcase, Award, Palette, X } from 'lucide-react';
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// PDF Template Component
const ProfessionalPDFTemplate = ({ cvData }) => {
  const formatDate = (date) => {
    if (!date) return 'Present';
    try {
      const [year, month] = date.split('-');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[parseInt(month) - 1]} ${year}`;
    } catch (error) {
      return date; // Return original if parsing fails
    }
  };

  const getAllSkills = () => {
    const allSkills = [];
    
    // Helper function to extract skill names from either string or object format
    const extractSkillNames = (skillArray) => {
      if (!Array.isArray(skillArray)) return [];
      return skillArray.map(skill => {
        if (typeof skill === 'string') {
          return skill;
        } else if (typeof skill === 'object' && skill !== null && skill.name) {
          return skill.name;
        }
        return '';
      }).filter(skill => skill !== '');
    };

    if (cvData?.skills?.technical?.length) {
      allSkills.push(...extractSkillNames(cvData.skills.technical));
    }
    if (cvData?.skills?.soft?.length) {
      allSkills.push(...extractSkillNames(cvData.skills.soft));
    }
    if (cvData?.skills?.creative?.length) {
      allSkills.push(...extractSkillNames(cvData.skills.creative));
    }
    if (cvData?.skills?.analytical?.length) {
      allSkills.push(...extractSkillNames(cvData.skills.analytical));
    }
    
    return allSkills;
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: 30,
      fontFamily: 'Helvetica',
      fontSize: 11,
    },
    header: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: 20,
      marginBottom: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    jobTitle: {
      fontSize: 14,
      marginBottom: 8,
      opacity: 0.9,
    },
    contactInfo: {
      fontSize: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    contactItem: {
      marginRight: 15,
      marginBottom: 3,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#1f2937',
      marginTop: 15,
      marginBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#2563eb',
      paddingBottom: 3,
    },
    experienceItem: {
      marginBottom: 12,
      paddingLeft: 8,
      borderLeftWidth: 2,
      borderLeftColor: '#2563eb',
    },
    experienceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 3,
    },
    experienceTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1f2937',
      flex: 1,
    },
    experienceDate: {
      fontSize: 9,
      color: '#6b7280',
    },
    experienceCompany: {
      fontSize: 11,
      color: '#2563eb',
      fontWeight: 'bold',
      marginBottom: 3,
    },
    experienceDescription: {
      fontSize: 10,
      color: '#374151',
      lineHeight: 1.3,
      marginTop: 3,
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 5,
    },
    skillTag: {
      backgroundColor: '#dbeafe',
      color: '#1e40af',
      padding: 3,
      paddingHorizontal: 6,
      marginRight: 4,
      marginBottom: 4,
      fontSize: 9,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 10,
      color: '#374151',
      lineHeight: 1.3,
    },
    additionalSection: {
      marginTop: 10,
    },
    additionalTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: 3,
    },
    linksSection: {
      marginTop: 5,
    },
    link: {
      fontSize: 9,
      color: '#2563eb',
      marginBottom: 2,
    },
  });

  // Ensure cvData exists and has required fields
  if (!cvData) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.text}>No CV data provided</Text>
        </Page>
      </Document>
    );
  }

  const allSkills = getAllSkills();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {`${cvData.firstName || 'First Name'} ${cvData.lastName || 'Last Name'}`}
          </Text>
          {cvData.jobTitle && <Text style={styles.jobTitle}>{cvData.jobTitle}</Text>}
          <View style={styles.contactInfo}>
            {cvData.email && <Text style={styles.contactItem}>📧 {cvData.email}</Text>}
            {cvData.phone && <Text style={styles.contactItem}>📞 {cvData.phone}</Text>}
            {(cvData.city || cvData.country) && (
              <Text style={styles.contactItem}>
                📍 {[cvData.city, cvData.country].filter(Boolean).join(', ')}
              </Text>
            )}
          </View>
        </View>

        {/* Professional Summary */}
        {cvData.professionalSummary && (
          <View>
            <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
            <Text style={styles.text}>{cvData.professionalSummary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {cvData.experiences && cvData.experiences.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
            {cvData.experiences
              .filter(exp => exp && (exp.jobTitle || exp.company))
              .map((exp, index) => (
                <View key={`exp-${index}`} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceTitle}>
                      {exp.jobTitle || 'Position Title'}
                    </Text>
                    <Text style={styles.experienceDate}>
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </Text>
                  </View>
                  {exp.company && (
                    <Text style={styles.experienceCompany}>
                      {exp.company}{exp.location ? ` • ${exp.location}` : ''}
                    </Text>
                  )}
                  {exp.description && (
                    <Text style={styles.experienceDescription}>{exp.description}</Text>
                  )}
                </View>
              ))}
          </View>
        )}

        {/* Education */}
        {cvData.educations && cvData.educations.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {cvData.educations
              .filter(edu => edu && (edu.degree || edu.institution))
              .map((edu, index) => (
                <View key={`edu-${index}`} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceTitle}>
                      {edu.degree || 'Degree'}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                    </Text>
                    <Text style={styles.experienceDate}>
                      {edu.startYear || 'Start'} - {edu.endYear || 'End'}
                    </Text>
                  </View>
                  {edu.institution && (
                    <Text style={styles.experienceCompany}>{edu.institution}</Text>
                  )}
                  {edu.description && (
                    <Text style={styles.experienceDescription}>{edu.description}</Text>
                  )}
                </View>
              ))}
          </View>
        )}

        {/* Skills */}
        {allSkills.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <View style={styles.skillsContainer}>
              {allSkills.map((skill, index) => (
                <Text key={`skill-${index}`} style={styles.skillTag}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Additional Sections */}
        {cvData.languages && cvData.languages.trim() !== '' && (
          <View style={styles.additionalSection}>
            <Text style={styles.additionalTitle}>LANGUAGES</Text>
            <Text style={styles.text}>{cvData.languages}</Text>
          </View>
        )}

        {cvData.certifications && cvData.certifications.trim() !== '' && (
          <View style={styles.additionalSection}>
            <Text style={styles.additionalTitle}>CERTIFICATIONS</Text>
            <Text style={styles.text}>{cvData.certifications}</Text>
          </View>
        )}

        {cvData.interests && cvData.interests.trim() !== '' && (
          <View style={styles.additionalSection}>
            <Text style={styles.additionalTitle}>INTERESTS</Text>
            <Text style={styles.text}>{cvData.interests}</Text>
          </View>
        )}

        {/* Links */}
        {(cvData.portfolioUrl || cvData.githubUrl || cvData.linkedinUrl) && (
          <View style={styles.additionalSection}>
            <Text style={styles.additionalTitle}>LINKS</Text>
            <View style={styles.linksSection}>
              {cvData.portfolioUrl && (
                <Text style={styles.link}>Portfolio: {cvData.portfolioUrl}</Text>
              )}
              {cvData.githubUrl && (
                <Text style={styles.link}>GitHub: {cvData.githubUrl}</Text>
              )}
              {cvData.linkedinUrl && (
                <Text style={styles.link}>LinkedIn: {cvData.linkedinUrl}</Text>
              )}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

// Main Template Selector Component
const CVTemplateSelector = ({ cvData, onClose }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [pdfError, setPdfError] = useState(null);
  const [previewKey, setPreviewKey] = useState(0);

  // Memoize the safe data to prevent unnecessary re-renders
  const safeData = useMemo(() => {
    console.log('Original cvData:', cvData); // Debug log
    
    if (!cvData || Object.keys(cvData).length === 0) {
      const defaultData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        city: 'New York',
        country: 'USA',
        jobTitle: 'Software Developer',
        professionalSummary: 'Experienced professional with a passion for creating innovative solutions and delivering high-quality results.',
        portfolioUrl: 'https://johndoe.portfolio.com',
        githubUrl: 'https://github.com/johndoe',
        linkedinUrl: 'https://linkedin.com/in/johndoe',
        experiences: [
          {
            jobTitle: 'Senior Software Developer',
            company: 'Tech Innovations Inc.',
            location: 'New York, NY',
            startDate: '2022-01',
            endDate: '',
            current: true,
            description: 'Led development of web applications using React and Node.js. Collaborated with cross-functional teams to deliver scalable solutions.'
          },
          {
            jobTitle: 'Software Developer',
            company: 'StartUp Solutions',
            location: 'San Francisco, CA',
            startDate: '2020-06',
            endDate: '2021-12',
            current: false,
            description: 'Developed and maintained multiple client projects using modern JavaScript frameworks.'
          }
        ],
        educations: [
          {
            degree: 'Bachelor of Science',
            institution: 'University of Technology',
            fieldOfStudy: 'Computer Science',
            startYear: '2016',
            endYear: '2020',
            description: 'Graduated with honors, specializing in software engineering and data structures.'
          }
        ],
        skills: {
          technical: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'],
          soft: ['Communication', 'Team Leadership', 'Problem Solving', 'Project Management'],
          creative: ['UI/UX Design', 'Creative Writing'],
          analytical: ['Data Analysis', 'Strategic Planning']
        },
        languages: 'English (Native), Spanish (Intermediate), French (Basic)',
        certifications: 'AWS Certified Developer, Google Cloud Platform Professional',
        interests: 'Photography, Hiking, Open Source Contributing, Chess'
      };
      console.log('Using default data:', defaultData);
      return defaultData;
    }

    // Deep clone the data to prevent reference issues
    const clonedData = JSON.parse(JSON.stringify(cvData));
    
    // Process the actual CV data with proper defaults
    const processedData = {
      firstName: clonedData.firstName || 'John',
      lastName: clonedData.lastName || 'Doe',
      email: clonedData.email || 'john.doe@example.com',
      phone: clonedData.phone || '+1 (555) 123-4567',
      city: clonedData.city || 'New York',
      country: clonedData.country || 'USA',
      jobTitle: clonedData.jobTitle || 'Software Developer',
      professionalSummary: clonedData.professionalSummary || 'Experienced professional with a passion for creating innovative solutions.',
      portfolioUrl: clonedData.portfolioUrl || '',
      githubUrl: clonedData.githubUrl || '',
      linkedinUrl: clonedData.linkedinUrl || '',
      experiences: Array.isArray(clonedData.experiences) && clonedData.experiences.length > 0 ? clonedData.experiences : [
        {
          jobTitle: 'Software Developer',
          company: 'Tech Company',
          location: 'New York, NY',
          startDate: '2022-01',
          endDate: '',
          current: true,
          description: 'Developed and maintained web applications using modern technologies.'
        }
      ],
      educations: Array.isArray(clonedData.educations) && clonedData.educations.length > 0 ? clonedData.educations : [
        {
          degree: 'Bachelor of Science',
          institution: 'University Name',
          fieldOfStudy: 'Computer Science',
          startYear: '2018',
          endYear: '2022',
          description: ''
        }
      ],
      skills: {
        technical: Array.isArray(clonedData?.skills?.technical) && clonedData.skills.technical.length > 0 ? clonedData.skills.technical : ['JavaScript', 'React', 'Node.js'],
        soft: Array.isArray(clonedData?.skills?.soft) && clonedData.skills.soft.length > 0 ? clonedData.skills.soft : ['Communication', 'Team Work'],
        creative: Array.isArray(clonedData?.skills?.creative) ? clonedData.skills.creative : [],
        analytical: Array.isArray(clonedData?.skills?.analytical) ? clonedData.skills.analytical : []
      },
      languages: clonedData.languages || '',
      certifications: clonedData.certifications || '',
      interests: clonedData.interests || ''
    };
    
    console.log('Processed data:', processedData);
    return processedData;
  }, [cvData]);

  // Memoize the PDF document to prevent unnecessary re-renders
  const pdfDocument = useMemo(() => {
    return <ProfessionalPDFTemplate cvData={safeData} />;
  }, [safeData]);

  const handlePreview = useCallback(() => {
    console.log('Opening preview with data:', safeData);
    setPdfError(null);
    setPreviewKey(prev => prev + 1); // Force re-render of PDFViewer
    setShowPreview(true);
  }, [safeData]);

  const handleClosePreview = useCallback(() => {
    setShowPreview(false);
    setPdfError(null);
  }, []);

  // Generate filename
  const fileName = `${safeData.firstName}_${safeData.lastName}_CV.pdf`.replace(/\s+/g, '_');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your CV Template</h1>
          <p className="text-lg text-gray-600">Select a professional template to showcase your experience</p>
        </div>

        {/* Template Card */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Template Preview Image */}
            <div className="h-64 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
              <div className="text-white text-center">
                <Briefcase className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Professional</h3>
                <p className="text-blue-100 mt-2">Clean & Modern Design</p>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Professional Template</h3>
                  <p className="text-gray-600">Perfect for corporate roles</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm text-gray-600">Recommended</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <Palette className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Blue & White Theme</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handlePreview}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </button>
                
                <PDFDownloadLink
                  document={pdfDocument}
                  fileName={fileName}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2 no-underline"
                >
                  {({ loading, error }) => (
                    <>
                      <Download className="h-4 w-4" />
                      <span>
                        {error ? 'Error' : loading ? 'Generating...' : 'Download'}
                      </span>
                    </>
                  )}
                </PDFDownloadLink>
              </div>

              {/* Debug Info */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">CV Data Status:</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <p><span className="font-medium">Data Source:</span> {cvData && Object.keys(cvData).length > 0 ? 'External Data' : 'Sample Data'}</p>
                  <p><span className="font-medium">Name:</span> {safeData.firstName} {safeData.lastName}</p>
                  <p><span className="font-medium">Job Title:</span> {safeData.jobTitle}</p>
                  <p><span className="font-medium">Experience Entries:</span> {safeData.experiences?.length || 0}</p>
                  <p><span className="font-medium">Education Entries:</span> {safeData.educations?.length || 0}</p>
                  <p><span className="font-medium">Total Skills:</span> {Object.values(safeData.skills).flat().length}</p>
                  <p><span className="font-medium">Summary Length:</span> {safeData.professionalSummary?.length || 0} chars</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Templates */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">More Templates Coming Soon</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {['Creative', 'Minimal', 'Executive'].map((template, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden opacity-50">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 font-medium">{template}</p>
                    <p className="text-sm text-gray-400">Coming Soon</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-5xl h-full max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-white" />
                    <div>
                      <h3 className="text-white font-semibold">CV Preview</h3>
                      <p className="text-slate-300 text-sm">{fileName}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <PDFDownloadLink
                    document={pdfDocument}
                    fileName={fileName}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 no-underline font-medium"
                  >
                    {({ loading, error }) => (
                      <>
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                        <span>
                          {error ? 'Error' : loading ? 'Generating...' : 'Download'}
                        </span>
                      </>
                    )}
                  </PDFDownloadLink>
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
                      onClick={handlePreview}
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
                    {pdfDocument}
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