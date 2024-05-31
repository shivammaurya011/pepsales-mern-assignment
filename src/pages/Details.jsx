import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import LineChart from "../components/common/LineChart";
import Layout from "../layouts/Layout";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import Loading from "../components/common/Loading";

const Details = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(120);
  const [loading, setLoading] = useState(true);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{}],
  });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const dataResponse = await getCoinData(id);
        if (dataResponse) {
          setCoinData(dataResponse);
        }
        const pricesResponse = await getCoinPrices(id, days, priceType);
        if (pricesResponse) {
          setChartDataFunction(pricesResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id, days, priceType]);

  const getCoinData = async (id) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching coin data:", error);
      return null;
    }
  };

  const getCoinPrices = async (id, days, priceType) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
        {
          params: {
            vs_currency: "usd",
            days: days,
            interval: "daily",
          },
        }
      );
      if (priceType === "prices") return response.data.prices;
      if (priceType === "market_caps") return response.data.market_caps;
      if (priceType === "total_volumes") return response.data.total_volumes;
      return [];
    } catch (error) {
      console.error("Error fetching coin prices:", error);
      return [];
    }
  };

  const setChartDataFunction = (prices) => {
    setChartData({
      labels: prices.map((data) => new Date(data[0]).toLocaleDateString()),
      datasets: [
        {
          label: "Crypto",
          data: prices.map((data) => data[1]),
          borderWidth: 1,
          fill: false,
          tension: 0.25,
          backgroundColor: "transparent",
          borderColor: "#3a80e9",
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
      image: data.image?.large || "",
      desc: data.description?.en || "",
      price_change_percentage_24h:
        data.market_data?.price_change_percentage_24h || 0,
      total_volume: data.market_data?.total_volume?.usd || 0,
      current_price: data.market_data?.current_price?.usd || 0,
      market_cap: data.market_data?.market_cap?.usd || 0,
    });
  };

  const handleDaysChange = (event) => {
    const newDays = event.target.value;
    setDays(newDays);
  };

  const handlePriceChange = (event) => {
    const newPriceType = event.target.value;
    setPriceType(newPriceType);
  };

  return (
    <Layout>
      <div className="min-h-screen p-12 flex flex-col">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="p-4 flex justify-between rounded-lg bg-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <img
                src={coin.image}
                alt={`${coin.name} logo`}
                className="w-12 h-12"
              />
              <p className="text-lg font-semibold">{coin.name}</p>
              <p className="text-sm text-gray-500">
                {coin.symbol.toUpperCase()}
              </p>
              {coin.price_change_percentage_24h > 0 ? (
                <>
                  <BsGraphUpArrow className="text-green-500 text-2xl" />
                  <p className="text-green-500 text-xl ml-2">
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </>
              ) : (
                <>
                  <BsGraphDownArrow className="text-red-500 text-2xl" />
                  <p className="text-red-500 text-xl ml-2">
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </>
              )}
              <p
                className={`text-xl font-bold ${
                  coin.price_change_percentage_24h < 0
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                $ {coin.current_price.toLocaleString()}
              </p>
              <div className="text-right">
                <p className="text-sm">
                  <strong>Total Volume:</strong> ${" "}
                  {coin.total_volume.toLocaleString()}
                </p>
                <p className="text-sm mt-1">
                  <strong>Market Cap:</strong> ${" "}
                  {coin.market_cap.toLocaleString()}
                </p>
              </div>
            </div>
            <div></div>
            <div className="bg-gray-100 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">{coin.name}</h1>
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <label className="flex items-center space-x-2">
                  <span className="text-gray-700">Days:</span>
                  <select
                    value={days}
                    onChange={handleDaysChange}
                    className="mt-1 p-2 block w-full md:w-auto bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="7">7</option>
                    <option value="30">30</option>
                    <option value="90">90</option>
                    <option value="120">120</option>
                  </select>
                </label>
                <label className="flex items-center space-x-2">
                  <span className="text-gray-700">Price Type:</span>
                  <select
                    value={priceType}
                    onChange={handlePriceChange}
                    className="mt-1 block w-full p-2 md:w-auto bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="prices">Prices</option>
                    <option value="market_caps">Market Caps</option>
                    <option value="total_volumes">Total Volumes</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-12">
              <LineChart chartData={chartData} priceType={priceType} />
            </div>
            <div className="p-12 bg-gray-100 rounded-lg">
              <p className="text-gray-600">{coin.desc}</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Details;
