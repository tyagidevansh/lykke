"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Search, 
  Calendar, 
  Users, 
  Bed, 
  ChevronRight, 
  CheckCircle, 
  X
} from "lucide-react";

const destinations = [
  { name: "Maldives", tag: "HONEYMOON" },
  { name: "Europe", tag: "TRENDING" },
  { name: "Singapore", tag: "POPULAR" },
  { name: "Bali", tag: "IN SEASON" },
  { name: "Thailand", tag: "BUDGET" },
  { name: "Abu Dhabi", tag: "POPULAR" },
  { name: "Dubai", tag: "" },
  { name: "Japan", tag: "" },
  { name: "Australia", tag: "" },
  { name: "France", tag: "" },
  { name: "Italy", tag: "" },
  { name: "Spain", tag: "" },
  { name: "Greece", tag: "" },
  { name: "Switzerland", tag: "" }
];

const durationOptions = [
  { range: "3-5 Days", image: "/moon-crescent.png", recommended: true },
  { range: "6-8 Days", image: "/moon-quarter.png", recommended: false },
  { range: "9-11 Days", image: "/moon-gibbous.png", recommended: false },
  { range: "12-15 Days", image: "/moon-full.png", recommended: false }
];

const travelerTypes = [
  { id: "couple", label: "Couple", emoji: "❤️" },
  { id: "family", label: "Family", emoji: "👨‍👩‍👧" },
  { id: "friends", label: "Friends", emoji: "🎉" },
  { id: "solo", label: "Solo", emoji: "🎒" }
];

const DestinationSearch = ({ 
  onSelect, 
  searchQuery, 
  setSearchQuery 
}: { 
  onSelect: (destination: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) => {

  const filteredDestinations = destinations.filter(destination => 
    destination.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-6">What's <span className="text-green-500 italic">your pick</span> for your next vacation?</h1>
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
          placeholder="Pick your destination"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {filteredDestinations.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.name}
              className="p-4 border-b hover:bg-gray-50 cursor-pointer transition flex items-center justify-between"
              onClick={() => onSelect(destination.name)}
            >
              <div className="flex items-center">
                <span className="text-gray-800">{destination.name}</span>
                {destination.tag && (
                  <span className={`ml-2 text-xs py-0.5 px-2 rounded ${getTagColor(destination.tag)}`}>
                    {destination.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const getTagColor = (tag: string) => {
  switch(tag) {
    case "HONEYMOON":
      return "bg-pink-100 text-pink-600";
    case "TRENDING":
      return "bg-green-100 text-green-600";
    case "POPULAR":
      return "bg-red-100 text-red-600";
    case "IN SEASON":
      return "bg-blue-100 text-blue-600";
    case "BUDGET":
      return "bg-yellow-100 text-yellow-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const DurationSelector = ({ onSelect }: { onSelect: (days: string) => void }) => {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-6">What's the duration of your holiday?</h1>
      <div className="grid grid-cols-2 gap-4">
        {durationOptions.map((option) => (
          <div
            key={option.range}
            className="cursor-pointer"
            onClick={() => onSelect(option.range)}
          >
            <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <div className="w-full h-full rounded-full bg-gradient-to-b from-indigo-100 to-pink-100 flex items-center justify-center">

                  <div className="w-16 h-16 bg-yellow-300 rounded-full relative overflow-hidden">
                    {option.range === "3-5 Days" && <div className="absolute top-0 right-0 w-12 h-16 bg-gray-800"></div>}
                    {option.range === "6-8 Days" && <div className="absolute top-0 right-0 w-8 h-16 bg-gray-800"></div>}
                    {option.range === "9-11 Days" && <div className="absolute top-0 right-0 w-4 h-16 bg-gray-800"></div>}
                  </div>

                  <div className="absolute top-3 left-3 w-1 h-1 bg-yellow-200 rounded-full"></div>
                  <div className="absolute top-6 right-5 w-1 h-1 bg-yellow-200 rounded-full"></div>
                  <div className="absolute bottom-3 left-8 w-1 h-1 bg-yellow-200 rounded-full"></div>
                </div>
              </div>
              {option.recommended && (
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  OUR PICK
                </div>
              )}
              <span className="text-lg font-medium">{option.range}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TravellerTypeSelector = ({ onSelect }: { onSelect: (type: string) => void }) => {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-6">Who is travelling with you?</h1>
      <div className="grid grid-cols-2 gap-4">
        {travelerTypes.map((option) => (
          <div
            key={option.id}
            className="cursor-pointer"
            onClick={() => onSelect(option.id)}
          >
            <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-b from-indigo-100 to-pink-100 flex items-center justify-center mb-4">
                <span className="text-4xl">{option.emoji}</span>
              </div>
              <span className="text-lg font-medium">{option.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RoomConfigSelector = ({ onSelect }: { onSelect: (config: any) => void }) => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  
  const incrementCount = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
    setter(prevCount => prevCount + 1);
  };
  
  const decrementCount = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
    setter(prevCount => Math.max(prevCount - 1, value === rooms ? 1 : 0));
  };
  
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-6">Configure your rooms</h1>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Bed className="h-6 w-6 text-blue-500 mr-3" />
            <span className="text-lg">Rooms</span>
          </div>
          <div className="flex items-center">
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
              onClick={() => decrementCount(setRooms, rooms)}
              disabled={rooms <= 1}
            >
              -
            </button>
            <span className="mx-3 text-lg w-5 text-center">{rooms}</span>
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
              onClick={() => incrementCount(setRooms, rooms)}
            >
              +
            </button>
          </div>
        </div>
        
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-6 w-6 text-blue-500 mr-3" />
            <span className="text-lg">Adults</span>
          </div>
          <div className="flex items-center">
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
              onClick={() => decrementCount(setAdults, adults)}
              disabled={adults <= 1}
            >
              -
            </button>
            <span className="mx-3 text-lg w-5 text-center">{adults}</span>
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
              onClick={() => incrementCount(setAdults, adults)}
            >
              +
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-6 w-6 text-blue-500 mr-3" />
            <span className="text-lg">Children</span>
          </div>
          <div className="flex items-center">
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
              onClick={() => decrementCount(setChildren, children)}
            >
              -
            </button>
            <span className="mx-3 text-lg w-5 text-center">{children}</span>
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
              onClick={() => incrementCount(setChildren, children)}
            >
              +
            </button>
          </div>
        </div>
        
        <button
          className="mt-6 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
          onClick={() => onSelect({ adults, children, rooms })}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

const Confirmation = ({ itinerary }: { itinerary: any }) => {
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="flex justify-center mb-4">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Congratulations!</h1>
      <p className="text-lg mb-6">Your {itinerary.days}-day trip to {itinerary.destination} has been planned.</p>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 text-left">
        <h2 className="text-xl font-semibold mb-4">Trip Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Destination</span>
            <span className="font-medium">{itinerary.destination}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium">{itinerary.days}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Travelers</span>
            <span className="font-medium">
              {itinerary.roomConfig.adults} Adult{itinerary.roomConfig.adults > 1 ? 's' : ''}
              {itinerary.roomConfig.children > 0 ? `, ${itinerary.roomConfig.children} Child${itinerary.roomConfig.children > 1 ? 'ren' : ''}` : ''}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Rooms</span>
            <span className="font-medium">{itinerary.roomConfig.rooms}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Trip Type</span>
            <span className="font-medium">
              {itinerary.travellerType === 'solo' ? 'Solo Trip' : 
               itinerary.travellerType === 'couple' ? 'Couple Trip' :
               itinerary.travellerType === 'family' ? 'Family Trip' : 'Friends Trip'}
            </span>
          </div>
        </div>
      </div>
      
      <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium">
        View Detailed Itinerary
      </button>
    </div>
  );
};

export default function ItineraryPage() {

  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [itinerary, setItinerary] = useState({
    destination: '',
    days: '',
    travellerType: '',
    roomConfig: { adults: 2, children: 0, rooms: 1 }
  });
  

  const handleSelectDestination = (destination: string) => {
    setItinerary({ ...itinerary, destination });
    setCurrentStep(2);
  };
  
  const handleSelectDuration = (days: string) => {
    setItinerary({ ...itinerary, days });
    setCurrentStep(3);
  };
  
  const handleSelectTravellerType = (travellerType: string) => {
    setItinerary({ ...itinerary, travellerType });
    setCurrentStep(4);
  };
  
  const handleSelectRoomConfig = (roomConfig: any) => {
    setItinerary({ ...itinerary, roomConfig });
    setCurrentStep(5);
  };

  const handleClose = () => {
    setCurrentStep(1);
    setSearchQuery('');
    setItinerary({
      destination: '',
      days: '',
      travellerType: '',
      roomConfig: { adults: 2, children: 0, rooms: 1 }
    });
  };
  
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 relative">
      <div className="absolute inset-0 bg-cover bg-no-repeat opacity-30" style={{ backgroundImage: "url('/map.jpg')" }}></div>
      <div className="relative z-10"></div>
      <div className="max-w-md mx-auto relative">
        <button 
          onClick={handleClose}
          className="absolute right-0 top-5 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        {currentStep > 1 && (
          <div className="mb-6">
            <p className="text-gray-500 mb-2">NOW PLANNING YOUR HOLIDAY TO</p>
            <div className="flex flex-wrap gap-2">
              {itinerary.destination && (
                <div className="rounded-full px-4 py-2 bg-white border border-gray-200 text-gray-800">
                  {itinerary.destination}
                </div>
              )}
              {itinerary.days && (
                <div className="rounded-full px-4 py-2 bg-white border border-gray-200 text-gray-800">
                  {itinerary.days}
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep < 5 && (
          <div className="mb-8 mt-6">
            <div className="flex mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className={`h-1 flex-1 mx-0.5 rounded ${step <= currentStep ? 'bg-yellow-400' : 'bg-gray-200'}`}
                ></div>
              ))}
            </div>
          </div>
        )}

        <div className="py-6">
          {currentStep === 1 && (
            <DestinationSearch 
              onSelect={handleSelectDestination} 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}
          
          {currentStep === 2 && (
            <DurationSelector onSelect={handleSelectDuration} />
          )}
          
          {currentStep === 3 && (
            <TravellerTypeSelector onSelect={handleSelectTravellerType} />
          )}
          
          {currentStep === 4 && (
            <RoomConfigSelector onSelect={handleSelectRoomConfig} />
          )}
          
          {currentStep === 5 && (
            <Confirmation itinerary={itinerary} />
          )}
        </div>

        {currentStep > 1 && currentStep < 5 && (
          <div className="max-w-md mx-auto mt-8 flex justify-between">
            <button
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Back
            </button>
            
            {(Object.keys(itinerary) as (keyof typeof itinerary)[])[currentStep - 2] && (
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Continue
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}