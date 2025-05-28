
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';

export const processEcofriendlyQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  if (
    lowerQuery.includes('green building') || 
    lowerQuery.includes('eco-friendly') || 
    lowerQuery.includes('sustainable') ||
    lowerQuery.includes('certification') ||
    lowerQuery.includes('pre-certified') ||
    lowerQuery.includes('environment')
  ) {
    if (!currentProject) {
      return {
        text: "Please select a project to get specific information about green building features.",
        type: 'general'
      };
    }
    
    if (currentProject.name === 'Shivalik Greenfield') {
      return {
        text: `Green Building Certification: ${currentProject.certification} with exceptional environmental features

3 BHK Apartments
🏗️ Sustainable Design: 70% open space design with 270° open views
🌍 Environmental Features: Water conservation systems and waste management solutions
💡 Green Living: Energy-efficient lighting and ventilation systems
🌿 Eco-Location: Located in Shantigram's eco-friendly zone near Adani Township

4 BHK Penthouses  
🏗️ Sustainable Design: Premium eco-friendly construction using sustainable materials
🌍 Environmental Features: Minimal environmental impact with only 2 apartments per wing
💡 Green Living: Advanced energy-efficient systems and natural lighting
🌿 Eco-Location: Private terraces with green views and eco-friendly transportation connectivity`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    return {
      text: `${currentProject.name} incorporates modern design principles with focus on natural light and ventilation. Please contact our sales team for specific information about eco-friendly features of this project.`,
      type: 'project',
      relatedItems: [currentProject]
    };
  }
  
  return null;
};
