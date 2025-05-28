import React, { useState, useEffect } from 'react';
import { useRealEstate } from '@/context/RealEstateContext';
import { processQuery, QueryResult } from '@/utils/aiHelpers';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ProjectSidebar from '@/components/ProjectSidebar';
import AISearchBar from '@/components/AISearchBar';
import AIResponseCard from '@/components/AIResponseCard';
import FilterTags from '@/components/FilterTags';
import PropertyOverview from '@/components/PropertyOverview';
import { MessageCircle, History, Smartphone } from 'lucide-react';

const Index = () => {
  const {
    currentProject,
    projectUnits,
    projectFaqs,
    availableFilters
  } = useRealEstate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const isMobileDevice = mobileRegex.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory).slice(0, 5)); // Keep last 5 searches
      } catch (e) {
        console.error('Error parsing search history:', e);
      }
    }
  }, []);

  // Save search history to localStorage when it changes
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    setIsSearching(true);

    // Add to history if not a duplicate of the most recent query
    if (!searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev.slice(0, 4)]); // Keep last 5
    } else {
      // Move to top if already exists
      setSearchHistory(prev => [query, ...prev.filter(item => item !== query)]);
    }

    try {
      const result = await processQuery(query, currentProject, projectUnits, projectFaqs);
      setQueryResult(result);
    } catch (error) {
      console.error('Search error:', error);
      setQueryResult({
        text: 'Sorry, there was an error processing your query. Please try again.',
        type: 'general'
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleExampleClick = (query: string) => {
    handleSearch(query);
  };

  // Mobile under development screen
  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Smartphone className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Mobile Version
            </h1>
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Under Development
            </h2>
          </div>
          
          <div className="space-y-4 text-gray-600">
            <p className="text-lg">
              We're working hard to bring you an amazing mobile experience!
            </p>
            <p>
              For now, please visit us on a desktop or laptop computer to access the full Real Estate AI Assistant.
            </p>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Coming Soon:</strong> Mobile-optimized interface with all the features you love
            </p>
          </div>
          
          <div className="mt-6 text-xs text-gray-500">
            Thank you for your patience!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white font-inter w-full">
      <ProjectSidebar />
      
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-4xl mx-auto px-4 py-6 flex flex-col">
          {/* Header - Centered */}
          <div className="flex items-center justify-center mb-8">
            <SidebarTrigger />
            <h1 className="text-2xl font-semibold ml-3 text-gray-800 text-center">
              Real Estate AI Assistant
            </h1>
          </div>
          
          {/* Property Overview - Centered */}
          {currentProject && (
            <div className="mb-8 flex justify-center">
              <div className="w-full max-w-3xl">
                <PropertyOverview />
              </div>
            </div>
          )}
          
          {/* Main Chat Area - Centered */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
            
            {/* Welcome Message when no results - Centered */}
            {!queryResult && !isSearching && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-medium mb-4 text-gray-800">
                  How can I help you today?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Ask me anything about {currentProject?.name || "our properties"}, such as available units, 
                  pricing, features, or amenities.
                </p>
              </div>
            )}
            
            {/* AI Search Bar - Centered */}
            <div className="w-full mb-6">
              <AISearchBar onSearch={handleSearch} isSearching={isSearching} initialQuery={searchQuery} />
            </div>
            
            {/* Quick Filters - Centered */}
            <div className="w-full mb-8">
              <h3 className="text-lg font-medium mb-4 text-center text-gray-700">Quick Filters</h3>
              <div className="flex justify-center">
                <div className="overflow-x-auto pb-2 max-w-full">
                  <FilterTags filters={availableFilters} onFilterSelect={handleSearch} />
                </div>
              </div>
            </div>
            
            {/* Loading Animation - Centered */}
            {isSearching && (
              <div className="flex justify-center my-8">
                <div className="animate-pulse flex space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                  <div className="space-y-3">
                    <div className="h-2 w-48 rounded bg-gray-200"></div>
                    <div className="h-2 w-40 rounded bg-gray-200"></div>
                    <div className="h-2 w-32 rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* AI Response - Centered */}
            {queryResult && !isSearching && (
              <div className="w-full flex justify-center">
                <div className="w-full max-w-3xl">
                  <AIResponseCard result={queryResult} />
                </div>
              </div>
            )}
            
            {/* Recent Searches and Examples - Centered */}
            {!queryResult && !isSearching && (
              <div className="w-full max-w-2xl">
                {searchHistory.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center mb-4 justify-center">
                      <History size={18} className="mr-2 text-gray-500" />
                      <h4 className="text-base font-medium text-gray-700">Recent Searches</h4>
                    </div>
                    <div className="space-y-3">
                      {searchHistory.map((historyItem, index) => (
                        <div 
                          key={index} 
                          onClick={() => handleExampleClick(historyItem)} 
                          className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200 flex items-center justify-center"
                        >
                          <MessageCircle size={16} className="mr-3 text-gray-500 shrink-0" />
                          <span className="text-base text-gray-700 line-clamp-2 text-center">{historyItem}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Example Queries - Centered */}
                <div className="text-center">
                  <p className="text-gray-600 mb-4 text-base">Try asking:</p>
                  <div className="space-y-3">
                    <div 
                      className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200 flex items-center justify-center" 
                      onClick={() => handleExampleClick(`Show me 3 BHK apartments in ${currentProject?.name || "available projects"}`)}
                    >
                      <MessageCircle size={16} className="mr-3 text-gray-500 shrink-0" />
                      <span className="text-base text-gray-700 text-center">Show me 3 BHK apartments in {currentProject?.name || "available projects"}</span>
                    </div>
                    <div 
                      className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200 flex items-center justify-center" 
                      onClick={() => handleExampleClick("What properties are available under 2 crore?")}
                    >
                      <MessageCircle size={16} className="mr-3 text-gray-500 shrink-0" />
                      <span className="text-base text-gray-700 text-center">What properties are available under 2 crore?</span>
                    </div>
                    <div 
                      className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200 flex items-center justify-center" 
                      onClick={() => handleExampleClick("Tell me about green building features")}
                    >
                      <MessageCircle size={16} className="mr-3 text-gray-500 shrink-0" />
                      <span className="text-base text-gray-700 text-center">Tell me about green building features</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
