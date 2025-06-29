import dayjs from 'dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchFormSchema } from '@/lib/validators/search-form-validator';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router';
import { SEARCH_PARAMS_KEYS } from '@/config/app.config';

export default function useSearchForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const form = useForm({
    defaultValues: {
      city: searchParams.get(SEARCH_PARAMS_KEYS.LOCATION) || '',
      roomsCount: parseInt(searchParams.get(SEARCH_PARAMS_KEYS.ROOMS)) || 1,
      bookingDates: {
        from:
          new Date(searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN)) ||
          dayjs().toDate(),
        to:
          new Date(searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT)) ||
          dayjs().add(1, 'day').toDate(),
      },
    },
    resolver: zodResolver(searchFormSchema),
  });

  function searchSubmitHandler(data) {
    const sendData = {
      city: data.city,
      roomsCount: data.roomsCount,
      startDate: dayjs(data.bookingDates.from).format('YYYY-MM-DD'),
      endDate: dayjs(data.bookingDates.to).format('YYYY-MM-DD'),
    };
    console.log('Search data', sendData);
    const params = new URLSearchParams(sendData);
    navigate(`/search?${params.toString()}`);
  }

  return { form, searchSubmitHandler };
}
