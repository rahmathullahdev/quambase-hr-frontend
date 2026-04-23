import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background-secondary px-4">
      <div className="text-center animate-slide-up">
        <div className="text-[120px] font-display font-extrabold text-gradient leading-none select-none mb-4">
          404
        </div>
        <h2 className="text-2xl font-display font-bold text-text-primary mb-2">
          Page not found
        </h2>
        <p className="text-text-secondary max-w-sm mx-auto mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl font-semibold transition-all duration-150 bg-accent-primary hover:bg-accent-secondary text-white px-6 py-2.5 text-sm shadow-button"
        >
          <Home size={16} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
