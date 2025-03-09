"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { Input } from "./ui/input";
import Image from "next/image";
import { Search } from "lucide-react";

interface Banner {
  id: string;
  img: string;
  alt: string;
}

interface BannersResponse {
  banners: Banner[];
}

export default function Banner() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: true 
  });
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
            banners.map((banner, index) => (
              <div
                key={index}
                className="embla__slide flex-[0_0_100%] relative"
              >
                <Image
                  src={banner.img}
                  alt={banner.alt}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
              </div>
            ))
          ) : (
            <div className="embla__slide flex-[0_0_100%] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500" />
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.isArray(banners) && banners.length > 0 ? 
          banners.map((_, index) => (
            <button
              key={index}
              className="w-3 h-3 rounded-full bg-white bg-opacity-50 hover:bg-opacity-100 transition-all duration-300"
              onClick={() => emblaApi?.scrollTo(index)}
            />
          )) : (
            <button className="w-3 h-3 rounded-full bg-white bg-opacity-50" />
          )
        }
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl px-4 z-10">
        <div className="text-center mb-6 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Plan a <span className="text-lime-400 font-extrabold">Hassle-free</span> holiday
          </h1>
          <p className="text-xl text-white drop-shadow-md">
            Explore stunning destinations and create unforgettable memories
          </p>
        </div>

        <div
          onClick={() => router.push("/customize")}
          className="bg-white rounded-full p-2 shadow-xl cursor-pointer border-2 border-lime-400 hover:border-lime-500 transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center">
            <Search className="h-6 w-6 text-slate-500 ml-3" />
            <Input
              type="text"
              placeholder="Search countries, cities"
              className="text-lg border-none focus:outline-none focus:ring-0 pl-2"
              readOnly
            />
          </div>
        </div>

        <div className="flex justify-center mt-12 space-x-8">
          <Feature icon="✓" text="100% Customised Trips" />
          <Feature icon="✓" text="95% Visa Success Rate" />
          <Feature icon="✓" text="24x7 Concierge" />
        </div>
      </div>

      {/* Best Holiday Brand Badge */}
      <div className="absolute top-4 right-4 bg-gradient-to-b from-lime-500 to-green-600 text-white p-3 rounded-lg shadow-lg transform rotate-3 w-40 z-10">
        <div className="text-center">
          <p className="font-bold text-sm">Best</p>
          <p className="font-bold text-lg">Holiday</p>
          <p className="font-bold text-lg">Brand</p>
          <p className="text-sm">in India</p>
          <p className="text-2xl mt-1">🏆</p>
        </div>
      </div>

      <div className="absolute bottom-20 left-8 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 shadow-lg">
        <Image 
          src="/google.png" 
          width={24} 
          height={24} 
          alt="Google Rating" 
          className="rounded-full"
        />
        <span className="font-bold text-gray-800">4.6</span>
        <span className="text-yellow-500">★</span>
        <span className="text-gray-600 text-sm">rated</span>
      </div>
    </div>
  );
}

const Feature = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex items-center space-x-2 text-white">
    <div className="bg-lime-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md">
      <span className="text-white text-sm">{icon}</span>
    </div>
    <span className="font-medium drop-shadow-sm">{text}</span>
  </div>
);
