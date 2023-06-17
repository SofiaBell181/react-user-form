import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
  addEmail,
  addPhone,
  selectEmail,
  selectPhone,
} from "../store/rootSlice";
import MaskedInput from "react-text-mask";
function Form() {
  const dispatch = useDispatch();
  const phoneUser = useSelector(selectPhone);
  const mailUser = useSelector(selectEmail);
  const navigate = useNavigate();
  const inputRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    defaultValues: { selectPhone, selectEmail },
    mode: "onChange",
  });
  const onSubmit = (data) => {
    dispatch(addPhone(data.phoneNumber));
    dispatch(addEmail(data.mail));
    navigate("create");
  };
  return (
    <>
      <form className="firstForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <label>Номер телефона</label>
          <Controller
            control={control}
            name="phoneNumber"
            rules={{
              required: "Обязательное поле",
              minLength: 16,
            }}
            render={({ field: { onChange, value } }) => (
              <MaskedInput
                mask={[
                  /[+]/,
                  /[1-9]/,
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                ]}
                value={value}
                type="text"
                ref={inputRef}
                defaultValue={phoneUser}
                onChange={onChange}
              ></MaskedInput>
            )}
          />
          {errors.phoneNumber && (
            <p className="par-error" role="alert">
              {errors.phoneNumber?.message}
            </p>
          )}
        </div>
        <div className="row">
          <label>Email</label>
          <input
            {...register("mail", {
              required: "Обязательное поле",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Введите валидный email!",
              },
            })}
            defaultValue={mailUser}
            type="text"
          />
          {errors.mail && (
            <p className="par-error" role="alert">
              {errors.mail?.message}
            </p>
          )}
        </div>
        <button type="submit" className="btn" disabled={!isValid}>
          Начать
        </button>
      </form>
    </>
  );
}
export default Form;
