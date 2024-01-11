import { Link } from 'react-router-dom';

const TickerNotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h1 className="text-2xl font-bold mb-3">Ticker Not Found</h1>
        <p className="text-lg mb-5">Sorry, the ticker you are looking for is not included in our list.</p>
        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}

export default TickerNotFoundPage;
