const principalEl = document.querySelector("#principalBox");
const durationEl = document.querySelector("#durationBox");
const amountEl = document.querySelector(".amount");
let rateEl = document.querySelector('.rate')

let rate = Number(rateEl.textContent)
let principal = Number(principalEl.value);
let duration = Number(durationEl.value)
let interest;
let amount;

const changeValue = () => {
   // Get the value
   principal = Number(principalEl.value);
   duration = Number(durationEl.value);

   // Find the interest
   // interest = (principal * rate * time) / 100
   interest = (principal * rate * (duration / 12)) / 100;

   amount = principal + interest;

   amountEl.textContent = amount

}

principalEl.addEventListener("input", () => {
  changeValue();
});


durationEl.addEventListener('change', () => {
   changeValue();
})

// 