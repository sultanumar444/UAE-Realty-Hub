import { eq } from "drizzle-orm";
import {
  db,
  agentsTable,
  listingsTable,
  postsTable,
  communitiesTable,
  offPlanProjectsTable,
} from "@workspace/db";

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

const COMMUNITY_SEED = [
  {
    name: "Dubai Marina",
    slug: "dubai-marina",
    emirate: "Dubai",
    description:
      "A vibrant waterfront district lined with high-rise towers, a bustling promenade, and direct access to the marina.",
    imageUrl: "/images/render-marina.png",
    priceFrom: 1200,
    rentFrom: 90000,
    propertyTypes: "Apartments, Penthouses",
    featured: true,
  },
  {
    name: "Palm Jumeirah",
    slug: "palm-jumeirah",
    emirate: "Dubai",
    description:
      "The iconic man-made island offering beachfront villas, branded residences, and panoramic sea views.",
    imageUrl: "/images/luxury-villa.png",
    priceFrom: 2400,
    rentFrom: 220000,
    propertyTypes: "Villas, Apartments, Penthouses",
    featured: true,
  },
  {
    name: "Downtown Dubai",
    slug: "downtown-dubai",
    emirate: "Dubai",
    description:
      "The cosmopolitan heart of the city, home to the Burj Khalifa, Dubai Mall, and premium high-rise living.",
    imageUrl: "/images/dubai-skyline.png",
    priceFrom: 1800,
    rentFrom: 120000,
    propertyTypes: "Apartments, Penthouses",
    featured: true,
  },
  {
    name: "Saadiyat Island",
    slug: "saadiyat-island",
    emirate: "Abu Dhabi",
    description:
      "Abu Dhabi's cultural district with beachfront villas, museums, and a refined, low-density lifestyle.",
    imageUrl: "/images/render-saadiyat.png",
    priceFrom: 1500,
    rentFrom: 160000,
    propertyTypes: "Villas, Townhouses, Apartments",
    featured: true,
  },
  {
    name: "Yas Island",
    slug: "yas-island",
    emirate: "Abu Dhabi",
    description:
      "A leisure-led destination anchored by world-class attractions, golf, and waterfront residences.",
    imageUrl: "/images/render-yas.png",
    priceFrom: 980,
    rentFrom: 95000,
    propertyTypes: "Apartments, Townhouses",
    featured: true,
  },
  {
    name: "Al Reem Island",
    slug: "al-reem-island",
    emirate: "Abu Dhabi",
    description:
      "A fast-growing freehold island minutes from downtown Abu Dhabi, popular with investors and end-users.",
    imageUrl: "/images/abudhabi-skyline.png",
    priceFrom: 1100,
    rentFrom: 85000,
    propertyTypes: "Apartments, Penthouses",
    featured: false,
  },
  {
    name: "Business Bay",
    slug: "business-bay",
    emirate: "Dubai",
    description:
      "A dynamic central district along the Dubai Water Canal, blending waterfront residences with the city's commercial core.",
    imageUrl: "/images/glass-facade.png",
    priceFrom: 1400,
    rentFrom: 100000,
    propertyTypes: "Apartments, Penthouses",
    featured: false,
  },
  {
    name: "Al Raha Beach",
    slug: "al-raha-beach",
    emirate: "Abu Dhabi",
    description:
      "A waterfront community of canal-side apartments and townhouses with marinas, beaches, and easy access to the airport.",
    imageUrl: "/images/about.png",
    priceFrom: 1050,
    rentFrom: 90000,
    propertyTypes: "Apartments, Townhouses",
    featured: false,
  },
];

async function seedCommunities() {
  const existingRows = await db
    .select({ slug: communitiesTable.slug })
    .from(communitiesTable);
  const existingSlugs = new Set(existingRows.map((r) => r.slug));
  const toInsert = COMMUNITY_SEED.filter((c) => !existingSlugs.has(c.slug));
  if (toInsert.length === 0) {
    console.log("Communities already present, skipping community seed.");
    return;
  }
  await db.insert(communitiesTable).values(toInsert);
  console.log(`Seeded ${toInsert.length} community(ies).`);
}

async function topUpRentalListings() {
  const RENTAL_TOPUP = [
    {
      reference: "YK-1007",
      title: "Downtown Dubai Apartment for Rent",
      description:
        "A bright 2-bedroom apartment in Downtown Dubai with Burj Khalifa views, premium finishes, and walking access to Dubai Mall, available for annual rent.",
      propertyType: "apartment",
      purpose: "rent",
      status: "published",
      price: 210000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1240,
      city: "Dubai",
      community: "Downtown Dubai",
      images: ["/images/dubai-skyline.png", "/images/modern-apartment.png"],
      amenities: ["Swimming Pool", "Gym", "Furnished", "Covered Parking", "Burj Khalifa View"],
      featured: false,
    },
  ];

  const existingRefs = new Set(
    (await db.select({ reference: listingsTable.reference }).from(listingsTable)).map(
      (r) => r.reference,
    ),
  );
  const toInsert = RENTAL_TOPUP.filter((l) => !existingRefs.has(l.reference));
  if (toInsert.length === 0) {
    console.log("Rental top-up listings already present, skipping.");
    return;
  }

  const agents = await db.select().from(agentsTable);
  const byName = new Map(agents.map((a) => [a.name, a.id]));
  const communities = await db.select().from(communitiesTable);
  const communityByName = new Map(communities.map((c) => [c.name, c.id]));
  const james = byName.get("James Mitchell") ?? null;

  await db.insert(listingsTable).values(
    toInsert.map((l) => ({
      ...l,
      communityId: communityByName.get(l.community) ?? null,
      agentId: james,
    })),
  );
  console.log(`Seeded ${toInsert.length} rental top-up listing(s).`);
}

async function backfillListingCommunities() {
  const communities = await db.select().from(communitiesTable);
  const byName = new Map(communities.map((c) => [c.name, c.id]));
  const listings = await db.select().from(listingsTable);
  let updated = 0;
  for (const listing of listings) {
    if (listing.communityId != null) continue;
    if (!listing.community) continue;
    const communityId = byName.get(listing.community);
    if (communityId == null) continue;
    await db
      .update(listingsTable)
      .set({ communityId })
      .where(eq(listingsTable.id, listing.id));
    updated += 1;
  }
  console.log(`Backfilled communityId on ${updated} listing(s).`);
}

async function seedOffPlan() {
  const existing = await db
    .select()
    .from(listingsTable)
    .where(eq(listingsTable.purpose, "offplan"))
    .limit(1);
  if (existing.length > 0) {
    console.log("Off-plan listings already present, skipping off-plan seed.");
    return;
  }

  const agents = await db.select().from(agentsTable);
  const byName = new Map(agents.map((a) => [a.name, a.id]));
  const communities = await db.select().from(communitiesTable);
  const communityByName = new Map(communities.map((c) => [c.name, c.id]));

  const james = byName.get("James Mitchell") ?? null;
  const saeed = byName.get("Saeed Al Mansoori") ?? null;
  const priya = byName.get("Priya Sharma") ?? null;

  await db.insert(listingsTable).values([
    {
      reference: "YK-OP-2001",
      title: "Marina Heights — Off-Plan Residences",
      description:
        "A landmark tower under construction in Dubai Marina offering 1-3 bedroom residences with flexible payment plans and handover in 2026.",
      propertyType: "apartment",
      purpose: "offplan",
      status: "published",
      price: 1200000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      city: "Dubai",
      community: "Dubai Marina",
      communityId: communityByName.get("Dubai Marina") ?? null,
      images: ["/images/render-marina.png", "/images/glass-facade.png"],
      amenities: ["Infinity Pool", "Sky Gym", "Concierge", "Marina View", "Smart Home"],
      featured: true,
      agentId: priya ?? james,
    },
    {
      reference: "YK-OP-2002",
      title: "Saadiyat Lagoons — Off-Plan Villas",
      description:
        "Limited-release waterfront villas on Saadiyat Island with post-handover payment plans, completing in 2027.",
      propertyType: "villa",
      purpose: "offplan",
      status: "published",
      price: 2800000,
      bedrooms: 4,
      bathrooms: 5,
      area: 4200,
      city: "Abu Dhabi",
      community: "Saadiyat Island",
      communityId: communityByName.get("Saadiyat Island") ?? null,
      images: ["/images/render-saadiyat.png", "/images/luxury-villa.png"],
      amenities: ["Private Garden", "Community Beach", "Clubhouse", "Smart Home", "Maid's Room"],
      featured: true,
      agentId: saeed,
    },
    {
      reference: "YK-OP-2003",
      title: "Yas Bay Residences — Off-Plan",
      description:
        "Contemporary waterfront apartments on Yas Island with leisure-led amenities and an attractive launch payment plan.",
      propertyType: "apartment",
      purpose: "offplan",
      status: "published",
      price: 980000,
      bedrooms: 1,
      bathrooms: 2,
      area: 760,
      city: "Abu Dhabi",
      community: "Yas Island",
      communityId: communityByName.get("Yas Island") ?? null,
      images: ["/images/render-yas.png", "/images/property-1.png"],
      amenities: ["Waterfront Promenade", "Pool", "Gym", "Retail", "Covered Parking"],
      featured: false,
      agentId: saeed,
    },
  ]);

  console.log("Seeded off-plan listings.");
}

const AGENT_SEED = [
  {
    name: "James Mitchell",
    email: "james@yourkey.ae",
    phone: "+971 50 669 2770",
    title: "Senior Sales Consultant",
    bio: "Dubai Marina",
    photoUrl: "/images/agent-1.png",
    active: true,
  },
  {
    name: "Saeed Al Mansoori",
    email: "saeed@yourkey.ae",
    phone: "+971 54 451 7999",
    title: "Leasing Manager",
    bio: "Abu Dhabi Luxury Rentals",
    photoUrl: "/images/agent-2.png",
    active: true,
  },
  {
    name: "Priya Sharma",
    email: "priya@yourkey.ae",
    phone: "+971 50 456 7890",
    title: "Investment Advisor",
    bio: "Off-Plan Properties",
    photoUrl: "/images/agent-3.png",
    active: true,
  },
  {
    name: "Fatima Hassan",
    email: "fatima@yourkey.ae",
    phone: "+971 50 112 2334",
    title: "Property Manager",
    bio: "Asset Management",
    photoUrl: "/images/agent-4.png",
    active: true,
  },
  {
    name: "Michael Clarke",
    email: "michael@yourkey.ae",
    phone: "+971 50 223 3445",
    title: "Commercial Specialist",
    bio: "Business Bay & ADGM",
    photoUrl: "/images/agent-1.png",
    active: true,
  },
  {
    name: "Sara Al Futtaim",
    email: "sara@yourkey.ae",
    phone: "+971 50 334 4556",
    title: "Luxury Specialist",
    bio: "Palm Jumeirah",
    photoUrl: "/images/agent-4.png",
    active: true,
  },
  {
    name: "David Chen",
    email: "david@yourkey.ae",
    phone: "+971 50 445 5667",
    title: "Sales Consultant",
    bio: "Downtown Dubai",
    photoUrl: "/images/agent-3.png",
    active: true,
  },
  {
    name: "Omar Zayed",
    email: "omar@yourkey.ae",
    phone: "+971 50 556 6778",
    title: "Operations Director",
    bio: "Company Operations",
    photoUrl: "/images/agent-2.png",
    active: true,
  },
];

// Idempotently insert any missing team agents (matched by name), independent of
// whether listings already exist, so existing environments get topped up too.
async function ensureAgents() {
  const existingNames = new Set(
    (await db.select({ name: agentsTable.name }).from(agentsTable)).map(
      (r) => r.name,
    ),
  );
  const missing = AGENT_SEED.filter((a) => !existingNames.has(a.name));
  if (missing.length > 0) {
    await db.insert(agentsTable).values(missing);
    console.log(`Inserted ${missing.length} missing agent(s).`);
  }
}

async function main() {
  await seedPosts();
  await seedCommunities();
  await ensureAgents();

  const existing = await db.select().from(listingsTable).limit(1);
  if (existing.length > 0) {
    console.log("Listings already present, skipping base listing seed.");
    await backfillListingCommunities();
    await topUpRentalListings();
    await seedOffPlan();
    await seedOffPlanProjects();
    return;
  }

  const agents = await db
    .select()
    .from(agentsTable)
    .orderBy(agentsTable.id);

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

  await backfillListingCommunities();
  await topUpRentalListings();
  await seedOffPlan();
  await seedOffPlanProjects();
}

async function seedOffPlanProjects() {
  const existingRows = await db
    .select({ slug: offPlanProjectsTable.slug })
    .from(offPlanProjectsTable);
  const existingSlugs = new Set(existingRows.map((r) => r.slug));

  const agents = await db.select().from(agentsTable);
  const byName = new Map(agents.map((a) => [a.name, a.id]));
  const priya = byName.get("Priya Sharma") ?? null;
  const saeed = byName.get("Saeed Al Mansoori") ?? null;

  const allProjects = [
    {
      slug: "opula-residences",
      name: "Opula Residences",
      developer: "Aldar",
      emirate: "Abu Dhabi",
      location: "Yas Bay",
      community: "Yas Island",
      tagline: "Waterfront branded living on Yas Island",
      description:
        "Opula Residences is a landmark waterfront development on Yas Island, offering a curated collection of studio to four-bedroom residences with uninterrupted views over Yas Bay. Designed for those who value architectural precision and resort-grade amenities, every home is finished to branded-residence standards.\n\nResidents enjoy direct access to the Yas Bay promenade, an infinity pool overlooking the marina, a fully equipped wellness floor, and round-the-clock concierge. With a flexible launch payment plan and handover scheduled for Q2 2027, Opula represents one of the most compelling off-plan opportunities in Abu Dhabi.",
      heroImage: "/images/render-yas.png",
      logoImage: "/images/yourkey-logo-white.png",
      gallery: [
        "/images/render-yas.png",
        "/images/glass-facade.png",
        "/images/looking-up-towers.png",
        "/images/penthouse.png",
        "/images/modern-apartment.png",
        "/images/property-1.png",
      ],
      amenities: [
        "Infinity Pool",
        "Private Beach Access",
        "Wellness Floor & Spa",
        "State-of-the-art Gym",
        "24/7 Concierge",
        "Waterfront Promenade",
        "Kids' Play Area",
        "Smart Home System",
      ],
      highlights: [
        "Direct Yas Bay waterfront frontage",
        "Branded-residence finishes throughout",
        "5 minutes to Yas Mall and F1 circuit",
        "Flexible 60/40 payment plan",
        "Handover Q2 2027",
      ],
      floorPlans: [
        {
          type: "Studio",
          bedrooms: "Studio",
          size: "430 sqft",
          price: 980000,
          image: "/images/modern-apartment.png",
        },
        {
          type: "1 Bedroom Apartment",
          bedrooms: "1 BR",
          size: "760 sqft",
          price: 1450000,
          image: "/images/property-1.png",
        },
        {
          type: "2 Bedroom Apartment",
          bedrooms: "2 BR",
          size: "1,180 sqft",
          price: 2300000,
          image: "/images/property-2.png",
        },
        {
          type: "3 Bedroom Penthouse",
          bedrooms: "3 BR",
          size: "2,050 sqft",
          price: 4600000,
          image: "/images/penthouse.png",
        },
      ],
      paymentMilestones: [
        { label: "On Booking", percentage: "20%" },
        { label: "During Construction", percentage: "40%" },
        { label: "On Handover", percentage: "30%" },
        { label: "Post Handover", percentage: "10%" },
      ],
      materials: [
        "/images/render-yas.png",
        "/images/glass-facade.png",
        "/images/penthouse.png",
        "/images/luxury-villa.png",
      ],
      locationImage: "/images/abudhabi-skyline.png",
      mapAddress: "Yas Bay, Yas Island, Abu Dhabi",
      agentId: priya ?? saeed,
      startingPrice: 980000,
      handover: "Q2 2027",
      paymentPlan: "60 / 40",
      bedrooms: "Studio - 4 BR",
      unitTypes: "Apartments, Penthouses",
      brochureUrl: "https://www.yourkey.ae",
      seoTitle: "Opula Residences — Off-Plan on Yas Island | Your Key",
      seoDescription:
        "Branded waterfront residences on Yas Island, Abu Dhabi. Studio to 4-bedroom homes from AED 980,000 with a flexible payment plan and Q2 2027 handover.",
      featured: true,
      status: "published",
      publishedAt: new Date(),
    },
    {
      slug: "marina-vista-towers",
      name: "Marina Vista Towers",
      developer: "Emaar",
      emirate: "Dubai",
      location: "Dubai Marina",
      community: "Dubai Marina",
      tagline: "Twin towers rising over the marina",
      description:
        "Marina Vista Towers is a striking twin-tower development in the heart of Dubai Marina, offering one to three-bedroom residences with floor-to-ceiling glazing and panoramic water views. Each home is designed to maximise natural light and frame the marina skyline.\n\nResidents enjoy a sky-deck infinity pool, a podium-level retail promenade, and direct access to the marina walk. With a 70/30 payment plan and handover in Q4 2026, Marina Vista is a prime entry point into Dubai's most iconic waterfront district.",
      heroImage: "/images/render-marina.png",
      logoImage: "/images/yourkey-logo-white.png",
      gallery: [
        "/images/render-marina.png",
        "/images/glass-facade.png",
        "/images/looking-up-towers.png",
        "/images/modern-apartment.png",
      ],
      amenities: [
        "Sky-deck Infinity Pool",
        "Retail Promenade",
        "Marina Walk Access",
        "Fitness Studio",
        "24/7 Concierge",
        "Covered Parking",
      ],
      highlights: [
        "Twin-tower marina landmark",
        "Floor-to-ceiling marina views",
        "70/30 payment plan",
        "Handover Q4 2026",
      ],
      floorPlans: [
        {
          type: "1 Bedroom Apartment",
          bedrooms: "1 BR",
          size: "720 sqft",
          price: 1650000,
          image: "/images/property-1.png",
        },
        {
          type: "2 Bedroom Apartment",
          bedrooms: "2 BR",
          size: "1,150 sqft",
          price: 2750000,
          image: "/images/property-2.png",
        },
        {
          type: "3 Bedroom Apartment",
          bedrooms: "3 BR",
          size: "1,680 sqft",
          price: 4200000,
          image: "/images/modern-apartment.png",
        },
      ],
      paymentMilestones: [
        { label: "On Booking", percentage: "20%" },
        { label: "During Construction", percentage: "50%" },
        { label: "On Handover", percentage: "30%" },
      ],
      materials: [
        "/images/render-marina.png",
        "/images/glass-facade.png",
        "/images/looking-up-towers.png",
      ],
      locationImage: "/images/dubai-skyline.png",
      mapAddress: "Dubai Marina, Dubai",
      agentId: priya ?? saeed,
      startingPrice: 1650000,
      handover: "Q4 2026",
      paymentPlan: "70 / 30",
      bedrooms: "1 - 3 BR",
      unitTypes: "Apartments",
      brochureUrl: "https://www.yourkey.ae",
      seoTitle: "Marina Vista Towers — Off-Plan in Dubai Marina | Your Key",
      seoDescription:
        "Twin-tower waterfront residences in Dubai Marina. One to three-bedroom homes from AED 1,650,000 with a 70/30 payment plan and Q4 2026 handover.",
      featured: true,
      status: "published",
      publishedAt: new Date(),
    },
    {
      slug: "saadiyat-lagoons",
      name: "Saadiyat Lagoons",
      developer: "Aldar",
      emirate: "Abu Dhabi",
      location: "Saadiyat Island",
      community: "Saadiyat Island",
      tagline: "Nature-inspired villas by the lagoon",
      description:
        "Saadiyat Lagoons is a master-planned community of three to six-bedroom villas set among mangroves and natural lagoons on Saadiyat Island. The development blends biophilic design with generous living spaces, private gardens, and direct access to protected coastline.\n\nResidents enjoy cycling trails, a community clubhouse, and proximity to the Saadiyat Cultural District. With a flexible payment plan and handover in Q1 2027, Saadiyat Lagoons offers a rare combination of nature and luxury.",
      heroImage: "/images/render-saadiyat.png",
      logoImage: "/images/yourkey-logo-white.png",
      gallery: [
        "/images/render-saadiyat.png",
        "/images/townhouse.png",
        "/images/luxury-villa.png",
        "/images/property-3.png",
      ],
      amenities: [
        "Natural Lagoons",
        "Cycling & Running Trails",
        "Community Clubhouse",
        "Private Gardens",
        "Protected Coastline Access",
        "Kids' Play Areas",
      ],
      highlights: [
        "Biophilic villa community",
        "Lagoon and mangrove setting",
        "Near Saadiyat Cultural District",
        "Handover Q1 2027",
      ],
      floorPlans: [
        {
          type: "3 Bedroom Villa",
          bedrooms: "3 BR",
          size: "3,400 sqft",
          price: 5400000,
          image: "/images/townhouse.png",
        },
        {
          type: "4 Bedroom Villa",
          bedrooms: "4 BR",
          size: "4,600 sqft",
          price: 7200000,
          image: "/images/luxury-villa.png",
        },
        {
          type: "6 Bedroom Signature Villa",
          bedrooms: "6 BR",
          size: "8,100 sqft",
          price: 14500000,
          image: "/images/property-3.png",
        },
      ],
      paymentMilestones: [
        { label: "On Booking", percentage: "10%" },
        { label: "During Construction", percentage: "50%" },
        { label: "On Handover", percentage: "40%" },
      ],
      materials: [
        "/images/render-saadiyat.png",
        "/images/luxury-villa.png",
        "/images/townhouse.png",
      ],
      locationImage: "/images/abudhabi-skyline.png",
      mapAddress: "Saadiyat Island, Abu Dhabi",
      agentId: saeed ?? priya,
      startingPrice: 5400000,
      handover: "Q1 2027",
      paymentPlan: "60 / 40",
      bedrooms: "3 - 6 BR",
      unitTypes: "Villas",
      brochureUrl: "https://www.yourkey.ae",
      seoTitle: "Saadiyat Lagoons — Off-Plan Villas in Abu Dhabi | Your Key",
      seoDescription:
        "Nature-inspired villas on Saadiyat Island, Abu Dhabi. Three to six-bedroom homes from AED 5,400,000 with a flexible payment plan and Q1 2027 handover.",
      featured: false,
      status: "published",
      publishedAt: new Date(),
    },
  ];

  const toInsert = allProjects.filter((p) => !existingSlugs.has(p.slug));
  if (toInsert.length === 0) {
    console.log("Off-plan projects already present, skipping.");
    return;
  }

  await db.insert(offPlanProjectsTable).values(toInsert);
  console.log(`Seeded ${toInsert.length} off-plan project(s).`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
