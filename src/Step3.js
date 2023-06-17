import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addText,
  backStep,
  selectText,
  selectName,
  selectNickname,
  selectGender,
  selectAdvantage,
  selectSurname,
  selectPhone,
  selectEmail,
  selectCheckbox,
  selectRadio,
  clearAllUsers,
} from "./store/rootSlice";

function Step3() {
  const [success, setSuccess] = useState(false);
  const phoneUser = useSelector(selectPhone);
  const mailUser = useSelector(selectEmail);
  const nameUser = useSelector(selectName);
  const nicknameUser = useSelector(selectNickname);
  const surnameUser = useSelector(selectSurname);
  const genderUser = useSelector(selectGender);
  const advantageUser = useSelector(selectAdvantage);
  const choosedCheckbox = useSelector(selectCheckbox);
  const choosedRadio = useSelector(selectRadio);
  const text = useSelector(selectText);

  // let lastAdvantage =
  const requestData = {
    phone: phoneUser,
    email: mailUser,
    name: nameUser,
    nickname: nicknameUser,
    surname: surnameUser,
    gender: genderUser,
    advantage: advantageUser,
    checkbox: choosedCheckbox,
    radio: choosedRadio,
    text: text,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(requestData),
  };

  const apiUrl = "https://api.sbercloud.ru/content/v1/bootcamp/frontend";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [textArea, setTextArea] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    mode: "onBlur",
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    dispatch(addText(data.about));
    try {
      let response = await fetch(apiUrl, requestOptions);
      console.log(response.status);

      if (response.status === 200) {
        setSuccess(true);
      } else if (!response.ok) {
        console.log(response);
        setSuccess(false);
        setClose(true);
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setSuccess(false);
      setClose(true);
    }
  };

  const onHandleBackStep = () => {
    dispatch(backStep(1));
    navigate(-1);
  };

  const onChange = (e) => {
    const textLength = e.target.value;
    setTextArea(textLength.length);
  };

  const backToForm = () => {
    navigate("/");
    dispatch(backStep(2));
    dispatch(clearAllUsers());
  };
  const [close, setClose] = useState(false);
  const closeForm = () => {
    setClose(false);
  };

  return (
    <>
      <div className="container">
        <form
          className="secondForm thirdForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row">
            <label>About</label>
            <textarea
              {...register("about", {
                required: "Обязательное поле",
                minLength: {
                  value: 5,
                  message: "Минимум 5 символов",
                },
                maxLength: {
                  value: 200,
                  message: "Максимум 200 символов",
                },
              })}
              onChange={onChange}
              defaultValue={text}
              type="text"
            />
            <p className="par-count">
              {textArea === 0 ? null : textArea + "/200"}
            </p>
            {errors.about && (
              <p className="par-error" role="alert">
                {errors.about?.message}
              </p>
            )}
          </div>

          <div className="block-buttons">
            <button type="submit" className="btn">
              Отправить
            </button>
          </div>
        </form>
        <button className="btn-back" onClick={onHandleBackStep}>
          Назад
        </button>
      </div>

      {success && (
        <div className="form-allert">
          <div className="allert">
            <p>Форма успешно отправлена</p>
            <div className="icon-allert"></div>
            <button onClick={backToForm} className="btn">
              На главную
            </button>
          </div>
        </div>
      )}

      {!success && (
        <div className={!close ? "formHide" : "showForm"}>
          <div className="form-allert-error">
            <div className="form-card">
              <div className="allert">
                <div className="head-btn">
                  <p>Ошибка</p>
                  <div className="btn-close"></div>
                </div>
                <div className="icon-allert-error"></div>
                <button onClick={closeForm} className="btn">
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Step3;
