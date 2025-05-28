
import React from 'react';

interface KeyValuePair {
  key: string;
  value: string;
  icon?: string;
}

interface UnitSection {
  title: string;
  data: KeyValuePair[];
}

interface StructuredResponseProps {
  data?: KeyValuePair[];
  unitSections?: UnitSection[];
  title?: string;
}

const StructuredResponse: React.FC<StructuredResponseProps> = ({ data, unitSections, title }) => {
  return (
    <div className="space-y-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {title}
        </h3>
      )}
      
      {/* Render unit sections if available */}
      {unitSections && unitSections.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {unitSections.map((section, sectionIndex) => (
            <div 
              key={sectionIndex}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
            >
              <h4 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                {section.title}
              </h4>
              <div className="space-y-3">
                {section.data.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3"
                  >
                    {item.icon && (
                      <span className="text-base shrink-0 mt-0.5">
                        {item.icon}
                      </span>
                    )}
                    <div className="flex-1">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-gray-600">
                          {item.key}
                        </span>
                        <span className="text-base font-semibold text-gray-900">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Render regular data if no unit sections */
        data && (
          <div className="grid gap-3">
            {data.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {item.icon && (
                  <span className="text-base shrink-0 mt-0.5">
                    {item.icon}
                  </span>
                )}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="md:col-span-1">
                    <span className="text-sm font-medium text-gray-600">
                      {item.key}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-base font-semibold text-gray-900">
                      {item.value}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default StructuredResponse;
