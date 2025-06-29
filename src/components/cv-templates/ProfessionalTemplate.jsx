import React, { useMemo } from 'react';
import { Download } from 'lucide-react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// PDF Document Component
const ProfessionalPDFDocument = ({ cvData }) => {
  const formatDate = (date) => {
    if (!date) return 'Present';
    try {
      const [year, month] = date.split('-');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[parseInt(month) - 1]} ${year}`;
    } catch (error) {
      return date;
    }
  };

  const getAllSkills = () => {
    const allSkills = [];
    
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
      fontFamily: 'Helvetica',
      fontSize: 10,
    },
    header: {
      backgroundColor: '#ffffff',
      padding: 30,
      paddingBottom: 20,
    },
    nameText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: 5,
    },
    jobTitleText: {
      fontSize: 16,
      color: '#3498db',
      marginBottom: 15,
      fontWeight: 'bold',
    },
    summaryText: {
      fontSize: 11,
      color: '#2c3e50',
      lineHeight: 1.5,
      textAlign: 'justify',
      marginBottom: 15,
    },
    contactBar: {
      backgroundColor: '#3498db',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 12,
      marginTop: 10,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      color: 'white',
      fontSize: 10,
    },
    contactIcon: {
      marginRight: 5,
      fontSize: 10,
    },
    mainContent: {
      flexDirection: 'row',
      padding: 30,
      paddingTop: 25,
    },
    leftColumn: {
      width: '60%',
      paddingRight: 20,
    },
    rightColumn: {
      width: '40%',
      paddingLeft: 20,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#3498db',
      marginBottom: 12,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    experienceItem: {
      marginBottom: 20,
    },
    experienceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 5,
    },
    experienceTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#2c3e50',
      flex: 1,
    },
    experienceDate: {
      fontSize: 10,
      color: '#7f8c8d',
      fontStyle: 'italic',
    },
    experienceCompany: {
      fontSize: 11,
      color: '#2c3e50',
      marginBottom: 8,
      fontWeight: 'bold',
    },
    experienceDescription: {
      fontSize: 10,
      color: '#2c3e50',
      lineHeight: 1.4,
      textAlign: 'justify',
    },
    bulletPoint: {
      fontSize: 10,
      color: '#2c3e50',
      lineHeight: 1.4,
      marginBottom: 3,
      paddingLeft: 10,
    },
    educationItem: {
      marginBottom: 15,
    },
    educationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 3,
    },
    educationTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#2c3e50',
    },
    educationDate: {
      fontSize: 10,
      color: '#7f8c8d',
      fontStyle: 'italic',
    },
    educationInstitution: {
      fontSize: 11,
      color: '#2c3e50',
      marginBottom: 5,
    },
    skillsSection: {
      marginBottom: 20,
    },
    skillCategory: {
      marginBottom: 15,
    },
    skillCategoryTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: 8,
    },
    skillItem: {
      fontSize: 10,
      color: '#2c3e50',
      marginBottom: 2,
      paddingLeft: 5,
    },
    skillTag: {
      backgroundColor: '#ecf0f1',
      color: '#2c3e50',
      padding: 4,
      paddingHorizontal: 8,
      marginRight: 5,
      marginBottom: 5,
      fontSize: 9,
      borderRadius: 10,
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    certificationsSection: {
      marginBottom: 20,
    },
    certificationItem: {
      marginBottom: 8,
    },
    certificationTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: 2,
    },
    certificationDetails: {
      fontSize: 10,
      color: '#7f8c8d',
    },
    languagesSection: {
      marginBottom: 20,
    },
    languageItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
      fontSize: 10,
      color: '#2c3e50',
    },
    languageName: {
      fontWeight: 'bold',
    },
    languageProficiency: {
      color: '#7f8c8d',
      fontStyle: 'italic',
    },
  });

  if (!cvData) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>No CV data provided</Text>
        </Page>
      </Document>
    );
  }

  const allSkills = getAllSkills();
  const languages = cvData.additionalInfo?.languages || [];
  const certifications = cvData.additionalInfo?.certifications || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.nameText}>
            {`${cvData.firstName || 'Lisa'} ${cvData.lastName || 'Neumann'}`}
          </Text>
          <Text style={styles.jobTitleText}>
            {cvData.jobTitle || 'Mechanical Engineer'}
          </Text>
          <Text style={styles.summaryText}>
            {cvData.professionalSummary || 'Methodical, results-oriented Mechanical Engineering professional with 8+ years of remarkable experience in developing detailed and cost-efficient designs to enhance business efficiency. Adept at leveraging strong command of modern technologies, programs, and industry best practices to design and maintain mechanical equipment, industrial processing systems, and tools.'}
          </Text>
        </View>

        {/* Contact Bar */}
        <View style={styles.contactBar}>
          {cvData.email && (
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>✉</Text>
              <Text>{cvData.email}</Text>
            </View>
          )}
          {cvData.phone && (
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>📞</Text>
              <Text>{cvData.phone}</Text>
            </View>
          )}
          {(cvData.city || cvData.country) && (
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>📍</Text>
              <Text>{[cvData.city, cvData.country].filter(Boolean).join(', ')}</Text>
            </View>
          )}
          {cvData.linkedinUrl && (
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>💼</Text>
              <Text>{cvData.linkedinUrl.replace('https://', '').replace('linkedin.com/in/', '')}</Text>
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Work Experience */}
            {cvData.experiences && cvData.experiences.length > 0 && (
              <View style={{ marginBottom: 25 }}>
                <Text style={styles.sectionTitle}>Work Experience</Text>
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
                          {exp.company}
                        </Text>
                      )}
                      {exp.description && (
                        <View>
                          {exp.description.split('•').filter(point => point.trim()).map((point, idx) => (
                            <Text key={idx} style={styles.bulletPoint}>
                              • {point.trim()}
                            </Text>
                          ))}
                        </View>
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
                  .filter(edu => edu && (edu.degree || edu.institution))
                  .map((edu, index) => (
                    <View key={`edu-${index}`} style={styles.educationItem}>
                      <View style={styles.educationHeader}>
                        <Text style={styles.educationTitle}>
                          {edu.degree || 'Degree'}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                        </Text>
                        <Text style={styles.educationDate}>
                          {edu.startYear || 'Start'} - {edu.endYear || 'End'}
                        </Text>
                      </View>
                      {edu.institution && (
                        <Text style={styles.educationInstitution}>
                          {edu.institution}
                        </Text>
                      )}
                    </View>
                  ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Technical Skills */}
            {cvData.skills?.technical && cvData.skills.technical.length > 0 && (
              <View style={styles.skillsSection}>
                <Text style={styles.sectionTitle}>Technical Skills</Text>
                <View style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>Computer-aided Design</Text>
                  <View style={styles.skillsContainer}>
                    {cvData.skills.technical.slice(0, 4).map((skill, index) => (
                      <Text key={`tech-${index}`} style={styles.skillTag}>
                        {typeof skill === 'string' ? skill : skill.name}
                      </Text>
                    ))}
                  </View>
                </View>
                
                {cvData.skills.technical.length > 4 && (
                  <View style={styles.skillCategory}>
                    <Text style={styles.skillCategoryTitle}>Computing</Text>
                    <View style={styles.skillsContainer}>
                      {cvData.skills.technical.slice(4).map((skill, index) => (
                        <Text key={`comp-${index}`} style={styles.skillTag}>
                          {typeof skill === 'string' ? skill : skill.name}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}

            {/* General Skills (Soft Skills) */}
            {cvData.skills?.soft && cvData.skills.soft.length > 0 && (
              <View style={styles.skillsSection}>
                <Text style={styles.sectionTitle}>General Skills</Text>
                <View style={styles.skillsContainer}>
                  {cvData.skills.soft.map((skill, index) => (
                    <Text key={`soft-${index}`} style={styles.skillTag}>
                      {typeof skill === 'string' ? skill : skill.name}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {/* Certificates */}
            {certifications.length > 0 && (
              <View style={styles.certificationsSection}>
                <Text style={styles.sectionTitle}>Certificates</Text>
                {certifications.map((cert, index) => (
                  <View key={`cert-${index}`} style={styles.certificationItem}>
                    <Text style={styles.certificationTitle}>
                      {cert.name || cert}
                    </Text>
                    {cert.date && (
                      <Text style={styles.certificationDetails}>
                        ({cert.date})
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <View style={styles.languagesSection}>
                <Text style={styles.sectionTitle}>Languages</Text>
                {languages.map((lang, index) => (
                  <View key={`lang-${index}`} style={styles.languageItem}>
                    <Text style={styles.languageName}>
                      {lang.name || lang}
                    </Text>
                    <Text style={styles.languageProficiency}>
                      {lang.proficiency ? 
                        lang.proficiency.charAt(0).toUpperCase() + lang.proficiency.slice(1) + 
                        (lang.proficiency.toLowerCase() === 'native' ? ' or Bilingual Proficiency' : 
                         lang.proficiency.toLowerCase() === 'fluent' ? ' Professional Proficiency' : 
                         ' Proficiency') 
                        : 'Intermediate Proficiency'}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Main Professional Template Component
const ProfessionalTemplate = ({ cvData }) => {
  const safeData = useMemo(() => {
    console.log('ProfessionalTemplate - Original cvData:', cvData);
    
    if (!cvData || Object.keys(cvData).length === 0) {
      const defaultData = {
        firstName: 'Lisa',
        lastName: 'Neumann',
        email: 'lisa@novoresume.com',
        phone: '123 444 5555',
        city: 'Philadelphia',
        country: 'PA',
        jobTitle: 'Mechanical Engineer',
        professionalSummary: 'Methodical, results-oriented Mechanical Engineering professional with 8+ years of remarkable experience in developing detailed and cost-efficient designs to enhance business efficiency. Adept at leveraging strong command of modern technologies, programs, and industry best practices to design and maintain mechanical equipment, industrial processing systems, and tools.',
        linkedinUrl: 'https://linkedin.com/in/lisa.neumann',
        experiences: [
          {
            jobTitle: 'Mechanical/HVAC Engineer',
            company: 'TechUsa',
            startDate: '2021-11',
            current: true,
            description: '• Spearheaded multiple projects designing mechanical/HVAC systems for high-profile clients.\n• Managed 8 projects with an individual budget of over $4 million and ensured that the legal and technical requirements have been met.\n• Developed and fully implemented technical drawings and innovative blueprints for the company\'s advanced, high-capacity cooling systems, resulting in an 8% increase in industrial output.\n• Led and collaborated with a team of 20+ junior mechanical engineers to design, establish, and install a variety of cooling equipment to be utilized for industrial food preservation systems.'
          },
          {
            jobTitle: 'Mechanical Application Engineer',
            company: 'SistoMatic Company',
            startDate: '2016-02',
            endDate: '2021-10',
            description: '• Revamped and streamlined project management methodologies to ensure that all requirements, budgets, schedules, and deadlines are on track.\n• Extensively optimized AutoCAD and navigation tools to identify, devise, and implement improvements for P&IDs.'
          },
          {
            jobTitle: 'Junior Mechanical Engineer',
            company: 'Flextronics Corporation',
            startDate: '2014-09',
            endDate: '2016-01',
            description: '• Demonstrated strong attention to detail, focus, and expert care to consistently assert the production error rate below 2%.\n• Assisted in planning for efficient workforce utilization and equipment layouts to optimize business workflow, resulting in a more than 10% increase in production capacity annually.'
          }
        ],
        educations: [
          {
            degree: 'Bachelor of Science in Mechanical Engineering',
            institution: 'Western Michigan University',
            startYear: '2010',
            endYear: '2014'
          }
        ],
        skills: {
          technical: [
            'Autodesk Revit',
            'Building Information Modeling',
            'Energy Modeling Programs',
            'AutoCAD',
            'MS Office',
            'Intermediate Python'
          ],
          soft: [
            'Time Management',
            'Mathematics',
            'Technical Documentation',
            'Leadership',
            'Communication',
            'Project Management'
          ]
        },
        additionalInfo: {
          languages: [
            { name: 'English', proficiency: 'native' },
            { name: 'Spanish', proficiency: 'fluent' },
            { name: 'French', proficiency: 'fluent' }
          ],
          certifications: [
            { name: 'Six Sigma Green Belt Certified', date: '2014' },
            { name: 'Pennsylvania Professional Engineer', date: '2012' },
            { name: 'EPA 608 Universal Certification for HVAC', date: '' }
          ]
        }
      };
      console.log('ProfessionalTemplate - Using default data:', defaultData);
      return defaultData;
    }

    const clonedData = JSON.parse(JSON.stringify(cvData));
    
    const processedData = {
      firstName: clonedData.firstName || 'Lisa',
      lastName: clonedData.lastName || 'Neumann',
      email: clonedData.email || 'lisa@novoresume.com',
      phone: clonedData.phone || '123 444 5555',
      city: clonedData.city || 'Philadelphia',
      country: clonedData.country || 'PA',
      jobTitle: clonedData.jobTitle || 'Mechanical Engineer',
      professionalSummary: clonedData.professionalSummary || 'Experienced professional with a passion for excellence and dedication to providing outstanding service.',
      portfolioUrl: clonedData.portfolioUrl || '',
      githubUrl: clonedData.githubUrl || '',
      linkedinUrl: clonedData.linkedinUrl || '',
      profilePictureUrl: clonedData.profilePictureUrl || '',
      experiences: Array.isArray(clonedData.experiences) && clonedData.experiences.length > 0 ? clonedData.experiences : [
        {
          jobTitle: 'Professional Position',
          company: 'Company Name',
          startDate: '2020-01',
          current: true,
          description: '• Key achievement or responsibility\n• Another important accomplishment\n• Additional relevant experience'
        }
      ],
      educations: Array.isArray(clonedData.educations) && clonedData.educations.length > 0 ? clonedData.educations : [
        {
          degree: 'Bachelor of Science',
          institution: 'University Name',
          fieldOfStudy: 'Field of Study',
          startYear: '2015',
          endYear: '2019'
        }
      ],
      skills: {
        technical: Array.isArray(clonedData?.skills?.technical) && clonedData.skills.technical.length > 0 ? clonedData.skills.technical : ['Technical Skill 1', 'Technical Skill 2', 'Technical Skill 3'],
        soft: Array.isArray(clonedData?.skills?.soft) && clonedData.skills.soft.length > 0 ? clonedData.skills.soft : ['Communication', 'Leadership', 'Problem Solving'],
        creative: Array.isArray(clonedData?.skills?.creative) ? clonedData.skills.creative : [],
        analytical: Array.isArray(clonedData?.skills?.analytical) ? clonedData.skills.analytical : []
      },
      additionalInfo: {
        languages: Array.isArray(clonedData?.additionalInfo?.languages) ? clonedData.additionalInfo.languages : [
          { name: 'English', proficiency: 'native' }
        ],
        certifications: Array.isArray(clonedData?.additionalInfo?.certifications) ? clonedData.additionalInfo.certifications : [
          { name: 'Professional Certification', date: '2020' }
        ],
        interests: Array.isArray(clonedData?.additionalInfo?.interests) ? clonedData.additionalInfo.interests : []
      }
    };
    
    console.log('ProfessionalTemplate - Processed data:', processedData);
    return processedData;
  }, [cvData]);

  const pdfDocument = useMemo(() => {
    return <ProfessionalPDFDocument cvData={safeData} />;
  }, [safeData]);

  const fileName = `${safeData.firstName}_${safeData.lastName}_CV.pdf`.replace(/\s+/g, '_');

  return {
    document: pdfDocument,
    fileName: fileName,
    safeData: safeData,
    downloadComponent: (
      <PDFDownloadLink
        document={pdfDocument}
        fileName={fileName}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2 no-underline"
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
    )
  };
};

export default ProfessionalTemplate;