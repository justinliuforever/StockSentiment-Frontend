import 'react-datepicker/dist/react-datepicker.css';

import { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import { REACT_APP_API_URL } from '../../config.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StockDashBoard = ({ symbol }) => {
  const { ticker } = useParams();
  // Initialize state
  const [tickerData, setTickerData] = useState({
    close: '---',
    high: '---',
    low: '---',
    open: '---',
    volume: '---',
    afterHours: '---',
    preMarket: '---',
    from: '---'
  });

  const CustomInput = ({ value, onClick }) => (
    <div className="relative max-w-sm">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        {/* SVG icon */}
        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
        </svg>
      </div>
      <input
        type="text"
        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
        placeholder="Select date"
        onClick={onClick}
        value={value}
      />
    </div>
  );
  
  // Function to get the most recent weekday
  const getMostRecentWeekday = () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time part
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    if (dayOfWeek === 0) { // If today is Sunday
      return new Date(today.setDate(today.getDate() - 2)); // Return last Friday
    } else if (dayOfWeek === 6) { // If today is Saturday
      return new Date(today.setDate(today.getDate() - 1)); // Return last Friday
    }
    return today; // If today is a weekday, return today
  };

  const [selectedDate, setSelectedDate] = useState(getMostRecentWeekday());

  // Filter out weekends
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 = Sunday, 6 = Saturday
  };

  useEffect(() => {
    const fetchData = async () => {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // Format selected date as YYYY-MM-DD
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/stockAnalysis/stockData/${symbol}/${formattedDate}`);

        const data = response.data;
        setTickerData({
          close: data.close.toFixed(2),
          high: data.high.toFixed(2),
          low: data.low.toFixed(2),
          open: data.open.toFixed(2),
          volume: data.volume.toLocaleString(),
          afterHours: data.afterHours.toFixed(2),
          preMarket: data.preMarket.toFixed(2),
          from: data.from
        });
      } catch (error) {
        console.error('Error fetching ticker data:', error);
        // Handle error appropriately in your UI
      }
    };

    fetchData();
  }, [selectedDate, symbol]);

  // Prepare the data for the UI
  const stats = [
    // { name: 'Close', value: tickerData.Close, change: '---' },
    { name: 'Ticker for', value: ticker },
    { name: 'Volume', value: tickerData.volume },
    { name: 'Close', value: `$${tickerData.close}` },
    { name: 'open', value: `$${tickerData.open}` },
    
    { name: 'High', value: `$${tickerData.high}` },
    { name: 'Low', value: `$${tickerData.low}`},
    { name: 'After Hours', value: `$${tickerData.afterHours}` },
    { name: 'Pre Market', value: `$${tickerData.preMarket}` },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className="container mx-auto p-4 border border-indigo-300 rounded-lg shadow-sm">

      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        maxDate={new Date()}
        filterDate={isWeekday}
        dateFormat="yyyy-MM-dd"
        customInput={<CustomInput />}
      />
      <dl className="mx-auto grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-4 py-10 sm:px-6 xl:px-8"
          >
            <dt className="text-sm font-medium leading-6 text-indigo-400">{stat.name}</dt>
            <dd
              className={classNames(
                'text-gray-700',
                'text-xs font-medium'
              )}
            >
              {stat.change}
            </dd>
            <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default StockDashBoard;
