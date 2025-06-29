type ContentLayoutProps = {
  title?: string;
  description?: string;
  header?: React.ReactNode;
  children: React.ReactNode;
};

export function ContentLayout({
  title,
  description,
  header,
  children,
}: ContentLayoutProps) {
  return (
    <section className="page-container">
      <div className="flex md:flex-row flex-col space-y-4 px-4 max-w-[1300px] w-full mx-auto mt-16">
        <div className="flex flex-col justify-center space-y-2 p-2 md:w-1/3 w-full pr-12">
          {title && <h3 className="text-3xl text-gray-100">{title}</h3>}
          {description && <p className="text-gray-400">{description}</p>}
        </div>
        <div className="md:w-2/3 w-full">
          {header}
          {children}
        </div>
      </div>
    </section>
  );
}
