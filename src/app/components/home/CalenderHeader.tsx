export default function CalenderHeader() {
  return (
    <div
      className={`
        flex text-2xl text-center w-full    
        mb-8 rounded-2xl                    
        bg-gradient-to-r                    
        from-[var(--brand-primary)]         
        to-[var(--brand-secondary)]         
      `}
    >
      <p className="p-2 w-full">Nyheter</p>
      <p className="p-2 w-full">Tävlingar</p>
    </div>
  );
}
