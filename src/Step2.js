import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addAdvantage,
  addCheckbox,
  addRadio,
  backStep,
  nextStep,
} from "./store/rootSlice";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Radio, RadioGroup } from "@mui/material";

function Step2() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      text: ["Placeholder"],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "text",
  });

  const onSubmit = (data) => {
    if (data.text.length > 0) {
          dispatch(addAdvantage(data.text));
    }
    dispatch(addCheckbox(data.checkbox));
    dispatch(addRadio(data.radio));
    dispatch(nextStep());
    navigate("step3");
  };

  const onHandleBackStep = () => {
    dispatch(backStep(1));
    navigate(-1);
  };

  const removeItem = (index) => {
    remove(index);
  };

  return (
    <>
      <div className="container">
        <form className="secondForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <label>Advantages</label>
            {fields.map((item, index) => {
              return (
                <div key={item.id} className="block-advantage">
                  <div className="block-text">
                    <input
                      type="text"
                      {...register(`text.${index}`, {
                        required: "Обязательное поле",
                        minLength: {
                          value: 3,
                          message: "Минимум 3 символа",
                        },
                        maxLength: {
                          value: 50,
                          message: "Максимум 50 символов",
                        },
                      })}
                    />
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => removeItem(index, item)}
                    ></button>
                  </div>
                  {errors?.["text"] && (
                    <p className="par-error" role="alert">
                      {errors?.["text"]?.[index]?.["message"]}
                    </p>
                  )}
                </div>
              );
            })}

            <div
              className="btn-add"
              onClick={() => {
                append("Placeholder");
              }}
            >
              <input disabled className="input-add" />
            </div>
          </div>

          <div className="block-checkbox">
            <label>Checkbox group</label>
            {[1, 2, 3].map((value, index) => (
              <FormControlLabel
                label={value}
                key={index}
                control={
                  <Checkbox
                    key={value}
                    type="checkbox"
                    value={value}
                    {...register("checkbox", {
                      required: "Обязательное поле",
                    })}
                  />
                }
              />
            ))}
            {errors.checkbox && (
              <p className="par-error" role="alert">
                {errors.checkbox?.message}
              </p>
            )}
          </div>

          <div className="block-radioGroup">
            <label>Radio group</label>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
            >
              {[1, 2, 3].map((value, index) => (
                <FormControlLabel
                  label={value}
                  key={index}
                  control={
                    <Radio
                      key={value}
                      value={value}
                      {...register("radio", {
                        required: "Обязательное поле",
                      })}
                    />
                  }
                />
              ))}
            </RadioGroup>
            {errors.radio && (
              <p className="par-error" role="alert">
                {errors.radio?.message}
              </p>
            )}
          </div>

          <div className="block-buttons">
            <button type="submit" disabled={!isValid} className="btn">
              Далее
            </button>
          </div>
        </form>
        <button className="btn-back" onClick={onHandleBackStep}>
          Назад
        </button>
      </div>
    </>
  );
}

export default Step2;
