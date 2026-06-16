import { db, agentsTable, listingsTable } from "@workspace/db";

async function main() {
  const existing = await db.select().from(listingsTable).limit(1);
  if (existing.length > 0) {
    console.log("Listings already present, skipping seed.");
    return;
  }

  const agents = await db
    .insert(agentsTable)
    .values([
      {
        name: "James Mitchell",
        email: "james@yourkey.ae",
        phone: "+971 50 669 2770",
        title: "Senior Sales Consultant",
        bio: "Specialising in waterfront and prime Dubai investments.",
        photoUrl: "/images/office-team.png",
        active: true,
      },
      {
        name: "Saeed Al Mansoori",
        email: "saeed@yourkey.ae",
        phone: "+971 54 451 7999",
        title: "Leasing Manager",
        bio: "Abu Dhabi leasing and residential specialist.",
        photoUrl: "/images/office-team.png",
        active: true,
      },
      {
        name: "Priya Sharma",
        email: "priya@yourkey.ae",
        phone: "+971 50 456 7890",
        title: "Investment Advisor",
        bio: "Off-plan and ROI-focused investment guidance.",
        photoUrl: "/images/office-team.png",
        active: true,
      },
    ])
    .returning();

  const [james, saeed, priya] = agents;

  await db.insert(listingsTable).values([
    {
      reference: "YK-1001",
      title: "Modern Apartment with Marina Views",
      description:
        "Experience luxury living in this stunning 2-bedroom apartment in the heart of Dubai Marina. Floor-to-ceiling windows, premium finishes, and a spacious balcony overlooking the water.",
      propertyType: "apartment",
      purpose: "sale",
      status: "published",
      price: 2800000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1450,
      city: "Dubai",
      community: "Dubai Marina",
      images: ["/images/modern-apartment.png", "/images/property-1.png", "/images/property-2.png"],
      amenities: ["Swimming Pool", "Gym", "Balcony", "24/7 Security", "Covered Parking", "Marina View"],
      featured: true,
      agentId: james.id,
    },
    {
      reference: "YK-1002",
      title: "Ultra-Luxury Beachfront Villa",
      description:
        "A magnificent 5-bedroom beachfront villa on Palm Jumeirah with private beach access, infinity pool, and panoramic sea views.",
      propertyType: "villa",
      purpose: "sale",
      status: "published",
      price: 18500000,
      bedrooms: 5,
      bathrooms: 6,
      area: 8200,
      city: "Dubai",
      community: "Palm Jumeirah",
      images: ["/images/luxury-villa.png", "/images/property-3.png"],
      amenities: ["Private Beach", "Infinity Pool", "Home Cinema", "Maid's Room", "Smart Home", "Sea View"],
      featured: true,
      agentId: james.id,
    },
    {
      reference: "YK-1003",
      title: "Penthouse Above the Clouds",
      description:
        "An exclusive full-floor penthouse in Downtown Dubai with uninterrupted views of the Burj Khalifa and a private rooftop terrace.",
      propertyType: "penthouse",
      purpose: "sale",
      status: "published",
      price: 25000000,
      bedrooms: 4,
      bathrooms: 5,
      area: 6800,
      city: "Dubai",
      community: "Downtown Dubai",
      images: ["/images/penthouse.png", "/images/glass-facade.png"],
      amenities: ["Rooftop Terrace", "Private Lift", "Concierge", "Burj Khalifa View", "Smart Home"],
      featured: true,
      agentId: priya.id,
    },
    {
      reference: "YK-1004",
      title: "Family Townhouse in Saadiyat",
      description:
        "A bright 4-bedroom townhouse on Saadiyat Island, steps from the beach and cultural district, ideal for families.",
      propertyType: "townhouse",
      purpose: "sale",
      status: "published",
      price: 5400000,
      bedrooms: 4,
      bathrooms: 4,
      area: 3200,
      city: "Abu Dhabi",
      community: "Saadiyat Island",
      images: ["/images/townhouse.png", "/images/render-saadiyat.png"],
      amenities: ["Community Pool", "Garden", "Covered Parking", "Beach Access", "24/7 Security"],
      featured: false,
      agentId: saeed.id,
    },
    {
      reference: "YK-1005",
      title: "Waterfront Apartment for Rent",
      description:
        "A fully furnished 1-bedroom apartment with marina views available for annual rent, featuring resort-style amenities.",
      propertyType: "apartment",
      purpose: "rent",
      status: "published",
      price: 145000,
      bedrooms: 1,
      bathrooms: 1,
      area: 820,
      city: "Dubai",
      community: "Dubai Marina",
      images: ["/images/render-marina.png", "/images/property-2.png"],
      amenities: ["Swimming Pool", "Gym", "Furnished", "Covered Parking", "Marina View"],
      featured: false,
      agentId: james.id,
    },
    {
      reference: "YK-1006",
      title: "Yas Island Residence",
      description:
        "A contemporary 3-bedroom apartment on Yas Island with golf and waterfront views, close to leisure attractions.",
      propertyType: "apartment",
      purpose: "rent",
      status: "published",
      price: 180000,
      bedrooms: 3,
      bathrooms: 3,
      area: 1850,
      city: "Abu Dhabi",
      community: "Yas Island",
      images: ["/images/render-yas.png", "/images/property-1.png"],
      amenities: ["Swimming Pool", "Gym", "Balcony", "Covered Parking", "Golf View"],
      featured: false,
      agentId: saeed.id,
    },
  ]);

  console.log("Seeded agents and listings.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
