export const animationCreate = () => {
  if (typeof window !== "undefined") {
    window.WOW = require("wowjs");
  }
  new WOW.WOW({ live: false }).init();
};

export const randomColor = () => {
  const colors = ["c-color-green", "c-color-yellow", "c-color-red", 
                  "c-color-blue", "c-color-purple",
                  "c-color-aqua", "c-color-light-yellow"];
  return colors[Math.floor(Math.random() * (6 - 0 + 1) ) + 0];
}
