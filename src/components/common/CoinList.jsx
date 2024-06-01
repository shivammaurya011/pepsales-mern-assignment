import React from 'react';
import { BsGraphDownArrow, BsGraphUpArrow } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const CoinList = ({ data, loading }) => {
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-center gap-8 p-4">
      {data.map((coin) => (
        <Link
          to={`/details/${coin.id}`}
          key={coin.id}
          className="p-4 flex justify-between rounded-lg bg-gray-100 shadow-md hover:shadow-lg transition-shadow"
        >
          <img src={coin.image} alt={`${coin.name} logo`} className="w-12 h-12" />
          <p className="text-lg font-semibold">{coin.name}</p>
          <p className="text-sm text-gray-500">{coin.symbol.toUpperCase()}</p>
          {coin.price_change_percentage_24h > 0 ? (
            <>
              <BsGraphUpArrow className="text-green-500 text-2xl" />
              <p className="text-green-500 text-xl ml-2">{coin.price_change_percentage_24h.toFixed(2)}%</p>
            </>
          ) : (
            <>
              <BsGraphDownArrow className="text-red-500 text-2xl" />
              <p className="text-red-500 text-xl ml-2">{coin.price_change_percentage_24h.toFixed(2)}%</p>
            </>
          )}
          <p className={`text-xl font-bold ${coin.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"}`}>
            $ {coin.current_price.toLocaleString()}
          </p>
          <div className="text-right">
            <p className="text-sm">
              <strong>Total Volume:</strong> $ {coin.total_volume.toLocaleString()}
            </p>
            <p className="text-sm mt-1">
              <strong>Market Cap:</strong> $ {coin.market_cap.toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CoinList;
