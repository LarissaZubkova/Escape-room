function BookingTimeForm(): JSX.Element {
  return (
    <div className="booking-form__date-inner-wrapper">
      <label className="custom-radio booking-form__date">
        <input type="radio" id="tomorrow11h00m" name="date" required value="tomorrow11h00m"/><span className="custom-radio__label">11:00</span>
      </label>
      <label className="custom-radio booking-form__date">
        <input type="radio" id="tomorrow15h00m" name="date" required value="tomorrow15h00m" disabled/><span className="custom-radio__label">15:00</span>
      </label>
      <label className="custom-radio booking-form__date">
        <input type="radio" id="tomorrow17h30m" name="date" required value="tomorrow17h30m" disabled/><span className="custom-radio__label">17:30</span>
      </label>
      <label className="custom-radio booking-form__date">
        <input type="radio" id="tomorrow19h45m" name="date" required value="tomorrow19h45m"/><span className="custom-radio__label">19:45</span>
      </label>
      <label className="custom-radio booking-form__date">
        <input type="radio" id="tomorrow21h30m" name="date" required value="tomorrow21h30m"/><span className="custom-radio__label">21:30</span>
      </label>
    </div>
  );
}

export default BookingTimeForm;
