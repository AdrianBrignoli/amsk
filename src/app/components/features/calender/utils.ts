export const getTileClassName = (date: Date, newsDates: string[], competitionDates: string[]) => {
  const dateString = date.toISOString().split("T")[0];
  const isNews = newsDates.some(d => d.split("T")[0] === dateString);
  const isComp = competitionDates.some(d => d.split("T")[0] === dateString);

  if (isNews && isComp) return "newsComp";
  if (isNews) return "news";
  if (isComp) return "competition";
  return "hover:bg-gray-800";
}; 