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

function App() {
  const [cvData, setCvData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    
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
    skills: {
      technical: [],
      soft: [],
      creative: [],
      analytical: []
    },
    languages: '',
    certifications: '',
    interests: ''
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
      </Routes>
    </>
  )
}

export default App