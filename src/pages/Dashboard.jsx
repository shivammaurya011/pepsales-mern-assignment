import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../layouts/Layout';
import CoinGrid from '../components/common/CoinGrid';
import CoinList from '../components/common/CoinList';
import { useSelector, useDispatch } from 'react-redux';
import { start, success, failure } from '../redux/coine/coineSlice';
import { getData } from '../utils/getData';
import debounce from 'lodash.debounce';

function Dashboard() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.coin);
  const [tab, setTab] = useState('grid');
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCoinData();
  }, [page]);

  const fetchCoinData = async () => {
    dispatch(start());
    try {
      const response = await getData(page);
      if (response) {
        dispatch(success(response));
      } else {
        dispatch(failure('No data found'));
      }
    } catch (error) {
      dispatch(failure(error.message));
    }
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  const handleSearchChange = useCallback(
    debounce((event) => {
      setSearchQuery(event.target.value);
    }, 300),
    []
  );

  const filteredData = data.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-4">
        <div className="px-8">
          <input
            className="w-full py-2 px-6 bg-slate-100 rounded-full"
            type="search"
            placeholder="Search"
            onChange={handleSearchChange}
          />
        </div>
        <div className="px-8">
          <div className="flex justify-around p-4 items-center">
            <div
              onClick={() => handleTabChange('grid')}
              className={`w-1/2 text-center text-lg font-semibold ${tab === 'grid' && 'text-blue-500 border-b-2 border-blue-500'}`}
            >
              Grid
            </div>
            <div
              onClick={() => handleTabChange('list')}
              className={`w-1/2 text-center text-lg font-semibold ${tab === 'list' && 'text-blue-500 border-b-2 border-blue-500'}`}
            >
              List
            </div>
          </div>
          <div>
            {tab === 'grid' ? (
              <CoinGrid data={filteredData} loading={loading} />
            ) : (
              <CoinList data={filteredData} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
