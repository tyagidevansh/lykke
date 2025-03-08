"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { Input } from "./ui/input";
import Image from "next/image";

interface Banner {
  id: string;
  img: string;
  title: string;
}

interface BannersResponse {
  banners: Banner[];
}

export default function Banner() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const router = useRouter();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          "https://json-data-1wm2.onrender.com/banners"
        );
        const data: BannersResponse = await response.json();
        setBanners(data.banners || []);
      } catch (error) {
        console.error("Error fetching banners:", error);
        setBanners([]);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="relative w-full h-[600px]">
      <div className="embla overflow-hidden h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {Array.isArray(banners) && banners.length > 0 ? (
            banners.map((banner) => (
              <div
                key={banner.id}
                className="embla__slide flex-[0_0_100%] relative"
              >
                <Image
                  src={banner.img}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ))
          ) : (
            <div className="embla__slide flex-[0_0_100%] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500" />
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Your Perfect Adventure
          </h1>
          <p className="text-xl text-white">
            Explore destinations and create unforgettable memories
          </p>
        </div>
        <div
          onClick={() => router.push("/customize")}
          className="bg-white rounded-lg p-4 shadow-lg cursor-pointer"
        >
          <Input
            type="text"
            placeholder="Where would you like to go?"
            className="text-lg"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
