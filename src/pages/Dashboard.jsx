import React, { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import { getData } from '../utils/getData';
import CoinGrid from '../components/common/CoinGrid';
import CoinList from '../components/common/CoinList';

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('grid');

  useEffect(() => {
    getCoinData();
  }, []);

  const getCoinData = async () => {
    const response = await getData();
    if (response) {
      setData(response);
      setLoading(false);
    }
  };

  const handleTab = (event) => {
    const newValue = event.currentTarget.getAttribute('value');
    setTab(newValue);
  };

  return (
    <Layout>
      <div className="p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className='px-8'>
              <input
                className="w-full py-2 px-6 bg-slate-100 rounded-full"
                type="search"
                placeholder="Search"
              />
            </div>
            <div className='px-8'>
              <div className="flex justify-around p-4 items-center">
                <div
                  value="grid"
                  onClick={handleTab}
                  className={`w-1/2 text-center text-lg font-semibold ${tab === 'grid' && 'text-blue-500 border-b-2 border-blue-500'}`}
                >
                  Grid
                </div>
                <div
                  value="list"
                  onClick={handleTab}
                  className={`w-1/2 text-center text-lg font-semibold ${tab === 'list' && 'text-blue-500 border-b-2 border-blue-500'}`}
                >
                  List
                </div>
              </div>
              <div>
                {tab === 'grid' ? (
                  <CoinGrid data={data} />
                ) : (
                  <CoinList data={data} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;
