'use client'

import { useCallback, useState } from 'react';
import { upload } from './actions';
import './styles.css';

const buttonStyle = "mx-auto my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
const platformSelectStyle = "appearance-none w-1/3 border border-black py-1 px-1 pr-3 rounded";

export default function UploadPage() {
  const [uploadSuccess, setUploadSuccess] = useState<boolean | undefined>();
  const [errorState, setErrorState] = useState<string>('');
  const onSubmit = useCallback(async (formData: FormData) => {
    const res = await upload(formData);
    setErrorState(res.message);
    setUploadSuccess(res.success);
  }, []);

  return (
    <main className="flex w-full h-full align-middle justify-center">
      <div className="my-auto flex flex-col">
        <text className="mx-auto text-xl font-bold">Upload App to Appetize</text>
        <form className="flex flex-col" action={onSubmit}>
          <input className="mx-auto my-4" type="file" name="file" />
          <label>Select a platform</label>
          <select className={platformSelectStyle} name="platform">
            <option value="ios">iOS</option>
            <option value="android">Android</option>
          </select>
          <input className={buttonStyle} type="submit" value="Upload" />
        </form>
        {uploadSuccess === false && <text className="m-auto text-red-600">{errorState}</text>}
        {uploadSuccess === true && <text className="m-auto text-green-500">Sucessfully uploaded app</text>}
        <a className={buttonStyle} href="/apps" >View Apps</a>
      </div>
    </main>
  );
}