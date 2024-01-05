type OptionType = { value: string, label: string };


interface Props {
  selectedValue: string;
  options: OptionType[];
  onUpdate: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className: string;
}

const Selector = ({ selectedValue, options, onUpdate, className }: Props) => {
  const renderOptions = (options: OptionType[]) => {
    return options.map(option => {
      return (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      );
    });
  }

  return (
    <select defaultValue={selectedValue} onChange={onUpdate} className={`select ${className}`}>
      { renderOptions(options) }
    </select>
  )
}

Selector.defaultProps = {
  className: ''
}

export default Selector;
