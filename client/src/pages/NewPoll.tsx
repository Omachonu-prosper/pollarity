import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import InputField from "../components/InputField";

function NewPoll() {
  const [optionFields, setOptionFields] = useState<string[]>(["", ""]);
  const [canAddField, setCanAddField] = useState(true);

  useEffect(() => {
    document.title = "New Poll - Pollarity";
  }, []);

  function handleAddOption() {
    if (optionFields.length < 10) {
      setOptionFields([...optionFields, ""]);
      if (optionFields.length == 9) setCanAddField(false);
    }
  }

  return (
    <div className="container w-3/4 mx-auto my-10">
      <h2 className="mb-5 text-lg">Create a new poll</h2>

      <form>
        <h3 className="text-sm">Poll title</h3>
        <InputField
          label=""
          type="text"
          name="title"
          id="title"
          placeholder=""
          required={true}
          // onChange={onChangeListener}
        />

        <div className="mt-5">
          <h3 className="text-sm">Options</h3>

          {optionFields.map((optionField, index) => (
            <div key={index} className="flex gap-1 items-center mt-3">
              <InputField
                label=""
                type="text"
                name={"option-" + index}
                id="option"
                placeholder=""
                required={true}
                classNames="grow"
                key={index}
                // onChange={onChangeListener}
              />
              <div className="flex items-center pt-2">
                <Icon icon="tabler:trash" className="text-2xl text-red-400" />
              </div>
            </div>
          ))}

          <div
            className={`mt-3 inline-block  cursor-pointer rounded-md px-3 py-1 ${
              canAddField
                ? "bg-indigo-600 hover:bg-indigo-400 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            onClick={handleAddOption}
          >
            Add option <Icon icon="si:add-fill" />
          </div>
        </div>

        <button className="bg-indigo-800 hover:bg-indigo-700 text-white py-2 px-3 mt-5 rounded-md inline-block">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPoll;
