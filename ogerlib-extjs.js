/*
#LICENSE BEGIN
#LICENSE END
*/



/*
* Define Oger.extjs namespace.
*/
Oger.extjs = {};


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
