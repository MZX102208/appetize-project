'use client'

import { useCallback, useEffect, useState } from 'react';
import { AppInfo, fetchApps } from './actions';
import '../styles.css';

const buttonStyle = "mr-auto my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

export default function AppsPage() {

  const [data, setData] = useState<AppInfo[]>([]);
  const [filteredData, setFilteredData] = useState<AppInfo[]>(data);
  const [filterText, setFilterText] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchApps();
      setData(res.data);
      setFilteredData(res.data);
    }

    fetchData();
  }, []);

  const filter = useCallback((filterText: string) => {
    setFilteredData(filterText.length > 0 ?
      data.filter((appInfo) => appInfo.name?.includes(filterText.toString())) :
      data);
  }, []);

  return (
    <main className="flex flex-col m-2">
      <a className={buttonStyle} href="/" >Upload Apps</a>
      <form className="mb-3" onSubmit={(e) => { e.preventDefault(); filter(filterText); }}>
        <input className="border border-black p-1 mr-2" type="text" name="filter" onChange={e => setFilterText(e.target.value)} />
        <input className="border border-black p-1" type="submit" value="Filter" />
      </form>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Platform</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((appInfo) => {
            return (
              <tr>
                <td>{appInfo.name}</td>
                <td>{appInfo.platform}</td>
                <td>{appInfo.created}</td>
              </tr>);
          })}
        </tbody>
      </table>
    </main>
  );
}