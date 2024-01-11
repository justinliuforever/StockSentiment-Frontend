import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';

import BackButton from '../components/BackButton';
import { REACT_APP_API_URL } from '../../config.js';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';
import StockAnalysisSummaryCompanyBoard from '../components/StockAnalysisSummaryCompanyBoard';
import StockAnalysisSummaryPredictBoard from '../components/StockAnalysisSummaryPredictBoard';
import StockDashBoard from '../components/StockDashBoard';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FilterNewsPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of articles per page
  const { ticker } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`${REACT_APP_API_URL}/stockAnalysis/ticker/${ticker}`)
      .then((res) => {
        if (res.data && Array.isArray(res.data.data)) {
          // Sort the news data in descending order of published date
          const sortedNewsData = res.data.data.sort((a, b) => 
            new Date(b.publishedUTC) - new Date(a.publishedUTC)
          );
          setNewsData(sortedNewsData);
        } else {
          console.error("Data is not in the expected format from MongoDB");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [ticker]);

    // New useEffect for resetting the page number
    useEffect(() => {
      setCurrentPage(1);
    }, [ticker]); 


  function truncateDescription(description, maxWords) {
    const words = description.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return description;
  }

  const indexOfLastArticle = currentPage * pageSize;
  const indexOfFirstArticle = indexOfLastArticle - pageSize;
  const currentArticles = newsData.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="py-24 sm:py-8 " >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          {/* background color */}
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <BackButton destination="/" />
        <div className='flex justify-center items-center w-full py-6'>
              <SearchBar/>
        </div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>News for {ticker}</h1>
          <div className="pt-6">
            <StockDashBoard symbol={ticker} />
          </div>

          <div className="pt-6">
            <StockAnalysisSummaryCompanyBoard/>
          </div>
          
          <div className="pt-6">
            <StockAnalysisSummaryPredictBoard/>
          </div>
          

          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="mt-6 space-y-20 lg:mt-8 lg:space-y-20">
                {currentArticles.map((item) => (
                  <article key={item._id} className="relative isolate flex flex-col gap-8 lg:flex-row">
                  <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                    <img
                      src={item.imageURL}
                      alt=""
                      className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={item.publishedUTC} className="text-gray-500">
                        {new Date(item.publishedUTC).toLocaleDateString()}
                      </time>
                      <a
                        href={item.homePageURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {item.publisher}
                      </a>
                    </div>
                    <div className="group relative max-w-xl">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a href={`/stockAnalysis/${item._id}`}>
                          <span className="absolute inset-0" />
                          {item.title}
                        </a>
                      </h3>
                      <p className="mt-5 text-sm leading-6 text-gray-600">{truncateDescription(item.description, 20)}</p>
                    </div>
                    <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                      <div className="relative flex items-center gap-x-4">
                        <img src={item.logoURL} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                        <div className="text-sm leading-6">
                          <p className="font-semibold text-gray-900">
                            <a href={`mailto:${item.author}`}>
                              <span className="absolute inset-0" />
                              {item.author}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </article>
                ))}
              </div>
              <Pagination
                itemsCount={newsData.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={paginate}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Pagination({ itemsCount, pageSize, currentPage, onPageChange }) {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;

  const pages = [...Array(pageCount).keys()].map(i => i + 1);

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`inline-flex items-center border-t-2 ${currentPage === page ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} px-4 pt-4 text-sm font-medium`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={() => currentPage < pageCount && onPageChange(currentPage + 1)}
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}

export default FilterNewsPage;
