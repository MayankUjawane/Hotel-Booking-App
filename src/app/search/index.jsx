import React from 'react';
import SortFilter from './filter/components/sort-filter';
import Hotels from './hotels';
import PaginationFilter from './filter/components/pagination-filter';
import Filter from './filter';
import useGetHotels from './hotels/hooks/use-get-hotels';
import { SEARCH_RESULT_PAGE_LIMIT } from '@/config/app.config';

function SearchPage() {
  const { data, isLoading, error, city } = useGetHotels();

  const hotels = data?.content || [];
  const hotelCounts = data?.totalElements;

  return (
    <div className="container flex gap-4 mt-6 mb-12">
      <Filter />
      <section className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">
            {city}: {hotelCounts} properties found
          </h1>
          <SortFilter />
        </div>
        <Hotels error={error} isLoading={isLoading} data={hotels} />
        <PaginationFilter
          totalEntries={hotelCounts}
          limit={SEARCH_RESULT_PAGE_LIMIT}
        />
      </section>
    </div>
  );
}

export default SearchPage;
