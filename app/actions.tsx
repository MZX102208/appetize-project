'use server';

import fetch from 'node-fetch';

const { APPETIZE_URL, APPETIZE_API_KEY } = process.env;

export const upload = async (data: FormData): Promise<UploadResponse> => {

  try {
    const result = await fetch(APPETIZE_URL, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: 'Basic ' + Buffer.from(APPETIZE_API_KEY + ':').toString('base64')
      }
    });

    const isSuccess = result.status === 200;
    return { success: isSuccess, message: isSuccess ? 'Success' : 'Error when uploading file' };
  } catch (error) {
    return { success: false, message: 'Server error' };
  }
}

interface UploadResponse {
  success: boolean;
  message: string;
}
