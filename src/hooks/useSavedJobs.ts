'use client';

import { useState, useEffect, useCallback } from 'react';
import { Job } from '@/types/jobs';
import { toast } from 'sonner';

const SAVED_JOBS_KEY = 'wayhire_saved_jobs';

export function useSavedJobs() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load saved jobs from localStorage on mount
  useEffect(() => {
    if (!isClient) return;

    try {
      const stored = localStorage.getItem(SAVED_JOBS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSavedJobs(parsed);
      }
    } catch (error) {
      console.error('Error loading saved jobs:', error);
    } finally {
      setIsLoading(false);
      setHasInitialized(true);
    }
  }, [isClient]);

  // Save jobs to localStorage whenever savedJobs changes (but not on initial load)
  useEffect(() => {
    if (!isLoading && isClient && hasInitialized) {
      try {
        localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobs));
      } catch (error) {
        console.error('Error saving jobs to localStorage:', error);
      }
    }
  }, [savedJobs, isLoading, isClient, hasInitialized]);

  const saveJob = useCallback(
    (job: Job) => {
      const isAlreadySaved = savedJobs.some(
        (savedJob) => savedJob.job_id === job.job_id
      );
      if (isAlreadySaved) {
        return;
      }

      setSavedJobs((prev) => [job, ...prev]);

      toast.success('Job saved successfully!', {
        description: `${job.job_title} at ${job.employer_name}`,
        duration: 3000,
      });
    },
    [savedJobs]
  );

  const unsaveJob = useCallback(
    (jobId: string) => {
      const jobToRemove = savedJobs.find((job) => job.job_id === jobId);
      if (!jobToRemove) {
        return;
      }

      setSavedJobs((prev) => prev.filter((job) => job.job_id !== jobId));

      toast.success('Job removed from saved!', {
        description: `${jobToRemove.job_title} at ${jobToRemove.employer_name}`,
        duration: 3000,
      });
    },
    [savedJobs]
  );

  const isJobSaved = useCallback(
    (jobId: string) => {
      return savedJobs.some((job) => job.job_id === jobId);
    },
    [savedJobs]
  );

  const toggleSaveJob = useCallback(
    (job: Job) => {
      if (isJobSaved(job.job_id)) {
        unsaveJob(job.job_id);
      } else {
        saveJob(job);
      }
    },
    [isJobSaved, saveJob, unsaveJob]
  );

  return {
    savedJobs,
    saveJob,
    unsaveJob,
    isJobSaved,
    toggleSaveJob,
    isLoading,
  };
}
