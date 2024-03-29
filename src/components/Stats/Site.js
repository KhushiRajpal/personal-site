import React, { useState, useCallback, useEffect } from 'react';

import Table from './Table';
import initialData from '../../data/stats/site';

const Stats = () => {
  const [data, setResponseData] = useState(initialData);
  const fetchData = useCallback(async () => {
    // request must be authenticated if private
    const res = await fetch(
      'https://github.com/KhushiRajpal/personal-site/stargazers',
    );
    const resData = await res.json();
    setResponseData(
      initialData.map((field) => ({
        ...field,
        // update value if value was returned by call to github
        value: Object.keys(resData).includes(field.key)
          ? resData[field.key]
          : field.value,
      })),
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h3>Stats about this website. And things I found interesting.</h3>
      <Table data={data} />
    </div>
  );
};

export default Stats;
