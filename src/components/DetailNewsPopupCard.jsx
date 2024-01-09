import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { REACT_APP_API_URL } from '../../config.js'; // Import from config.js
import axios from "axios";

const DetailNewsPopupCard = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleArticleLink = () => {
    navigate(news.articleURL);
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        View News Details
      </button>

      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen justify-center items-center">
            <div className="relative p-4 w-full max-w-2xl">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex justify-between items-center p-4 border-b rounded-t">
                  <h3 className="text-xl font-semibold">News Details</h3>
                  <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-900">
                    {/* Close Icon */}
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  {loading ? (
                    "Loading..."
                  ) : news ? (
                    <>
                      <DetailItem title="Published UTC" content={news.publishedUTC} />
                      <DetailItem title="Title" content={news.title} />
                      <DetailItem title="Description" content={news.description} />
                      <DetailItem title="Publisher" content={news.publisher} />
                      <DetailItem title="Short Term Prediction" content={news.chatGPTAnalysis.shortTermPrediction} />
                      <DetailItem title="Long Term Prediction" content={news.chatGPTAnalysis.longTermPrediction} />
                    </>
                  ) : (
                    "No news found."
                  )}
                </div>
                <div className="flex justify-end p-4 border-t">
                  <button
                    onClick={handleArticleLink}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Go to Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const DetailItem = ({ title, content }) => (
  <div className="grid grid-cols-3 gap-4">
    <dt className="text-sm font-medium text-gray-900">{title}</dt>
    <dd className="text-sm text-gray-700 col-span-2">{content}</dd>
  </div>
);

export default DetailNewsPopupCard;
