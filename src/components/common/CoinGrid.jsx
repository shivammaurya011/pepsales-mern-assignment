import React, { useState } from 'react';
import { BsGraphDownArrow, BsGraphUpArrow } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { start, success, failure } from '../../redux/coine/coineSlice';
import { getData } from '../../utils/getData';
import useLazyLoading from '../../hooks/useLazyLoading';
import Loading from './Loading';

const CoinGrid = ({ data, loading }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const fetchMoreData = async () => {
    dispatch(start());
    try {
      const nextPage = page + 1;
      const response = await getData(nextPage);
      if (response) {
        dispatch(success(response));
        setPage(nextPage);
      } else {
        dispatch(failure('No more data available'));
      }
    } catch (error) {
      dispatch(failure(error.message));
    }
  };

  const lastElementRef = useLazyLoading(fetchMoreData);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-wrap justify-center gap-8 p-4">
      {data.map((coin, index) => (
        <Link
          to={`/details/${coin.id}`}
          key={coin.id}
          className="p-4 w-80 flex flex-col gap-4 rounded-lg bg-gray-100 shadow-md hover:shadow-lg transition-shadow"
          ref={index === data.length - 1 ? lastElementRef : null}
        >
          <div className="flex justify-between items-center">
            <img src={coin.image} alt={`${coin.name} logo`} className="w-12 h-12" />
            <p className="text-lg text-gray-500">{coin.name}</p>
            <p className="text-xl font-semibold">{coin.symbol.toUpperCase()}</p>
          </div>
          <div className="flex justify-between items-center">
            {coin.price_change_percentage_24h > 0 ? (
              <>
                <div className="border-2 border-green-500 text-green-500 text-xl px-2 py-1 rounded-full">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <BsGraphUpArrow className="text-green-500 text-3xl ml-2" />
              </>
            ) : (
              <>
                <div className="border-2 border-red-500 text-red-500 text-xl px-2 py-1 rounded-full">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <BsGraphDownArrow className="text-red-500 text-3xl ml-2" />
              </>
            )}
          </div>
          <div>
            <p className={`text-xl text-center font-bold ${coin.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"}`}>
              $ {coin.current_price.toLocaleString()}
            </p>
          </div>
          <div className="mt-2 text-sm">
            <p><strong>Total Volume:</strong> $ {coin.total_volume.toLocaleString()}</p>
            <p className="mt-1"><strong>Market Cap:</strong> $ {coin.market_cap.toLocaleString()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CoinGrid;
