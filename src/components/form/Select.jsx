import { useState } from "react";
import { ChevronDownIcon } from "../../layout/AppSidebar";

const Select = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className="relative w-full">

      <select
        value={selectedValue}
        onChange={handleChange}
        className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 ${selectedValue ? "text-gray-800" : "text-gray-400"
          } ${className}`}
      >
        {/* Placeholder */}
        <option value="" disabled className="text-gray-700">
          {placeholder}
        </option>

        {/* Options */}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray-700"
          >
            {option.label}
          </option>
        ))}
      </select>

      {/* Dropdown Icon */}
      <ChevronDownIcon
        className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
};

export default Select;
