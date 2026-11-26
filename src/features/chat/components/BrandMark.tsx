type BrandMarkProps = {
  className?: string;
};

const BrandMark = ({ className }: BrandMarkProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    viewBox="0 0 40 40"
  >
    <circle cx="20" cy="7" r="3" fill="currentColor" />
    <circle cx="10.8" cy="12.2" r="3" fill="currentColor" />
    <circle cx="29.2" cy="12.2" r="3" fill="currentColor" />
    <circle cx="7" cy="22" r="3" fill="currentColor" />
    <circle cx="33" cy="22" r="3" fill="currentColor" />
    <circle cx="11" cy="31" r="3" fill="currentColor" />
    <circle cx="29" cy="31" r="3" fill="currentColor" />
    <circle cx="20" cy="35" r="3" fill="currentColor" />
    <circle cx="20" cy="21" r="4" fill="currentColor" />
  </svg>
);

export default BrandMark;
