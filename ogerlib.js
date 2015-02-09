/**
#LICENSE BEGIN
#LICENSE END
*/



/**
* Fake Oger namespace. (maybe better use constructor function?)
*/
if (typeof Oger == 'undefined') {
	Oger = {};
}


/**
* Marker for (later) localisation.
*/
Oger.l10nValue = new Object();  // used as associative array
Oger._ = function(text) {
	// var key = text.replace(/[^a-z0-9_]/gi, '_');
	var key = text.replace(/\W/g, '_');
	return (Oger.l10nValue[key] ? Oger.l10nValue[key] : text);
};


/**
* A central place to activate/deactivate my own debug messages by
* commenting out some or all actions.
*/
Oger.debug = function(msg) {
	alert(msg);
	// maybe firebug only?
	//console.log(msg);
}


/**
* A central place to handle my own debug messages by
* commenting out some or all actions.
* Use Ext.MessageBox to have a non-blocking variant.
*/
Oger.debugExt = function(msg) {
	Ext.Msg.alert(msg);
}



/**
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


/**
 * Natural compare for sort.
 * Based on: http://my.opera.com/GreyWyvern/blog/show.dml/1671288
*/
Oger.natStrCmp = function(str1, str2) {
	str1 = '' + str1;
	str2 = '' + str2;

	var chunkify = function(str) {

		var aStr = [], x = 0, y = -1, wasDigit = 0, i, j;

		while (i = (j = str.charAt(x++)).charCodeAt(0)) {
			var isDigit = (i >=48 && i <= 57);  // '.' and '0'-'9' - we do not use '.' and no comma at all !!!
			if (isDigit !== wasDigit) {
				aStr[++y] = '';
				wasDigit = isDigit;
			}
			aStr[y] += j;
		}
		return aStr;
	}

	var chunk1 = chunkify(str1);
	var chunk2 = chunkify(str2);

	for (x = 0; chunk1[x] && chunk2[x]; x++) {
		if (chunk1[x] !== chunk2[x]) {
			var c = Number(chunk1[x]), d = Number(chunk2[x]);
			if (c == chunk1[x] && d == chunk2[x]) {
				return c - d;
			} else return (chunk1[x] > chunk2[x]) ? 1 : -1;
		}
	}
	return chunk1.length - chunk2.length;
}  // eo natural sort



/**
 * Natural compare for sort. Case insensitive.
*/
Oger.natStrCmpCi = function(str1, str2) {
	str1 = '' + str1;
	str2 = '' + str2;

	return Oger.natStrCmpCi(str1.toLowerCase(), str2.toLowerCase());
}  // eo case insensitive natural sort




/**
* Get object by object name as string (allow namespace)
* see: http://stackoverflow.com/questions/4981671/access-namespaced-javascript-object-by-string-name-without-using-eval
*/
Oger.getObjByName = function (objName) {

	var obj = window;

	var parts = objName.split('.');
	for (var i = 0, len = parts.length; i < len; ++i) {
		obj = obj[parts[i]];
	}

	return obj;
}  // eo get object by name
