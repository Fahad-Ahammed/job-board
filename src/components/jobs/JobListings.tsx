'use client';

import { useState } from 'react';
import { Job } from '@/types/jobs';
import Image from 'next/image';
import {
  Search,
  MapPin,
  Bookmark,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobListingsProps {
  initialJobs: Job[];
  initialSelectedJob: Job | null;
}

export default function JobListings({
  initialJobs,
  initialSelectedJob,
}: JobListingsProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(
    initialSelectedJob
  );
  const [showJobDetails, setShowJobDetails] = useState(false);

  const getCompanyIcon = (logo: string | null) => {
    if (logo) {
      return <Image src={logo} alt="company logo" width={40} height={40} />;
    }
    const logoMap: { [key: string]: string } = {
      google: 'G',
      facebook: 'F',
      apple: 'A',
      spotify: 'S',
      tinder: 'T',
      dropbox: 'D',
    };
    return logoMap[logo || ''] || '🏢';
  };

  if (!selectedJob) {
    return <div>No jobs found.</div>;
  }

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      {/* Mobile Header - Only visible on mobile */}
      <div className="bg-background border-border border-b p-4 lg:hidden">
        <div className="flex items-center gap-3">
          {showJobDetails && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowJobDetails(false)}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-foreground text-lg font-semibold">
            {showJobDetails ? selectedJob.job_title : 'Job Search'}
          </h1>
        </div>
      </div>

      {/* Left Panel - Job Search */}
      <div
        className={`bg-background flex w-full flex-col p-4 lg:w-2/3 lg:p-6 ${showJobDetails ? 'hidden lg:flex' : 'flex'}`}
      >
        {/* Search Bar */}
        <div className="relative mb-4 lg:mb-6">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform lg:h-5 lg:w-5" />
          <input
            type="text"
            placeholder="Designer, USA"
            className="border-border bg-background text-foreground focus:ring-ring w-full rounded-lg border py-2.5 pr-16 pl-10 text-sm focus:ring-2 focus:outline-none lg:py-3 lg:pr-4 lg:text-base"
            defaultValue="Designer, USA"
            aria-label="Search jobs"
          />
        </div>

        {/* Filter Buttons */}
        <div
          className="mb-4 flex flex-wrap gap-2 lg:mb-6 lg:gap-4"
          role="group"
          aria-label="Job filters"
        >
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer rounded-lg px-3 py-2 text-xs lg:px-6 lg:text-sm">
            <span>Category</span>
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer rounded-lg px-3 py-2 text-xs lg:px-6 lg:text-sm"
          >
            <span>Location</span>
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer rounded-lg px-3 py-2 text-xs lg:px-6 lg:text-sm"
          >
            <span>Salary</span>
          </Button>
        </div>

        {/* Job Listings */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-3 lg:space-y-4">
            {jobs.map((job) => (
              <button
                key={job.job_id}
                className={`w-full cursor-pointer rounded-lg border p-3 text-left transition-all duration-300 lg:p-4 ${
                  selectedJob.job_id === job.job_id
                    ? 'border-primary/30 bg-muted/60 dark:bg-muted/10'
                    : 'hover:border-primary/30 dark:hover:border-primary/40 bg-card'
                }`}
                onClick={() => {
                  setSelectedJob(job);
                  setShowJobDetails(true); // Show details on mobile
                }}
              >
                <div className="flex items-center gap-3 lg:gap-4">
                  {/* Company Logo */}
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-lg lg:text-xl"
                    aria-hidden="true"
                  >
                    {getCompanyIcon(job.employer_logo)}
                  </div>

                  {/* Job Details - Mobile: Stack vertically, Desktop: Row */}
                  <div className="min-w-0 flex-1">
                    <div className="lg:flex lg:items-center lg:gap-4">
                      {/* Job Details - Left Column */}
                      <div className="mb-2 min-w-0 flex-1 lg:mb-0">
                        <h3 className="text-foreground text-sm font-semibold lg:text-sm">
                          {job.job_title}
                        </h3>
                        <p className="text-muted-foreground text-xs">
                          {job.employer_name}
                        </p>
                      </div>

                      {/* Location - Middle Column (Hidden on mobile) */}
                      <div className="hidden min-w-0 flex-1 lg:block">
                        <p className="text-foreground text-sm font-medium">
                          {job.job_city}, {job.job_state}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Location
                        </p>
                      </div>

                      {/* Salary - Right Column */}
                      <div className="flex-shrink-0 lg:text-right">
                        <p className="text-foreground text-sm font-semibold">
                          {job.job_min_salary && job.job_max_salary
                            ? `$${job.job_min_salary} - $${job.job_max_salary}`
                            : 'N/A'}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {job.job_salary_period}
                        </p>
                      </div>
                    </div>

                    {/* Mobile: Show location below */}
                    <div className="text-muted-foreground mt-2 flex items-center gap-1 lg:hidden">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs">
                        {job.job_city}, {job.job_state}
                      </span>
                    </div>
                  </div>

                  {/* Mobile: Chevron indicator */}
                  <div className="lg:hidden">
                    <ChevronRight className="text-muted-foreground h-4 w-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Job Details */}
      <div
        className={`bg-background border-border flex w-full flex-col border-l p-4 lg:w-1/3 lg:overflow-scroll lg:p-6 ${showJobDetails ? 'flex' : 'hidden lg:flex'}`}
      >
        {/* Company Header */}
        <div className="mb-4 border-b pt-6 pb-4 text-center lg:pt-12 lg:pb-5">
          <div
            className="bg-muted mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg text-2xl lg:h-16 lg:w-16 lg:text-3xl"
            aria-hidden="true"
          >
            {getCompanyIcon(selectedJob.employer_logo)}
          </div>
          <h2 className="text-foreground text-lg font-bold lg:text-xl">
            {selectedJob.employer_name}
          </h2>
          <p className="text-muted-foreground text-sm">
            {selectedJob.employer_company_type}
          </p>
        </div>

        {/* Job Title with Location and Bookmark */}
        <div className="mb-4 border-b pb-4 lg:mb-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-foreground pr-2 text-lg font-semibold">
              {selectedJob.job_title}
            </h3>
            <Button
              variant="outline"
              size="sm"
              className="text-primary hover:bg-primary/10 focus:ring-ring flex-shrink-0 border-none p-2 focus:ring-2"
              aria-label="Bookmark this job"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-muted-foreground flex items-center gap-1">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm">
              {selectedJob.job_city}, {selectedJob.job_state}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4 lg:mb-6">
          <h4 className="text-foreground mb-3 font-semibold">Description</h4>
          <p className="text-muted-foreground line-clamp-4 text-xs leading-relaxed lg:text-xs">
            {selectedJob.job_description}
          </p>
          <button className="text-primary focus:ring-ring mt-2 rounded text-sm font-medium hover:underline focus:ring-2 focus:outline-none">
            Read more
          </button>
        </div>

        <hr className="border-border mb-4 lg:mb-6" />

        {/* Job Highlights*/}
        <div className="mb-4 flex-1 lg:mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-foreground font-semibold">Job Highlights</h4>
          </div>

          <div className="bg-muted/50 rounded-xl p-3 lg:p-4">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                {selectedJob.job_highlights?.Qualifications && (
                  <div className="mb-3">
                    <h5 className="text-foreground mb-2 text-sm font-medium">
                      Qualifications
                    </h5>
                    <ul className="text-muted-foreground list-disc space-y-1 pl-4 text-xs">
                      {selectedJob.job_highlights.Qualifications.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedJob.job_highlights?.Responsibilities && (
                  <div>
                    <h5 className="text-foreground mb-2 text-sm font-medium">
                      Responsibilities
                    </h5>
                    <ul className="text-muted-foreground list-disc space-y-1 pl-4 text-xs">
                      {selectedJob.job_highlights.Responsibilities.map(
                        (r, i) => (
                          <li key={i}>{r}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-col gap-3 sm:flex-row"
          role="group"
          aria-label="Job actions"
        >
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground focus:ring-ring flex-1 rounded-lg py-2.5 font-medium focus:ring-2 focus:ring-offset-2 lg:py-3">
            Apply now
          </Button>
          <Button
            variant="outline"
            className="focus:ring-ring flex-1 rounded-lg py-2.5 font-medium focus:ring-2 focus:ring-offset-2 lg:py-3"
          >
            Notify me
          </Button>
        </div>
      </div>
    </div>
  );
}
