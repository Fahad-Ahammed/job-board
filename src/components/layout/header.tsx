import { ModeToggle } from '@/components/theme/mode-toggle';

export default function Header() {
  return (
    <header className="flex justify-end p-4">
      <ModeToggle />
    </header>
  );
}
