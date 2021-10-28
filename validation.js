// Element selectors --> //
const inputs = document.querySelectorAll("input");
const buttons = document.querySelectorAll("button");
//
const btn1_reset = document.getElementById("btn1_reset");
const btn2_reset = document.getElementById("btn2_reset");
// Element Selectors <-- //
//
// Custom Attribute/Element --> //
var disableMe = document.createAttribute("disabled"); // Adds a "disabled" attribute to a element. //
// Custom Attributes <-- //
//
// Regular Expressions for validating the input fields --> //
const patterns = {
    email: /^(\w\+?\-?~?){2,15}@(\w\+?\-?~?){2,10}\.(((?!gov)\w){2,5}?\.)?\.?((?!gov)\w){2,5}$/i, // Standard email validation. Excludes gov //
    topReason: /^(?!\s)(\w ?\'?){3,100}$/i, // Any word characters between 3 and 100 characters, allows for punctuation. //
    bottomReason: /^(?!\s)(\w ?\'?){3,100}$/i, // Any word characters between 3 and 100 characters, allows for punctuation. //
    website: /^((http|https)?:\/\/)?(www\.)?(\w-?(?!gov)){2,25}\.?((?!gov)(\w-?){2,25})?\.(net|com|org|de|uk|nl|in|jp|ca|co|tv)$/i // Supports http, https, www, or just domain.extension (excludes gov) //
};
// Regular Expressions for validating the input fields <-- //
//
// Button functions for disabling and enabling submit buttons --> //
function enableBtn(num) {
    return buttons[num].removeAttribute("disabled");
}
function disableBtn(num) {
    return buttons[num].setAttributeNode(disableMe);
}
// Event Listeners for the reset buttons <-- //
//
// Event listeners to the "reset form" button that clears the className of the inputs and disables the button in its segment --> //
btn1_reset.addEventListener("click", () => {
    inputs[0].className = "";
    inputs[1].className = "";
    disableBtn(0);
});
btn2_reset.addEventListener("click", () => {
    inputs[2].className = "";
    inputs[3].className = "";
    disableBtn(2);
});
// Event listeners to the "reset form" button that clears the className of the inputs and disables the button in its segment <-- //
//
// Tests the input field's value against it's matching regex (regex's key matches the field's className. The regex is the value) -- > //
function validate(field, regex) {
    if (regex.test(field.value)) {
        field.className = "valid"; // If the input's value matches the regex. The input's className is then assigned as "valid" //
        if ((inputs[0].className == "valid" && inputs[1].className == "valid") && (inputs[2].className == "" && inputs[3].className == "")) {
            enableBtn(0); // Will only enable submit button once both of the input's are proven valid, and the other two are empty in value //
        } else if ((inputs[2].className == "valid" && inputs[3].className == "valid") && (inputs[0].className == "" && inputs[1].className == "")) {
            enableBtn(2);  // Will only enable submit button once both of the input's are proven valid, and the other two are empty in value //
        }
    } else {
        field.className = "invalid";  // If the input's value doesn't match the regex. The input's className is then assigned as "invalid" //
        if (((inputs[0].className == "invalid" || inputs[0].className == "") || (inputs[1].className == "invalid" || inputs[1].className == "")) && (inputs[2].className == "" && inputs[3].className == "")) {
            disableBtn(0); // The button is disabled if any of the two input's value are invalid or empty. And if the other input's have any value to them //
        }
        else if (((inputs[2].className == "invalid" || inputs[2].className == "") || (inputs[3].className == "invalid" || inputs[3].className == "")) && (inputs[0].className == "" && inputs[1].className == "")) {
            disableBtn(2); // The button is disabled if any of the two input's value are invalid or empty. And if the other input's have any value to them //
        };
    };
};
// Tests the input field's value against it's matching regex (regex's key matches the field's className. The regex is the value) <-- //
//
// forEach method against all inputs that listens for user entered values and checks those values through the input's className and the regex attached to it --> //
inputs.forEach(function (input) {
    input.addEventListener("keyup", function (e) { // For every pressed key, this function will run //
        return validate(e.target, patterns[e.target.name]); // returning the output from the validate() function //
    });
});
// forEach method against all inputs that listens for user entered values and checks those values through the input's className and the regex attached to it <-- //