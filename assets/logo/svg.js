// Select the "reg" and hexagon for the hover trigger.
// Select the "ularium" text to affect.
// Define a generic handler function.
const reg = document.querySelectorAll(".hexagon, .reg"),
  ularium = document.querySelectorAll(".ularium path"),
  handler = (func) => {
    return () => {
      ularium.forEach((val, idx, list) => {
        // Using index instead of just "val" because,
        // we want to reverse iterate easily sometimes.
        let time = (func == 'add') ? idx : list.length - idx;
        list[idx].style.transitionDelay = `${time * 50}ms`;
        list[idx].classList[func]("animate");
      });
    };
  };
// Add the ".animate" class to initiate fade-in effect on hover,
//   as well as remove the class when exiting the hover state.
reg.forEach(elem => {
  elem.addEventListener("mouseenter", handler("add"), false);
  elem.addEventListener("mouseleave", handler("remove"), false);
});