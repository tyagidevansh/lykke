import Banner from "@/components/Banner";
import DestinationCard from "@/components/DestinationCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Destination {
  id: string;
  img: string;
  title: string;
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
      next: { revalidate: 3600 }, 
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">POPULAR DESTINATIONS</h2>
          <div className="flex gap-2">
            <button 
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div 
          id="destinations-scroll"
          className="flex gap-5 overflow-x-auto pb-4 snap-x hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {destinations?.length > 0 ? (
            destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                handle={destination.handle}
                name={destination.title}
                image={destination.img}
                description={destination.description}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No destinations available at the moment.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}