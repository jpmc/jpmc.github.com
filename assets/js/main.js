"use strict";

// On document load...
document.addEventListener('DOMContentLoaded', () => {
  // ...wait for the SVG to load...
  document.getElementById("svg-logo").addEventListener("load", () => {
    // ...then select the inner SVG document ...
    const svg_context = document.getElementById("svg-logo").contentDocument;
    // ...the "reg" in the hexagon ...
    const reg = svg_context.querySelectorAll(".hexagon, .reg");
    // ...and all of the letters outside of the hexagon.
    const ularium = Array.from(svg_context.querySelectorAll(".ularium path"));
    // Define a generic handler to apply a function to each "ularium" letter.
    const handler = (func, reverse) => {
      // Iterate over the list properly on fade-in, then backwards on fadeout.
      const len = ularium.length - 1;
      const f = func;
      return () => {
        ularium.forEach((val, idx, list) => {
          let time = reverse ? len - idx : idx;
          list[idx].style.transitionDelay = `${time * 50}ms`;
          list[idx].classList[f]("animate");
        });
      };
    };
    // Add the ".animate" class to initiate fade-in effect on hover,
    //   as well as remove the class when exiting the hover state.
    reg.forEach((elem) => elem.addEventListener("mouseenter", handler('add', false), false));
    reg.forEach((elem) => elem.addEventListener("mouseleave", handler('remove', true), false));
  });
}, false);