// Gallery categories
export const galleryCategories = [
  { id: 'Laboratory', name: 'Laboratory' },
  { id: 'Manufacturing', name: 'Manufacturing' },
  { id: 'Research', name: 'Research' },
  { id: 'Equipment', name: 'Equipment' },
  { id: 'Office', name: 'Office' },
  { id: 'Team', name: 'Team' },
  { id: 'Products', name: 'Products' },
  { id: 'Technology', name: 'Technology' },
];

// Gallery category list for form dropdowns (string array for backward compatibility)
export const galleryCategoryList = galleryCategories.map((cat) => cat.name);

// Team positions
export const teamPositions = [
  'CEO',
  'CTO',
  'CFO',
  'Director',
  'Manager',
  'Team Lead',
  'Senior Developer',
  'Developer',
  'Senior Engineer',
  'Engineer',
  'Senior Scientist',
  'Research Scientist',
  'Lab Technician',
  'Quality Assurance',
  'Sales Manager',
  'Marketing Manager',
  'HR Manager',
  'Operations Manager',
  'Project Manager',
  'Business Analyst',
  'Consultant',
  'Intern',
];

// Product data
export const products = [
  {
    id: 'microchannel',
    slug: 'microchannel-fabrication-machine',
    name: 'Microchannel Fabrication Machine',
    shortDescription:
      'Handheld machine for metallic and silicon substrate with ≤ 100 µm microchannel width and depth.',
    description: `
      Our Microchannel Fabrication Machine is a state-of-the-art handheld device designed for precision microchannel creation in metallic and silicon substrates.
      
      With a channel width and depth of ≤ 100 µm, this compact machine delivers exceptional precision for demanding applications. The pulse fiber laser-based system ensures non-contact fabrication, preserving the integrity of your materials while achieving consistent results.
      
      The integrated touchscreen provides intuitive control, while the lightweight design (less than 4 kgs for the fabrication head) ensures comfortable operation even during extended use. The entire machine, including the head and box, weighs less than 15 kgs, making it easily transportable for field use.
      
      Air-cooled and with optional battery operation, this maintenance-free system offers low energy consumption and an impressive service life of ≥ 1,00,000 hours, backed by our standard 2-year warranty.
    `,
    features: [
      '≤ 100 µm Microchannel width and depth',
      'Handheld Machine suitable for Metallic and Silicon substrate',
      'Substrate size could be 100 * 100 mm',
      'Pulse Fiber Laser based System',
      'Compact and Non-Contact Microchannel Fabrication',
      'Integrated Touchscreen',
      'Weight of the Fabrication Head is less than 4 kgs',
      'Weight of the Machine including Head and the Box is < 15 kgs',
      'Excellent precision and accuracy',
      'Air cooled with optional battery operation',
      'Service life ≥ 1,00,000 hours',
      'Red alignment Laser',
      'Maintenance free with low energy consumption',
      'Warranty 2 years (Standard)',
    ],
    applications: [
      'Microchannel mould Fabrication',
      'Useful for Field use (on site)',
      'Easily transportable',
    ],
    modelPath: '/models/laser-machine.glb',
    imagePath: '/placeholder.svg?height=600&width=800',
    color: '#E84118', // Orange-red from logo
    category: 'Laser Systems',
    brochureUrl: '/brochures/microchannel-fabrication-machine.pdf', // Add this line
  },
  {
    id: 'alestm',
    slug: 'alestm-system',
    name: 'ALESTM System',
    shortDescription:
      'Automatic Laser Exposure, Scanning & Temperature Mapping System for non-contact sample heating and thermal mapping.',
    description: `
      ALESTM (Automatic Laser Exposure, Scanning & Temperature Mapping) System is an upgraded version of VDP-LES and can be used for many applications e.g. Non Contact method of sample heating and Thermal Mapping during the heating process and afterwards, in addition to Photo Thermal Studies.

      Customers can bring samples in the form of Live Animal (Mice, Rat or Rabbit) or on Micro Well Plate and Petri Dish. Laser Power Density (on sample) can be varied by adjusting the "Laser Beam Diameter" or "Laser Power".

      Our system allows the use of Well Plates and Petri Dishes for samples, with precise exposure to laser beams at predefined times and locations. We provide Micro Well Plate holders for 6/12/24/48/96 configurations. Customers can choose one or multiple wells and assign the same or different exposure times.

      The user-friendly GUI includes checks at every step to avoid user errors. The system includes Near Infra-Red (NIR) Fiber Coupled Laser with options to use one or many lasers (one at a time).

      Thermal Mapping of the exposed sample includes temperature palettes for both video and images, with temperature data from each pixel exportable to Excel for further analysis.
    `,
    features: [
      'Non-contact sample heating method',
      'Thermal mapping during and after heating process',
      'Variable laser power density',
      'Support for live animal samples (Mice, Rat, Rabbit)',
      'Micro well plate and petri dish compatibility',
      'Customizable exposure time and location',
      'User-friendly GUI with built-in error prevention',
      'Near Infra-Red (NIR) Fiber Coupled Laser',
      'Multiple laser support (one at a time)',
      'Temperature data export to Excel',
      'Video and image thermal mapping with temperature palette',
    ],
    applications: [
      'Photo Thermal Studies',
      'Biomedical Research',
      'Material Science',
      'Thermal Analysis',
    ],
    modelPath: '/models/scanner.glb',
    imagePath: '/placeholder.svg?height=600&width=800',
    color: '#4834D4', // Blue-purple from logo
    category: 'Thermal Mapping Systems',
    brochureUrl: '/brochures/alestm-system.pdf', // Add this line
  },
  {
    id: 'laser-marking',
    slug: 'laser-marking-cutting-machine',
    name: 'Laser Marking & Cutting Machine',
    shortDescription:
      'Fully customizable marking, engraving & cutting machine based on Fibre or CO2 Laser.',
    description: `
      SPPL designs and manufactures Laser Marking, Engraving & Cutting Machines that are fully customizable, based on Fibre or CO2 Laser technology. Our systems offer material options to choose while ordering (factory set) – including Metals, Acrylic, Leather, Textile, Glass, and more.

      Based on the material requirements, laser power can be specified from 20W to 2000W. Sample size can also be customized to your specifications. The machine is built with anodized MS, providing a solid and stable structure that protects against vibration and results in superior cutting and engraving quality.

      Each machine comes with an integrated cooling system and an exhaust system for optimal performance and safety. Our laser systems deliver precise, high-quality results across a wide range of applications and materials.
    `,
    features: [
      'Available in Fibre or CO2 Laser options',
      'Power range from 20W to 2000W',
      'Customizable sample size',
      'Anodized MS construction for stability',
      'Vibration protection for better quality',
      'Built-in cooling system',
      'Integrated exhaust system',
      'Compatible with various materials (Metals, Acrylic, Leather, Textile, Glass, etc.)',
    ],
    applications: [
      'Industrial marking and engraving',
      'Product identification',
      'Decorative cutting',
      'Prototype development',
      'Small-scale manufacturing',
    ],
    modelPath: '/models/cutter.glb',
    imagePath: '/placeholder.svg?height=600&width=800',
    color: '#E84118', // Orange-red from logo
    category: 'Laser Systems',
    brochureUrl: '/brochures/laser-marking-cutting-machine.pdf', // Add this line
  },
];

// Process steps data
export const processSteps = [
  {
    number: '01',
    title: 'Initial Discussion',
    description:
      'Initial discussion with prospects on what is needed and what they imagine about their solution.',
  },
  {
    number: '02',
    title: 'Broad Outline',
    description:
      'Make broad outline on what is practical & possible based on customer requirements.',
  },
  {
    number: '03',
    title: 'Fine Tuning Requirements',
    description:
      'Many rounds of interaction to fine tune the requirements of the customer.',
  },
  {
    number: '04',
    title: 'First Proposal',
    description:
      'Once agreed, send proposal with detailed specifications and performance commitment.',
  },
  {
    number: '05',
    title: 'Preliminary Design Review',
    description:
      'When purchase process is completed, we meet again with Preliminary Design Review (PDR) to sync with customer requirements.',
  },
  {
    number: '06',
    title: 'Critical Design Review',
    description:
      'After PDR, we go for Critical Design Review (CDR) and final design.',
  },
  {
    number: '07',
    title: 'Manufacturing',
    description:
      'Once Final Design is completed, we proceed with manufacturing.',
  },
  {
    number: '08',
    title: 'Feedback Process',
    description:
      'We call customer to see the manufactured system and request for feedback.',
  },
  {
    number: '09',
    title: 'Delivery',
    description: 'Once agreed, we make changes and proceed for delivery.',
  },
  {
    number: '10',
    title: 'Installation & Support',
    description:
      'We visit customer for installation & training, and assure long-term support.',
  },
];

// Collaborators data
export const collaborators = [
  {
    id: 'microlight3d',
    name: 'Microlight3D',
    description:
      'Manufacturer of high-resolution micro-scale 2D & 3D printing systems, enabling scientists and industrial researchers with new design needs to produce demanding precision micro parts.',
    longDescription: `
      Microlight3D is a manufacturer of high-resolution micro-scale 2D & 3D printing systems. The company enables scientists and industrial researchers with new design needs to produce the most demanding precision micro parts in any geometric or organic shape with a flawless finish.
      
      By combining 2D & 3D microprinting techniques, Microlight3D offers customers more flexibility in creating larger complex parts. It aims to provide faster and more complex micro-fabrication systems for tomorrow's applications.
      
      Microlight3D's equipment is designed for application in microoptics, microfluidics, microrobotics, meta-materials, cell biology and microelectronics.
    `,
    logo: '/placeholder.svg?height=200&width=200',
    website: '#',
  },
  {
    id: 'lheritier',
    name: 'Lheritier',
    description:
      'For more than 30 years, LHERITIER has designed and produced rugged cameras and complex vision systems for the Defence, Security, Energy, and Aerospace Industries.',
    longDescription: `
      For more than 30 years, LHERITIER has designed and produced rugged cameras and complex vision systems for the Defence, Security, Energy, Aerospace Industries.
      
      Based on the ingenious use of commercial sensors coupled with embedded image enhancement algorithms, the company has full control over its product design, R&D and testing processes, offering a wide range of skills and high-end technology to its customers.
      
      In addition to a vast catalogue of COTS products, LHERITIER also offers tailored, modular solutions, with the ability to comply with any specific requirement.
    `,
    logo: '/placeholder.svg?height=200&width=200',
    website: '#',
  },
  {
    id: 'teraxion',
    name: 'TeraXion',
    description:
      'Leader in the manufacturing of innovative photonic components that incorporate fiber Bragg gratings, low noise lasers and integrated photonics.',
    longDescription: `
      TeraXion is a leader in the manufacturing of innovative photonic components that incorporate fiber Bragg gratings, low noise lasers and integrated photonics.
      
      FBGs have been the cornerstone of our offering for 20 years and TeraXion has successfully applied this technology in four different markets, reaffirming FBGs' potential in countless highly advanced applications.
    `,
    logo: '/placeholder.svg?height=200&width=200',
    website: '#',
  },
  {
    id: 'fullscale',
    name: 'FullScale Labs',
    description:
      'Electronic expert focused on high-end uncooled thermal imaging solutions, guaranteeing designs according to the state of the art and perfectly matching quality rules.',
    longDescription: `
      FullScale is your electronic expert, mainly focused on high-end uncooled thermal imaging solutions.
      
      FullScale guarantees you that all its designs are done according to the state of the art and perfectly match quality rules. FullScale only uses high performance equipments and software perfectly meeting advanced analog designs requirement.
    `,
    logo: '/placeholder.svg?height=200&width=200',
    website: '#',
  },
];

// Company strengths
export const strengths = [
  {
    icon: 'Lightbulb',
    title: 'Customized Solutions',
    description:
      'We work interactively with customers to understand their needs and create tailored solutions.',
  },
  {
    icon: 'Flag',
    title: 'Indian OEM & SI',
    description:
      'We specialize in developing Indian Original Equipment Manufacturer and System Integrator in different fields.',
  },
  {
    icon: 'Users',
    title: 'Collaborative Approach',
    description:
      'We believe in multiple rounds of interaction to fine-tune requirements and ensure customer satisfaction.',
  },
  {
    icon: 'Wrench',
    title: 'Technical Expertise',
    description:
      'Our team has deep technical knowledge across multiple domains including lasers, optics, and imaging.',
  },
  {
    icon: 'Shield',
    title: 'Quality Assurance',
    description:
      'We follow rigorous design reviews and quality checks to ensure high-performance products.',
  },
  {
    icon: 'HeartHandshake',
    title: 'Long-term Support',
    description:
      'We provide installation, training, and ongoing support for all our products and solutions.',
  },
];

// About company
export const aboutCompany = {
  title: 'Who are we?',
  description: `
    We have 30+ years of experience in working along with Scientists, Professors and Industrial companies. Our experience spans over RF & Microwave, Fiber Optics, Lasers, Imaging (Visible / Thermal) and to the market segments Research & Education, Telecom, Textile, Oil & Gas, Petrochemical, Diamond, Space, Nuclear, Aerospace, Defence, Engineering, Medical and many more.
    
    We focus on Customized Solutions. In order to do so, we work interactively with the customers so that we can conceptualize their needs. Then, we design and manufacture products to meet the customer's imagination.
    
    We expertise in developing Indian Original Equipment Manufacturer (OEM) and System Integrator (SI) in different fields.
  `,
  vision:
    'To be the leading provider of innovative, customized technological solutions that address complex challenges across industries.',
  mission:
    'We are committed to delivering high-quality, tailored solutions through collaborative engagement with our customers, leveraging our extensive expertise and experience to transform their ideas into reality.',
};

// Theme colors from logo
export const themeColors = {
  gold: '#F1C40F', // Gold/yellow from outer ring
  orangeRed: '#E84118', // Orange-red text and curve
  bluePurple: '#4834D4', // Blue/purple outline and text
  lightBlue: '#74B9FF', // Light blue gear
  darkBg: '#121212', // Dark background for dark theme
  darkCard: '#1E1E1E', // Slightly lighter dark for cards
  darkText: '#E0E0E0', // Light text for dark theme
};
