
interface Props {
  direction: 'horizontal' | 'vertical';
}

export default function AgentFlow({ direction }: Props) {
  const isHorizontal = direction === 'horizontal';

  return (
    <div
      className={`flex items-center justify-center shrink-0 ${
        isHorizontal ? 'w-8 flex-col' : 'h-8 flex-row'
      }`}
      aria-hidden="true"
    >
      <svg
        width={isHorizontal ? 32 : 48}
        height={isHorizontal ? 48 : 32}
        viewBox={isHorizontal ? '0 0 32 48' : '0 0 48 32'}
        fill="none"
        className="overflow-visible"
      >
        {isHorizontal ? (
          <>
            {/* Horizontal connector line */}
            <line
              x1="4"
              y1="24"
              x2="28"
              y2="24"
              stroke="var(--color-connection-path)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Arrow head */}
            <path
              d="M22 19 L28 24 L22 29"
              stroke="var(--color-connection-active)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </>
        ) : (
          <>
            {/* Vertical connector line */}
            <line
              x1="24"
              y1="4"
              x2="24"
              y2="28"
              stroke="var(--color-connection-path)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Arrow head */}
            <path
              d="M19 22 L24 28 L29 22"
              stroke="var(--color-connection-active)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </>
        )}
      </svg>
    </div>
  );
}
