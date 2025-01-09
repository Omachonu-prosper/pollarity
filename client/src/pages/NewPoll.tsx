import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import { newPoll } from "../services/api";
import { useNavigate } from "react-router";
import InputField from "../components/InputField";
import Alert from "../components/Alert";

function NewPoll() {
  const navigate = useNavigate();
  const [optionFields, setOptionFields] = useState<string[]>(["", ""]);
  const [titleField, setTitleField] = useState("");
  const [canAddField, setCanAddField] = useState(true);
  const [canDeleteField, setCanDeleteField] = useState(false);
  const [alertState, setAlertState] = useState({
    display: false,
    color: "",
    message: "",
  });

  useEffect(() => {
    document.title = "New Poll - Pollarity";
  }, []);

  function showAlert(message: string, color: string) {
    setAlertState({
      display: true,
      color: color,
      message: message,
    });
    setTimeout(() => {
      setAlertState({
        display: false,
        color: "",
        message: "",
      });
    }, 5000);
  }

  function handleAddOption() {
    if (optionFields.length < 10) {
      setOptionFields([...optionFields, ""]);
      setCanDeleteField(true);
      if (optionFields.length == 9) setCanAddField(false);
    }
  }

  function handleDeleteOption(index: number) {
    if (optionFields.length > 2) {
      setOptionFields(optionFields.filter((_, i) => i !== index));
      setCanAddField(true);
      if (optionFields.length == 3) setCanDeleteField(false);
    }
  }

  function handleInputChange(index: number, value: string) {
    const updatedFields = [...optionFields];
    updatedFields[index] = value;
    setOptionFields(updatedFields);
  }

  function handleTitleChange(value: string) {
    setTitleField(value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let apiReq = await newPoll(titleField, optionFields);
    if (apiReq.success) {
      navigate(`/dashboard/poll/${apiReq.ref}`);
    } else {
      showAlert(
        "Could Not create poll! Refresh the page and try again",
        "bg-red-400"
      );
    }
  }

  return (
    <div className="container w-3/4 mx-auto my-10">
      <Alert
        display={alertState.display}
        color={alertState.color}
        message={alertState.message}
      />

      <h2 className="mb-5 text-lg">Create a new poll</h2>

      <form onSubmit={handleSubmit}>
        <h3 className="text-sm">Poll title</h3>
        <InputField
          label=""
          type="text"
          name="title"
          id="title"
          placeholder=""
          required={true}
          onChange={(e) => {
            handleTitleChange(e.target.value);
          }}
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
                value={optionField}
                onChange={(e) => {
                  handleInputChange(index, e.target.value);
                }}
              />
              <div
                className="flex items-center pt-2"
                onClick={() => {
                  handleDeleteOption(index);
                }}
              >
                <Icon
                  icon="tabler:trash"
                  className={`text-2xl ${
                    canDeleteField
                      ? "text-red-400 cursor-pointer"
                      : "text-gray-200 cursor-not-allowed"
                  }`}
                />
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
