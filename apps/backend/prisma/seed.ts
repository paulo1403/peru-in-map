import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Seeding database...');

  // Crear algunos lugares de ejemplo en Lima, Perú
  const places = [
    {
      name: 'Café Honradez',
      description: 'Café tradicional en el corazón de Barranco con vista al mar',
      category: 'cafe' as const,
      district: 'Barranco',
      city: 'Lima',
      position: [-12.1444, -77.0217], // Barranco coordinates
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