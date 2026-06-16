export interface Property {
  id: string;
  title: string;
  location: string;
  emirate: "Dubai" | "Abu Dhabi";
  type: "Apartment" | "Villa" | "Townhouse" | "Penthouse" | "Commercial" | "Studio";
  status: "FOR SALE" | "FOR RENT";
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  agent: { name: string; title: string; phone: string; image: string };
  featured?: boolean;
}

const AGENT_JAMES = { name: "James Mitchell", title: "Senior Sales Consultant", phone: "+971 50 123 4567", image: "/images/agent-1.jpg" };
const AGENT_SAEED = { name: "Saeed Al Mansoori", title: "Leasing Manager", phone: "+971 50 987 6543", image: "/images/agent-2.jpg" };
const AGENT_PRIYA = { name: "Priya Sharma", title: "Investment Advisor", phone: "+971 50 456 7890", image: "/images/agent-3.jpg" };
const AGENT_FATIMA = { name: "Fatima Hassan", title: "Property Manager", phone: "+971 50 321 0987", image: "/images/agent-4.jpg" };

const DEFAULT_GALLERY = [
  "/images/property-1.png",
  "/images/property-2.png",
  "/images/property-3.png",
];

export const PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Modern Apartment with Marina Views",
    location: "Dubai Marina",
    emirate: "Dubai",
    type: "Apartment",
    status: "FOR SALE",
    price: 2800000,
    beds: 2,
    baths: 2,
    sqft: 1450,
    image: "/images/modern-apartment.png",
    gallery: ["/images/modern-apartment.png", ...DEFAULT_GALLERY],
    description: "Experience luxury living in this stunning 2-bedroom apartment located in the heart of Dubai Marina. Features include floor-to-ceiling windows, premium finishes, and a spacious balcony overlooking the water. Residents enjoy access to world-class amenities including an infinity pool and state-of-the-art gym.",
    amenities: ["Swimming Pool", "Gym", "Balcony", "24/7 Security", "Covered Parking", "Marina View"],
    agent: AGENT_JAMES,
    featured: true
  },
  {
    id: "2",
    title: "Ultra-Luxury Beachfront Villa",
    location: "Palm Jumeirah",
    emirate: "Dubai",
    type: "Villa",
    status: "FOR SALE",
    price: 18500000,
    beds: 5,
    baths: 6,
    sqft: 8200,
    image: "/images/luxury-villa.png",
    gallery: ["/images/luxury-villa.png", ...DEFAULT_GALLERY],
    description: "An architectural masterpiece on the iconic Palm Jumeirah. This signature villa offers private beach access, a landscaped garden with a temperature-controlled swimming pool, and breathtaking views of the Dubai skyline. The interior boasts custom Italian marble and high-end smart home automation.",
    amenities: ["Private Beach", "Swimming Pool", "Smart Home", "Maid's Room", "Sea View", "Landscaped Garden"],
    agent: AGENT_JAMES,
    featured: true
  },
  {
    id: "3",
    title: "Sky Collection Penthouse",
    location: "Downtown Dubai",
    emirate: "Dubai",
    type: "Penthouse",
    status: "FOR SALE",
    price: 12000000,
    beds: 4,
    baths: 5,
    sqft: 5100,
    image: "/images/penthouse.png",
    gallery: ["/images/penthouse.png", ...DEFAULT_GALLERY],
    description: "Elevate your lifestyle with this exceptional penthouse in Downtown Dubai. Enjoy panoramic views of the Burj Khalifa and the Dubai Fountains from your expansive terrace. Featuring double-height ceilings, a private elevator, and bespoke designer furnishings.",
    amenities: ["Burj Khalifa View", "Private Terrace", "Concierge Service", "Gym", "Valet Parking", "Spa Access"],
    agent: AGENT_PRIYA,
    featured: true
  },
  {
    id: "4",
    title: "Contemporary Family Townhouse",
    location: "Yas Island",
    emirate: "Abu Dhabi",
    type: "Townhouse",
    status: "FOR SALE",
    price: 3200000,
    beds: 3,
    baths: 3,
    sqft: 2800,
    image: "/images/townhouse.png",
    gallery: ["/images/townhouse.png", ...DEFAULT_GALLERY],
    description: "A perfect family home located in the vibrant Yas Island community. This modern townhouse features an open-plan living area, a private garden, and easy access to world-class entertainment venues including Ferrari World and Yas Marina Circuit.",
    amenities: ["Private Garden", "Community Pool", "Children's Play Area", "24/7 Security", "Near Schools"],
    agent: AGENT_FATIMA,
    featured: true
  },
  {
    id: "5",
    title: "Chic Studio in Business Bay",
    location: "Business Bay",
    emirate: "Dubai",
    type: "Studio",
    status: "FOR RENT",
    price: 95000,
    beds: 0,
    baths: 1,
    sqft: 520,
    image: "/images/modern-apartment.png",
    gallery: ["/images/modern-apartment.png", ...DEFAULT_GALLERY],
    description: "Fully furnished studio apartment ideal for young professionals. Located steps away from the Dubai Canal, offering easy access to Metro stations and key business districts. Building amenities include a health club and retail outlets.",
    amenities: ["Furnished", "Gym", "Swimming Pool", "Near Metro", "Covered Parking"],
    agent: AGENT_SAEED,
    featured: true
  },
  {
    id: "6",
    title: "Premium Grade A Office Space",
    location: "ADGM Square",
    emirate: "Abu Dhabi",
    type: "Commercial",
    status: "FOR RENT",
    price: 450000,
    beds: 0,
    baths: 2,
    sqft: 3200,
    image: "/images/abudhabi-skyline.png",
    gallery: ["/images/abudhabi-skyline.png", ...DEFAULT_GALLERY],
    description: "Prime commercial real estate in Abu Dhabi Global Market (ADGM). This fully fitted office space offers spectacular sea views, raised flooring, and high-speed elevators. Perfect for multinational corporations looking to establish a presence in the capital.",
    amenities: ["Fitted Office", "Sea View", "Visitor Parking", "Cafeteria", "Meeting Rooms"],
    agent: AGENT_SAEED,
    featured: true
  },
  {
    id: "7",
    title: "Luxury Beachfront Apartment",
    location: "Saadiyat Island",
    emirate: "Abu Dhabi",
    type: "Apartment",
    status: "FOR SALE",
    price: 4500000,
    beds: 3,
    baths: 4,
    sqft: 2200,
    image: "/images/render-saadiyat.png",
    gallery: ["/images/render-saadiyat.png", ...DEFAULT_GALLERY],
    description: "Live steps away from pristine white sands. This beautiful apartment offers direct beach access and is situated near the Louvre Abu Dhabi. Features a large terrace and high-end kitchen appliances.",
    amenities: ["Beach Access", "Swimming Pool", "Gym", "Balcony", "Covered Parking"],
    agent: AGENT_FATIMA
  },
  {
    id: "8",
    title: "Spacious Villa in Arabian Ranches",
    location: "Arabian Ranches",
    emirate: "Dubai",
    type: "Villa",
    status: "FOR RENT",
    price: 350000,
    beds: 4,
    baths: 5,
    sqft: 4000,
    image: "/images/luxury-villa.png",
    gallery: ["/images/luxury-villa.png", ...DEFAULT_GALLERY],
    description: "An elegant family villa in a mature community. Features a beautifully landscaped private garden, large living spaces, and proximity to the golf course and community center.",
    amenities: ["Private Garden", "Maid's Room", "Community Pool", "Golf Course View", "Covered Parking"],
    agent: AGENT_SAEED
  },
  {
    id: "9",
    title: "Modern Canal-View Townhouse",
    location: "Al Reem Island",
    emirate: "Abu Dhabi",
    type: "Townhouse",
    status: "FOR SALE",
    price: 2600000,
    beds: 3,
    baths: 4,
    sqft: 2400,
    image: "/images/townhouse.png",
    gallery: ["/images/townhouse.png", ...DEFAULT_GALLERY],
    description: "Contemporary townhouse offering stunning views of the canal. Spread over three levels, featuring an open-plan kitchen, multiple balconies, and access to premium community facilities.",
    amenities: ["Canal View", "Balcony", "Swimming Pool", "Gym", "Covered Parking"],
    agent: AGENT_PRIYA
  },
  {
    id: "10",
    title: "High-Floor Apartment in JBR",
    location: "JBR",
    emirate: "Dubai",
    type: "Apartment",
    status: "FOR RENT",
    price: 180000,
    beds: 2,
    baths: 3,
    sqft: 1600,
    image: "/images/dubai-skyline.png",
    gallery: ["/images/dubai-skyline.png", ...DEFAULT_GALLERY],
    description: "Stunning high-floor apartment located in Jumeirah Beach Residence. Offers unobstructed sea views and easy access to The Walk, featuring numerous dining and retail options.",
    amenities: ["Sea View", "Balcony", "Gym", "Swimming Pool", "Covered Parking"],
    agent: AGENT_SAEED
  },
  {
    id: "11",
    title: "Elegant Villa in Saadiyat Reserve",
    location: "Saadiyat Island",
    emirate: "Abu Dhabi",
    type: "Villa",
    status: "FOR SALE",
    price: 6500000,
    beds: 5,
    baths: 6,
    sqft: 5500,
    image: "/images/render-yas.png",
    gallery: ["/images/render-yas.png", ...DEFAULT_GALLERY],
    description: "A masterfully designed villa in a prestigious neighborhood. Offers ample living space, a private pool, and a beautifully landscaped garden. Close to top-tier schools and cultural landmarks.",
    amenities: ["Private Pool", "Landscaped Garden", "Maid's Room", "Covered Parking", "24/7 Security"],
    agent: AGENT_JAMES
  },
  {
    id: "12",
    title: "Premium Office Space",
    location: "Downtown Dubai",
    emirate: "Dubai",
    type: "Commercial",
    status: "FOR SALE",
    price: 8500000,
    beds: 0,
    baths: 4,
    sqft: 6000,
    image: "/images/penthouse.png",
    gallery: ["/images/penthouse.png", ...DEFAULT_GALLERY],
    description: "An expansive, fully-fitted office space in the heart of Downtown Dubai. Features panoramic views of the city skyline, multiple meeting rooms, and high-speed elevators.",
    amenities: ["Fitted Office", "City View", "Meeting Rooms", "Covered Parking", "Cafeteria"],
    agent: AGENT_PRIYA
  }
];

export function getPropertyById(id: string): Property | undefined {
  return PROPERTIES.find(p => p.id === id);
}
