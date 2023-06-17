import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addName,
  addNickname,
  addGender,
  addSurname,
  nextStep,
  selectName,
  selectNickname,
  selectSurname,
  selectGender,
} from "./store/rootSlice";
import { useNavigate } from "react-router-dom";

function Step1() {
  const dispatch = useDispatch();
  const nameUser = useSelector(selectName);
  const nicknameUser = useSelector(selectNickname);
  const surnameUser = useSelector(selectSurname);
  const genderUser = useSelector(selectGender);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { nameUser, nicknameUser, surnameUser, genderUser },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    dispatch(addNickname(data.nickname));
    dispatch(addName(data.name));
    dispatch(addSurname(data.surname));
    dispatch(addGender(data.gender));
    dispatch(nextStep());
    navigate("step2");
  };

  const onHandleBackStep = () => {
    navigate("/");
  };
  return (
    <>
      <div className="container">
        <form className="secondForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <label>Nickname</label>
            <input
              {...register("nickname", {
                required: "Обязательное поле",
                minLength: {
                  value: 5,
                  message: "Минимум 5 символов",
                },
                maxLength: {
                  value: 30,
                  message: "Максимум 30 символов",
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message:
                    "Введите nickname аккаунта, используя только буквы и цифры",
                },
              })}
              defaultValue={nicknameUser}
              type="text"
            />
            {errors.nickname && (
              <p className="par-error" role="alert">
                {errors.nickname?.message}
              </p>
            )}
          </div>
          <div className="row">
            <label>Name</label>
            <input
              {...register("name", {
                required: "Обязательное поле",
                minLength: {
                  value: 1,
                  message: "Минимум 5 символов",
                },
                maxLength: {
                  value: 50,
                  message: "Максимум 50 символов",
                },
                pattern: {
                  value: /^[A-Za-zА-Яа-яЁё]+$/,
                  message: "Введите имя аккаунта, используя только буквы",
                },
              })}
              defaultValue={nameUser}
              type="text"
            />
            {errors.name && (
              <p className="par-error" role="alert">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="row">
            <label>Surname</label>
            <input
              {...register("surname", {
                required: "Обязательное поле",
                minLength: {
                  value: 3,
                  message: "Минимум 5 символов",
                },
                maxLength: {
                  value: 50,
                  message: "Максимум 50 символов",
                },
                pattern: {
                  value: /^[A-Za-zА-Яа-яЁё]+$/,
                  message: "Введите фамилию аккаунта, используя только буквы",
                },
              })}
              defaultValue={surnameUser}
              type="text"
            />
            {errors.surname && (
              <p className="par-error" role="alert">
                {errors.surname?.message}
              </p>
            )}
          </div>
          <div className="row">
            <label>Sex</label>
            <select id="crust" {...register("gender", { required: true })}>
              <option selected disabled>
                Не выбрано
              </option>
              <option value="male">man</option>
              <option value="female">woman</option>
            </select>
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

export default Step1;
