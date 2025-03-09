"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface DestinationCardProps {
  handle: string;
  name: string;
  image: string;
  description: string;
}

export default function DestinationCard({
  handle,
  name,
  image,
  description,
}: DestinationCardProps) {
  const router = useRouter();

  const getTagline = (name: string) => {
    const taglines: {[key: string]: string} = {
      "Turkey": "CREATE MEMORIES IN",
      "Singapore": "THE LION CITY",
      "Dubai": "THE CITY OF LIFE",
      "Egypt": "OLD WORLD CHARM",
      "Kenya": "THE LAND OF MAASAI"
    };
    
    return taglines[name] || "EXPLORE";
  };
  
  return (
    <div 
      className="min-w-[280px] flex-shrink-0 snap-start cursor-pointer"
      onClick={() => router.push(`/destination/${handle}`)}
    >
      <div className="relative h-[200px] rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="280px"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <p className="text-xs uppercase font-medium tracking-wider mb-1">{getTagline(name)}</p>
          <h3 className="text-3xl font-bold">{name}</h3>
        </div>
      </div>
    </div>
  );
}