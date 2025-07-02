import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function InteractiveHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let resizeTimer: number;
    const isHomePage = window.location.pathname === '/';

    const handleNavState = () => {
      if (isHomePage) {
        setIsScrolled(window.scrollY > 50);
      } else {
        setIsScrolled(true);
      }
    };

    const handleResize = () => {
      setIsResizing(true);
      handleNavState();
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setIsResizing(false);
      }, 250);
    };

    window.addEventListener('scroll', handleNavState);
    window.addEventListener('resize', handleResize);
    handleNavState();

    return () => {
      window.removeEventListener('scroll', handleNavState);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navClasses = `main-nav p-4 flex items-center ${isScrolled ? 'nav-scrolled' : 'nav-top'} ${isResizing ? 'is-resizing' : ''}`;
  const headerContainerClasses = `header-container fixed top-0 left-0 right-0 z-50 flex justify-center ${isScrolled ? '' : 'pt-4'}`;

  return (
    <header id="header-container" className={headerContainerClasses}>
      <nav id="main-nav" className={navClasses}>
        <div className="nav-content-wrapper w-full flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2 transition-transform hover:scale-105 z-10">
            <Logo className="h-8 w-8 text-[var(--cyan)]" />
            <span className="text-xl font-bold text-[var(--white)]">Innotec</span>
          </a>
          
          <div className="hidden lg:flex items-center space-x-6">
            <a href="/#services" className="text-[var(--light-slate)] hover:text-[var(--cyan)] transition-colors">Services</a>
            <a href="/#about" className="text-[var(--light-slate)] hover:text-[var(--cyan)] transition-colors">About Us</a>
            <a href="/careers" className="text-[var(--light-slate)] hover:text-[var(--cyan)] transition-colors">Careers</a>
            <a href="/contact" className="text-[var(--cyan)] border border-[var(--cyan)] px-4 py-2 rounded-md hover:bg-cyan-400/10 transition-all ml-4 font-mono">
                Contact Us
            </a>
          </div>

          <button id="mobile-menu-button" className="lg:hidden text-[var(--light-slate)] ml-4 z-10" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </nav>
      
      <div id="mobile-menu" className={`mobile-menu absolute top-full left-0 w-full shadow-lg lg:hidden ${isMobileMenuOpen ? '' : 'mobile-menu-hidden'}`}>
        <div className="flex flex-col items-center p-4 space-y-4">
            <a href="/#services" className="text-[var(--lightest-slate)] hover:text-[var(--cyan)] w-full text-center py-2">Services</a>
            <a href="/#about" className="text-[var(--lightest-slate)] hover:text-[var(--cyan)] w-full text-center py-2">About Us</a>
            <a href="/careers" className="text-[var(--lightest-slate)] hover:text-[var(--cyan)] w-full text-center py-2">Careers</a>
            <a href="/contact" className="text-[var(--cyan)] border border-[var(--cyan)] px-6 py-3 rounded-md hover:bg-cyan-400/10 transition-all shadow w-full text-center mt-4">
                Contact Us
            </a>
        </div>
      </div>
    </header>
  );
}
