import { useEffect, useState } from "react";

import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import Spinner from "../components/Spinner";
import axios from "axios";
import { formatDistanceToNow } from 'date-fns';

const TickerTotalLists = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/stockAnalysis')
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          // Sort the news data based on publishedUTC
          const sortedNews = res.data.data.sort((a, b) => {
            return new Date(b.publishedUTC) - new Date(a.publishedUTC);
          });
          setNews(sortedNews);
        } else {
          console.error("Data is not ready from the server");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };


  return (
    <div className='p-4'>
      <div className='flex justify-center items-center w-full py-6'>
         <SearchBar/>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="max-h-[calc(8*4.5rem)] overflow-y-auto border border-gray-300 rounded-lg"> 
          <ul role="list" className="divide-y divide-gray-100 py-6 px-4">
            {news.map((item) => (
              <Link key={item._id} to={`/stockAnalysis/${item._id}`} className='block'>
                <li className="flex justify-between items-center gap-x-6 py-5 hover:bg-indigo-100">
                  <img className="h-12 w-12 flex-none rounded-lg bg-gray-200" src={item.logoURL} alt="" />
                  <div className="flex-grow flex flex-col min-w-0 gap-x-4">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{item.title}</p>
                    <p className="truncate text-xs leading-5 text-gray-500">{item.ticker}</p>
                  </div>
                  <p className="flex-none text-sm leading-6 text-gray-900">
                    {formatDate(item.publishedUTC)}
                  </p>
                  <CursorArrowRaysIcon className='h-5 w-5 text-indigo-400 hover:text-indigo-600' />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TickerTotalLists;
