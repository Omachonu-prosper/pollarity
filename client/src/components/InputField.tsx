interface Props {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  classNames?: string;
}

function InputField({ label, type, name, id, placeholder, classNames }: Props) {
  return (
    <div className={"sm:col-span-4 " + classNames}>
      <label className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>

      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
          <input
            type={type}
            name={name}
            id={id}
            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
}

export default InputField;