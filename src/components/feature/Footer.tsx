import { Link, useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const [route, hash] = path.split('#');
    
    if (window.location.pathname === route || (route === '/' && window.location.pathname === '/')) {
      // Same page - just scroll to element
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      // Different page - navigate first, then scroll
      navigate(route || '/');
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4 sm:mb-6">
              <img
                src="https://storage.readdy-site.link/project_files/e867a79c-6ad4-431f-b9b4-472c3bcdc336/8195c097-6839-48ae-86dc-51bd07febc5a_ChatGPT_Image_Feb_9__2026__10_18_46_AM-removebg-preview.png?v=7367ed1f2953d9fa10cf29e8cd5c7ddc"
                alt="VerifyAfrica"
                title="VerifyAfrica – AI-Powered Compliance &amp; Identity Infrastructure for Africa"
                className="h-24 sm:h-28 lg:h-36 w-auto object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4 sm:mb-6">
              AI-powered compliance and identity infrastructure for Africa.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="https://www.linkedin.com/company/verifyafrica"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-teal-500 transition-colors cursor-pointer"
                aria-label="LinkedIn"
              >
                <i className="ri-linkedin-fill text-base sm:text-lg"></i>
              </a>
              <a
                href="https://x.com/V3rifyAfrica"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-teal-500 transition-colors cursor-pointer"
                aria-label="Twitter"
              >
                <i className="ri-twitter-x-line text-base sm:text-lg"></i>
              </a>
              <a
                href="https://www.instagram.com/verifyafrica1/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-teal-500 transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <i className="ri-instagram-line text-base sm:text-lg"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/about" className="text-xs sm:text-sm hover:text-teal-400 transition-colors cursor-pointer">
                  About
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-xs sm:text-sm hover:text-teal-400 transition-colors cursor-pointer">
                  Features
                </Link>
              </li>
              <li>
                <a 
                  href="/#pricing" 
                  onClick={(e) => handleAnchorClick(e, '/#pricing')}
                  className="text-xs sm:text-sm hover:text-teal-400 transition-colors cursor-pointer"
                >
                  Pricing
                </a>
              </li>
              <li>
                <Link to="/docs" className="text-xs sm:text-sm hover:text-teal-400 transition-colors cursor-pointer">
                  API Docs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/cookie-policy" className="text-xs sm:text-sm hover:text-teal-400 transition-colors cursor-pointer">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-xs sm:text-sm hover:text-teal-400 transition-colors cursor-pointer">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-xs sm:text-sm hover:text-teal-400 transition-colors cursor-pointer">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/data-disposal-policy" className="text-xs sm:text-sm hover:text-teal-400 transition-colors cursor-pointer">
                  Data Disposal Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/blog" className="text-xs sm:text-sm hover:text-teal-400 transition-colors cursor-pointer">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-xs sm:text-sm hover:text-teal-400 transition-colors cursor-pointer">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-xs sm:text-sm hover:text-teal-400 transition-colors cursor-pointer">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">© 2026 VerifyAfrica. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
