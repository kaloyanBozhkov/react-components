This folder contains uncontrolled components, created through the magic of refs. Obviously, controlled components are to be preferred (as stated here: https://reactjs.org/docs/refs-and-the-dom.html), though for the fun of it I created the components found here with refs insted :)

SearchCriteria is essentially a Collection, containing an input element (for user input) and a variable number of checkboxes, of which it is always known which is checked through refs instead of state.

Checkbox is an Atom component which, through refs, allows parent to have interesting amount of control without using state (actions up approach). Again, this goes agains what is stated on the official react js page, but breaking the rules was great fun regardless.