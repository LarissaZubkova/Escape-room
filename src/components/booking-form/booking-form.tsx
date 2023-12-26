import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSelectedPlace, getSendingStatus } from '../../store/booking-process/booking-process.selectors';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { getFormDateTime, validateName, validatePhoneNumber } from '../../utils/utils';
import { BookingData, CurrentFormData } from '../../types/booking';
import { fetchSendBookingAction, fetchMyQuestsAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import FormErrorMessage from '../form-error-message/form-error-message';
import ErrorScreen from '../../pages/error-screen/error-screen';

type BookingFormProps = {
  id: string;
  peopleMinMax: number[];
}

function BookingForm({id, peopleMinMax}: BookingFormProps): JSX.Element {
  const selectedPlace = useAppSelector(getSelectedPlace);
  const isSending = useAppSelector(getSendingStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors, isSubmitting, isSubmitSuccessful}} = useForm({mode: 'onChange'});

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    const {children, date, contactPerson, person, phone} = data as CurrentFormData;
    console.log(isSubmitSuccessful, isSubmitting);
    const currentData = {
      date: getFormDateTime(date).date,
      time: getFormDateTime(date).time,
      contactPerson,
      phone,
      withChildren: Boolean(children),
      peopleCount: Number(person),
      placeId: selectedPlace?.id,
    } as BookingData;

    dispatch(fetchSendBookingAction({currentData, id, navigate}));
    dispatch(fetchMyQuestsAction());
  };

  return (
    <form
      className="booking-form"
      action="https://echo.htmlacademy.ru/"
      method="post"
      onSubmit={(evt) => {
        handleSubmit(handleFormSubmit)(evt);
      }}
    >
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>
        {errors.date && <FormErrorMessage error={errors.date}/>}
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Сегодня</legend>
          <div className="booking-form__date-inner-wrapper">
            {selectedPlace && selectedPlace.slots.today.map((slot) => (
              <label className="custom-radio booking-form__date" key={slot.time}>
                <input type="radio"
                  id={`today${slot.time}`}
                  value={`today${slot.time}`}
                  disabled={!slot.isAvailable}
                  {...register('date',
                    { required: 'Обязательное поле' })}
                />
                <span className="custom-radio__label">{slot.time}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Завтра</legend>
          <div className="booking-form__date-inner-wrapper">
            {selectedPlace && selectedPlace.slots.tomorrow.map((slot) => (
              <label className="custom-radio booking-form__date" key={slot.time}>
                <input
                  type="radio"
                  id={`tomorrow${slot.time}`}
                  value={`tomorrow${slot.time}`}
                  disabled={!slot.isAvailable}
                  {...register('date', {
                    required: 'Обязательное поле'
                  })}
                />
                <span className="custom-radio__label">{slot.time}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </fieldset>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="name">Ваше имя</label>
          <input
            type="text"
            id="name"
            placeholder="Имя"
            {...register('contactPerson',
              { required: 'Обязательное поле' ,
                validate: validateName,
              }
            )}
          />
          {errors.contactPerson && <FormErrorMessage error={errors.contactPerson}/>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
          <input
            type="tel"
            id="tel"
            placeholder="Телефон"
            {...register('phone',
              { required: 'Обязательное поле',
                validate: validatePhoneNumber
              })}
          />
          {errors.phone && <FormErrorMessage error={errors.phone}/>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">Количество участников</label>
          <input
            type="number"
            id="person"
            placeholder="Количество участников"
            {...register('person',
              { required: 'Обязательное поле',
                min: {
                  value: peopleMinMax[0],
                  message: 'Меньше разрешенного числа участников'
                },
                max: {
                  value: peopleMinMax[1],
                  message: 'Больше разрешенного числа участников'
                }
              })}
          />
          {errors.person && <FormErrorMessage error={errors.person}/>}
        </div>
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input
            type="checkbox"
            id="children"
            {...register('children')}
          />
          <span className="custom-checkbox__icon">
            <svg width={20} height={17} aria-hidden="true">
              <use xlinkHref="#icon-tick"></use>
            </svg>
          </span>
          <span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
        </label>
      </fieldset>
      <button
        className="btn btn--accent btn--cta booking-form__submit"
        type="submit"
        disabled={isSubmitting}
      >Забронировать
      </button>
      {isSubmitSuccessful && <ErrorScreen />}
      <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
        <input
          type="checkbox"
          id="id-order-agreement"
          name="agreement"
          required
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
  );
}

export default BookingForm;
