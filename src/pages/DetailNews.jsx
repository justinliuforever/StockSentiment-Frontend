import { useEffect, useState } from "react";

import BackButton from "../components/BackButton";
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { REACT_APP_API_URL } from "../../config.js";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailNews = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${REACT_APP_API_URL}/stockAnalysis/${id}`)
      .then((res) => {
        setNews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
      {loading ? (
        <Spinner />
      ) : news && (
        <div>
          <div className="py-4">
            <BackButton destination={`/stockAnalysis/ticker/${news.ticker}`}/>
          </div>
          
          <div className="px-4 sm:px-0">
            <h1 className="text-3xl font-semibold leading-7 text-gray-900">{news.name}</h1>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">News Details and Information</p>
          </div>
          <div className="mt-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8">
              <div className="border-t border-gray-100 sm:col-span-1">
                <dt className="text-sm font-medium leading-6 text-gray-900">Ticker</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700">{news.ticker}</dd>
              </div>
              <div className="border-t border-gray-100 sm:col-span-1">
                <dt className="text-sm font-medium leading-6 text-gray-900">Published UTC</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700">{news.publishedUTC}</dd>
              </div>
              <div className="border-t border-gray-100 sm:col-span-1">
                <dt className="text-sm font-medium leading-6 text-gray-900">Title</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700">{news.title}</dd>
              </div>
              <div className="border-t border-gray-100 sm:col-span-1">
                <dt className="text-sm font-medium leading-6 text-gray-900">Publisher</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700">{news.publisher}</dd>
              </div>
              <div className="border-t border-gray-100 sm:col-span-1">
                <dt className="text-sm font-medium leading-6 text-gray-900">shortTermPrediction</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700">{news.chatGPTAnalysis.shortTermPrediction}</dd>
              </div>
              <div className="border-t border-gray-100 sm:col-span-1">
                <dt className="text-sm font-medium leading-6 text-gray-900">longTermPrediction</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700">{news.chatGPTAnalysis.longTermPrediction}</dd>
              </div>
              <div className="border-t border-gray-100 sm:col-span-2">
                <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700">{news.description}</dd>
              </div>
              <div className="border-t border-gray-100 sm:col-span-2">
                <dt className="text-sm font-medium leading-6 text-gray-900">Article URL</dt>
                <dd className="mt-2 text-sm text-gray-900">
                  <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <div className="ml-4 flex min-w-0 flex-1">
                          <a href={news.articleURL} target="_blank" rel="noopener noreferrer" className="truncate font-medium text-indigo-600 hover:text-indigo-500">
                            {news.title}
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailNews;
