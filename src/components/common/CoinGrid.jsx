import React from 'react';
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { Link } from 'react-router-dom';

const CoinGrid = ({ data }) => {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {data.map((coin) => (
        <Link to={`/discription/:${coin.id}`} key={coin.id} className="p-4 w-80 flex flex-col gap-4 rounded-lg bg-gray-100">
          <div className="flex justify-between items-center">
              <img src={coin.image} alt={`${coin.name} logo`} className="w-12 h-12" />
              <p className="text-lg text-gray-500">{coin.name}</p>
              <p className="text-xl font-semibold">{coin.symbol}</p>
          </div>
          <div>
            {coin.price_change_percentage_24h > 0 ? (
              <div className="flex justify-between items-center">
                <div className="coin-chip border-2 border-green-500 text-green-500 text-xl px-2 py-1 rounded-full">
                  {coin.price_change_percentage_24h.toFixed(2) + " %"}
                </div>
                <BsGraphUpArrow className="icon text-green-500 text-3xl ml-2" />
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div className="coin-chip border-2 border-red-500 text-red-500 text-xl px-2 py-1 rounded-full">
                  {coin.price_change_percentage_24h.toFixed(2) + " %"}
                </div>
                <BsGraphDownArrow className="icon text-red-500 text-3xl ml-2" />
              </div>
            )}
          </div>
          <div>
            <p className={`text-xl text-center font-bold ${coin.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"}`}>
              $ {coin.current_price.toLocaleString()}
            </p>
          </div>
          <div className="mt-2">
            <p className="volume-text text-sm">
              <strong>Total Volume :</strong> $ {coin.total_volume.toLocaleString()}
            </p>
            <p className="volume-text text-sm mt-1">
              <strong>Total Market Cap :</strong> $ {coin.market_cap.toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CoinGrid;
