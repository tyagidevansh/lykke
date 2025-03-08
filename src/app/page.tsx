import Banner from "@/components/Banner";
import DestinationCard from "@/components/DestinationCard";

interface Destination {
  id: string;
  img: string;
  name: string;
  description: string;
  handle: string;
}

interface DestinationsResponse {
  destination: Destination[];
}

async function getFeaturedDestinations() {
  const res = await fetch(
    "https://json-data-1wm2.onrender.com/featured-destination",
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch destinations");
  }

  const data: DestinationsResponse = await res.json();
  return data.destination || [];
}

export default async function Home() {
  const destinations = await getFeaturedDestinations();

  return (
    <main className="min-h-screen">
      <Banner />

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations?.length > 0 ? (
            destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                handle={destination.handle}
                name={destination.name}
                image={destination.img}
                description={destination.description}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No destinations available at the moment.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
