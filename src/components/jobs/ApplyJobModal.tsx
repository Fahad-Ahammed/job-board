'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Job } from '@/types/jobs';
import { toast } from 'sonner';

interface ApplyJobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (jobId: string) => void;
}

export default function ApplyJobModal({
  job,
  isOpen,
  onClose,
  onApply,
}: ApplyJobModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setEmail('');
      setLinkedin('');
      setResume(null);
      setErrors({});
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!linkedin) {
      newErrors.linkedin = 'LinkedIn URL is required';
    } else if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(linkedin)) {
      newErrors.linkedin = 'LinkedIn URL is invalid';
    }
    if (!resume) {
      newErrors.resume = 'Resume is required';
    } else if (resume.type !== 'application/pdf') {
      newErrors.resume = 'Only PDF files are allowed.';
    } else if (resume.size > 200 * 1024) {
      // 200KB
      newErrors.resume = 'File size cannot exceed 200KB.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && job) {
      // Simulate API call
      console.log({ name, email, linkedin, resume });
      onApply(job.job_id);
      toast.success(`You have successfully applied for ${job.job_title}.`);
      onClose();
    }
  };

  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for {job.job_title}</DialogTitle>
          <DialogDescription>
            Fill out the form below to submit your application.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="linkedin" className="text-right">
                LinkedIn
              </Label>
              <div className="col-span-3">
                <Input
                  id="linkedin"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className={errors.linkedin ? 'border-red-500' : ''}
                />
                {errors.linkedin && (
                  <p className="mt-1 text-xs text-red-500">{errors.linkedin}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">
                Resume
              </Label>
              <div className="col-span-3">
                <Input
                  id="resume"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) =>
                    setResume(e.target.files ? e.target.files[0] : null)
                  }
                  className={errors.resume ? 'border-red-500' : ''}
                />
                {errors.resume && (
                  <p className="mt-1 text-xs text-red-500">{errors.resume}</p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
