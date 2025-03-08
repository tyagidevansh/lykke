"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

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

  return (
    <Card className="overflow-hidden group cursor-pointer">
      <CardContent className="p-0 relative">
        <div className="relative h-[300px] w-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        </div>
        <div className="absolute bottom-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{name}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button
          className="w-full"
          onClick={() => router.push(`/destination/${handle}`)}
        >
          Explore
        </Button>
      </CardFooter>
    </Card>
  );
}
