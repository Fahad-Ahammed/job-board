'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Bookmark,
  Building,
  DollarSign,
  Home,
  Search,
  Settings,
  Briefcase,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/theme/mode-toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Close settings dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isSettingsOpen && !target.closest('[data-settings-dropdown]')) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSettingsOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/', icon: Home, label: 'Dashboard' },
    { href: '/jobs', icon: Search, label: 'Find Jobs' },
    { href: '/companies', icon: Building, label: 'Companies' },
    { href: '/applications', icon: Briefcase, label: 'My Applications' },
    { href: '/analytics', icon: DollarSign, label: 'Analytics' },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="relative p-6">
        {/* Close button for mobile only */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 min-[400px]:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={20} />
        </Button>
        <div className="flex items-center space-x-3">
          <div
            className="bg-foreground text-background flex h-10 w-10 items-center justify-center rounded-lg text-2xl font-bold"
            aria-label="Wayhire logo"
          >
            W
          </div>
          <span className="text-foreground text-xl font-bold">Wayhire</span>
        </div>
      </div>

      {/* Divider */}
      <div className="px-4 pb-4">
        <div className="border-border/50 border-b"></div>
      </div>

      <nav className="flex-1 space-y-2 px-4">
        {navLinks.map((link) => (
          <Button
            key={link.href}
            asChild
            variant={
              pathname === link.href ||
              (link.href === '/jobs' && pathname.startsWith('/jobs'))
                ? 'secondary'
                : 'ghost'
            }
            className="text-foreground hover:text-foreground w-full justify-start transition-all duration-200"
          >
            <Link href={link.href}>
              <link.icon size={20} className="text-foreground mr-3" />
              {link.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="mt-auto space-y-3 p-4">
        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-muted/30 hover:bg-muted/50 border-border flex h-16 flex-col items-center justify-center gap-2"
                >
                  <Bookmark
                    size={20}
                    className="text-muted-foreground size-[18px]"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Saved Jobs</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="relative" data-settings-dropdown>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-muted/30 hover:bg-muted/50 border-border flex h-16 w-full flex-col items-center justify-center gap-2"
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  >
                    <Settings
                      size={20}
                      className="text-muted-foreground size-[18px]"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Settings Dropdown - Desktop Only */}
            {isSettingsOpen && (
              <div className="bg-background border-border absolute right-0 bottom-full z-50 mb-2 hidden w-48 rounded-lg border p-3 shadow-lg md:block">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground text-sm font-medium">
                      Theme
                    </span>
                    <ModeToggle />
                  </div>
                  <div className="border-border border-t pt-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm"
                    >
                      <Settings size={16} className="mr-2" />
                      Preferences
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile section */}
        <div className="bg-muted/30 border-border rounded-lg border p-4">
          <div className="flex items-center">
            <Image
              className="h-10 w-10 rounded-lg"
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Matt Frost"
              width={40}
              height={40}
              quality={100}
            />
            <div className="ml-3 flex-1">
              <p className="text-foreground text-sm font-semibold">
                Matt Frost
              </p>
              <p className="text-muted-foreground text-xs">SDE-II Frontend</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="bg-background/95 border-border fixed top-0 right-0 left-0 z-40 flex items-center justify-between border-b px-4 py-3 backdrop-blur-sm md:hidden">
        <div className="flex items-center space-x-2">
          <div className="bg-foreground text-background flex h-8 w-8 items-center justify-center rounded-lg text-lg font-bold">
            W
          </div>
          <span className="text-foreground text-lg font-bold">Wayhire</span>
        </div>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        className="bg-background border-border fixed top-0 left-0 z-30 hidden h-screen w-64 max-w-[250px] flex-col border-r shadow-sm md:flex"
        role="navigation"
        aria-label="Main navigation"
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`bg-background border-border fixed top-0 left-0 z-50 flex h-screen w-64 transform flex-col border-r shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <SidebarContent />
      </aside>
    </>
  );
}

export default Sidebar;
