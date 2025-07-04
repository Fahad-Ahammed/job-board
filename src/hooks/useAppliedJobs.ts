'use client';

import { useState, useEffect, useCallback } from 'react';

export const useAppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedJobs = localStorage.getItem('appliedJobs');
      if (storedJobs) {
        setAppliedJobs(JSON.parse(storedJobs));
      }
    } catch (error) {
      console.error('Failed to parse applied jobs from localStorage', error);
      setAppliedJobs([]);
    }
  }, []);

  const addAppliedJob = useCallback((jobId: string) => {
    setAppliedJobs((prev) => {
      const newAppliedJobs = [...prev, jobId];
      try {
        localStorage.setItem('appliedJobs', JSON.stringify(newAppliedJobs));
      } catch (error) {
        console.error('Failed to save applied jobs to localStorage', error);
      }
      return newAppliedJobs;
    });
  }, []);

  const isJobApplied = useCallback(
    (jobId: string) => appliedJobs.includes(jobId),
    [appliedJobs]
  );

  return { appliedJobs, addAppliedJob, isJobApplied };
};
