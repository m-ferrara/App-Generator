define(['Handlebars'], function(Handlebars) {
  Handlebars = Handlebars["default"];  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
return templates['ApiDetail.html'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<!DOCTYPE html>\n<div id=\"api-tab-api-detail-"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-tabname=\"Api "
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-taburl=\"api/"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "/details\" data-tabid=\"ad"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"tab-pane active\">\n  <div class=\"row col-sm-12 col-md-12 col-lg-12\">\n    <div class=\"tab-content\">\n      <div id=\"api-detail\">\n        <div class=\"panel panel-default\">\n          <div class=\"panel-heading\"> Edit the Api's name, database and progress status.</div>\n          <nav>\n            <div class=\"col-sm-10\">\n              <ul id=\"toggle-edit\" class=\"nav nav-pills\">\n                <li class=\"disabled\"><a>Options</a></li>\n                <li class=\"separator\"></li>\n                <li class=\"active\"><a class=\"view\">View</a></li>\n                <li><a class=\"edit\">Edit</a></li>\n              </ul>\n            </div>\n          </nav>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row col-sm-12 col-md-12 col-lg-12\">\n    <div class=\"clear\"></div>\n    <div class=\"form-horizontal\">\n      <div class=\"form-group\">\n        <label for=\"name\" class=\"control-label col-sm-2\">name:</label>\n        <div class=\"col-sm-8\">\n          <input id=\"name\" type=\"text\" name=\"name\" value=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" disabled class=\"form-control\">\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"db_name\" class=\"control-label col-sm-2\">db_name:</label>\n        <div class=\"col-sm-8\">\n          <input id=\"db_name\" type=\"text\" name=\"db_name\" value=\""
    + escapeExpression(((helper = (helper = helpers.db_name || (depth0 != null ? depth0.db_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"db_name","hash":{},"data":data}) : helper)))
    + "\" disabled class=\"form-control\">\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"status\" class=\"control-label col-sm-2\">status:</label>\n        <div class=\"col-sm-8\">\n          <input id=\"status\" type=\"number\" name=\"status\" value=\""
    + escapeExpression(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"status","hash":{},"data":data}) : helper)))
    + "\" disabled class=\"form-control\">\n        </div>\n      </div>\n      <div id=\"edit-controls\">\n        <div class=\"col-sm-2\"></div>\n        <div class=\"col-sm-8 text-right\">\n          <button type=\"button\" class=\"btn btn-danger delete\">Delete</button>\n          <button type=\"button\" class=\"btn btn-success save-edit\">Save</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>";
},"useData":true});
});
