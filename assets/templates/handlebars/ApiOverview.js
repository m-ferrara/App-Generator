define(['Handlebars'], function(Handlebars) {
  Handlebars = Handlebars["default"];  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
return templates['ApiOverview.html'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<!DOCTYPE html>\n<div id=\"api-tab-api-overview-"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-tabname=\"Manage Api "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" data-taburl=\"api/"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "/overview\" data-tabid=\"ao"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"container tab-pane active\">\n  <div class=\"row col-sm-12 col-md-12 col-lg-12\">\n    <div class=\"tab-content\">\n      <div id=\"existing-api-list\">\n        <div class=\"panel panel-default\">\n          <div class=\"panel-heading\"><span class=\"alert alert-info\">Manage API Entities, Attributes and Endpoints.</span></div>\n          <div class=\"row col-sm-12 col-md-12\">\n            <ul class=\"api-menu-list list-group\">\n              <li class=\"api-detail list-group-item\">\n                <div class=\"api-detail-wrapper\"><a href=\"#api/"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "/Entities\" class=\"detail-link\">\n                    <div class=\"api-component\">Entities</div><span class=\"glyphicon glyphicon-th-list\"></span></a>\n                  <div class=\"separator\"></div>\n                  <div class=\"active-status\"><span class=\"badge last-updated\">Last Updated: "
    + escapeExpression(((helper = (helper = helpers.UpdatedDate || (depth0 != null ? depth0.UpdatedDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"UpdatedDate","hash":{},"data":data}) : helper)))
    + "</span></div>\n                </div>\n              </li>\n              <li class=\"api-detail list-group-item\">\n                <div class=\"api-detail-wrapper\"><a href=\"#api/"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "/Attributes\" class=\"detail-link\">\n                    <div class=\"api-component\">Attributes</div><span class=\"glyphicon glyphicon-tags\"></span></a>\n                  <div class=\"separator\"></div>\n                  <div class=\"active-status\"><span class=\"badge last-updated\">Last Updated: "
    + escapeExpression(((helper = (helper = helpers.UpdatedDate || (depth0 != null ? depth0.UpdatedDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"UpdatedDate","hash":{},"data":data}) : helper)))
    + "</span></div>\n                </div>\n              </li>\n              <li class=\"api-detail list-group-item\">\n                <div class=\"api-detail-wrapper\"><a href=\"#api/"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "/Endpoints\" class=\"detail-link\">\n                    <div class=\"api-component\">Endpoints</div><span class=\"glyphicon glyphicon-transfer\"></span></a>\n                  <div class=\"separator\"></div>\n                  <div class=\"active-status\"><span class=\"badge last-updated\">Last Updated: "
    + escapeExpression(((helper = (helper = helpers.UpdatedDate || (depth0 != null ? depth0.UpdatedDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"UpdatedDate","hash":{},"data":data}) : helper)))
    + "</span></div>\n                </div>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>";
},"useData":true});
});
