// components/LoadingSpinner.tsx
import { ClipLoader } from 'react-spinners';

interface LoadingSpinnerProps {
  loading?: boolean;
  size?: number;
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  loading = true,
  size = 35,
  color = '#dc2626', // Tailwind Red-600
}) => {
  return (
    <div className="flex justify-center items-center h-full">
      <ClipLoader loading={loading} size={size} color={color} />
    </div>
  );
};

export default LoadingSpinner;
