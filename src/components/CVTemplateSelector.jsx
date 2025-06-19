import React, { useState, useMemo } from 'react';
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
      padding: 40,
      fontFamily: 'Helvetica',
    },
    header: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: 20,
      marginBottom: 20,
      borderRadius: 8,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    jobTitle: {
      fontSize: 16,
      marginBottom: 10,
      color: '#bfdbfe',
    },
    contactInfo: {
      fontSize: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 15,
    },
    contactItem: {
      marginRight: 15,
      marginBottom: 5,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1f2937',
      marginTop: 20,
      marginBottom: 10,
      borderBottomWidth: 2,
      borderBottomColor: '#2563eb',
      paddingBottom: 5,
    },
    experienceItem: {
      marginBottom: 15,
      paddingLeft: 10,
      borderLeftWidth: 3,
      borderLeftColor: '#2563eb',
    },
    experienceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 5,
    },
    experienceTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#1f2937',
      flex: 1,
    },
    experienceDate: {
      fontSize: 10,
      color: '#6b7280',
      textAlign: 'right',
    },
    experienceCompany: {
      fontSize: 12,
      color: '#2563eb',
      fontWeight: 'bold',
      marginBottom: 5,
    },
    experienceDescription: {
      fontSize: 11,
      color: '#374151',
      lineHeight: 1.4,
      marginTop: 5,
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 5,
      marginTop: 10,
    },
    skillTag: {
      backgroundColor: '#dbeafe',
      color: '#1e40af',
      padding: '4 8',
      borderRadius: 12,
      fontSize: 10,
      fontWeight: 'bold',
      marginRight: 5,
      marginBottom: 5,
    },
    text: {
      fontSize: 11,
      color: '#374151',
      lineHeight: 1.4,
    },
    additionalSection: {
      marginTop: 15,
    },
    additionalTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: 5,
    },
    linksSection: {
      marginTop: 10,
    },
    link: {
      fontSize: 10,
      color: '#2563eb',
      marginBottom: 2,
    },
  });

  // Ensure cvData exists
  if (!cvData) {
    return null;
  }

  const allSkills = getAllSkills();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {(cvData.firstName || '') + ' ' + (cvData.lastName || '')}
          </Text>
          {cvData.jobTitle && <Text style={styles.jobTitle}>{cvData.jobTitle}</Text>}
          <View style={styles.contactInfo}>
            {cvData.email && <Text style={styles.contactItem}>{cvData.email}</Text>}
            {cvData.phone && <Text style={styles.contactItem}>{cvData.phone}</Text>}
            {(cvData.city || cvData.country) && (
              <Text style={styles.contactItem}>
                {[cvData.city, cvData.country].filter(Boolean).join(', ')}
              </Text>
            )}
          </View>
        </View>

        {/* Professional Summary */}
        {cvData.professionalSummary && (
          <View>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.text}>{cvData.professionalSummary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {cvData.experiences && cvData.experiences.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {cvData.experiences
              .filter(exp => exp && exp.jobTitle && exp.jobTitle.trim() !== '')
              .map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceTitle}>{exp.jobTitle}</Text>
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
            <Text style={styles.sectionTitle}>Education</Text>
            {cvData.educations
              .filter(edu => edu && edu.degree && edu.degree.trim() !== '')
              .map((edu, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceTitle}>
                      {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                    </Text>
                    <Text style={styles.experienceDate}>
                      {edu.startYear} - {edu.endYear}
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
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {allSkills.map((skill, index) => (
                <Text key={index} style={styles.skillTag}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Additional Sections */}
        {cvData.languages && cvData.languages.trim() !== '' && (
          <View style={styles.additionalSection}>
            <Text style={styles.additionalTitle}>Languages</Text>
            <Text style={styles.text}>{cvData.languages}</Text>
          </View>
        )}

        {cvData.certifications && cvData.certifications.trim() !== '' && (
          <View style={styles.additionalSection}>
            <Text style={styles.additionalTitle}>Certifications</Text>
            <Text style={styles.text}>{cvData.certifications}</Text>
          </View>
        )}

        {cvData.interests && cvData.interests.trim() !== '' && (
          <View style={styles.additionalSection}>
            <Text style={styles.additionalTitle}>Interests</Text>
            <Text style={styles.text}>{cvData.interests}</Text>
          </View>
        )}

        {/* Links */}
        {(cvData.portfolioUrl || cvData.githubUrl || cvData.linkedinUrl) && (
          <View style={styles.additionalSection}>
            <Text style={styles.additionalTitle}>Links</Text>
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

  // Memoize the safe data to prevent unnecessary re-renders
  const safeData = useMemo(() => {
    return {
      firstName: cvData?.firstName || 'John',
      lastName: cvData?.lastName || 'Doe',
      email: cvData?.email || 'john.doe@example.com',
      phone: cvData?.phone || '+1 (555) 123-4567',
      city: cvData?.city || 'New York',
      country: cvData?.country || 'USA',
      jobTitle: cvData?.jobTitle || 'Software Developer',
      professionalSummary: cvData?.professionalSummary || 'Experienced professional with a passion for creating innovative solutions.',
      portfolioUrl: cvData?.portfolioUrl || '',
      githubUrl: cvData?.githubUrl || '',
      linkedinUrl: cvData?.linkedinUrl || '',
      experiences: Array.isArray(cvData?.experiences) ? cvData.experiences : [
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
      educations: Array.isArray(cvData?.educations) ? cvData.educations : [
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
        technical: Array.isArray(cvData?.skills?.technical) ? cvData.skills.technical : ['JavaScript', 'React', 'Node.js'],
        soft: Array.isArray(cvData?.skills?.soft) ? cvData.skills.soft : ['Communication', 'Team Work'],
        creative: Array.isArray(cvData?.skills?.creative) ? cvData.skills.creative : [],
        analytical: Array.isArray(cvData?.skills?.analytical) ? cvData.skills.analytical : []
      },
      languages: cvData?.languages || '',
      certifications: cvData?.certifications || '',
      interests: cvData?.interests || ''
    };
  }, [cvData]);

  const handlePreview = () => {
    setPdfError(null);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setPdfError(null);
  };

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
                  document={<ProfessionalPDFTemplate cvData={safeData} />}
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

              {/* Debug Info - Remove in production */}
              <div className="mt-4 p-2 bg-gray-100 rounded text-xs text-gray-600">
                <p>Data loaded: {cvData ? 'Yes' : 'No'}</p>
                <p>Name: {safeData.firstName} {safeData.lastName}</p>
                <p>Experiences: {safeData.experiences?.length || 0}</p>
                <p>Skills: {Object.values(safeData.skills).flat().length}</p>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-bold">CV Preview</h3>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Professional Template</span>
              </div>
              <div className="flex items-center space-x-3">
                <PDFDownloadLink
                  document={<ProfessionalPDFTemplate cvData={safeData} />}
                  fileName={fileName}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2 no-underline"
                >
                  {({ loading, error }) => (
                    <>
                      <Download className="h-4 w-4" />
                      <span>
                        {error ? 'Error' : loading ? 'Generating...' : 'Download PDF'}
                      </span>
                    </>
                  )}
                </PDFDownloadLink>
                <button
                  onClick={handleClosePreview}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {pdfError ? (
                <div className="p-8 text-center">
                  <div className="text-red-600 mb-4">
                    <FileText className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">PDF Generation Error</h3>
                    <p className="text-sm text-gray-600 mt-2">{pdfError}</p>
                  </div>
                  <button
                    onClick={() => setPdfError(null)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <PDFViewer width="100%" height="600px" showToolbar={true}>
                    <ProfessionalPDFTemplate cvData={safeData} />
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