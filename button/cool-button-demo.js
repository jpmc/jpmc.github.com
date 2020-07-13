'use strict';
// Palettes stored as quadtuples.
// ["Friendly name", "CSS Page BG", "CSS Button Accent", "CSS Button Border"]
// Hex to RGB handy: https://www.rapidtables.com/convert/color/hex-to-rgb.html
var palettes = [
        {
            friendlyName: "Default-Dark",
            pageBg: "#0e1428",
            btnAccent: "#e91d24",
            btnBorder: "rgba(233, 29, 36, 0.25)"
        },
        {
            friendlyName: "Neutral-Light",
            pageBg: "#04a",
            btnAccent: "#aaa",
            btnBorder: "rgba(170, 170, 170, 0.5)"
        },
        {
            friendlyName: "Poison-Dark",
            pageBg: "#511378",
            btnAccent: "#89ba16",
            btnBorder: "rgba(137, 186, 22, 0.5)"
        },
        {
            friendlyName: "Neon-Garish?",
            pageBg: "#742d93",
            btnAccent: "#FC6E22",
            btnBorder: "rgba(128,246,76, 0.75)"
        },
];

// Palette index tracker, default 0.
var index = 0;

function cyclePalette(idx) {
    // If index not given, then cycle through the palletes.
    if (idx === undefined) {
        // Load new palette, circling back around.
        index++;
        if (index >= palettes.length) {
            index = 0;
        }
        idx = index;
    } else {
        index = idx;
    }
    let loadedPalette = palettes[idx];
    console.log(loadedPalette);

    // Update indicator, then update all of the palette colors.
    document.getElementById('paletteInfo').innerText = loadedPalette.friendlyName;
    document.getElementById('paletteInfo').style.color = loadedPalette.btnAccent;

    // Updating CSS variables for the button scheme and page BG.
    // See: https://css-tricks.com/updating-a-css-variable-with-javascript/
    let root = document.documentElement;
    root.style.setProperty('--pageBg', loadedPalette.pageBg);
    root.style.setProperty('--accentColor', loadedPalette.btnAccent);
    root.style.setProperty('--borderColor', loadedPalette.btnBorder);
}