import { useEffect, useState } from 'react';

import { REACT_APP_API_URL_SUMMARY } from '../../config.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StockAnalysisSummaryPredictBoard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { ticker } = useParams(); // Assuming you're using react-router and the ticker is part of the URL

  useEffect(() => {
    setLoading(true);
    axios
      //.get(`http://localhost:5556/TickerSummary/${ticker}`)
      .get(`${REACT_APP_API_URL_SUMMARY}/TickerSummary/${ticker}`)
      .then((res) => {
        setData(res.data); // Adjust according to the actual response structure
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [ticker]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() is zero-indexed
    const day = date.getDate();
    const hour = date.getHours();
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // convert 24h to 12h format and handle midnight

    return `${year}-${month}-${day} ${formattedHour}${period}`;
  };

  const processSummary = (summary) => {
    if (!summary) return "";
  
    // Replace each new line with a line break and two non-breaking spaces
    const formattedSummary = summary.split('\n').map(line => `&nbsp;&nbsp;${line.trim()}`).join('<br/>');
  
    return formattedSummary;
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data found for ticker {ticker}</div>;
  }

  return (
    <div className="flex w-full justify-center py-24 sm:py-8">
      <div className="relative group">
        {/* Gradient Border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 z-0"></div>
        
        {/* Content */}
        <div className="bg-white py-6 px-4 border border-transparent rounded-lg shadow-sm relative z-10">
          <p className="text-base font-semibold leading-7 text-indigo-600">Update: {formatDate(data.createAt)}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"> {`Comprehensive Analysis of ${ticker.toUpperCase()}: Short-Term Challenges and Long-Term Opportunities`}</h1>
          <h3 className="mt-2 text-lg text-gray-500">Ticker: {data.ticker}</h3>
          <div className="my-8 text-base leading-7 text-gray-700" dangerouslySetInnerHTML={{ __html: processSummary(data.summaryPredict) }}>
            {/* <p>{data.summaryPredict}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAnalysisSummaryPredictBoard;
