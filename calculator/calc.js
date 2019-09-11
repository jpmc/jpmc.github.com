//// INITIALIZING DOCUMENT ////

// Any and all events on startup that are required during document.ready().
let readyCallback = () => {
    currencyHandler();
    elevCalc();
};

// Handle document.ready() state.
if (document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    readyCallback();
} else {
    document.addEventListener("DOMContentLoaded", readyCallback);
}

//// ELEVATION CALCULATOR ////

// Calculate distance between an enemy and yourself.
// Takes the top-down distance, and elevation difference,
//   and uses the pythagorean theorem to get the straight distance.
function elevCalc() {
    let $i = document.getElementById.bind(document),
        eDist = parseInt($i('eDist').value),
        yElev = parseInt($i('yElev').value),
        eElev = parseInt($i('eElev').value),
        diffElev = Math.abs(eElev - yElev),
        roundMode = document.querySelector('input[name=roundMode]:checked').value;

    let roundFunc = roundMode == 0 ? Math.ceil : (roundMode == 1 ? Math.floor : Math.round);

    $i('tDist').value = "= " + roundFunc(Math.sqrt((eDist*eDist) + (diffElev*diffElev)));
}

//// CURRENCY POWER CALCULATOR ////

// Currency value storage.
let values = {'pp':0, 'gp':0, 'sp':0, 'cp':0,};

// Detect and Recalculate Currency options.
let recalculate = (evt) => {
    let element = evt.target;
    values[element.id] = element.value;
    document.getElementById('result').value = gold_power(values) + " gp";
    document.getElementById('optimal').innerText = optimal_string(values);
};

// Default document.ready() handler.
function currencyHandler() {
    // Attach recalculation detection to all inputs, covering all possible events.
    ['keyup', 'change', 'click'].forEach((type) =>
        ['cp', 'sp', 'gp', 'pp'].forEach((id) =>{
            document.getElementById(id).addEventListener(type, recalculate, false)}
    ));

    // Trigger default "zero'd out" initial calculation.
    recalculate({target: document.getElementById('cp')});
}

// Get relative currency power in base denomination, copper.
function copper_power(currency) {
    return ((currency.pp * 1000) || 0)
        + ((currency.gp * 100) | 0)
        + ((currency.sp * 10) | 0)
        + (currency.cp | 0);
}

// Get currency power in Gold, rounded down.
function gold_power(currency) {
    return copper_power(currency) / 100;
}

// Convert the currency into the least amount of change.
function optimal_change(currency) {
    let total = copper_power(currency);
    return {
        'pp' : total / 1000 | 0,
        'gp' : (total % 1000) / 100 | 0,
        'sp' : (total % 100) / 10 | 0,
        'cp' : (total % 10) | 0,
    };
}

// Format the value object into a readable string.
function optimal_string(currency) {
    let optimal = optimal_change(currency);
    return `${optimal['pp']} pp, ${optimal['gp']} gp, ${optimal['sp']} sp, ${optimal['cp']} cp`
}

// Populates and recalculates sample currency value for demonstration.
function currencySample() {
    //609 cp, 479 sp, 502gp, 424pp
    let sample = {'pp': 424, 'gp': 502, 'sp': 479, 'cp': 609};

    // Update each currency then force update.
    for (let key in sample) {
        document.getElementById(key).value = sample[key];
        document.getElementById(key).click();
    }

}