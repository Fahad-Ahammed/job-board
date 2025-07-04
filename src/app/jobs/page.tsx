import JobListings from '@/components/jobs/JobListings';
import { fetchJobs } from '@/lib/api/jobs';

export default async function JobsPage() {
  const jobsData = await fetchJobs({
    query: 'frontend developer',
    page: 1,
  });

  if (!jobsData || jobsData.status !== 'OK') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-2 text-lg">Failed to load jobs</p>
          <p className="text-muted-foreground text-sm">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  return (
    <JobListings
      initialJobs={jobsData.data}
      initialSelectedJob={jobsData.data.length > 0 ? jobsData.data[0] : null}
      searchQuery="frontend developer"
    />
  );
}
