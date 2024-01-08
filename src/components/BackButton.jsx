import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
      <Link
        to={destination}
        className='inline-flex items-center rounded px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'
      >
        <BsArrowLeft className='mr-2 text-lg' /> Back
      </Link>
    </div>
  );
};

export default BackButton;
