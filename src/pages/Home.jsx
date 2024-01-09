import  { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { MdOutlineAddBox } from 'react-icons/md'; // Import search icon
import { REACT_APP_API_URL } from '../../config.js'; // Import from config.js
import SearchBar from '../components/SearchBar';
import Spinner from "../components/Spinner";
import axios from "axios";

const Home = () => {  
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    axios
      .get(`${REACT_APP_API_URL}/stockAnalysis`)
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setNews(res.data.data);
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

  

  return (
    <div className='p-4 bg-slate-50'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Stock List</h1>
         <SearchBar/>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>Published UTC</th>
              <th className='border border-slate-600 rounded-md'>Ticker</th>
              <th className='border border-slate-600 rounded-md'>Title</th>
              <th className='border border-slate-600 rounded-md'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item._id} className='h-8'>
                <td className='border border-slate-600 rounded-md'>{item.publishedUTC}</td>
                <td className='border border-slate-600 rounded-md'>{item.ticker}</td>
                <td className='border border-slate-600 rounded-md'>{item.title}</td>
                <td className='border border-slate-600 rounded-md text-center'>
                  <Link to={`/stockAnalysis/${item._id}`} className='flex items-center bg-green-500 text-white rounded-full p-2'>
                    <MdOutlineAddBox className='mr-2' />
                    <span>View</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
