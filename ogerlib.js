/*
#LICENSE BEGIN
#LICENSE END
*/



/*
* Fake Oger namespace. (maybe better use constructor function?)
*/
var Oger = {};


/*
* Marker for (later) localisation.
*/
Oger.l10nValue = new Object();  // used as associative array
Oger._ = function(text) {
  var key = text.replace(/\W/g, '_');
  var value = Oger.l10nValue[key];
  if (value == undefined) {
    return text;
  }
  return value;
};


/*
* A central place to activate/deactivate my own debug messages by
* commenting out some or all actions.
*/
Oger.debug = function(msg) {
  alert(msg);
  // maybe firebug only?
  //console.log(msg);
}


/*
* A central place to handle my own debug messages by
* commenting out some or all actions.
* Use Ext.MessageBox to have a non-blocking variant.
*/
Oger.debugExt = function(msg) {
  Ext.Msg.alert(msg);
}
