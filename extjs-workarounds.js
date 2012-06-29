/*
#LICENSE BEGIN
#LICENSE END
*/





// workarounds for extjs bugs
//////////////////////////////

// [4.0.2a] Ext.Date.defaultFormat is used at define time in Ext.grid.column.Date
// should be fixed in 4.0.7 but is not (at least not in 4.0.7 gpl)
// so force Ext.Date.defaultFormat to 'd.m.Y' independend of following problems in internationalisation
// Now done in ext-lang-de.js, so it is here only for documentation
//Ext.Date.defaultFormat = 'd.m.Y';


// in 4.1.0 the altFormat Y-m-d is not set
// Now done in ext-lang-de.js, so it is here only for documentation
//Ext.form.field.Date.altFormats = Ext.form.field.Date.altFormats + "|Y-m-d";


// the datepicker is set to startday 1 (monday) but datefield not so the
// datepicker setting is overwritten for datepickers of datefields
// Now done in ext-lang-de.js, so it is here only for documentation
//Ext.form.field.Date.startDay = 1;
