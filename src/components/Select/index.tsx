import { FC } from 'react';

type TSelectProps = {
  title: string;
  options: { label: string; value: number }[];
  onSelect: (value: string) => void;
  value: number;
};

export const Select: FC<TSelectProps> = ({ onSelect, options, title, value }) => {
  return (
    <label>
      {title}
      <select value={value} onChange={(e) => onSelect(e.target.value)}>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
};
