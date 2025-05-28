import React from 'react';
import { QueryResult } from '@/utils/aiHelpers';
import { Unit } from '@/models';
import { formatIndianPrice } from '@/data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Info } from 'lucide-react';
import StructuredResponse from '@/components/StructuredResponse';
import { formatStructuredResponse, formatUnitSections, extractTitle } from '@/utils/ai/responseFormatter';

interface AIResponseCardProps {
  result: QueryResult;
}

const AIResponseCard: React.FC<AIResponseCardProps> = ({ result }) => {
  const structuredData = formatStructuredResponse(result.text);
  const unitSections = formatUnitSections(result.text);
  const responseTitle = extractTitle(result.text);

  return (
    <div className="animate-fade-in">
      <Card className="mt-6 overflow-hidden">
        <CardHeader className="bg-realestate-light-blue pb-2">
          <CardTitle className="text-lg font-medium">AI Response</CardTitle>
          <CardDescription className="text-base">Based on your query</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {unitSections.length > 0 ? (
            <StructuredResponse unitSections={unitSections} title={responseTitle} />
          ) : structuredData.length > 0 ? (
            <StructuredResponse data={structuredData} title={responseTitle} />
          ) : (
            <div className="text-base">{result.text}</div>
          )}
          
          {result.relatedItems && result.type === 'unit' && (
            <div className="mt-6 space-y-6">
              {result.relatedItems.map((item, index) => {
                const unit = item as Unit;
                const isRecommended = index === 0;
                
                return (
                  <div 
                    key={unit.id}
                    className={`p-5 border rounded-lg bg-white shadow-sm transition-all duration-200 hover:shadow-md ${
                      isRecommended ? 'border-l-4 border-l-realestate-accent border border-realestate-accent/20 bg-realestate-light-blue property-option recommended' 
                      : 'border-gray-100 property-option'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row gap-5">
                      <div className="sm:w-1/3">
                        <div className="bg-gray-100 h-48 rounded-md overflow-hidden">
                          {unit.imageUrl ? (
                            <img 
                              src={unit.imageUrl} 
                              alt={unit.type}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-base">
                              No Image
                            </div>
                          )}
                        </div>
                        
                        {isRecommended && (
                          <div className="mt-2 flex items-center text-sm font-medium text-realestate-accent">
                            <Check size={16} className="mr-1" />
                            <span>Recommended for you</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="sm:w-2/3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-display font-medium">{unit.type}</h3>
                          <Badge className={
                            unit.availability === 'available' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100 text-sm' 
                              : unit.availability === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-sm'  
                              : 'bg-red-100 text-red-800 hover:bg-red-100 text-sm' 
                          }>
                            {unit.availability}
                          </Badge>
                        </div>
                        
                        <p className="text-2xl font-semibold mt-1 font-display">
                          {formatIndianPrice(unit.price)}
                        </p>
                        
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                            {unit.area} sq.ft.
                          </span>
                          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                            {unit.bedrooms} BHK
                          </span>
                          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                            {unit.bathrooms} Bath
                          </span>
                          {unit.unitNumber && (
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                              Unit {unit.unitNumber}
                            </span>
                          )}
                        </div>
                        
                        {isRecommended && unit.specifications?.special && unit.specifications.special.length > 0 && (
                          <div className="mt-3 flex items-start gap-2 text-sm p-2 bg-realestate-light-blue/50 rounded-md">
                            <Info size={16} className="mt-0.5 text-realestate-accent shrink-0" />
                            <p className="text-gray-700">{unit.specifications.special[0]}</p>
                          </div>
                        )}
                        
                        {unit.specifications ? (
                          <Tabs defaultValue="features" className="mt-4 w-full">
                            <TabsList className="grid grid-cols-3">
                              <TabsTrigger value="features" className="text-sm">Features</TabsTrigger>
                              <TabsTrigger value="specifications" className="text-sm">Specifications</TabsTrigger>
                              <TabsTrigger value="details" className="text-sm">Details</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="features" className="mt-3">
                              <div className="flex flex-wrap gap-1.5">
                                {unit.features.map((feature, idx) => (
                                  <span 
                                    key={idx}
                                    className="text-sm bg-gray-100 px-2.5 py-1.5 rounded"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="specifications" className="mt-3">
                              {unit.specifications && (
                                <div className="text-sm space-y-3">
                                  {unit.specifications.flooring && unit.specifications.flooring.length > 0 && (
                                    <div>
                                      <p className="font-medium text-gray-700">Flooring:</p>
                                      <ul className="list-disc pl-4 text-gray-600 space-y-1 mt-1">
                                        {unit.specifications.flooring.map((item, idx) => (
                                          <li key={idx}>{item}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  
                                  {unit.specifications.walls && unit.specifications.walls.length > 0 && (
                                    <div>
                                      <p className="font-medium text-gray-700">Walls & Paint:</p>
                                      <ul className="list-disc pl-4 text-gray-600 space-y-1">
                                        {unit.specifications.walls.map((item, idx) => (
                                          <li key={idx}>{item}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  
                                  {unit.specifications.electrical && unit.specifications.electrical.length > 0 && (
                                    <div>
                                      <p className="font-medium text-gray-700">Electrical & Utilities:</p>
                                      <ul className="list-disc pl-4 text-gray-600 space-y-1">
                                        {unit.specifications.electrical.map((item, idx) => (
                                          <li key={idx}>{item}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  
                                  {unit.specifications.bathroom && unit.specifications.bathroom.length > 0 && (
                                    <div>
                                      <p className="font-medium text-gray-700">Bathroom Fittings:</p>
                                      <ul className="list-disc pl-4 text-gray-600 space-y-1">
                                        {unit.specifications.bathroom.map((item, idx) => (
                                          <li key={idx}>{item}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              )}
                            </TabsContent>
                            
                            <TabsContent value="details" className="mt-3">
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div>
                                    <p className="font-medium text-gray-700">Unit Type</p>
                                    <p className="text-gray-600">{unit.type}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-700">Area</p>
                                    <p className="text-gray-600 font-semibold">{unit.area} sq.ft.</p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-700">Bedrooms</p>
                                    <p className="text-gray-600 font-semibold">{unit.bedrooms}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-700">Bathrooms</p>
                                    <p className="text-gray-600">{unit.bathrooms}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-700">Price</p>
                                    <p className="text-gray-600 font-semibold">{formatIndianPrice(unit.price)}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-700">Status</p>
                                    <p className="text-gray-600">{unit.availability}</p>
                                  </div>
                                </div>
                                
                                {unit.specifications?.special && unit.specifications.special.length > 0 && (
                                  <div className="mt-2">
                                    <p className="font-medium text-gray-700 text-sm">Special Features:</p>
                                    <ul className="list-disc pl-4 text-gray-600 space-y-1 text-sm mt-1">
                                      {unit.specifications.special.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </TabsContent>
                          </Tabs>
                        ) : (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {unit.features.slice(0, 3).map((feature, idx) => (
                              <span 
                                key={idx}
                                className="text-sm bg-gray-100 px-2.5 py-1.5 rounded"
                              >
                                {feature}
                              </span>
                            ))}
                            {unit.features.length > 3 && (
                              <span className="text-sm bg-gray-100 px-2.5 py-1.5 rounded">
                                +{unit.features.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                        
                        <div className="mt-4 flex justify-end">
                          <button className="text-sm text-realestate-accent hover:underline font-medium flex items-center">
                            View Floor Plan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIResponseCard;
