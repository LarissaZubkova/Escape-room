import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { getAuthorizationStatus, getLoadingStatus, getErrorStatus } from '../../store/user-process/user-process.selectors';
import { AuthData } from '../../types/auth-data';
import { validateEmail, validatePassword } from '../../utils/utils';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import FormErrorMessage from '../../components/form-error-message/form-error-message';
import ErrorScreen from '../error-screen/error-screen';

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
  const isLoading = useAppSelector(getLoadingStatus);
  const hasError = useAppSelector(getErrorStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const {register, handleSubmit, formState: {errors, isValid}} = useForm({mode: 'onChange'});
  const location = useLocation() as Location;
  const fromPage = location.state?.from.pathname || AppRoute.Main;

  useEffect (() => {
    if (authorizationStatus === AuthorizationStatus.Auth){
      navigate(fromPage);
    }
  }, [authorizationStatus, navigate, fromPage]);

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    const {email, password} = data as AuthData;

    dispatch(loginAction({email, password}));
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
              onSubmit={(evt) => {
                handleSubmit(handleFormSubmit)(evt);
              }}
            >
              <div className="login-form__inner-wrapper">
                <h1 className="title title--size-s login-form__title">Вход</h1>
                <div className="login-form__inputs">
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>
                    <input
                      type="email"
                      id="email"
                      disabled={isLoading}
                      placeholder="Адрес электронной почты"
                      {...register('email',
                        { required: 'Обязательное поле' ,
                          validate: validateEmail,
                        }
                      )}
                    />
                    {errors.email && <FormErrorMessage error={errors.email}/>}
                  </div>
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="password">Пароль</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Пароль"
                      disabled={isLoading}
                      {...register('password',
                        { required: 'Обязательное поле' ,
                          validate: validatePassword,
                        }
                      )}
                    />
                    {errors.password && <FormErrorMessage error={errors.password}/>}
                  </div>
                </div>
                <button
                  className="btn btn--accent btn--general login-form__submit"
                  type="submit"
                  disabled={isLoading || !isValid}
                >Войти
                </button>
              </div>
              {hasError && <ErrorScreen />}
              <label className="custom-checkbox login-form__checkbox">
                <input
                  type="checkbox"
                  id="id-order-agreement"
                  disabled={isLoading}
                  {...register('agreement',
                    {required: 'Обязательное поле'}
                  )}
                />
                <span className="custom-checkbox__icon">
                  <svg width={20} height={17} aria-hidden="true">
                    <use xlinkHref="#icon-tick"></use>
                  </svg>
                </span>
                {errors.agreement && <FormErrorMessage error={errors.agreement}/>}
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
