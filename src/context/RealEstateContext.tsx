
import * as React from 'react';
import { Project, Unit, FAQ, FilterTag } from '../models';
import { projects, units, faqs, filterTags } from '../data/mockData';

interface RealEstateContextType {
  currentProject: Project | null;
  allProjects: Project[];
  projectUnits: Unit[];
  projectFaqs: FAQ[];
  availableFilters: FilterTag[];
  setCurrentProject: (project: Project) => void;
  getUnitsForProject: (projectId: string) => Unit[];
  getFaqsForProject: (projectId: string) => FAQ[];
}

const RealEstateContext = React.createContext<RealEstateContextType | undefined>(undefined);

export const useRealEstate = () => {
  const context = React.useContext(RealEstateContext);
  if (context === undefined) {
    throw new Error('useRealEstate must be used within a RealEstateProvider');
  }
  return context;
};

interface RealEstateProviderProps {
  children: React.ReactNode;
}

export const RealEstateProvider: React.FC<RealEstateProviderProps> = ({ children }) => {
  const [currentProject, setCurrentProject] = React.useState<Project | null>(projects[0] || null);

  const getUnitsForProject = (projectId: string) => {
    return units.filter(unit => unit.projectId === projectId);
  };

  const getFaqsForProject = (projectId: string) => {
    return faqs.filter(faq => faq.projectId === projectId);
  };

  const projectUnits = currentProject ? getUnitsForProject(currentProject.id) : [];
  const projectFaqs = currentProject ? getFaqsForProject(currentProject.id) : [];
  
  // Filter tags based on current project
  const availableProjectFilters = currentProject 
    ? filterTags.filter(tag => tag.label.includes(currentProject.name) || !tag.label.includes(' ')) 
    : filterTags;

  const value = {
    currentProject,
    allProjects: projects,
    projectUnits,
    projectFaqs,
    availableFilters: availableProjectFilters,
    setCurrentProject,
    getUnitsForProject,
    getFaqsForProject,
  };

  return (
    <RealEstateContext.Provider value={value}>
      {children}
    </RealEstateContext.Provider>
  );
};
