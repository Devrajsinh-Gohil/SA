
import React from 'react';
import { FilterTag } from '../models';
import { Button } from '@/components/ui/button';

interface FilterTagsProps {
  filters: FilterTag[];
  onFilterSelect: (query: string) => void;
}

const FilterTags: React.FC<FilterTagsProps> = ({ filters, onFilterSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 px-4">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant="outline"
          size="sm"
          className="whitespace-nowrap min-h-[44px] px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors border-gray-200"
          onClick={() => onFilterSelect(filter.query)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default FilterTags;
