import { Project, Unit, FAQ } from '../../models';
import { QueryResult } from './types';
import { queryProcessors } from './queryProcessors';
import { processFaqMatch } from './faqProcessor';
import { FAQ_CATEGORIES, QUICK_FILTERS } from './faqTemplates';

export const processQuery = async (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): Promise<QueryResult> => {
  // Convert query to lowercase for easier matching
  const lowerQuery = query.toLowerCase();
  
  // Check if query matches any quick filters
  const matchedFilter = QUICK_FILTERS.find(filter => 
    lowerQuery.includes(filter.label.toLowerCase()) ||
    filter.query.toLowerCase().includes(lowerQuery) ||
    lowerQuery.includes(filter.description.toLowerCase())
  );
  
  if (matchedFilter) {
    // Process the standardized filter query
    for (const processor of queryProcessors) {
      const result = processor(matchedFilter.query, currentProject, units, faqs);
      if (result) {
        return {
          ...result,
          text: `${result.text}\n\nFilter: ${matchedFilter.label} - ${matchedFilter.description}`
        };
      }
    }
  }
  
  // First try to find a matching FAQ using standardized categories
  const faqResult = processFaqMatch(query, currentProject, faqs);
  if (faqResult) {
    return faqResult;
  }
  
  // Try each query processor in sequence
  for (const processor of queryProcessors) {
    const result = processor(query, currentProject, units, faqs);
    if (result) {
      return result;
    }
  }
  
  // Enhanced default response with category suggestions
  const suggestedCategories = FAQ_CATEGORIES.slice(0, 3).map(cat => cat.name).join(', ');
  
  return {
    text: `I'm not sure about that specific question. Could you please rephrase your question about ${currentProject?.name || 'our properties'}? 
    
You can ask about: ${suggestedCategories}, and more. 

Try being more specific about what aspect you'd like to know about.`,
    type: 'general'
  };
};
