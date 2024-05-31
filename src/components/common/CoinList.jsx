import React from 'react';
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CoinList = ({ data }) => {
  const {loading} = useSelector((state) => state.coin);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center gap-8">
      {data.map((coin) => (
        <Link to={`/details/${coin.id}`} key={coin.id} className="p-4 flex justify-between rounded-lg bg-gray-100">
            <img src={coin.image} alt={`${coin.name} logo`} className="w-12 h-12" />
            <p className="text-lg text-gray-500">{coin.name}</p>
            <p className="text-xl font-semibold">{coin.symbol.toUpperCase()}</p>
            {coin.price_change_percentage_24h > 0 ? (
              <div className="flex items-center">
                <div className="border-2 border-green-500 text-green-500 text-xl px-2 py-1 rounded-full">
                  {coin.price_change_percentage_24h.toFixed(2) + " %"}
                </div>
              </div>
            ):(
              <div className="flex items-center">
                <div className="border-2 border-red-500 text-red-500 text-xl px-2 py-1 rounded-full">
                  {coin.price_change_percentage_24h.toFixed(2) + " %"}
                </div>
              </div>
            )}
            {coin.price_change_percentage_24h > 0 ? (
              <div className="flex justify-between items-center">
                <BsGraphUpArrow className="text-green-500 text-3xl ml-2" />
              </div>
            ):(
              <div className="flex justify-between items-center">
                <BsGraphDownArrow className="text-red-500 text-3xl ml-2" />
              </div>
            )}
          <p className={`text-xl text-center font-bold ${coin.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"}`}>
            $ {coin.current_price.toLocaleString()}
          </p>
          <div className="mt-2">
            <p className="text-sm">
              <strong>Total Volume :</strong> $ {coin.total_volume.toLocaleString()}
            </p>
            <p className="text-sm mt-1">
              <strong>Total Market Cap :</strong> $ {coin.market_cap.toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CoinList;
