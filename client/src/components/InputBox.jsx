export const InputBox = ({label, type, value, onChange, error, min, max}) => {
  return (
    <div className="mb-4">
      <label htmlFor={label} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        min={min}
        max={max}
        type={type}
        id={label}
        className={`mt-1 block w-full border-b ${error ? 'border-red-500' : 'border-gray-300'}`}
        placeholder={`Enter your ${label.toLowerCase()}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

