export const getData = async () => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorDetail = await response.json();
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText} - ${errorDetail.error}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};
