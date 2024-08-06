interface SkeletonPropTypes {
  width: string;
  height?: string;
  rounded?: 'rounded-default' | 'rounded-none' | 'rounded-full';
  className?: string;
}

const Skeleton = ({
  width,
  height = 'h-20',
  rounded = 'rounded-default',
  className = '',
}: SkeletonPropTypes) => {
  return (
    <div
      className={`bg-bright-gray animate-pulse ${width} ${height} ${rounded} ${className}`}
    ></div>
  );
};

export default Skeleton;
