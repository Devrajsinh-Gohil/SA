
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';

export const processFinancialQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  if (
    lowerQuery.includes('price') || 
    lowerQuery.includes('cost') || 
    lowerQuery.includes('payment') ||
    lowerQuery.includes('loan') ||
    lowerQuery.includes('discount') ||
    lowerQuery.includes('maintenance') ||
    lowerQuery.includes('charges')
  ) {
    if (!currentProject) {
      return {
        text: "Please select a project to get specific pricing information.",
        type: 'general'
      };
    }
    
    if (currentProject.name === 'Greenfield') {
      return {
        text: `Greenfield offers 3 BHK apartments starting from ₹1.5 Cr and 4 BHK penthouses from ₹2.78 Cr. Flexible payment plans are available, and we can help facilitate home loans through our partner banks. The maintenance charges are approximately ₹2.5 per sq.ft per month. Please speak with our sales team for current offers and detailed pricing.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    // Generate pricing based on units for other projects
    const projectUnits = units.filter(unit => unit.projectId === currentProject.id);
    if (projectUnits.length > 0) {
      // Calculate min and max prices
      const prices = projectUnits.map(unit => unit.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      return {
        text: `${currentProject.name} offers units ranging from ₹${(minPrice / 10000000).toFixed(2)} Cr to ₹${(maxPrice / 10000000).toFixed(2)} Cr. Flexible payment plans are available, and we can help facilitate loans through our partner banks. Please speak with our sales team for current offers and detailed pricing information.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    return {
      text: `Please contact our sales team for current pricing, payment plans, and any ongoing promotional offers for ${currentProject.name}.`,
      type: 'project',
      relatedItems: [currentProject]
    };
  }

  // Price related queries with specific number
  if (lowerQuery.includes('under') && (lowerQuery.includes('cr') || lowerQuery.includes('crore'))) {
    let priceLimit = 0;
    
    // Very basic extraction of numbers from text
    const matches = lowerQuery.match(/(\d+(\.\d+)?)/);
    if (matches && matches[1]) {
      priceLimit = parseFloat(matches[1]) * 10000000; // Convert crores to rupees
    }
    
    const matchedUnits = units.filter(unit => unit.price < priceLimit);
    
    if (matchedUnits.length > 0) {
      return {
        text: `I found ${matchedUnits.length} properties under ₹${priceLimit / 10000000} crore in ${currentProject?.name || 'our portfolio'}.`,
        type: 'unit',
        relatedItems: matchedUnits
      };
    } else {
      return {
        text: `I couldn't find any properties under ₹${priceLimit / 10000000} crore in ${currentProject?.name || 'our portfolio'}.`,
        type: 'general'
      };
    }
  }
  
  return null;
};
