// src/App.jsx
import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import CVTemplateSelector from './components/CVTemplateSelector';
import PersonalInfoPage from './components/Form-components/PersonalnfoPage';
import ProfessionalInfoPage from './components/Form-components/ProfessionalInfoPage';
import ExperiencePage from './components/Form-components/ExperiencePage';
import EducationPage from './components/Form-components/EducationPage';
import SkillsPage from './components/Form-components/SkillsPage';
import AdditionalInfoPage from './components/Form-components/AdditionalInfoPage';

function App() {
  const [cvData, setCvData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    profilePictureUrl: '',
    
    // Professional Information
    jobTitle: '',
    professionalSummary: '',
    portfolioUrl: '',
    githubUrl: '',
    linkedinUrl: '',
    
    // Work Experience
    experiences: [{
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }],
    
    // Education
    educations: [{
      degree: '',
      institution: '',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
      description: ''
    }],
    
    // Skills - Organized by categories with expertise levels
    skills: {
      technical: [
        // Structure: { name: 'JavaScript', level: 4 }
        // level: 1-5 (1=Beginner, 2=Novice, 3=Intermediate, 4=Advanced, 5=Expert)
      ],
      soft: [
        // Structure: { name: 'Leadership', level: 3 }
        // Examples: Communication, Teamwork, Problem Solving, Time Management
      ],
      creative: [
        // Structure: { name: 'UI/UX Design', level: 4 }
        // Examples: Graphic Design, Photography, Video Editing, Creative Writing
      ],
      analytical: [
        // Structure: { name: 'Data Analysis', level: 3 }
        // Examples: Research, Statistics, Critical Thinking, Data Visualization
      ]
    },
    
    // Additional Information
    additionalInfo: {
      languages: [
        // Structure: { name: 'English', proficiency: 'native' }
        // proficiency options: 'beginner', 'intermediate', 'advanced', 'fluent', 'native'
      ],
      certifications: [
        // Structure: { name: 'AWS Certified Developer', issuer: 'Amazon Web Services', date: '2023' }
      ],
      interests: [
        // Structure: string values
        // Examples: 'Photography', 'Hiking', 'Chess', 'Cooking'
      ],
      references: [
        // Structure: { name: 'John Smith', title: 'Senior Developer', company: 'Tech Corp', email: 'john@techcorp.com', phone: '+1234567890' }
      ]
    },
});

  return (
    <>
      <Routes>
        <Route path="/" element={<PersonalInfoPage cvData={cvData} setCvData={setCvData}/>} />
        <Route path="/cv-templates" element={<CVTemplateSelector cvData={cvData}/>} />
        <Route path="/professional-info" element={<ProfessionalInfoPage cvData={cvData} setCvData={setCvData}/>} />
        <Route path="/experience" element={<ExperiencePage cvData={cvData} setCvData={setCvData}/>} />
        <Route path="/education" element={<EducationPage cvData={cvData} setCvData={setCvData}/>} />
        <Route path="/skills" element={<SkillsPage cvData={cvData} setCvData={setCvData}/>} />
        <Route path="/additional-info" element={<AdditionalInfoPage cvData={cvData} setCvData={setCvData}/>} />
      </Routes>
    </>
  )
}

export default App