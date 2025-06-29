import { FC } from "react";

interface CategoryLabelProps {
  label: string;
  bgColor: string;
}

export const CategoryLabel: FC<CategoryLabelProps> = ({ label, bgColor }) => (
  <p
    className={`absolute right-0 top-0 p-1 w-20 md:w-32 text-center text-sm md:text-base rounded-tr-2xl rounded-bl-2xl bg-opacity-50`}
    style={{ backgroundColor: bgColor }}
  >
    {label}
  </p>
);
