import React from 'react';
import { useRealEstate } from '@/context/RealEstateContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, MapPin, Clock, Home, Users, Wrench } from 'lucide-react';
const PropertyOverview = () => {
  const {
    currentProject,
    projectUnits
  } = useRealEstate();
  if (!currentProject) return null;
  const availableUnits = projectUnits.filter(unit => unit.availability === 'available').length;
  const totalUnits = projectUnits.length;
  return <Card>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold">{currentProject.name}</CardTitle>
            <p className="text-gray-600 text-base">
              {currentProject.location}
              {currentProject.developer && ` • ${currentProject.developer}`}
            </p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge variant="outline" className="text-sm">{currentProject.status}</Badge>
            {currentProject.certification && <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 text-sm">
                {currentProject.certification}
              </Badge>}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="mb-6 text-gray-700 text-base leading-relaxed">{currentProject.description}</p>
        
        {/* Project Summary Card */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Project Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Available Units</p>
                <p className="text-base font-semibold text-gray-900">{availableUnits} of {totalUnits}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Property Type</p>
                <p className="text-base font-semibold text-gray-900">{currentProject.type}</p>
              </div>
            </div>
            {(currentProject.storeys || currentProject.towerHeight) && <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Building Height</p>
                  <p className="text-base font-semibold text-gray-900">
                    {currentProject.towerHeight || `${currentProject.storeys} storeys`}
                  </p>
                </div>
              </div>}
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="text-base font-semibold text-gray-900">{currentProject.location}</p>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="features" className="mt-6">
          <TabsList className="grid grid-cols-4 mb-6 bg-gray-100">
            <TabsTrigger value="features" className="text-sm font-medium">Key Features</TabsTrigger>
            <TabsTrigger value="location" className="text-sm font-medium">Location</TabsTrigger>
            <TabsTrigger value="amenities" className="text-sm font-medium">Amenities</TabsTrigger>
            <TabsTrigger value="specs" className="text-sm font-medium">Specifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {currentProject.features.map((feature, index) => <span key={index} className="text-sm bg-blue-50 text-blue-800 px-3 py-1 rounded-full font-medium">
                  {feature}
                </span>)}
            </div>
            
            {(currentProject.landArea || currentProject.towerHeight || currentProject.openSpace) && <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-base font-semibold text-gray-800 mb-3">Project Highlights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentProject.landArea && <div className="text-sm">
                      <span className="font-medium text-gray-700">Land Area:</span>{' '}
                      <span className="text-gray-900">{currentProject.landArea}</span>
                    </div>}
                  {currentProject.openSpace && <div className="text-sm">
                      <span className="font-medium text-gray-700">Open Space:</span>{' '}
                      <span className="text-gray-900">{currentProject.openSpace}</span>
                    </div>}
                  {currentProject.towers && <div className="text-sm">
                      <span className="font-medium text-gray-700">Towers:</span>{' '}
                      <span className="text-gray-900">{currentProject.towers}</span>
                    </div>}
                  {currentProject.towerLayout && <div className="text-sm">
                      <span className="font-medium text-gray-700">Tower Layout:</span>{' '}
                      <span className="text-gray-900">{currentProject.towerLayout}</span>
                    </div>}
                </div>
              </div>}
            
            {currentProject.businessFocus && <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-base font-semibold text-gray-800 mb-3">Business Overview</h4>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Business Focus:</span>{' '}
                    <span className="text-gray-900">{currentProject.businessFocus}</span>
                  </div>
                  {currentProject.brandPositioning && <div className="text-sm">
                      <span className="font-medium text-gray-700">Brand Positioning:</span>{' '}
                      <span className="text-gray-900">{currentProject.brandPositioning}</span>
                    </div>}
                  {currentProject.completionDate && <div className="text-sm">
                      <span className="font-medium text-gray-700">Completion Date:</span>{' '}
                      <span className="text-gray-900">{currentProject.completionDate}</span>
                    </div>}
                </div>
              </div>}
          </TabsContent>
          
          <TabsContent value="location" className="space-y-6">
            {currentProject.transportConnections && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentProject.transportConnections.distances && <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <h4 className="text-base font-semibold text-gray-800">Key Distances</h4>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(currentProject.transportConnections.distances).map(([place, distance]) => <div key={place} className="flex justify-between items-center text-sm">
                          <span className="font-medium text-gray-700">{place}:</span>
                          <span className="text-gray-900">{distance}</span>
                        </div>)}
                    </div>
                  </div>}
                
                <div className="space-y-4">
                  {currentProject.transportConnections.metro && currentProject.transportConnections.metro.length > 0 && <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <h4 className="text-base font-semibold text-gray-800">Metro Access</h4>
                      </div>
                      <p className="text-sm text-gray-900">
                        {currentProject.transportConnections.metro.join(', ')}
                      </p>
                    </div>}
                  
                  {currentProject.transportConnections.roads && currentProject.transportConnections.roads.length > 0 && <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <h4 className="text-base font-semibold text-gray-800">Road Connectivity</h4>
                      </div>
                      <p className="text-sm text-gray-900">
                        {currentProject.transportConnections.roads.join(', ')}
                      </p>
                    </div>}
                </div>
              </div>}
            
            {currentProject.fullAddress && <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-base font-semibold text-gray-800 mb-2">Full Address</h4>
                <p className="text-sm text-gray-900">{currentProject.fullAddress}</p>
              </div>}
            
            {!currentProject.transportConnections && !currentProject.fullAddress && <p className="text-sm text-gray-600">Located in {currentProject.location}</p>}
          </TabsContent>
          
          <TabsContent value="amenities" className="space-y-6">
            {currentProject.amenities && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentProject.amenities?.outdoor && currentProject.amenities.outdoor.length > 0 && <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4 text-green-600" />
                      <h4 className="text-base font-semibold text-gray-800">Outdoor Spaces</h4>
                    </div>
                    <ul className="space-y-1">
                      {currentProject.amenities.outdoor.map((item, index) => <li key={index} className="text-sm text-gray-900">• {item}</li>)}
                    </ul>
                  </div>}
                
                {currentProject.amenities?.community && currentProject.amenities.community.length > 0 && <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Home className="w-4 h-4 text-green-600" />
                      <h4 className="text-base font-semibold text-gray-800">Indoor Facilities</h4>
                    </div>
                    <ul className="space-y-1">
                      {currentProject.amenities.community.map((item, index) => <li key={index} className="text-md \ntext-gray-900">• {item}</li>)}
                    </ul>
                  </div>}
                
                {currentProject.amenities?.health && currentProject.amenities.health.length > 0 && <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4 text-green-600" />
                      <h4 className="text-base font-semibold text-gray-800">Health & Wellness</h4>
                    </div>
                    <ul className="space-y-1">
                      {currentProject.amenities.health.map((item, index) => <li key={index} className="text-md text-gray-900">• {item}</li>)}
                    </ul>
                  </div>}
                
                {currentProject.amenities?.convenience && currentProject.amenities.convenience.length > 0 && <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Home className="w-4 h-4 text-green-600" />
                      <h4 className="text-base font-semibold text-gray-800">Convenience Features</h4>
                    </div>
                    <ul className="space-y-1">
                      {currentProject.amenities.convenience.map((item, index) => <li key={index} className="text-md text-gray-900">• {item}</li>)}
                    </ul>
                  </div>}
              </div>}
            
            {!currentProject.amenities && <div className="text-sm text-gray-600">Amenity information not available</div>}
          </TabsContent>
          
          <TabsContent value="specs" className="space-y-6">
            {currentProject.specifications && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentProject.specifications.flooring && <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="w-4 h-4 text-purple-600" />
                      <h4 className="text-base font-semibold text-gray-800">Flooring</h4>
                    </div>
                    <ul className="space-y-1">
                      {typeof currentProject.specifications.flooring === 'object' && !Array.isArray(currentProject.specifications.flooring) ? Object.entries(currentProject.specifications.flooring).map(([area, material]) => <li key={area} className="text-md text-gray-900">• {area}: {material}</li>) : Array.isArray(currentProject.specifications.flooring) && currentProject.specifications.flooring.map((item, index) => <li key={index} className="text-sm text-gray-900">• {item}</li>)}
                    </ul>
                  </div>}
                
                {currentProject.specifications.doors && <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="w-4 h-4 text-purple-600" />
                      <h4 className="text-base font-semibold text-gray-800">Doors & Windows</h4>
                    </div>
                    <ul className="space-y-1">
                      {typeof currentProject.specifications.doors === 'object' && !Array.isArray(currentProject.specifications.doors) ? Object.entries(currentProject.specifications.doors).map(([doorType, doorSpec]) => <li key={doorType} className="text-md text-gray-900">• {doorType}: {doorSpec}</li>) : Array.isArray(currentProject.specifications.doors) && currentProject.specifications.doors.map((item, index) => <li key={index} className="text-sm text-gray-900">• {item}</li>)}
                      {currentProject.specifications.windows && <li className="text-md text-gray-900">• Windows: {currentProject.specifications.windows}</li>}
                    </ul>
                  </div>}
                
                {currentProject.specifications.electrical && <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="w-4 h-4 text-purple-600" />
                      <h4 className="text-base font-semibold text-gray-800">Electrical</h4>
                    </div>
                    <ul className="space-y-1">
                      {currentProject.specifications.electrical.map((item, index) => <li key={index} className="text-md text-gray-900">• {item}</li>)}
                    </ul>
                  </div>}
                
                {currentProject.specifications.toilets && <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="w-4 h-4 text-purple-600" />
                      <h4 className="text-base font-semibold text-gray-800">Bathroom & Kitchen</h4>
                    </div>
                    <ul className="space-y-1">
                      {currentProject.specifications.toilets.map((item, index) => <li key={index} className="text-sm text-gray-900">• {item}</li>)}
                      {currentProject.specifications.kitchen && currentProject.specifications.kitchen.map((item, index) => <li key={index} className="text-sm text-gray-900">• {item}</li>)}
                    </ul>
                  </div>}
                
                {currentProject.specifications.color && <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="w-4 h-4 text-purple-600" />
                      <h4 className="text-base font-semibold text-gray-800">Paint & Finish</h4>
                    </div>
                    <ul className="space-y-1">
                      {Object.entries(currentProject.specifications.color).map(([area, finish]) => <li key={area} className="text-md text-gray-900">• {area}: {finish}</li>)}
                    </ul>
                  </div>}
              </div>}
            
            {/* Building Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Building className="w-4 h-4 text-purple-600" />
                <h4 className="text-base font-semibold text-gray-800">Building Details</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentProject.parking && <div className="text-sm">
                    <span className="font-medium text-gray-700">Parking:</span>{' '}
                    <span className="text-gray-900">{currentProject.parking}</span>
                  </div>}
                {currentProject.lifts && <div className="text-sm">
                    <span className="font-medium text-gray-700">Elevators:</span>{' '}
                    <span className="text-gray-900">{currentProject.lifts}</span>
                  </div>}
                {currentProject.refugeAreaFloors && <div className="col-span-2 text-sm">
                    <span className="font-medium text-gray-700">Refuge Floors:</span>{' '}
                    <span className="text-gray-900">{currentProject.refugeAreaFloors}</span>
                  </div>}
              </div>
            </div>
            
            {!currentProject.specifications && <div className="text-sm text-gray-600">Specification information not available</div>}
          </TabsContent>
        </Tabs>
        
        {currentProject.reraNumber && <div className="mt-6 border-t border-gray-200 pt-4">
            <p className="text-md font-medium text-gray-700 mb-1">RERA Number:</p>
            <p className="text-md text-gray-600">{currentProject.reraNumber}</p>
            {currentProject.website && <a href={currentProject.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-1 inline-block">
                {currentProject.website}
              </a>}
          </div>}
      </CardContent>
    </Card>;
};
export default PropertyOverview;