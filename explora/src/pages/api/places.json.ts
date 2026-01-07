import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const allPlaces = await getCollection('places');

  const places = allPlaces.map((place) => ({
    id: place.slug,
    name: place.data.name,
    description: place.data.description,
    category: place.data.category,
    position: [place.data.location.latitude, place.data.location.longitude],
    city: place.data.city,
  }));

  return new Response(JSON.stringify(places), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
