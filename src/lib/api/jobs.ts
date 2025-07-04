'use server';

import { ApiResponse } from '@/types/jobs';

export interface FetchJobsParams {
  query?: string;
  page?: number;
  location?: string;
}

// Server Action that can be called from both server and client components
export async function fetchJobs({
  query = 'frontend developer',
  page = 1,
  location = 'us',
}: FetchJobsParams = {}): Promise<ApiResponse | null> {
  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=${page}&num_pages=1&country=${location}&date_posted=all`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
      'x-rapidapi-host': 'jsearch.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return null;
  }
}
