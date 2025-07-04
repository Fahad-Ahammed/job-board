'use client';

import { useState, useEffect } from 'react';
import { useSavedJobs } from '@/hooks/useSavedJobs';
import { useAppliedJobs } from '@/hooks/useAppliedJobs';
import { Job } from '@/types/jobs';
import Image from 'next/image';
import {
  MapPin,
  Bookmark,
  ChevronRight,
  ArrowLeft,
  BookmarkX,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ApplyJobModal from '@/components/jobs/ApplyJobModal';

export default function SavedJobsPage() {
  const { savedJobs, toggleSaveJob, isLoading } = useSavedJobs();
  const { isJobApplied, addAppliedJob } = useAppliedJobs();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Clear selected job if it's no longer in saved jobs
  useEffect(() => {
    if (
      selectedJob &&
      !savedJobs.some((job) => job.job_id === selectedJob.job_id)
    ) {
      setSelectedJob(null);
      setShowJobDetails(false);
    }
  }, [savedJobs, selectedJob]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">Loading saved jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col xl:flex-row">
      {/* Mobile Header - Only visible on mobile */}
      <div className="bg-background border-border border-b p-4 xl:hidden">
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
            {showJobDetails && selectedJob
              ? selectedJob.job_title
              : 'Saved Jobs'}
          </h1>
        </div>
      </div>

      {/* Left Panel - Saved Jobs List */}
      <div
        className={`bg-background flex w-full flex-col p-4 xl:w-2/3 xl:p-6 ${showJobDetails ? 'hidden xl:flex' : 'flex'}`}
      >
        {/* Desktop header - hidden on mobile when no job details */}
        <div
          className={`mb-6 ${showJobDetails ? 'hidden xl:block' : 'hidden xl:block'}`}
        >
          <h1 className="text-foreground text-2xl font-bold">Saved Jobs</h1>
          <p className="text-muted-foreground text-sm">
            {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
          </p>
        </div>

        {/* Mobile-optimized subtitle - only show count */}
        <div className="mb-4 xl:hidden">
          <p className="text-muted-foreground text-sm">
            {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
          </p>
        </div>

        {/* Saved Jobs List */}
        <div className="flex-1 overflow-y-auto">
          {savedJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted mb-4 rounded-full p-4">
                <BookmarkX className="text-muted-foreground h-8 w-8" />
              </div>
              <p className="text-muted-foreground mb-2 text-lg">
                No saved jobs yet
              </p>
              <p className="text-muted-foreground text-sm">
                Save jobs while browsing to view them here
              </p>
            </div>
          ) : (
            <div className="space-y-3 xl:space-y-4">
              {savedJobs.map((job) => (
                <button
                  key={job.job_id}
                  className={`w-full cursor-pointer rounded-lg border p-3 text-left transition-all duration-300 xl:p-4 ${
                    selectedJob?.job_id === job.job_id
                      ? 'border-primary/30 bg-muted/60 dark:bg-muted/10'
                      : 'hover:border-primary/30 dark:hover:border-primary/40 bg-card'
                  }`}
                  onClick={() => {
                    setSelectedJob(job);
                    setShowJobDetails(true);
                    setIsDescriptionExpanded(false);
                  }}
                >
                  <div className="flex items-center gap-3 xl:gap-4">
                    {/* Company Logo */}
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-lg xl:text-xl"
                      aria-hidden="true"
                    >
                      {job.employer_logo ? (
                        <Image
                          src={job.employer_logo}
                          alt="company logo"
                          width={40}
                          height={40}
                        />
                      ) : (
                        '🏢'
                      )}
                    </div>

                    {/* Job Details */}
                    <div className="min-w-0 flex-1">
                      <div className="xl:flex xl:items-center xl:gap-4">
                        <div className="mb-2 min-w-0 flex-1 xl:mb-0">
                          <h3 className="text-foreground text-sm font-semibold xl:text-sm">
                            {job.job_title}
                          </h3>
                          <p className="text-muted-foreground text-xs">
                            {job.employer_name}
                          </p>
                        </div>

                        <div className="hidden min-w-0 xl:block xl:w-48">
                          <p className="text-foreground text-sm font-medium">
                            {job.job_city}, {job.job_state}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Location
                          </p>
                        </div>

                        <div className="flex-shrink-0 xl:w-32 xl:text-right">
                          <p className="text-foreground text-sm font-semibold">
                            {job.job_min_salary && job.job_max_salary
                              ? `$${job.job_min_salary} - $${job.job_max_salary}`
                              : 'N/A'}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {job.job_salary_period || 'HOUR'}
                          </p>
                        </div>
                      </div>

                      <div className="text-muted-foreground mt-2 flex items-center gap-1 xl:hidden">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs">
                          {job.job_city}, {job.job_state}
                        </span>
                      </div>
                    </div>

                    <div className="xl:hidden">
                      <ChevronRight className="text-muted-foreground h-4 w-4" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Job Details */}
      <div
        className={`bg-background border-border flex w-full flex-col border-l p-4 max-xl:mx-auto max-xl:max-w-[700px] max-xl:border-l-0 xl:w-1/3 xl:overflow-scroll xl:p-6 ${showJobDetails ? 'flex' : 'hidden xl:flex'}`}
      >
        {selectedJob ? (
          <>
            {/* Company Header */}
            <div className="mb-4 border-b pt-6 pb-4 text-center xl:pt-12 xl:pb-5">
              <div
                className="bg-muted mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg text-2xl xl:h-16 xl:w-16 xl:text-3xl"
                aria-hidden="true"
              >
                {selectedJob.employer_logo ? (
                  <Image
                    src={selectedJob.employer_logo}
                    alt="company logo"
                    width={40}
                    height={40}
                  />
                ) : (
                  '🏢'
                )}
              </div>
              <h2 className="text-foreground text-lg font-bold xl:text-xl">
                {selectedJob.employer_name}
              </h2>
              <p className="text-muted-foreground text-sm">
                {selectedJob.employer_company_type}
              </p>
            </div>

            {/* Job Title with Location and Bookmark */}
            <div className="mb-4 border-b pb-4 xl:mb-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-foreground pr-2 text-lg font-semibold">
                  {selectedJob.job_title}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="focus:ring-ring flex-shrink-0 border-none p-2 text-amber-600 transition-colors duration-200 hover:bg-amber-50 hover:text-amber-700 focus:ring-2 dark:text-amber-400 dark:hover:bg-amber-950/20 dark:hover:text-amber-300"
                  onClick={() => toggleSaveJob(selectedJob)}
                  aria-label="Remove from saved jobs"
                >
                  <Bookmark className="h-4 w-4 fill-current transition-all duration-200" />
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
            <div className="mb-4 xl:mb-6">
              <h4 className="text-foreground mb-3 font-semibold">
                Description
              </h4>
              <div
                className={`relative overflow-hidden transition-all duration-300 ease-in-out ${
                  isDescriptionExpanded
                    ? 'max-h-[2000px]'
                    : 'line-clamp-4 max-h-20'
                }`}
              >
                <p className="text-muted-foreground text-xs leading-relaxed xl:text-xs">
                  {selectedJob.job_description}
                </p>
              </div>
              <button
                className="text-primary mt-2 cursor-pointer rounded text-sm font-medium transition-colors duration-200 hover:text-white hover:underline focus:outline-none"
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              >
                {isDescriptionExpanded ? 'Read less' : 'Read more'}
              </button>
            </div>

            <hr className="border-border mb-4 xl:mb-6" />

            {/* Job Highlights */}
            <div className="mb-4 flex-1 xl:mb-6">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-foreground font-semibold">
                  Job Highlights
                </h4>
              </div>

              <div className="bg-muted/50 rounded-xl p-3 xl:p-4">
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    {selectedJob.job_highlights?.Qualifications && (
                      <div className="mb-3">
                        <h5 className="text-foreground mb-2 text-sm font-medium">
                          Qualifications
                        </h5>
                        <ul className="text-muted-foreground list-disc space-y-1 pl-4 text-xs">
                          {selectedJob.job_highlights.Qualifications.map(
                            (q, i) => (
                              <li key={i}>{q}</li>
                            )
                          )}
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
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground focus:ring-ring flex-1 rounded-lg py-2.5 font-medium focus:ring-2 focus:ring-offset-2 xl:py-3"
                onClick={() => setIsApplyModalOpen(true)}
                disabled={isJobApplied(selectedJob.job_id)}
              >
                {isJobApplied(selectedJob.job_id) ? 'Applied' : 'Apply now'}
              </Button>
              <Button
                variant="outline"
                className="focus:ring-ring flex-1 rounded-lg py-2.5 font-medium focus:ring-2 focus:ring-offset-2 xl:py-3"
                disabled={isJobApplied(selectedJob.job_id)}
              >
                Notify me
              </Button>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-2 text-lg">
                Select a saved job
              </p>
              <p className="text-muted-foreground text-sm">
                Choose a job from the list to view details
              </p>
            </div>
          </div>
        )}
      </div>
      {selectedJob && (
        <ApplyJobModal
          job={selectedJob}
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          onApply={addAppliedJob}
        />
      )}
    </div>
  );
}
