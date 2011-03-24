/*
#LICENSE BEGIN
#LICENSE END
*/



/*
* Define Oger.extjs namespace.
*/
Oger.extjs = {};


/*
* Check if a response is present at all and has the 'success' property.
* In extjs 3.3.1 if an response is empty (0 bytes) this is not handled as failure
* but the success handler is called. See ux directory.
*/
Oger.extjs.actionSuccess = function(action, showSuccessMsg) {

  if (action != undefined && action.result != undefined &&
      action.result.success != undefined && action.result.success == true) {
    if (showSuccessMsg) {
      Oger.extjs.submitMsg();
    }
    return true;
  }

  // SOME MESSAGES ONLY FOR COLLECTING FOR BUGREPORT (begin) -------------------------
  if (action == undefined) {
    Ext.Msg.alert(Oger._('Fehler (Server+)'), Oger._('Antwort des Servers fehlerhaft oder leer. (action == undefinded)'));
    return false;
  }
  if (action.result == undefined) {
    Ext.Msg.alert(Oger._('Fehler (Server+)'), Oger._('Antwort des Servers fehlerhaft oder leer. (action.result == undefinded)'));
    return false;
  }
  if (action.result.success == undefined) {
    Ext.Msg.alert(Oger._('Fehler (Server+)'), Oger._('Antwort des Servers fehlerhaft oder leer. (action.result.success == undefinded)'));
    return false;
  }
  if (action.result.success == false) {
    Ext.Msg.alert(Oger._('Fehler (Server+)'), Oger._('Antwort des Servers fehlerhaft oder leer. (action.result.success == false)'));
    return false;
  }
  // SOME MESSAGES ONLY FOR COLLECTING FOR BUGREPORT (end) -------------------------

  // otherwise notify an error
  Ext.Msg.alert(Oger._('Fehler (Server+)'), Oger._('Antwort des Servers fehlerhaft oder leer.'));
  return false;

}  // eo check for successful response


/*
* Force that the upper left corner of an Extjs object to be displayed inside the
* boundery of another Extjs object. The moved object is not resized.
* If you also want the object also to be resized to fit into the outer objet,
* than use Oger.extjs.adjustToFit().
* Obj and viewPort must be visible to work.
* @obj: Any visible Extjs object that is resized and positioned if not fit.
* @viewpoint: Any visible Extjs object that defines the boundery.
*             If not provided the browser windows is taken.
*/
Oger.extjs.moveToFit = function(obj, viewPort) {

  // see comment block in Oger.extjs.adjustToFit
  // for more posibilities to detect browser size

  var viewPortX;
  var viewPortY;
  var viewPortWidth;
  var viewPortHeight;

  // get position and size of viewport
  if (viewPort == undefined) {
    viewPortX = 0;
    viewPortY = 0;
    viewPortWidth = window.innerWidth;
    viewPortHeight = window.innerHeight;
  }
  else {
    viewPortX = viewPort.getPosition()[0];
    viewPortY = viewPort.getPosition()[1];
    viewPortWidth = viewPort.getWidth();
    viewPortHeight = viewPort.getHeight();
  }  // eo viewport position and size


  var objXOri = obj.getPosition()[0];
  var objYOri = obj.getPosition()[1];
  var objWidthOri = obj.getWidth();
  var objHeightOri = obj.getHeight();

  var objX = objXOri;
  var objY = objYOri;
  var objWidth = objWidthOri;
  var objHeight = objHeightOri;

  // now size of window fits, but may be is not shown inside viewport
  // test right
  objX = Math.min(objX, viewPortX + viewPortWidth- objWidth);
  // test bottom
  objY = Math.min(objY, viewPortY + viewPortHeight- objHeight);
  // test left
  objX = Math.max(objX, viewPortX);
  // test top
  objY = Math.max(objY, viewPortY);

  if (objX != objXOri || objY != objYOri) {
    obj.setPosition(objX, objY);
  }

}  // eo move



/*
* Force an Extjs object to be displayed inside the boundery of another Extjs object.
* Obj and viewPort must be visible to work.
* @obj: Any visible Extjs object that is resized and positioned if not fit.
* @viewpoint: Any visible Extjs object that defines the boundery.
*             If not provided the browser windows is taken.
* @autoScroll: Defines if autoScroll should be set, if the window size is altered (shrinked).
*/
Oger.extjs.adjustToFit = function(obj, viewPort, autoScroll) {

/*
  // ONLY FOR DOCUMENTATION

  var viewportwidth;
  var viewportheight;

  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight

  if (window.innerWidth != undefined) {
    viewPortwidth = window.innerWidth,
    viewPortheight = window.innerHeight
  }

  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)

  else if (document.documentElement != undefined &&
           document.documentElement.clientWidth != undefined &&
           document.documentElement.clientWidth != 0) {
    viewPortwidth = document.documentElement.clientWidth,
    viewPortheight = document.documentElement.clientHeight
  }

  // older versions of IE

  else {
    viewPortwidth = document.getElementsByTagName('body')[0].clientWidth,
    viewPortheight = document.getElementsByTagName('body')[0].clientHeight
  }

  // maybe try: document.body.clientHeight
*/

  var viewPortX;
  var viewPortY;
  var viewPortWidth;
  var viewPortHeight;

  // get position and size of viewport
  if (viewPort == undefined) {
    viewPortX = 0;
    viewPortY = 0;
    viewPortWidth = window.innerWidth;
    viewPortHeight = window.innerHeight;
  }
  else {
    viewPortX = viewPort.getPosition()[0];
    viewPortY = viewPort.getPosition()[1];
    viewPortWidth = viewPort.getWidth();
    viewPortHeight = viewPort.getHeight();
  }  // eo viewport position and size


  var objXOri = obj.getPosition()[0];
  var objYOri = obj.getPosition()[1];
  var objWidthOri = obj.getWidth();
  var objHeightOri = obj.getHeight();

  var objX = objXOri;
  var objY = objYOri;
  var objWidth = objWidthOri;
  var objHeight = objHeightOri;

  // if size does not fit at all, than resize first.
  // to minimize resize events apply at once
  if (objWidth > viewPortWidth) {
    objWidth = viewPortWidth;
  }
  if (objHeight > viewPortHeight) {
    objHeight = viewPortHeight;
  }

  if (objWidth != objWidthOri || objHeight != objHeightOri) {
    obj.setSize(objWidth, objHeight);
    if (autoScroll) {
      obj.setAutoScroll(true);
    }
  }

  // now size of window fits, but may be is not shown inside viewport
  // Oger.extjs.moveToFit() could be used, but all values are already present,
  // so do it here.

  // test right
  objX = Math.min(objX, viewPortX + viewPortWidth- objWidth);
  // test bottom
  objY = Math.min(objY, viewPortY + viewPortHeight- objHeight);
  // test left
  objX = Math.max(objX, viewPortX);
  // test top
  objY = Math.max(objY, viewPortY);

  if (objX != objXOri || objY != objYOri) {
    obj.setPosition(objX, objY);
  }

}  // eo adjust


/*
* General handler for form submission errors.
* On not "sufficient" handled failures do not return true to notify
* that subsequent handling is expected.
*/
Oger.extjs.handleFormSubmitFailure = function(form, action) {

  switch (action.failureType) {
    case Ext.form.Action.CLIENT_INVALID:
      Ext.Msg.alert(Oger._('Fehler'), Oger._('Fehler im Formular. Bitte korrekt ausfüllen.'));
      return true;
    case Ext.form.Action.CONNECT_FAILURE:
      Ext.Msg.alert(Oger._('Fehler'), Oger._('Fehler bei der Datenübertragung. Eventuell nochmal versuchen.'));
      return true;
    case Ext.form.Action.SERVER_INVALID:
      //Ext.Msg.alert(Oger._('Fehler'), Oger._('Serverapplikation meldet successfull=false.'));
      // handle only some situations
      var isHandled = false;
      if (action.result.msg != undefined) {
        Ext.Msg.alert(Oger._('Fehler (App)'), action.result.msg,
          // Messagebox.alert does not stop code, so handle code also here
          function(btn, text, opt) {
            if (action.result.code != undefined) {
              action.result.code();
            };
          }
        );
        isHandled = true;
      }
      if (!isHandled && action.result.code != undefined) {
        action.result.code();
        isHandled = true;
      }

      // last resor for server failure
      if (!isHandled) {
        Ext.Msg.alert(Oger._('Fehler (Server)'), Oger._('Antwort des Servers fehlerhaft.'));
      }
      break;
    case Ext.form.Action.LOAD_FAILURE:
      Ext.Msg.alert(Oger._('Fehler'), Oger._('Fehler beim Laden von Daten oder keine Daten bereitgestellt.'));
      // this can not be (or should not be) handled generaly, so do not return with true
      break;
    default:
      Ext.Msg.alert(Oger._('Fehler'), Oger._('Unbekannter Submit/Action-Fehlertyp:' + action.failureType + '.'));
      // this can not be (or should not be) handled generaly, so do not return with true
  }  // eo switch

}; // eo form submission error handler



/*
* General handler for ajax failures
*/
Oger.extjs.handleAjaxFailure = function(response, opts) {

  Ext.Msg.alert(Oger._('Fehler'), Oger._('Request: ') + opts.url + '.<br>' +
                                  Oger._('Response: ') + response.status + ' ' + response.statusText + '.');

}; // eo ajax error handler



/*
* Check if form is dirty (used in 'beforeclose' event)
* @panel: Panel (or window) that should be closed
*/
Oger.extjs.confirmDirtyClose = function(panel) {

  Ext.Msg.confirm(Oger._('Bestätigung erforderlich'), Oger._('Ungespeicherte Änderungen vorhanden. Trotzdem schliessen?'), function(answerId) {
    if(answerId == 'yes') {
      // this should work, but I have not tested
      //this.hide(null); // window.hide(null) to "unset" animation target - default to null
      //this.destroy();
      Oger.extjs.forceClose(panel);
      //panel.hide(null); // window.hide(null) to "unset" animation target - default to null
      //panel.destroy();
    }
  });

}  // eo confirm dirty close



/*
* Force close (bypass the beforclose event)
* @panel: Panel (or window) that should be closed
*/
Oger.extjs.forceClose = function(panel) {

  panel.hide(null); // window.hide(null) to "unset" animation target - default to null
  panel.destroy();
};  // eo force close


/*
* Unset the dirty state of a form
* This is an ugly hack!
* @form: Form which dirty state should be removed
*/
Oger.extjs.resetDirty = function(form) {

  // if a form panel is given than get the underlaying basic form
  if (typeof form.getXType == 'function' && form.getXType() == 'form' &&
      typeof form.getForm == 'function') {
    form = form.getForm();
  }

  /*
  var values = form.getValues();
  for (i=0; i < values.lenght; i++){
    field.originalValue = field.getRawValue();
  }
  */

  var resetFieldFunc = function(field) {
    if (field.isFormField) {
      if (typeof field.getXType == 'function' && field.getXType() == 'radiogroup') {
        /*
        * copied from extjs checkbox group source
         reset : function() {
              if (this.originalValue) {
                  // Clear all items
                  this.eachItem(function(c) {
                    if(c.setValue){
                      c.setValue(false);
                      c.originalValue = c.getValue();
                    }
                  });
                  // Set items stored in originalValue, ugly - set a flag to reset the originalValue
                  // during the horrible onSetValue.  This will allow trackResetOnLoad to function.
                  this.resetOriginal = true;
                  this.setValue(this.originalValue);
                  delete this.resetOriginal;
              } else {
                this.eachItem(function(c) {
                  if(c.reset) {
                    c.reset();
                  }
                });
              }
              // Defer the clearInvalid so if BaseForm's collection is being iterated it will be called AFTER it is complete.
              // Important because reset is being called on both the group and the individual items.
              (function() {
                this.clearInvalid();
              }).defer(50, this);
            },
        */
        //Ext.each(field.items, resetFieldFunc);
        field.eachItem(function(c) {
          c.originalValue = c.getValue();
        });
      }
      else {
        field.originalValue = field.getValue();
      }
      //field.originalValue = field.getRawValue();
      /*
      if (field.xtype == "compositefield") {
        this.eachItem(function(item) {
          item.originalValue = item.getValue();
        });
      }
      */
    }
  };

  form.items.each(resetFieldFunc);
};  // eo reset dirty


/*
* Empty all fields of a form
* This is an ugly hack!
* @form: Form for which the fields should be set to empty
*/
Oger.extjs.emptyForm = function(form, resetDirty) {

  // if a form panel is given than get the underlaying basic form
  if (typeof form.getXType == 'function' && form.getXType() == 'form' &&
      typeof form.getForm == 'function') {
    form = form.getForm();
  }

  var emptyFieldFunc = function(field) {
    if (field.isFormField && typeof field.setValue == 'function') {
      field.setValue('');
    }
  };

  form.items.each(emptyFieldFunc);

  if (resetDirty) {
    Oger.extjs.resetDirty(form);
  }
};  // eo empty form


/*
* Workaround for bug in firefox.
* Messageboxes (confirm, alert, ...) are shown behind other windows
* in paticular behind tabpanels.
* Default zseed for window managers is 9000.
* Copied from: http://nicolaematei.wordpress.com/2008/07/02/ext-js-firefox3-z-index-bug/
* DOES NOT WORK AS EXPECTED (02/2011)
*/
this.fireFoxTempZSeed = 9000;
Oger.extjs.fireFoxHighZSeed = function(setHigh){
  if(Ext.isGecko3){ // TODO Temp Fix: FF3
    if(setHigh){
      this.fireFoxTempZSeed = Ext.WindowMgr.zseed;
      alert(Ext.WindowMgr.zseed);
      Ext.WindowMgr.zseed = 10000;
    }
    else {  // reset to old seed
      Ext.WindowMgr.zseed = this.fireFoxTempZSeed;
    }
  }
};  // eo firefox work around



/*
* Form saved message
*/
Oger.extjs.submitMsg = function(success, addMsg) {
  if (typeof success == 'undefined' || success === null) {
    success = true;
  }
  if (typeof addMsg == 'undefined' || addMsg === null) {
    addMsg = '';
  }
  if (success) {
    Ext.Msg.alert(Oger._('Ergebnis'), Oger._('Datensatz wurde erfolgreich gespeichert.' + addMsg));
  }
  else {
    Ext.Msg.alert(Oger._('Fehler'), Oger._('Datensatz konnte nicht gespeichert werden.'));
  }

};  // eo saved ok message
