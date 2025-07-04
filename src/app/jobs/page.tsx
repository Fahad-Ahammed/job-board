import JobListings from '@/components/jobs/JobListings';
import { ApiResponse } from '@/types/jobs';

async function fetchJobs() {
  const url = `https://jsearch.p.rapidapi.com/search?query=developer%20jobs%20in%20chicago&page=1&num_pages=1&country=us&date_posted=all`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
      'x-rapidapi-host': 'jsearch.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result: ApiResponse = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function JobsPage() {
  const jobsData = await fetchJobs();

  if (!jobsData || jobsData.status !== 'OK') {
    return <div>Failed to load jobs.</div>;
  }

  return (
    <JobListings
      initialJobs={jobsData.data}
      initialSelectedJob={jobsData.data.length > 0 ? jobsData.data[0] : null}
    />
  );
}
