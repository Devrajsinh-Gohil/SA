import { Project, Unit, FAQ, FilterTag } from '../models';

// Utility function to format prices in Indian currency format
export const formatIndianPrice = (price: number): string => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  } else {
    return `₹${price.toLocaleString('en-IN')}`;
  }
};

export const projects: Project[] = [
  {
    id: 'greenfield-shantigram',
    name: 'Shivalik Greenfield',
    location: 'Shantigram, Ahmedabad',
    type: 'Premium Residential Highrise',
    status: 'Under Construction',
    description: 'The Green Aspect of Life - A premium residential highrise featuring 3 BHK apartments and 4 BHK duplex penthouses with 70% open space and 270° open views. Pre-certified green building with possession scheduled for December 2027.',
    features: [
      'Pre-certified Green Building',
      '70% Open Space',
      '270° Open Views',
      '3 Towers with 21 Floors Each',
      'Duplex Penthouses',
      '100ft Distance Between Towers',
      'Premium Lifestyle Amenities',
      'East & West Facing Units'
    ],
    developer: 'Shivalik Group',
    certification: 'Pre-certified Green Building',
    landArea: '10,395 sq. yards (~2.15 acres)',
    openSpace: '70% open area',
    towers: 3,
    storeys: 21,
    towerLayout: '4 units per floor (typical)',
    distanceBetweenTowers: '100 ft',
    parking: 'Covered parking with visitor spaces',
    completionDate: 'December 2027',
    fullAddress: 'Shantigram, Ahmedabad, Gujarat',
    reraNumber: 'RAA14879/250225/311229',
    website: 'www.gujrera.gujarat.gov.in',
    lifts: '8 passenger lifts + 2 service lifts',
    refugeAreaFloors: '3, 6, 12, 18, 21, 24, 27, 30, 33',
    transportConnections: {
      roads: ['SG Highway', 'SP Ring Road'],
      distances: {
        'SG Highway': '5 mins',
        'Vaishnodevi Circle': '7 mins', 
        'SP Ring Road': '7 mins',
        'International Airport': '25 mins',
        'KD Hospital': '8 mins'
      }
    },
    amenities: {
      community: [
        'Mini Theatre',
        'Multipurpose Hall', 
        'Library',
        'Guest Rooms',
        'Society Office',
        'Grocery Store',
        'Laundry Area'
      ],
      health: [
        'Gymnasium',
        'Yoga Room',
        'Swimming Pool',
        'Spa',
        'Steam & Sauna Room',
        'Medicare Room'
      ],
      recreational: [
        'Indoor Game Zone',
        'Kids Play Area'
      ],
      convenience: [
        'Personal Foyers',
        'Two-Side Staircases',
        'Dedicated Visitor Parking'
      ]
    },
    specifications: {
      flooring: {
        'Living & Bedrooms': 'Vitrified Tiles',
        'Kitchen & Bathrooms': 'Glazed Tiles'
      },
      doors: {
        'Main Door': 'Laminated Finish',
        'Internal Doors': 'Laminated Finish'
      },
      windows: 'Aluminium Windows',
      electrical: [
        '3-Phase Copper Wiring',
        'MCB Distribution Board',
        'Branded Electrical Fittings'
      ],
      toilets: [
        'Wall Hung Basin',
        'Glazed Wall Tiles',
        'Premium Sanitary Fixtures'
      ],
      kitchen: [
        'Modular Kitchen Ready',
        'Granite Counter Top',
        'Wash Area & Store'
      ],
      color: {
        'Internal Walls': 'Putti Finish',
        'External Walls': 'Acrylic Enamel Paint'
      }
    }
  },
  {
    id: 'gift-city-tower',
    name: 'GIFT City Tower',
    location: 'GIFT City, Gujarat',
    type: 'Residential Tower',
    status: 'Ready to Move',
    description: 'Modern residential tower in GIFT City with contemporary amenities and excellent connectivity.',
    features: ['Modern Architecture', 'Prime Location', 'Premium Amenities'],
    developer: 'GIFT One',
    certification: 'Green Building',
    landArea: '2 acres',
    openSpace: '60%',
    towers: 1,
    storeys: 38,
    parking: 'Multi-level parking'
  }
];

export const units: Unit[] = [
  // 3 BHK Apartments - Type A
  {
    id: 'gf-3bhk-a-01',
    projectId: 'greenfield-shantigram',
    type: '3 BHK Type A',
    bedrooms: 3,
    bathrooms: 3,
    price: 20700000, // ₹2.07 Cr
    area: 2652,
    availability: 'available',
    features: ['East Facing', 'Vastu Compliant', 'Personal Foyer', 'Modular Kitchen', 'Balcony'],
    unitNumber: '1001',
    layout: {
      carpetArea: '2,400 sq ft',
      superBuiltUpArea: '2,652 sq ft',
      balconyAccess: '1 Balcony',
      rooms: {
        'Bedrooms': '3',
        'Bathrooms': '3', 
        'Living Area': 'Combined Living + Dining',
        'Kitchen': 'Modular with Wash Area & Store',
        'Foyer': 'Personal Foyer'
      }
    },
    specifications: {
      flooring: ['Vitrified Tiles in Living & Bedrooms', 'Glazed Tiles in Kitchen & Bathrooms'],
      walls: ['Putti Finish Internal', 'Acrylic Enamel External'],
      electrical: ['3-Phase Copper Wiring', 'MCB Distribution', 'Branded Fittings'],
      doors: ['Laminated Finish Main Door', 'Laminated Internal Doors'],
      bathroom: ['Wall Hung Basin', 'Glazed Wall Tiles', 'Premium Sanitary Fixtures']
    }
  },
  {
    id: 'gf-3bhk-a-02', 
    projectId: 'greenfield-shantigram',
    type: '3 BHK Type A',
    bedrooms: 3,
    bathrooms: 3,
    price: 21400000, // ₹2.14 Cr (higher floor)
    area: 2652,
    availability: 'available',
    features: ['West Facing', 'Personal Foyer', 'Modular Kitchen', 'Balcony'],
    unitNumber: '1004',
    layout: {
      carpetArea: '2,400 sq ft',
      superBuiltUpArea: '2,652 sq ft',
      balconyAccess: '1 Balcony',
      rooms: {
        'Bedrooms': '3',
        'Bathrooms': '3',
        'Living Area': 'Combined Living + Dining', 
        'Kitchen': 'Modular with Wash Area & Store',
        'Foyer': 'Personal Foyer'
      }
    }
  },
  // 3 BHK Apartments - Type B
  {
    id: 'gf-3bhk-b-01',
    projectId: 'greenfield-shantigram', 
    type: '3 BHK Type B',
    bedrooms: 3,
    bathrooms: 3,
    price: 20750000, // ₹2.075 Cr
    area: 2653,
    availability: 'available',
    features: ['East Facing', 'Vastu Compliant', 'Personal Foyer', 'Modular Kitchen', 'Balcony'],
    unitNumber: '1002',
    layout: {
      carpetArea: '2,400 sq ft',
      superBuiltUpArea: '2,653 sq ft',
      balconyAccess: '1 Balcony',
      rooms: {
        'Bedrooms': '3',
        'Bathrooms': '3',
        'Living Area': 'Combined Living + Dining',
        'Kitchen': 'Modular with Wash Area & Store', 
        'Foyer': 'Personal Foyer'
      }
    }
  },
  {
    id: 'gf-3bhk-b-02',
    projectId: 'greenfield-shantigram',
    type: '3 BHK Type B', 
    bedrooms: 3,
    bathrooms: 3,
    price: 21450000, // ₹2.145 Cr (higher floor)
    area: 2653,
    availability: 'available',
    features: ['West Facing', 'Personal Foyer', 'Modular Kitchen', 'Balcony'],
    unitNumber: '1003'
  },
  // 4 BHK Penthouses - Type A
  {
    id: 'gf-4bhk-ph-a-01',
    projectId: 'greenfield-shantigram',
    type: '4 BHK Penthouse Type A',
    bedrooms: 4,
    bathrooms: 6,
    price: 36500000, // ₹3.65 Cr
    area: 4548,
    availability: 'available',
    features: ['East Facing', 'Vastu Compliant', 'Duplex Layout', 'Private Terrace', '3 Balconies', 'Premium Penthouse'],
    unitNumber: '2001',
    layout: {
      carpetArea: '4,100 sq ft',
      superBuiltUpArea: '4,548 sq ft',
      balconyAccess: '3 Balconies',
      upperFloorTerrace: 'Private Terrace (26\' x 17\'3")',
      rooms: {
        'Lower Floor': '2 Bedrooms, Kitchen, Dining, Living, Utility',
        'Upper Floor': '2 Bedrooms, Lounge, Private Terrace',
        'Total Bedrooms': '4',
        'Total Bathrooms': '6'
      }
    },
    specifications: {
      flooring: ['Premium Vitrified Tiles', 'Wooden Flooring in Master Bedroom'],
      walls: ['Premium Putti Finish', 'Designer Wall Treatments'],
      electrical: ['3-Phase Copper Wiring', 'Premium Light Fittings', 'Smart Switches'],
      doors: ['Premium Laminated Doors', 'Main Door with Digital Lock'],
      bathroom: ['Premium Sanitary Ware', 'Jacuzzi in Master Bath', 'Designer Tiles'],
      special: ['Private Terrace', 'Duplex Staircase', 'Premium Fixtures']
    }
  },
  // 4 BHK Penthouses - Type B
  {
    id: 'gf-4bhk-ph-b-01',
    projectId: 'greenfield-shantigram',
    type: '4 BHK Penthouse Type B',
    bedrooms: 4,
    bathrooms: 6,
    price: 36400000, // ₹3.64 Cr
    area: 4542,
    availability: 'available',
    features: ['West Facing', 'Duplex Layout', 'Private Terrace', '3 Balconies', 'Premium Penthouse'],
    unitNumber: '2002',
    layout: {
      carpetArea: '4,095 sq ft',
      superBuiltUpArea: '4,542 sq ft',
      balconyAccess: '3 Balconies',
      upperFloorTerrace: 'Private Terrace (26\' x 17\'3")',
      rooms: {
        'Lower Floor': '2 Bedrooms, Kitchen, Dining, Living, Utility',
        'Upper Floor': '2 Bedrooms, Lounge, Private Terrace',
        'Total Bedrooms': '4',
        'Total Bathrooms': '6'
      }
    }
  },
  // GIFT City Tower units (existing)
  {
    id: 'gift-3bhk-01',
    projectId: 'gift-city-tower',
    type: '3 BHK',
    bedrooms: 3,
    bathrooms: 2,
    price: 18500000,
    area: 1850,
    availability: 'available',
    features: ['Sea View', 'Premium Finishes', 'Balcony'],
    unitNumber: 'A-1201'
  },
  {
    id: 'gift-2bhk-01',
    projectId: 'gift-city-tower',
    type: '2 BHK',
    bedrooms: 2,
    bathrooms: 2,
    price: 12500000,
    area: 1250,
    availability: 'available',
    features: ['City View', 'Modern Kitchen', 'Balcony'],
    unitNumber: 'B-0801'
  }
];

export const faqs: FAQ[] = [
  {
    id: 'gf-faq-01',
    projectId: 'greenfield-shantigram',
    question: 'What is the RERA registration number for Shivalik Greenfield?',
    answer: 'The RERA registration number is RAA14879/250225/311229. You can verify this on www.gujrera.gujarat.gov.in',
    tags: ['rera', 'legal', 'registration']
  },
  {
    id: 'gf-faq-02',
    projectId: 'greenfield-shantigram',
    question: 'What is the expected possession date?',
    answer: 'The expected possession date is December 2027 as per RERA registration. Construction is currently in progress with regular updates provided to customers.',
    tags: ['possession', 'timeline', 'construction']
  },
  {
    id: 'gf-faq-03',
    projectId: 'greenfield-shantigram',
    question: 'What are the unit configurations available?',
    answer: 'We offer 3 BHK apartments (Type A & B) ranging from 2,652-2,653 sq ft and 4 BHK duplex penthouses (Type A & B) ranging from 4,542-4,548 sq ft. All units come with premium specifications and modern amenities.',
    tags: ['units', 'configuration', 'bhk', 'penthouse']
  },
  {
    id: 'gf-faq-04',
    projectId: 'greenfield-shantigram',
    question: 'What is the pricing for 3 BHK apartments?',
    answer: 'The 3 BHK apartments are priced from ₹2.07 Cr to ₹2.14 Cr (all inclusive). Additional charges of approximately 5.9% for stamp duty and registration apply. Floor rise and premium location charges may vary.',
    tags: ['pricing', 'cost', '3bhk', 'charges']
  },
  {
    id: 'gf-faq-05',
    projectId: 'greenfield-shantigram',
    question: 'What is the pricing for 4 BHK penthouses?',
    answer: 'The 4 BHK duplex penthouses are priced from ₹3.64 Cr to ₹3.65 Cr (all inclusive). These feature duplex layouts with private terraces, 3 balconies, and premium specifications.',
    tags: ['pricing', 'cost', '4bhk', 'penthouse']
  },
  {
    id: 'gf-faq-06',
    projectId: 'greenfield-shantigram',
    question: 'What amenities are available in the project?',
    answer: 'The project offers premium lifestyle amenities including Mini Theatre, Swimming Pool, Gymnasium, Yoga Room, Spa, Steam & Sauna, Library, Multipurpose Hall, Kids Play Area, and more. It also features 70% open space with landscaped gardens.',
    tags: ['amenities', 'facilities', 'lifestyle']
  },
  {
    id: 'gf-faq-07',
    projectId: 'greenfield-shantigram',
    question: 'What is the location and connectivity?',
    answer: 'Located in Shantigram, Ahmedabad with excellent connectivity - SG Highway (5 mins), SP Ring Road (7 mins), International Airport (25 mins), and KD Hospital (8 mins). Educational institutions like DPS, SGVP are nearby.',
    tags: ['location', 'connectivity', 'distance']
  },
  {
    id: 'gf-faq-08',
    projectId: 'greenfield-shantigram',
    question: 'Is this a green building project?',
    answer: 'Yes, Shivalik Greenfield is a pre-certified green building with 70% open space, sustainable construction practices, and eco-friendly features. The project emphasizes "The Green Aspect of Life".',
    tags: ['green', 'certification', 'eco-friendly']
  },
  {
    id: 'gf-faq-09',
    projectId: 'greenfield-shantigram',
    question: 'What is the rental yield and ROI for investment?',
    answer: 'The expected rental yield ranges from 2.4% to 2.9%. 3 BHK units can generate ₹42,000-₹45,000 monthly rent, while penthouses can yield ₹80,000-₹90,000. The area shows 10-12% CAGR appreciation historically.',
    tags: ['investment', 'rental', 'roi', 'yield']
  },
  {
    id: 'gf-faq-10',
    projectId: 'greenfield-shantigram',
    question: 'Which units are Vastu compliant and East facing?',
    answer: 'Units 1001, 1002, and 2001 are East facing and Vastu compliant. These units offer better natural light, positive energy flow, and are preferred for their auspicious direction according to Vastu principles.',
    tags: ['vastu', 'facing', 'east', 'units']
  },
  {
    id: 'gf-faq-11',
    projectId: 'greenfield-shantigram',
    question: 'What is the booking process and payment plan?',
    answer: 'Booking starts with ₹2 Lakhs token amount. Payment is linked to construction milestones: 10% on agreement, 10% on basement completion, 60% during construction phases, and final 10% on possession. Bank loan assistance available.',
    tags: ['booking', 'payment', 'process', 'loans']
  },
  {
    id: 'gf-faq-12',
    projectId: 'greenfield-shantigram',
    question: 'What are the construction specifications?',
    answer: 'Premium specifications include vitrified tiles flooring, laminated doors, aluminum windows, 3-phase copper wiring with MCB, wall hung basins, modular kitchen ready units, and branded elevators (8 passenger + 2 service lifts).',
    tags: ['specifications', 'construction', 'materials', 'quality']
  },
  {
    id: 'gift-faq-01',
    projectId: 'gift-city-tower',
    question: 'What are the available unit types in GIFT City Tower?',
    answer: 'We offer 2 BHK and 3 BHK apartments with modern amenities and premium finishes.',
    tags: ['units', 'bhk', 'configuration']
  },
  {
    id: 'gift-faq-02',
    projectId: 'gift-city-tower',
    question: 'What is the price range for apartments?',
    answer: '2 BHK apartments start from ₹1.25 Cr and 3 BHK apartments from ₹1.85 Cr.',
    tags: ['pricing', 'cost']
  }
];

export const filterTags: FilterTag[] = [
  {
    id: 'under-1cr',
    label: 'Under ₹1 Cr',
    query: 'Show me units under 1 crore'
  },
  {
    id: 'under-2cr',
    label: 'Under ₹2 Cr', 
    query: 'Show me units under 2 crore'
  },
  {
    id: '3bhk-units',
    label: '3 BHK',
    query: 'Show me 3 BHK apartments'
  },
  {
    id: '4bhk-units',
    label: '4 BHK',
    query: 'Show me 4 BHK apartments'
  },
  {
    id: 'penthouse-units',
    label: 'Penthouses',
    query: 'Show me penthouse units'
  },
  {
    id: 'vastu-compliant',
    label: 'Vastu Compliant',
    query: 'Show me vastu compliant units'
  },
  {
    id: 'east-facing',
    label: 'East Facing',
    query: 'Show me east facing units'
  },
  {
    id: 'ready-to-move',
    label: 'Ready to Move',
    query: 'Show me ready to move properties'
  },
  {
    id: 'green-building',
    label: 'Green Building',
    query: 'Tell me about green building features'
  },
  {
    id: 'investment-roi',
    label: 'Investment ROI',
    query: 'What is the rental yield and ROI?'
  }
];

// Export availableFilters as alias for backward compatibility
export const availableFilters = filterTags;
