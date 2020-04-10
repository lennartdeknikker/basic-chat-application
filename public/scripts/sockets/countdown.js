const Countdown = {
  timer: 0,
  init(minutes, callback = function() {console.log('timer ended')}) {
    clearInterval(this.timer);
    let endDate = new Date()
    endDate.setMinutes(endDate.getMinutes() + minutes)
    this.startCountdown(endDate, callback);
  },
  startCountdown(compareDate, callback) {
    function timeBetweenDates(toDate, callback) {
      const dateEntered = toDate;
      const now = new Date();
      const difference = dateEntered.getTime() - now.getTime();

      if (difference <= 0) {
        // document.querySelector('.countdown-days').innerText = '';
        // document.querySelector('.countdown-hours').innerText = '';
        document.querySelector('.countdown-minutes').innerText = '';
        document.querySelector('.countdown-seconds').innerText = '';

        clearInterval(Countdown.timer);
        callback()
      } else {
        let seconds = Math.floor(difference / 1000);
        let minutes = Math.floor(seconds / 60);
        // let hours = Math.floor(minutes / 60);
        // const days = Math.floor(hours / 24);

        // hours %= 24;
        minutes %= 60;
        seconds %= 60;

        // document.querySelector('.countdown-days').innerText = `${days} days, `;
        // document.querySelector('.countdown-hours').innerText = `${hours} hours, `;
        document.querySelector('.countdown-minutes').innerText = `${String(minutes).padStart(2, '0')}`;
        document.querySelector('.countdown-seconds').innerText = `${String(seconds).padStart(2, '0')}`;
      }
    }

    timeBetweenDates(compareDate, callback);
    this.timer = setInterval(() => {
      timeBetweenDates(compareDate, callback);
    }, 1000);
  },
};

export default Countdown;
