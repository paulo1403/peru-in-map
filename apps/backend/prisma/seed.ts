import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Seeding database...');

  // Crear algunos lugares de ejemplo en Lima, Perú
  const places = [
    // Barranco
    {
      name: 'Café Honradez',
      description: 'Café tradicional en el corazón de Barranco con vista al mar',
      category: 'cafe' as const,
      district: 'Barranco',
      city: 'Lima',
      position: [-12.1444, -77.0217],
      tags: ['tradicional', 'vista al mar', 'desayuno'],
      isSponsored: false,
    },
    {
      name: 'Parque Kennedy',
      description: 'Parque icónico de Barranco, lugar perfecto para pasear y disfrutar del arte urbano',
      category: 'park' as const,
      district: 'Barranco',
      city: 'Lima',
      position: [-12.1440, -77.0219],
      tags: ['parque', 'arte urbano', 'paseo'],
      isSponsored: false,
    },
    // Miraflores
    {
      name: 'Puku Puku',
      description: 'Restaurante de comida nikkei con vista panorámica de Lima',
      category: 'restaurant' as const,
      district: 'Miraflores',
      city: 'Lima',
      position: [-12.1219, -77.0301],
      tags: ['nikkei', 'vista panorámica', 'cena'],
      isSponsored: true,
    },
    {
      name: 'Circus Circus',
      description: 'Bar y restaurante con terraza en el malecón de Miraflores',
      category: 'bar' as const,
      district: 'Miraflores',
      city: 'Lima',
      position: [-12.1217, -77.0298],
      tags: ['terraza', 'malecón', 'cocteles'],
      isSponsored: false,
    },
    // San Isidro
    {
      name: 'Central Restaurante',
      description: 'Restaurante galardonado con estrella Michelin, experiencia gastronómica de alto nivel',
      category: 'restaurant' as const,
      district: 'San Isidro',
      city: 'Lima',
      position: [-12.0975, -77.0353],
      tags: ['fine dining', 'michelin', 'alta cocina', 'experiencia'],
      isSponsored: true,
    },
    {
      name: 'Parque El Olivar',
      description: 'Hermoso parque con olivos centenarios, ideal para caminar y hacer picnic',
      category: 'park' as const,
      district: 'San Isidro',
      city: 'Lima',
      position: [-12.0950, -77.0380],
      tags: ['parque', 'naturaleza', 'olivos', 'paseo familiar'],
      isSponsored: false,
    },
    {
      name: 'Café Tostado',
      description: 'Cafetería specialty con granos de café peruano de alta calidad',
      category: 'cafe' as const,
      district: 'San Isidro',
      city: 'Lima',
      position: [-12.0965, -77.0365],
      tags: ['specialty coffee', 'café peruano', 'coworking'],
      isSponsored: false,
    },
    {
      name: 'Maido',
      description: 'Mejor restaurante de comida nikkei en Latinoamérica, fusión peruano-japonesa',
      category: 'restaurant' as const,
      district: 'San Isidro',
      city: 'Lima',
      position: [-12.0982, -77.0348],
      tags: ['nikkei', 'top restaurant', 'fusión', 'omakase'],
      isSponsored: true,
    },
    {
      name: 'Dédalo Arte & Artesanía',
      description: 'Galería de arte y tienda de artesanías con café en un ambiente bohemio',
      category: 'cafe' as const,
      district: 'San Isidro',
      city: 'Lima',
      position: [-12.0958, -77.0372],
      tags: ['arte', 'artesanía', 'bohemio', 'cultura'],
      isSponsored: false,
    },
    {
      name: 'Huaca Huallamarca',
      description: 'Sitio arqueológico precolombino en medio de la ciudad moderna',
      category: 'museum' as const,
      district: 'San Isidro',
      city: 'Lima',
      position: [-12.0932, -77.0385],
      tags: ['arqueología', 'historia', 'cultura', 'prehispánico'],
      isSponsored: false,
    },
    {
      name: 'Isolina Taberna',
      description: 'Restaurante de comida criolla tradicional con ambiente acogedor',
      category: 'restaurant' as const,
      district: 'San Isidro',
      city: 'Lima',
      position: [-12.0968, -77.0358],
      tags: ['comida criolla', 'tradicional', 'almuerzo', 'familiar'],
      isSponsored: false,
    },
    {
      name: 'Golf Los Inkas',
      description: 'Club de golf exclusivo con canchas profesionales y restaurante',
      category: 'sports' as const,
      district: 'San Isidro',
      city: 'Lima',
      position: [-12.0925, -77.0395],
      tags: ['golf', 'deporte', 'club', 'exclusivo'],
      isSponsored: false,
    },
  ];

  for (const place of places) {
    await prisma.place.create({
      data: place,
    });
  }

  // Crear algunas reseñas de ejemplo
  const reviews = [
    {
      placeId: (await prisma.place.findFirst({ where: { name: 'Café Honradez' } }))!.id,
      rating: 5,
      comment: 'Excelente café con una vista increíble. El servicio es amable y la comida deliciosa.',
    },
    {
      placeId: (await prisma.place.findFirst({ where: { name: 'Café Honradez' } }))!.id,
      rating: 4,
      comment: 'Muy buen lugar para desayunar. Los precios son razonables.',
    },
    {
      placeId: (await prisma.place.findFirst({ where: { name: 'Parque Kennedy' } }))!.id,
      rating: 5,
      comment: 'Uno de mis lugares favoritos en Lima. Siempre hay algo nuevo que ver.',
    },
  ];

  for (const review of reviews) {
    await prisma.review.create({
      data: review,
    });
  }

  console.log('✅ Database seeded successfully!');
}

seed()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });