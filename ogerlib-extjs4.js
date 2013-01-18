/*
#LICENSE BEGIN
#LICENSE END
*/



/*
* Define namespace.
*/
if (typeof Oger == 'undefined') {
  Oger = {};
}
if (typeof Oger.extjs == 'undefined') {
  Oger.extjs = {};
}


/*
* DEPRECATED: Use Ext.Component.alignTo(otherComponent, 'c-c?') instead.
*
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
* General handler for form submission errors.
* On not "sufficient" handled failures do not return true to notify
* that subsequent handling is expected.
*/
Oger.extjs.handleFormSubmitFailure = function(form, action) {

  switch (action.failureType) {
    case Ext.form.Action.CLIENT_INVALID:
      Oger.extjs.showInvalidFields(form);
      //Ext.Msg.alert(Oger._('Fehler'), Oger._('Fehler im Formular. Bitte korrekt ausfüllen.'));
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



/**
* check if form is dirty and do nothing else
* OBSOLETED by ext-4.1
*/
Oger.extjs.formIsDirty = function(form) {

  // if no form given it cannot be dirty?
  if (!form) {
    return false;
  }

  // if a form panel is given than get the underlaying basic form
  if (typeof form.getForm == 'function') {
    form = form.getForm();
  }


  // own processing to exclude fileField (which cannot be reseted!)
  var dirtyFlag = false;

  var processField = function(field) {
    if (field.isXType('filefield')) {
      // do nothing
    }
    else if (field.isDirty()) {
      dirtyFlag = true;
    };
  };
  form.getFields().each(processField);

  return dirtyFlag;
}  // eo form is dirty flag



/**
 * Create info about dirty fields
 */
Oger.extjs.dirtyFieldsInfo = function(form) {

  // if no form given it cannot be dirty?
  if (!form) {
    return true;
  }

  // if a form panel is given than get the underlaying basic form
  if (typeof form.getForm == 'function') {
    form = form.getForm();
  }

  var dirtyMsg = '';

  var dirtyFlag = Oger.extjs.formIsDirty(form);
  if (dirtyFlag) {   // use own dirty flag instead of form.isDirty()

    dirtyMsg = Oger._('Geändert:');
    //dirtyMsg += ' ' + form.getValues(true, true);

    var processField = function(field) {
      if (field.isXType('radiogroup') || field.isXType('checkboxgroup')) {
        // items are separate fields so handling of group is not necessary
      }
      else {
        if (field.isDirty()) {
          dirtyMsg += ' ' + field.fieldLabel + ' (' + field.name + ')';
          if (field.isXType('radiofield') || field.isXType('checkboxfield')) {
            dirtyMsg += '[' + field.inputValue + ']';
          }
          dirtyMsg += ': old=' + field.originalValue + ', new=' + field.getValue() + ';';
        };
      }
    };

    form.getFields().each(processField);
  }  // eo show msg

  return dirtyMsg;
}  // eo dirty fields message



/*
* Ask to force window close
* @panel: Panel (or window) that should be closed
* @form: FormPanel or BasicForm to test for dirty state
*/
Oger.extjs.confirmDirtyClose = function(win, form) {

  if (!form) {
    form = win.down('form');
  }
  if (typeof form.getForm == 'function') {
    form = form.getForm();
  }

  // only ask if dirty
  if (Oger.extjs.formIsDirty(form)) {

    var confirmWin = Ext.create('Ext.window.Window', {
      title: Oger._('Bestätigung erforderlich - ') + win.title,
      width: 300,
      height: 150,
      modal: true,
      autoScroll: true,
      layout: 'fit',
      border: false,

      items: [
        { xtype: 'form',
          layout: 'fit',
          bodyPadding: 15,
          items: [
            { xtype: 'textarea', value: Oger._('Ungespeicherte Änderungen vorhanden.\n\nZurück zur Eingabe?'),
              fieldStyle: 'text-align:center;border:none;',
            },
          ]
        }
      ],

      buttonAlign: 'center',
      buttons: [
        { text: Oger._('Ja'),
          handler: function(button, event) {
            this.up('window').close();
          },
        },
        { text: Oger._('Verwerfen'),
          handler: function(button, event) {
            Oger.extjs.resetDirty(form);
            win.close();
            this.up('window').close();
          },
        },
        { text: Oger._('Details'),
          handler: function(button, event) {
            Ext.Msg.alert(Oger._('Ungespeicherte Änderungen - Details'), Oger.extjs.dirtyFieldsInfo(form));
          },
        },
      ],
    });
    confirmWin.show();

    return false;
  }

}  // eo confirm force close



/*
* Ask to reset dirty form
* @form: FormPanel or BasicForm to test for dirty state
* @showDirtyInfo: Show info about dirty fields
*/
Oger.extjs.confirmDirtyReset = function(form, showDirtyInfo) {

  if (!form) {
    return;
  }
  if (typeof form.getForm == 'function') {
    form = form.getForm();
  }

  // only ask if dirty
  if (Oger.extjs.formIsDirty(form)) {

    /*
    var dirtyFieldsInfo = '';
    if (showDirtyInfo) {
      dirtyFieldsInfo = Oger.extjs.dirtyFieldsInfo(form);
      dirtyFieldsInfo = '\n' + dirtyFieldsInfo;
    }
    */

    var confirmWin = Ext.create('Ext.window.Window', {
      title: Oger._('Ungespeicherte Änderungen'),
      width: 400,
      height: 200,
      modal: true,
      autoScroll: true,
      layout: 'fit',
      border: false,

      items: [
        { xtype: 'form',
          layout: 'fit',
          bodyPadding: 15,
          items: [
            { xtype: 'textarea',
              fieldStyle: 'text-align:center;border:none;',
              value: Oger._('Ungespeicherte Änderungen vorhanden. Änderungen rückgängig machen?'),
            },
          ]

        }
      ],

      buttonAlign: 'center',
      buttons: [
        { text: 'Ja',
          handler: function(button, event) {
            form.reset();
            this.up('window').close();
          },
        },
        { text: 'Nein',
          handler: function(button, event) {
            // do nothing
            this.up('window').close();
          },
        },
        { text: Oger._('Details'),
          handler: function(button, event) {
            Ext.Msg.alert(Oger._('Ungespeicherte Änderungen - Details'), Oger.extjs.dirtyFieldsInfo(form));
          },
        },
      ],
    });
    confirmWin.show();

    return false;
  }

}  // eo confirm reset form

/*
 * Memo from: http://stackoverflow.com/questions/6261013/extjs-message-box-with-custom-buttons
 * for confirmDirtyClose and confirmDirtyAction

  Ext.define('App.view.MyDialog', {
    show: function() {
        var dialog = Ext.create('Ext.window.MessageBox', {
            buttons: [{
                text: 'baz',
                iconCls: 'icon-add',
                handler: function() {
                    dialog.close();
                }
            }]
        });

        dialog.show({
            title: 'foo!',
            msg: '<p>bar?</p>',
            icon: Ext.MessageBox.WARNING
        });

        dialog.setHeight(160);
        dialog.setWidth(420);
    }
});
var dialog = Ext.create('App.view.MyDialog');
dialog.show();
*/

/*
* Ask to continue action even if form dirty
* @args: object with parameters
*        Members are:
*        - form: (mandatory) FormPanel or BasicForm
*        - title: (optional) title for the confirmation window
*        - msg: (optional) message for the confirmation window
*        - saveFn: (mandatory) action for yes button
*        - saveText: (optional) alternate text for save button
*        - resetFn: (optional) action for no button
*        - resetText: (optional) alternate text for reset button
*        - cancelText: (optional) alternate text for cancel button
*        (and may be later TODO parameters for the called functions)
*/
Oger.extjs.confirmDirtyAction = function(args) {

  var form = args.form;
  if (typeof form.getForm == 'function') {
    form = form.getForm();
  }

  // only ask if form is dirty
  // (normaly this method should only be called if the form is dirty !!!)
  if (Oger.extjs.formIsDirty(form)) {

    var title = (args.title ? args.title : Oger._('Bestätigung erforderlich'));
    var msg = (args.msg ? args.msg : Oger._('Ungespeicherte Änderungen vorhanden.\n\nJetzt Speichern?'));

    var saveText = (args.saveText ? args.saveText : Oger._('Speichern'));
    var resetText = (args.resetText ? args.resetText : Oger._('Zurücksetzen'));
    var cancelText = (args.cancelText ? args.cancelText : Oger._('Abbrechen'));

    var confirmWin = Ext.create('Ext.window.Window', {
      title: title,
      width: 400,
      height: 200,
      modal: true,
      autoScroll: true,
      layout: 'fit',
      border: false,

      items: [
        { xtype: 'form',
          layout: 'fit',
          bodyPadding: 15,
          items: [
            { xtype: 'textarea', value: msg, fieldStyle: 'text-align:center;border:none;' },
          ]

        }
      ],

      buttonAlign: 'center',
      buttons: [
        { text: saveText,
          handler: function(button, event) {
            args.saveFn();
            this.up('window').close();
          },
        },
        { text: resetText,
          handler: function(button, event) {
            if (args.resetFn) {
              args.resetFn();
            }
            else {
              Oger.extjs.resetForm(form);
            }
            this.up('window').close();
          },
        },
        { text: cancelText,
          handler: function(button, event) {
            // do nothing
            this.up('window').close();
          },
        },
        { text: Oger._('Details'),
          handler: function(button, event) {
            Ext.Msg.alert(Oger._('Ungespeicherte Änderungen - Details'), Oger.extjs.dirtyFieldsInfo(form));
          },
        },
      ],
    });
    confirmWin.show();

    return false;
  }

}  // eo confirm action on dirty form







/*
* Unset the dirty state of a form
* @form: Form which dirty state should be removed
*/
Oger.extjs.resetDirty = function(form) {

  // if a form panel is given than get the underlaying basic form
  if (typeof form.getForm == 'function') {
    form = form.getForm();
  }

  var processField = function(field) {
    if (field.isXType('radiogroup') || field.isXType('checkboxgroup')) {
      // group items are separate fields so handling of group is not necessary
    }
    else {
      field.resetOriginalValue();
    }
  };

  form.getFields().each(processField);
};  // eo reset dirty



/*
* Empty all fields of a form
* @form: Form for which the fields should be set to empty
* Works for date fields too, even if null would be the correct empty value.
*/
Oger.extjs.emptyForm = function(form, resetDirty) {

  if (!form) {
    return;
  }

  // if a form panel is given than get the underlaying basic form
  if (typeof form.getForm == 'function') {
    form = form.getForm();
  }

  var processField = function(field) {
    if (field.isXType('radiogroup') || field.isXType('checkboxgroup')) {
      // group items are separate fields so handling of group is not necessary
    }
    else if (field.isXType('radiofield') || field.isXType('checkboxfield')) {
      field.setValue(false);
    }
    else {
      field.setValue('');
    }
  };

  form.getFields().each(processField);

  if (resetDirty) {
    Oger.extjs.resetDirty(form);
  }
};  // eo empty form



/*
* Get invalid fields
* @form: Form to test the fields
*/
Oger.extjs.getInvalidFieldNames = function(form) {

  // if a form panel is given than get the underlaying basic form
  if (typeof form.getForm == 'function') {
    form = form.getForm();
  }

  var invalidFields = '';

  var processField = function(field) {
    // include radiogroup and checkbox group
    if (!field.isValid()) {
      invalidFields += (invalidFields ? ', ' : '') + field.fieldLabel + ' (' + field.name + ')';
    }
  };

  form.getFields().each(processField);

  return invalidFields;
};  // eo get fields that do not valid



/*
* Repair invalid combo values. (set to null by error)
* @form: Form to test the fields
*/
Oger.extjs.repairComboValues = function(form) {

  // if a form panel is given than get the underlaying basic form
  if (typeof form.getForm == 'function') {
    form = form.getForm();
  }

  var processField = function(field) {
    // include radiogroup and checkbox group
    if (field.isXType('combo')) {
      if (field.getSubmitValue() === null && field.originalValue != null) {
        field.setValue('');
      }
    }
  };

  form.getFields().each(processField);

  return true;
};  // eo repair combo values


/**
 * Reset form
 * form.reset() does not reset null values in hidden fields and
 *              does not reset values of FileField
 * @form: Form which dirty state should be removed
 */
Oger.extjs.resetForm = function(form) {

  // if a form panel is given than get the underlaying basic form
  if (typeof form.getForm == 'function') {
    form = form.getForm();
  }

  // I am unable to reset FileField too, so use reset of ext
  form.reset();
  return;

  // OBSOLETE for now
  var processField = function(field) {
    if (field.isXType('radiogroup') || field.isXType('checkboxgroup')) {
      // group items are separate fields so handling of group is not necessary
    }
    else {
      // field.setValue(field.originalValue);
      // fileField has no setValue nor does "field.value = field.originalValue" work
      // nor works field.reset() but something we must use
      field.reset();
    }
  };

  form.getFields().each(processField);
};  // eo reset form



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



/*
* Show a generic wait window for given millis
*/
Oger.showWaitWin = function(milli, modal) {

  //Ext.Msg.wait(Oger._('Das dauert leider etwas ...'), Oger._('Bitte warten'));
  //Ext.Function.defer(function() { Ext.Msg.hide; }, milli);

  // Ext.Message is overwritten by any other error message and overwrites other messages too
  // so use a self designed wait window

  // modal defaults to true
  if (modal == undefined || modal == null) {
    modal = true;
  }

  var waitWin = Ext.create('Ext.window.Window', {
    title: Oger._('Bitte Warten'),
    width: 300,
    height: 250,
    modal: modal,
    autoScroll: true,
    layout: 'fit',
    items: [
      { xtype: 'form',
        layout: 'fit',
        items: [
          { xtype: 'textarea', value: Oger._('Das dauert leider etwas länger ...'), disabled: true },
        ]
      },
    ],
  });
  waitWin.show();
  //waitWin.toFront();
  Ext.Function.defer(function() { waitWin.close(); }, milli);

}  // eo show wait window



/*
 * Show windows with invalid field names
*/
Oger.extjs.showInvalidFields = function(form) {

  if (!form) {
    return;
  }
  if (typeof form.getForm == 'function') {
    form = form.getForm();
  }
  if (form.isValid()) {
    return;
  }

  var win = Ext.create('Ext.window.Window', {
    title: Oger._('Fehler'),
    width: 300,
    height: 200,
    modal: true,
    autoScroll: true,
    layout: 'fit',

    items: [
      { xtype: 'panel',
        html: Oger._('Fehler im Formular. Bitte korrekt ausfüllen.'),
      }
    ],

    buttonAlign: 'center',
    buttons: [
      { text: Oger._('Ok'),
        handler: function(button, event) {
          this.up('window').close();
        },
      },
      { text: Oger._('Details'),
        handler: function(button, event) {
          Ext.Msg.alert(Oger._('Formularfehler - Details'), Oger._('Feldnamen: ') + Oger.extjs.getInvalidFieldNames(form));
        },
      },
    ],
  });
  win.show();

}  // eo invalid fields window
