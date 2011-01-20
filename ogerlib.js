

/*
* Fake Oger namespace. (maybe better use constructor function?)
*/
var Oger = {};


/*
* Marker for (later) localisation.
*/
Oger._ = function(text) {
  return text;
};


/*
* A central place to handle my own debug messages by
* commenting out some or all actions.
*/
Oger.debug = function(msg) {
  alert(msg);
  // maybe firebug only?
  //console.log(msg);
}
