define(['Handlebars'], function(Handlebars) {
  Handlebars = Handlebars["default"];  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
return templates['ApiListing.html'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "\n          <tr>\n            <td>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n            <td><a href=\"#api/"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "/manage\" class=\"item-view-link\"> Manage</a></td>\n            <td><a href=\"#api/"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "/detail\" class=\"item-edit-link\"> Details/Edit</a></td>\n          </tr>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<!DOCTYPE html>\n<div id=\"api-tab-existing-apis\" data-tabname=\"Existing Apis\" data-taburl=\"apis\" data-tabid=\"apis\" class=\"tab-pane active\">\n  <div class=\"row col-sm-12 col-md-12 col-lg-12\">\n    <div class=\"tab-content\">\n      <div id=\"existing-api-list\">\n        <div class=\"panel panel-default\">\n          <div class=\"panel-heading\"> Select to view or edit items listed below</div>\n        </div>\n        <table class=\"table table-striped\">";
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n        </table>\n      </div>\n    </div>\n  </div>\n</div>";
},"useData":true});
});
