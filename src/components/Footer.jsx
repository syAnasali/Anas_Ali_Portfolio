import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative mt-12 border-t border-border bg-card pt-12 pb-8 px-4">
     
      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
        <a
          href="#hero"
          aria-label="Scroll back to top"
          className="group flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-primary/30">
          <ArrowUp
            size={20}
            className="transition-transform group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()}{' '}
            <span className="font-medium text-blue-700">Anas Ali</span>. All
            rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/80">
            Designed, Developed and Maintained by Anas Ali.
          </p>
        </div>
      </div>
    </footer>
  );
};
