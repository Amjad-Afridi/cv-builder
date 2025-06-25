import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    lineHeight: 1.4,
    fontSize: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
    borderBottomStyle: 'solid'
  },
  nameContainer: {
    flex: 2
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 5
  },
  title: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic'
  },
  contactInfo: {
    flex: 1,
    alignItems: 'flex-end'
  },
  contactItem: {
    fontSize: 10,
    marginBottom: 3,
    color: '#475569'
  },
  section: {
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#dbeafe',
    paddingBottom: 3
  },
  summaryText: {
    fontSize: 11,
    textAlign: 'justify',
    color: '#374151'
  },
  experienceItem: {
    marginBottom: 12
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3
  },
  jobTitleContainer: {
    flex: 1
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  company: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#6b7280'
  },
  location: {
    fontSize: 10,
    color: '#9ca3af'
  },
  dateContainer: {
    alignItems: 'flex-end'
  },
  date: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: 'bold'
  },
  jobDescription: {
    fontSize: 10,
    marginTop: 5,
    color: '#374151',
    textAlign: 'justify'
  },
  educationItem: {
    marginBottom: 12
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3
  },
  educationLeft: {
    flex: 1
  },
  degree: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  institution: {
    fontSize: 11,
    color: '#6b7280'
  },
  fieldOfStudy: {
    fontSize: 10,
    color: '#9ca3af',
    fontStyle: 'italic'
  },
  educationDate: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: 'bold'
  },
  educationDescription: {
    fontSize: 10,
    marginTop: 5,
    color: '#374151'
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5
  },
  skill: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '3px 8px',
    borderRadius: 10,
    fontSize: 9,
    marginRight: 5,
    marginBottom: 5
  },
  twoColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  column: {
    width: '48%'
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontSize: 10
  },
  linkContainer: {
    marginTop: 2
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#94a3b8',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 5
  },
  additionalInfoText: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.4
  }
});

const ProfessionalTemplate = ({ cvData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01'); // Add day to make it a valid date
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const formatYear = (year) => {
    return year ? year.toString() : '';
  };

  const hasValidExperiences = cvData.experiences && cvData.experiences.some(exp => 
    exp.jobTitle && exp.company
  );

  const hasValidEducations = cvData.educations && cvData.educations.some(edu => 
    edu.degree && edu.institution
  );

  const renderSkills = (skillsString) => {
    if (!skillsString) return null;
    
    const skills = skillsString?.split(',')?.map(skill => skill?.trim())?.filter(skill => skill);
    if (skills?.length === 0) return null;

    return (
      <View style={styles.skillsContainer}>
        {skills?.map((skill, index) => (
          <Text key={index} style={styles.skill}>
            {skill}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {cvData.firstName} {cvData.lastName}
            </Text>
            {cvData.jobTitle && (
              <Text style={styles.title}>{cvData.jobTitle}</Text>
            )}
          </View>
          
          <View style={styles.contactInfo}>
            {cvData.email && (
              <Text style={styles.contactItem}>{cvData.email}</Text>
            )}
            {cvData.phone && (
              <Text style={styles.contactItem}>{cvData.phone}</Text>
            )}
            {(cvData.city || cvData.country) && (
              <Text style={styles.contactItem}>
                {cvData.city}{cvData.city && cvData.country ? ', ' : ''}{cvData.country}
              </Text>
            )}
            
            {/* Links */}
            {cvData.linkedinUrl && (
              <View style={styles.linkContainer}>
                <Link src={cvData.linkedinUrl} style={styles.link}>
                  LinkedIn Profile
                </Link>
              </View>
            )}
            {cvData.githubUrl && (
              <View style={styles.linkContainer}>
                <Link src={cvData.githubUrl} style={styles.link}>
                  GitHub Profile
                </Link>
              </View>
            )}
            {cvData.portfolioUrl && (
              <View style={styles.linkContainer}>
                <Link src={cvData.portfolioUrl} style={styles.link}>
                  Portfolio
                </Link>
              </View>
            )}
          </View>
        </View>
        
        {/* Professional Summary */}
        {cvData.professionalSummary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
            <Text style={styles.summaryText}>{cvData.professionalSummary}</Text>
          </View>
        )}
        
        {/* Work Experience */}
        {hasValidExperiences && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
            {cvData.experiences
              .filter(exp => exp.jobTitle && exp.company)
              .map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.jobHeader}>
                    <View style={styles.jobTitleContainer}>
                      <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                      <Text style={styles.company}>{exp.company}</Text>
                      {exp.location && (
                        <Text style={styles.location}>{exp.location}</Text>
                      )}
                    </View>
                    <View style={styles.dateContainer}>
                      <Text style={styles.date}>
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </Text>
                    </View>
                  </View>
                  {exp.description && (
                    <Text style={styles.jobDescription}>{exp.description}</Text>
                  )}
                </View>
              ))}
          </View>
        )}
        
        {/* Education */}
        {hasValidEducations && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {cvData.educations
              .filter(edu => edu.degree && edu.institution)
              .map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <View style={styles.educationHeader}>
                    <View style={styles.educationLeft}>
                      <Text style={styles.degree}>{edu.degree}</Text>
                      <Text style={styles.institution}>{edu.institution}</Text>
                      {edu.fieldOfStudy && (
                        <Text style={styles.fieldOfStudy}>{edu.fieldOfStudy}</Text>
                      )}
                    </View>
                    <Text style={styles.educationDate}>
                      {formatYear(edu.startYear)} - {formatYear(edu.endYear) || 'Present'}
                    </Text>
                  </View>
                  {edu.description && (
                    <Text style={styles.educationDescription}>{edu.description}</Text>
                  )}
                </View>
              ))}
          </View>
        )}
        
        {/* Skills */}
        {cvData.skills && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            {renderSkills(cvData.skills)}
          </View>
        )}
        
        {/* Additional Information */}
        {(cvData.languages || cvData.certifications || cvData.interests) && (
          <View style={styles.twoColumn}>
            {/* Left Column */}
            <View style={styles.column}>
              {/* Languages */}
              {cvData.languages && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>LANGUAGES</Text>
                  <Text style={styles.additionalInfoText}>{cvData.languages}</Text>
                </View>
              )}
              
              {/* Certifications */}
              {cvData.certifications && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
                  <Text style={styles.additionalInfoText}>{cvData.certifications}</Text>
                </View>
              )}
            </View>
            
            {/* Right Column */}
            <View style={styles.column}>
              {/* Interests */}
              {cvData.interests && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>INTERESTS</Text>
                  <Text style={styles.additionalInfoText}>{cvData.interests}</Text>
                </View>
              )}
            </View>
          </View>
        )}
        
        {/* Footer */}
        <Text style={styles.footer}>
          CV generated on {new Date().toLocaleDateString()} | Professional Resume Template
        </Text>
      </Page>
    </Document>
  );
};

export default ProfessionalTemplate;