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
  // var key = text.replace(/[^a-z0-9_]/gi, '_');
  var key = text.replace(/\W/g, '_');
  return (Oger.l10nValue[key] ? Oger.l10nValue[key] : text);
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



/*
 * Send parameters to url
 * based on: http://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
 * I did not find an extjs way to make a standard (non-ajax) submit
 * so i use plain javascript and hope all browsers will support it
 */
Oger.sendToUrl = function(path, params, method) {

  method = method || "post"; // Set method to post by default, if not specified.

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  var form = document.createElement("FORM");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for(var key in params) {
    var hiddenField = document.createElement("INPUT");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    form.appendChild(hiddenField);
  }

  document.body.appendChild(form);
  form.submit();

}  // eo send to url
