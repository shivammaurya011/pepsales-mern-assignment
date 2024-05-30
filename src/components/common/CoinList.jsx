import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { coinApi } from '../../utils/getData';
import { getDate } from '../../utils/getDate';
import LineChart from './LineChart';
import Layout from '../../layouts/Layout';
const Details = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(120);
  const [loading, setLoading] = useState(true);
  const [priceType, setPriceType] = useState('prices');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{}],
  });

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    const data = await getCoinData(id);
    const prices = await getCoinPrices(id, days, priceType);

    if (data) {
      setCoinData(data);
      setLoading(false);
    }
    if (prices) {
      setChartDataFunction(prices);
    }
  };

  const getCoinData = async (id) => {
    try {
      const response = await axios.get(`${coinApi}/coins/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching coin data:", error);
      return null;
    }
  };

  const getCoinPrices = async (id, days, priceType) => {
    try {
      const response = await axios.get(
        `${coinApi}/coins/${id}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: days,
            interval: 'daily',
          }
        }
      );
      if (priceType === 'prices') return response.data.prices;
      if (priceType === 'market_caps') return response.data.market_caps;
      if (priceType === 'total_volumes') return response.data.total_volumes;
      return [];
    } catch (error) {
      console.error("Error fetching coin prices:", error);
      return [];
    }
  };

  const setChartDataFunction = (prices) => {
    setChartData({
      labels: prices.map((data) => getDate(data[0])),
      datasets: [
        {
          label: "Crypto",
          data: prices.map((data) => data[1]),
          borderWidth: 1,
          fill: false,
          tension: 0.25,
          backgroundColor: 'transparent',
          borderColor: '#3a80e9',
          pointRadius: 0,
        },
      ],
    });
  };

  const setCoinData = (data) => {
    setCoin({
      id: data.id,
      name: data.name,
      symbol: data.symbol,
      image: data.image?.large || '',
      desc: data.description?.en || '',
      price_change_percentage_24h: data.market_data?.price_change_percentage_24h || 0,
      total_volume: data.market_data?.total_volume?.usd || 0,
      current_price: data.market_data?.current_price?.usd || 0,
      market_cap: data.market_data?.market_cap?.usd || 0,
    });
  };

  const handleDaysChange = async (event) => {
    const newDays = event.target.value;
    setDays(newDays);
    const prices = await getCoinPrices(id, newDays, priceType);
    if (prices) {
      setChartDataFunction(prices);
    }
  };

  const handlePriceChange = async (event) => {
    const newPriceType = event.target.value;
    setPriceType(newPriceType);
    const prices = await getCoinPrices(id, days, newPriceType);
    if (prices) {
      setChartDataFunction(prices);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        {loading ? (
          <p className='h-screen flex justify-center items-center text-green-500 text-xl'>Loading...</p>
        ) : (
          <div className="flex-grow">
            <div className="bg-gray-100 p-4">
              <h1 className="text-2xl font-bold">{coin.name}</h1>
              <p className="text-gray-600">{coin.desc}</p>
              <div className="mt-4 flex space-x-4">
                <label className="block">
                  <span className="text-gray-700">Days:</span>
                  <select
                    value={days}
                    onChange={handleDaysChange}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  >
                    <option value="7">7</option>
                    <option value="30">30</option>
                    <option value="90">90</option>
                    <option value="120">120</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-gray-700">Price Type:</span>
                  <select
                    value={priceType}
                    onChange={handlePriceChange}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  >
                    <option value="prices">Prices</option>
                    <option value="market_caps">Market Caps</option>
                    <option value="total_volumes">Total Volumes</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="bg-gray-200 p-4 mt-4">
              <LineChart chartData={chartData} priceType={priceType} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Details;
