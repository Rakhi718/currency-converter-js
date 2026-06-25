let base = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll( ".currconv select");
const btn = document.querySelector("button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for (let select of dropdown){
for(currCode in countryList){
   let newOption = document.createElement("option");
   newOption.innerText=currCode;
   newOption.value = currCode;
   
  if (select.name === "from" && currCode === "INR") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "USD") {
      newOption.selected = "selected";
    }
   select.append(newOption);
  }
   select.addEventListener("change",(evt) =>{
  updateflag(evt.target);
});
}



let update = async () =>{
let amount = document.querySelector(".amount input");
let amt = amount.value;
console.log(amt);
if(amt == "" || amt < 1){
  amt = 1;
  amount.value = '1';
}
let URL = `${base}/${fromcurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let result = await response.json();
let rate = result[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
console.log(rate);
let finalres = rate*amt;
console.log(finalres);
msg.innerText = `${amt} ${fromcurr.value}= ${finalres} ${tocurr.value}`;

}

let updateflag = (element) =>{
  let currCode = element.value;
 let countryCode = countryList[currCode];
 let newimg = `https://flagsapi.com/${countryCode}/flat/64.png`;
 let  img = element.parentElement.querySelector("img");
 img.src = newimg;
};

btn.addEventListener("click",async (evt) => {
evt.preventDefault();
update();
})

window.addEventListener("load", () => {
  update();
})