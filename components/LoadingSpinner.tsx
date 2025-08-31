import { LucideIcon } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  icon?: LucideIcon;
}

export default function LoadingSpinner({ size = 'md', text, icon: Icon }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {Icon && (
        <div className="relative">
          <Icon className={`${sizeClasses[size]} text-blue-400 animate-pulse`} />
          <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg animate-pulse"></div>
        </div>
      )}
      
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-blue-500/30 border-t-blue-500`}></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400 animate-spin" style={{ animationDuration: '1.5s' }}></div>
      </div>
      
      {text && (
        <p className={`${textSizes[size]} text-gray-300 text-center`}>
          {text}
        </p>
      )}
    </div>
  );
}
