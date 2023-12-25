import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { getAuthorizationStatus, getErrorStatus, getLoadingStatus } from '../../store/user-process/user-process.selectors';
import { AuthData } from '../../types/auth-data';
import { validateAgreement, validateEmail, validatePassword } from '../../utils/utils';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

type Location = {
  state: {
    from: {
      pathname: string;
    };
  };
}

function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const hasError = useAppSelector(getErrorStatus);
  const isLoading = useAppSelector(getLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const location = useLocation() as Location;
  const fromPage = location.state?.from.pathname || AppRoute.Main;
  const [isValid, setIsValid] = useState({
    password: true,
    email: true,
    agreement: true,
  });

  useEffect (() => {
    if (authorizationStatus === AuthorizationStatus.Auth){
      navigate(fromPage);
    }
  }, [authorizationStatus, navigate, fromPage]);

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement>, valid: boolean) => {
    const {name} = evt.target;

    setIsValid({
      ...isValid,
      [name]: valid,
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const formData = new FormData(form);
    const {email, password} = Object.fromEntries(formData) as AuthData;
    const dataForm = {email, password} as AuthData;

    if (isValid.password && isValid.email && isValid.agreement) {
      dispatch(loginAction(dataForm));
    }
  };

  return (
    <div className="wrapper">
      <Helmet>
        <title>Авторизация - Escape Room</title>
      </Helmet>
      <Header isLogin/>
      <main className="decorated-page login">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"/>
            <img src="img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width={1366} height={768} alt=""/>
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="login__form">
            <form className="login-form"
              action="https://echo.htmlacademy.ru/"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login-form__inner-wrapper">
                <h1 className="title title--size-s login-form__title">Вход</h1>
                <div className="login-form__inputs">
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Адрес электронной почты"
                      required
                      onChange={(evt) => {
                        const valid = validateEmail(evt.target.value);
                        handleFormChange(evt, valid);
                      }}
                    />
                  </div>
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="password">Пароль</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Пароль"
                      required
                      minLength={3}
                      maxLength={15}
                      onChange={(evt) => {
                        const valid = validatePassword(evt.target.value);
                        handleFormChange(evt, valid);
                      }}
                    />
                    {!isValid.password && <p>Пароль должен состоять из цифр и букв</p>}
                    {hasError && <p>Что-то пощло не так, попробуйте еще раз</p>}
                  </div>
                </div>
                <button
                  className="btn btn--accent btn--general login-form__submit"
                  type="submit"
                  disabled={isLoading}
                >Войти
                </button>
              </div>
              <label className="custom-checkbox login-form__checkbox">
                <input
                  type="checkbox"
                  id="id-order-agreement"
                  name="agreement"
                  required
                  onChange={(evt) => {
                    const valid = validateAgreement(evt.target.value);
                    handleFormChange(evt, valid);
                  }}
                />
                <span className="custom-checkbox__icon">
                  <svg width={20} height={17} aria-hidden="true">
                    <use xlinkHref="#icon-tick"></use>
                  </svg>
                </span>
                <span className="custom-checkbox__label">Я&nbsp;согласен с
                  <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>&nbsp;и пользовательским соглашением
                </span>
              </label>
            </form>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default LoginScreen;
