import React from 'react'
import HotelCardSkeleton from './components/hotel-card-skeleton';

function Hotels({isLoading, data, error}) {
  if(isLoading) return (
    <div className="space-y-4">
      <HotelCardSkeleton />
      <HotelCardSkeleton />
    </div>
  );

  return (
    <div className="space-y-4">
      {data.map((hotel) => (
        <HotelCard key={hotel.id} {...hotel} />
      ))}
    </div>
  );
}

export default Hotels