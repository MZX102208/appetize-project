'use server';

import fetch from 'node-fetch';

const { APPETIZE_URL, APPETIZE_API_KEY } = process.env;

export const fetchApps = async (): Promise<Response> => {

  try {
    const response = await fetch(`${APPETIZE_URL}/all`, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + Buffer.from(APPETIZE_API_KEY + ':').toString('base64')
      }
    });

    const isSuccess = response.status === 200;
    const data = isSuccess ? (await response.json()).data : [];
    return { success: isSuccess, message: isSuccess ? 'Success' : 'Error when uploading file', data };
  } catch (error) {
    return { success: false, message: 'Server error', data: [] };
  }
}

interface Response {
  success: boolean;
  message: string;
  data: AppInfo[];
}

export interface AppInfo {
  name: string;
  platform: string;
  created: string;
}
