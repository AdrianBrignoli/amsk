interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`max-w-[1300px] mx-auto w-full ${className}`}>
      {children}
    </div>
  );
}
