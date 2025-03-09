'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Clock, MapPin, Star, CheckCircle, ChevronRight, Tag, Calendar, Users } from 'lucide-react';

type Trip = {
  'trip-name': string;
  price: number;
  duration: string;
  amenities: string[];
};

type DestinationData = {
  trips: Trip[];
};

const destinationImages: Record<string, string> = {
  'egypt': 'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004325/egypt_scwdiy.jpg',
  'turkey': 'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004393/turkey_urabbl.jpg',
  'south-africa': 'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004461/south-africa_ifpult.jpg',
  'kenya': 'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004527/kenya_eaeull.jpg',
  'bhutan': 'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004579/bhutan_qw3z0m.jpg',
  'default': 'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004325/egypt_scwdiy.jpg',
};

const tripCategories = ['Adventure', 'Cultural', 'Luxury', 'Budget', 'Family'];

const destinationDescriptions: Record<string, string> = {
  'egypt': 'Explore ancient pyramids, the mighty Nile, and 7,000 years of fascinating history.',
  'turkey': 'Where East meets West – a mesmerizing blend of cultures, stunning coastlines, and mouthwatering cuisine.',
  'south-africa': 'Experience breathtaking safaris, vibrant cities, and the dramatic beauty of Table Mountain.',
  'kenya': 'Witness the Great Migration, encounter the Big Five, and immerse yourself in authentic Maasai culture.',
  'bhutan': 'Discover the Land of the Thunder Dragon with ancient monasteries and pristine Himalayan landscapes.',
};

const bestTimeToVisit: Record<string, string> = {
  'egypt': 'Oct - Apr',
  'turkey': 'Apr - Oct',
  'south-africa': 'May - Oct',
  'kenya': 'Jun - Oct',
  'bhutan': 'Mar - May, Sep - Nov',
};

const tripImageMapping: Record<string, string[]> = {
  'egypt': [
    'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004325/egypt_scwdiy.jpg',
    'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004325/egypt_scwdiy.jpg'
  ],
  'turkey': [
    'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004393/turkey_urabbl.jpg',
    'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004393/turkey_urabbl.jpg'
  ],
  'south-africa': [
    'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004461/south-africa_ifpult.jpg',
    'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004461/south-africa_ifpult.jpg'
  ],
  'kenya': [
    'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004527/kenya_eaeull.jpg',
    'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004527/kenya_eaeull.jpg'
  ],
  'bhutan': [
    'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004579/bhutan_qw3z0m.jpg',
    'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004579/bhutan_qw3z0m.jpg'
  ]
};

export default function DestinationPage() {
  const params = useParams();
  const handle = params.handle as string;
  
  const [destinationData, setDestinationData] = useState<DestinationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedAmenities, setExpandedAmenities] = useState<number | null>(null);

  useEffect(() => {
    if (!handle) return;

    const fetchDestinationData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://json-data-1wm2.onrender.com/destination/${handle}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch destination data for ${handle}`);
        }
        
        const data = await response.json();
        setDestinationData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationData();
  }, [handle]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const capitalizeDestination = (dest: string | undefined) => {
    if (!dest) return '';

    if (dest.includes('-')) {
      return dest.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
    
    return dest.charAt(0).toUpperCase() + dest.slice(1);
  };

  const getRandomCategory = () => {
    return tripCategories[Math.floor(Math.random() * tripCategories.length)];
  };

  const getRandomRating = () => {
    return (4 + Math.random()).toFixed(1);
  };

  const getBgImage = () => {
    return destinationImages[handle] || destinationImages.default;
  };

  const getDestinationDescription = () => {
    return destinationDescriptions[handle] || 'Explore this amazing destination with our carefully curated trips.';
  };

  const getBestTimeToVisit = () => {
    return bestTimeToVisit[handle] || 'Year-round';
  };

  const getTripImage = (index: number) => {
    if (!handle || !tripImageMapping[handle]) return destinationImages.default;
    
    const images = tripImageMapping[handle];
    return images[index % images.length];
  };

  const toggleAmenities = (index: number) => {
    if (expandedAmenities === index) {
      setExpandedAmenities(null);
    } else {
      setExpandedAmenities(index);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div 
        className="relative h-screen max-h-[600px] bg-cover bg-center flex items-center overflow-hidden" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url(${getBgImage()})`
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-400 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-purple-400 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 z-10 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <MapPin size={16} className="mr-1" />
            <span className="font-medium">Discover {capitalizeDestination(handle)}</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Explore {capitalizeDestination(handle)}
            </span>
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto font-light leading-relaxed">
            {getDestinationDescription()}
          </p>
          
          <div className="mt-10">
            <a href="#trips" className="inline-block">
              <div className="animate-bounce bg-white p-2 w-10 h-10 ring-1 ring-white/20 shadow-lg rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <div className="relative -mt-20 z-20">
        <div className="container mx-auto px-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-2 md:p-0">
            <div className="flex flex-wrap justify-between">
              <div className="w-1/2 md:w-1/4 p-4 md:p-6 border-r border-b md:border-b-0 border-gray-200/50">
                <div className="flex flex-col md:flex-row md:items-center">
                  <Calendar className="text-blue-600 mb-2 md:mb-0 md:mr-4" size={24} />
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Best Time</p>
                    <p className="font-semibold text-gray-800">{getBestTimeToVisit()}</p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 md:w-1/4 p-4 md:p-6 border-b md:border-r md:border-b-0 border-gray-200/50">
                <div className="flex flex-col md:flex-row md:items-center">
                  <Clock className="text-blue-600 mb-2 md:mb-0 md:mr-4" size={24} />
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Duration</p>
                    <p className="font-semibold text-gray-800">7-10 Days</p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 md:w-1/4 p-4 md:p-6 border-r border-gray-200/50">
                <div className="flex flex-col md:flex-row md:items-center">
                  <Users className="text-blue-600 mb-2 md:mb-0 md:mr-4" size={24} />
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Rating</p>
                    <div className="flex items-center">
                      <p className="font-semibold text-gray-800 mr-2">4.8</p>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={14} className="text-yellow-400" fill="#FACC15" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 md:w-1/4 p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center">
                  <Tag className="text-blue-600 mb-2 md:mb-0 md:mr-4" size={24} />
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">From</p>
                    <p className="font-semibold text-green-600">$1,299</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div id="trips" className="container mx-auto px-6 py-16">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 inline-block">
            Unforgettable Journeys
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto md:mx-0 mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto md:mx-0">
            Discover our handcrafted trips to {capitalizeDestination(handle)} designed to create lasting memories
          </p>
        </div>
        
        {loading ? (
          <div className="flex flex-col justify-center items-center py-32">
            <div className="relative w-24 h-24">
              <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute top-2 left-2 right-2 bottom-2 border-4 border-indigo-200 border-b-indigo-600 rounded-full animate-spin animate-reverse"></div>
            </div>
            <p className="text-gray-500 mt-6 font-medium">Crafting your perfect journey...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-2xl shadow-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-red-800">Oops! Adventure Interrupted</h3>
                <p className="mt-2 text-red-700">{error}</p>
                <p className="mt-4 text-gray-700">Please try a different destination or check back later for more adventures.</p>
              </div>
            </div>
          </div>
        ) : destinationData && destinationData.trips.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {destinationData.trips.map((trip, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100 hover:border-blue-200"
              >
                <div className="relative h-60 overflow-hidden">
                  <div className="absolute inset-0 transform group-hover:scale-110 transition-transform duration-700">
                    <img 
                      src={getTripImage(index)} 
                      alt={trip["trip-name"]} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg transform transition-transform group-hover:scale-105">
                      {getRandomCategory()}
                    </span>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center bg-yellow-400 px-3 py-1 rounded-full shadow-lg">
                      <Star size={14} className="mr-1" fill="white" color="white" />
                      <span className="text-sm font-medium text-white">{getRandomRating()}</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-full shadow-lg">
                      <span className="text-lg font-bold text-white">{formatPrice(trip.price)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {trip["trip-name"]}
                  </h3>
                  <p className="text-gray-500 text-sm italic mb-4">per person</p>
                  
                  <div className="flex items-center mb-6">
                    <div className="flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600">
                      <Clock size={16} className="mr-2" />
                      <span className="font-medium">{trip.duration}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
                    <p className="font-semibold text-gray-800 mb-4">Trip Highlights:</p>
                    <div className={`space-y-3 ${expandedAmenities === index ? 'h-auto' : 'h-auto'}`}>
                      {(expandedAmenities === index ? trip.amenities : trip.amenities.slice(0, 3)).map((amenity, idx) => (
                        <div key={idx} className="flex items-start group/item">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover/item:bg-green-200 transition-colors">
                            <CheckCircle size={12} className="text-green-600" />
                          </div>
                          <span className="text-gray-700 text-sm">{amenity}</span>
                        </div>
                      ))}
                      
                      {trip.amenities.length > 3 && (
                        <button 
                          onClick={() => toggleAmenities(index)}
                          className="text-blue-600 text-sm hover:text-blue-800 mt-2 flex items-center font-medium focus:outline-none"
                        >
                          {expandedAmenities === index ? 'Show less' : `+ ${trip.amenities.length - 3} more highlights`}
                          <ChevronRight size={14} className={`ml-1 transition-transform ${expandedAmenities === index ? 'rotate-90' : ''}`} />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium transform hover:-translate-y-1 shadow-md hover:shadow-xl">
                      Explore This Trip
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center border-2 border-gray-200 hover:border-pink-300 rounded-xl transition-colors duration-300 hover:bg-pink-50 group/heart">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-400 group-hover/heart:text-pink-500 transition-colors">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/50">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 border-8 border-gray-200 rounded-full"></div>
              <div className="absolute inset-4 border-4 border-dashed border-gray-300 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin size={24} className="text-gray-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-3 text-gray-800">Journey Awaits</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              We&apos;re still crafting amazing experiences for {capitalizeDestination(handle)}. Check back soon or explore our other captivating destinations.
            </p>
            <Link href="/destinations">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Discover Other Adventures
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-white/30 blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-white/20 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">Travel Inspiration Awaits</h3>
              <p className="text-blue-100 text-lg mb-0">Get exclusive deals and destination guides delivered to your inbox.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-1 rounded-full shadow-2xl">
              <div className="flex flex-col sm:flex-row">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-6 py-4 rounded-full bg-white/90 border-0 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="mt-2 sm:mt-0 sm:ml-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Subscribe Now
                </button>
              </div>
            </div>
            
            <p className="text-center text-blue-200 text-sm mt-4">
              Join 25,000+ travelers who get inspired every week. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-0 right-0 z-50 px-4">
        <div className="max-w-lg mx-auto">
          <Link href="/get-in-touch">
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 backdrop-blur-md">
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-lg">Plan Your Custom Adventure</span>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}