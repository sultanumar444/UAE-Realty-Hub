import { db, agentsTable, listingsTable, postsTable } from "@workspace/db";

async function seedPosts() {
  const existing = await db.select().from(postsTable).limit(1);
  if (existing.length > 0) {
    console.log("Posts already present, skipping post seed.");
    return;
  }

  const [author] = await db.select().from(agentsTable).limit(1);

  await db.insert(postsTable).values([
    {
      slug: "dubai-real-estate-market-outlook-2026",
      title: "Dubai Real Estate Market Outlook 2026",
      excerpt:
        "Transaction volumes, prime-area price trends, and where the smart capital is moving across Dubai in 2026.",
      content:
        "Dubai's property market enters 2026 on remarkably firm footing. After three consecutive years of record transaction volumes, the question on every investor's mind is whether momentum can be sustained.\n\nPrime waterfront communities such as Dubai Marina, Palm Jumeirah, and Downtown Dubai continue to command premium pricing, driven by sustained international demand and a limited pipeline of new ultra-luxury inventory. We expect price growth in these districts to moderate to a healthy single-digit pace rather than reverse.\n\nThe rental market remains landlord-favourable. Population growth, the Golden Visa programme, and a steady inflow of relocating professionals keep occupancy high and yields attractive — often between 6 and 8 percent gross in well-positioned communities.\n\nFor investors, the strategy for 2026 is selectivity. Branded residences, properties with genuine waterfront frontage, and units in master-planned communities with proven developer track records offer the most durable returns. Speculative off-plan plays in oversupplied corridors warrant more caution.",
      category: "Market Insights",
      tags: ["Dubai", "Market Outlook", "Investment"],
      status: "published",
      coverImage: "/images/dubai-skyline.png",
      seoTitle: "Dubai Real Estate Market Outlook 2026 | Trends & Forecast",
      seoDescription:
        "Expert 2026 forecast for Dubai property: prime-area price trends, rental yields, and where to invest. Insights from Your Key Property Management.",
      authorId: author?.id ?? null,
    },
    {
      slug: "guide-to-buying-off-plan-property-in-the-uae",
      title: "A Buyer's Guide to Off-Plan Property in the UAE",
      excerpt:
        "Payment plans, escrow protection, and due diligence — everything you need to know before committing to an off-plan purchase.",
      content:
        "Off-plan property — buying directly from a developer before construction is complete — remains one of the most popular routes into UAE real estate. Done well, it offers attractive payment plans and capital appreciation between launch and handover. Done carelessly, it carries avoidable risk.\n\nStart with the developer. Track record matters more than the brochure. Review previous projects, delivery timelines, and build quality before signing anything.\n\nUnderstand the escrow protection. In Dubai, off-plan payments are held in RERA-regulated escrow accounts and released to the developer against verified construction milestones. Confirm the project is registered and the escrow account is in place.\n\nRead the payment plan carefully. Post-handover payment plans can ease cash flow, but compare the total cost against a ready property. Factor in the 4 percent Dubai Land Department transfer fee and any service charges.\n\nFinally, get the contract reviewed. The Sales and Purchase Agreement should clearly define the completion date, penalties for delay, and your rights if the project stalls. A short consultation with a qualified advisor at this stage can save significant cost later.",
      category: "Buyer Guides",
      tags: ["Off-Plan", "Buying Guide", "UAE"],
      status: "published",
      coverImage: "/images/glass-facade.png",
      seoTitle: "Off-Plan Property Buyer's Guide UAE | Payment Plans & Escrow",
      seoDescription:
        "How to buy off-plan property in the UAE safely: developer due diligence, escrow protection, payment plans, and contract tips.",
      authorId: author?.id ?? null,
    },
    {
      slug: "abu-dhabi-investment-hotspots",
      title: "Abu Dhabi's Emerging Investment Hotspots",
      excerpt:
        "From Saadiyat Island's cultural district to Yas Island's leisure economy, where Abu Dhabi capital is finding value.",
      content:
        "While Dubai dominates the headlines, Abu Dhabi has quietly become one of the most compelling investment markets in the region — particularly for buyers seeking stable, long-term yields.\n\nSaadiyat Island leads the prime segment. Home to the Louvre Abu Dhabi and a growing cluster of cultural institutions, its beachfront villas and townhouses appeal to end-users and investors alike. Limited supply and strong amenities support resilient pricing.\n\nYas Island offers a different proposition. Anchored by world-class leisure attractions, it benefits from a thriving short-term rental market and consistent tourist demand, making it attractive for income-focused investors.\n\nAcross the emirate, reforms allowing foreign freehold ownership in designated investment zones have widened the buyer pool considerably. Combined with relatively accessible entry prices versus comparable Dubai stock, Abu Dhabi presents genuine value for investors willing to look beyond the obvious.",
      category: "Investment",
      tags: ["Abu Dhabi", "Investment", "Saadiyat", "Yas Island"],
      status: "published",
      coverImage: "/images/render-saadiyat.png",
      seoTitle: "Abu Dhabi Investment Hotspots | Saadiyat & Yas Island",
      seoDescription:
        "Discover Abu Dhabi's top property investment areas — Saadiyat Island and Yas Island — with yields, demand drivers, and freehold options.",
      authorId: author?.id ?? null,
    },
  ]);

  console.log("Seeded insight posts.");
}

async function main() {
  await seedPosts();

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
