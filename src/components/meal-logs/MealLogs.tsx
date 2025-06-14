import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import Image from 'next/image';
import moment from 'moment';

const formatNotificationTime = (createdAt: string) => {
  const now = moment();
  const createdMoment = moment(createdAt);
  
  if (now.isSame(createdMoment, "day")) {
    return createdMoment.format("[Today at] h:mm A"); // Today at 8:14 AM
  }
  if (now.diff(createdMoment, "days") === 1) {
    return createdMoment.format("[Yesterday at] h:mm A"); // Yesterday at 8:14 AM
  }
  if (now.diff(createdMoment, "days") < 7) {
    return createdMoment.format("[Last] dddd [at] h:mm A"); // Last Thursday at 8:14 AM
  }
  if (now.year() === createdMoment.year()) {
    return createdMoment.format("DD MMM [at] h:mm A"); // 04 Dec at 8:14 AM
  }
  return createdMoment.format("DD MMM, YYYY [at] h:mm A"); // 04 Dec, 2024 at 8:14 AM
};

type MealLog = {
  id: string;
  userId: string;
  fromDate: string;
  toDate: string;
  expireAt: string;
  image: string;
  hashId: string;
  mealType: string;
  location: string;
  createdAt: string;
  homeCooked?: boolean;
  note?: string;
};

const MealLogs = () => {
  const router = useRouter();
  const { token } = router.query;
  const [mealLogs, setMealLogs] = useState<{ [key: number]: MealLog[] }>({});
  const [mealLogFilter, setMealLogFilter] = useState({ fromDate: "", toDate: "" });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Infinite Scroll Observer
  const { ref, inView } = useInView({
    threshold: 0.1,
    initialInView: false,
  });

  // Fetch Meal Logs for a specific page
  const fetchMealLogs = async (pageNumber: number) => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch(`https://aaloobackend.codepipe.xyz/v1/api/meallogs/histories?page=${pageNumber}&token=${token}`);
      const data = await response.json();
      if (data.data.mealLogs.length > 0) {
        setMealLogs((prev) => ({ ...prev, [pageNumber]: data.data.mealLogs }));
        setMealLogFilter(data.data.mealLogFilter);
        setPage(pageNumber + 1); // Move to the next page
      } else {
        setHasMore(false); // Stop fetching if no more data
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 500); // Smooth loading effect
    }
  };

  // Fetch page 1 on mount
  useEffect(() => {
    if(router.isReady){
      fetchMealLogs(1);
    }
  }, [router]);

  // Fetch next page when scrolled
  useEffect(() => {
    if (inView && router.isReady) {
      fetchMealLogs(page);
    }
  }, [inView, router]);

  return (
    <div className="p-4 py-14 m-auto w-96">
      <h1 className="text-base mb-5 text-center font-normal">Log of FoodPrints</h1>
      {Object.keys(mealLogs).length > 0 && (
      <div>
        <div className='flex items-center justify-center gap-2 py-6'>
          <Image src={"/images/icons/calendar-month-icon.svg"} alt="Calendar Icon" className="w-6 h-6" width={50} height={50} />
          <span className='text-[#5C5C5C]'>{moment(mealLogFilter?.fromDate).format("D MMM YYYY")}</span>
          <span><Image src={"/images/icons/date-line.png"} alt="Date Line Icon" className="w-5 h-2" width={50} height={50} /></span>
          <span className='text-[#5C5C5C]'>{moment(mealLogFilter?.toDate).format("D MMM YYYY")}</span>
        </div>
      </div>
      )}
      <div className="grid grid-cols-1">
        {Object.keys(mealLogs).length > 0 ? (
          Object.entries(mealLogs).map(([pageNum, logs]) => (
            <div key={pageNum}>
              {logs.map((data, index) => (
                <div key={data.id || index} className="bg-white shadow-2xl rounded-lg hover:shadow transition duration-500 p-4 mb-5">
                  <div className="flex justify-between items-start pb-4">
                    <div className="flex items-center gap-2">
                      <Image src={`/images/icons/${data.mealType.toLowerCase()}-icon.svg`} alt={`${data.mealType} Icon`} className="w-10 h-10 object-cover" width={50} height={50} />
                      <div>
                        <h2 className="text-[#D12149] text-xl font-bold">{data.mealType}</h2>
                        <p className="text-[#8F8F8F] text-xs">{formatNotificationTime(data.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-[#CD7E00] text-xs flex items-center gap-1">
                      <Image src={`/images/icons/${data.location.toLowerCase()}-icon.svg`} alt={`${data.location} Icon`} className="w-6 h-6 object-cover" width={32} height={32} />
                      {data.location}
                    </div>
                  </div>
                  <div className="relative">
                    {data.homeCooked && (
                      <Image src="/images/icons/home-cooked-icon.svg" alt="Home Cooked" className="absolute top-1 left-1 w-16 h-16" width={64} height={64} />
                    )}
                    <Image src={data.image} alt="Meal Image" className="rounded-lg w-full h-80 object-cover" width={500} height={500} />
                  </div>
                  <div className="pt-4">
                    <p className="text-slate-500 pb-0">{data.note}</p>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="p-2 h-[70vh] flex items-center justify-center">
            <div className="text-center">
              <Image src="/images/icons/not-found-icon.png" alt="Not Found" className="mx-auto w-24 h-24 mb-5" width={120} height={120} />
              <h2 className="font-bold text-xl mb-4">🍽️ FoodPrint Log Not Found</h2>
              <p className="text-[#5C5C5C] text-base mb-2">Uh-oh! This meal log link is either expired or invalid. 😢🍴</p>
              <p className="text-[#5C5C5C] text-base mb-2">Try checking the link again or explore more delicious meals!</p>
              <button className="bg-[#D12149] text-xs px-4 py-[10px] font-semibold text-white rounded-full mt-8">
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center py-5">
          Loading...
        </div>
      )}

      {/* Intersection Observer Target */}
      {hasMore || isLoading ? (
        <div ref={ref} className="h-10"></div>
      ) : (
        <div className="text-center text-gray-500 text-md py-5">No more data</div>
      )}
    </div>
  );
};

export default MealLogs;
