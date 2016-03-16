define(['jquery','models/Api','models/Attribute', 'models/Entity', 'models/EndpointActionAttributeMapping', 'models/EntityAttributeMapping', 'models/Endpoint',
 		'collections/ApiCollection','collections/AttributeCollection', 'collections/EntityCollection', 'collections/EndpointActionAttributeMappingCollection', 
		'collections/EntityAttributeMappingCollection','collections/EndpointCollection',
		'views/ApiCollection','views/ApiDetail','views/AttributeDetail','views/AttributeListing', 'views/EntityDetail', 'views/EntityListing',
		'views/EntityRestListing','views/EntityRestOverview','views/Index','views/ApiCreate', 'views/AttributeCreate','views/ApiOverview'], 
  function( $
  			,ApiModel
  			,AttributeModel
			,EntityModel
			,EndpointActionAttributeMappingModel
			,EntityAttributeMappingModel
			,EndpointModel
			,ApiCollection
			,AttributeCollection
			,EntityCollection
			,EndpointActionAttributeMappingCollection
			,EntityAttributeMappingCollection
			,EndpointCollection
			,_ApiCollectionView
			,_ApiDetailView
			,_AttributeDetailView
			,_AttributeListingView
			,_EntityDetailView
			,_EntityListingView
			,_EntityRestListingView
			,_EntityRestOverviewView
			,_IndexView
			,_ApiCreateView
			,_AttributeCreateView
			,_ApiOverviewView) 
{
	
	var View = function View(id, displayName, href, state, type, el) {
		this.id = id;
		this.displayName = displayName;
		this.href = href;
		this.state = state;
		this.type = type;
		this.el = el;
		
		return this;
	};
	
	// tab id should autoincrement for some tab types., possible refactor needed.
	var Tab = function Tab(id, name, href, state, type, el) {
		this.id = id;
		this.name = name;
		this.href = href;
		this.state = state;
		this.type = type;
		this.el = el;
		
		return this;
	};
	
	var AppTabs = function AppTabs(){
		var appTabs = (function(){
			// Navigation supports two tiers of Tabs/linking structures 
			// parent-child, managing dynamic switching between
			//  Api-level and Component-level constituent items.
			this.ParentTabs = [];
			this.ChildTabs = [];
			this.ParentTabs.ExistingTabs = [];
			this.ChildTabs.ExistingTabs = [];
			
			/*
			 *  @method activateView
			 *  @desc will handle synchronization of navigation and content elements of selected views
			 */
			this.activateView = function activateView(view){
				var id = view.id,
					href = view.href,
					displayName = view.displayName,
					state = view.state,
					type = view.type,
					el = view.el;
					
				// Check if View Exists 
				var viewExists = this.viewExists(id);
				
				if (viewExists)
				{
					// update view content and navigation elements to show view as first
					this.showView(view);
					this.updateNav(view);

				}
				else
				{
					//create Navigation and Content Elements, then show.
					this.createView(view);
					this.showView(view);
					this.updateNav(view);
				}
			};
			
			/*
			 * @method updateNav
			 * @desc given view id
			 */
			this.updateNav = function updateNav(view) {
				var id = view.id,
					href = view.href,
					displayName = view.displayName,
					state = view.state,
					type = view.type,
					el = view.el;
					
				
			};
			
			/*
			 * @method showView
			 * @desc given view id
			 */
			this.showView = function showView(view) {
				var id = view.id,
					href = view.href,
					displayName = view.displayName,
					state = view.state,
					type = view.type,
					el = view.el;
					
				
			};
			
			
			/*
			 * @method createView
			 * @desc given view id
			 */
			this.createView = function createView(view) {
				var id = view.id,
					href = view.href,
					displayName = view.displayName,
					state = view.state,
					type = view.type,
					el = view.el;
					
				
			};
			
			/*
			 * @method viewExists
			 * @desc given view id, returns true if exists in ExistingViews array by performing jQuery $.inArray call.
			 */
			this.viewExists = function viewExists( id ) {
				var viewExists = -1; 
				 	viewExists = $.inArray(id, this.ExistingViews);
				 	
				 	return (viewExists) ? true: false;
			};
			

			// activateTab returns true for existing/cached content, false for non existing.
			this.activateTab = function activateTab(){
				var activeTab = arguments[0];
				var id = activeTab.id,
					name = activeTab.name,
					state = activeTab.state,
					type = activeTab.type,
					el = activeTab.el;
				// for child tab, check if parent tab exists.
				// tabExists represents the order in which the tab is currently (0~1st position)
				var tabExists = -1;
				if (type == this.$cType) {
					tabExists = this.parentTabExists(id);
				}
				else {
				// check if tab already opened and in list
				 	tabExists = $.inArray(id, this.ExistingTabs);
				 }
				// FOR EXISTING TABS -- 5 scenarios supported:
				// 1. parent only tab exists, is in first position, return true.
				// 2. parent only tab not in first position, remove and resort parent tab to first.
				// 3. parent tab not in first position, component tab is in first position, return true.
				// 4. parent tab 
				// 5. parent tab 
				
				if (tabExists > -1) {
					if (tabExists === 0) {
						if ( type == this.$cType ) {
							// 
						}
						return true;
					} else {
					// remove current position, unshift to first
					this.removeTab(activeTab);
					this.tabToFirst(activeTab, true);
					// tab exists, return true
					return true;
				}
				}
				else {
					// insert div to receive html markup, create tab in first position
					this.tabToFirst(activeTab, false);
					// tab doesn't exist, return false
					return false;
				}	 			
				//console.info( activeTab );
			};
			this.removeTab = function removeTab(activeTab){
				var id = activeTab.id,
					name = activeTab.name,
					state = activeTab.state,
					type = activeTab.type,
					el = activeTab.el;
				// remove tab from dom nav-tabs list 	
				$("ul.nav-tabs > li#tab-" + id).remove();
				
				if (this.ExistingTabs.length > 1)
				{
					var existingIndex = this.ExistingTabs.indexOf(id);
					var tempExisting = this.ExistingTabs;
					tempExisting.splice(existingIndex,1);
					if (Object.prototype.toString.call( tempExisting ) !== '[object Array]') {
						 tempExisting = [tempExisting];
					}
					this.ExistingTabs = tempExisting;
				}
				else if (this.ExistingTabs.length == 1){
					this.ExistingTabs.length = 0;
				}
				
				//$("#" + el).hide();
			};
			
			this.tabToFirst = function tabToFirst(activeTab, tabExists){
				var id = activeTab.id,
					name = activeTab.name,
					href = activeTab.href,
					state = activeTab.state,
					type = activeTab.type,
					el = activeTab.el;
				
				
				if (this.ExistingTabs.length >= 1 && this.ExistingTabs[0] !== id) 
				{
					this.ExistingTabs = [id].concat(this.ExistingTabs);
				}
				else 
				{
					this.ExistingTabs = [id];
				} 
				// clear existing active tab
				$("#api-tabs > div > ul.nav-tabs > li.active").removeClass("active");
				$("#api-tabs > div > ul.nav-tabs").prepend('<li class="active" id="tab-' + id + '"><a href="#' + href + '" data-content-id="' + el + '">'+ name +'</a></li>');
				// hide previously shown tab content
				var currentActive = $(".tab-pane .active");
				currentActive.removeClass("active").hide();


				// for existing tab content, show and add .active
				if (tabExists)
				{
				 $("#" + el).show().addClass("active");
				}
				
			};
			this.ParentTabs.unshift = this.activateTab;
			this.ChildTabs.unshift = this.activateTab;
			this.ParentTabs.tabToFirst = this.tabToFirst;
			this.ChildTabs.tabToFirst = this.tabToFirst;
			this.ParentTabs.removeTab = this.removeTab;
			this.ChildTabs.removeTab = this.removeTab;

		return this; 
		})();
		
		return appTabs;
	};
	

	
	var AppGeneratorRouter = Backbone.Router.extend({
		// dictionary for tab meta data
		$aType : "api",
		$cType : "component",
		$uStatus: "unedited",
		// tab names
		currentView: null,
		tabs: new AppTabs(),
		routes: {	
			"index": "home"
			,"apis" : "apis"
			,"api/create" : "apiCreate"
			,"api/:id(/)" : "apiManage"
			,"api/:id/manage" : "apiManage"
			,"api/:id/detail" : "apiDetail"
			,"api/:id/detail/edit" : "apiEdit"
			,"attribute/create" : "attributeCreate"
			,"attribute/:id(/)(:viewMode)": "attribute"
			,"attributes" : "attributes"
			,"entity/:id": "entity"
			,"rest/:entId(/:method)": "rest"
			,"*actions" : "home"
			,"home" : "home"
			// ,"apis" : "apis"
			// ,"api/create" : "apiCreate"
			// ,"api/:id/manage" : "apiManage"
			// ,"api/:id(/)(:viewMode)" : "apiDetail"
			// ,"api/:id/attributes" : "apiAttributes"
			,"api/:id/entities" : "apiEntities"
			// ,"api/:id/endpoints" : "apiEndpoints"
			// ,"attributes" : "attributes"
			,"attribute/create" : "attributeCreate"
			// ,"attribute/:id(/)(:viewMode)" : "attributeDetail"
			// ,"entities" : "entities"
			// ,"entity/create" : "entityCreate"
			// ,"entity/:id(/)(:viewMode)" : "entityDetail"
			// ,"endpoints" : "endpoints"
			,"endpoint/create" : "endpointCreate"
			// ,"endpoint/:id(/)(:viewMode)" : "endpointDetail"
		},
		
		changeView: function(view) {
			if ( null != this.currentView) {
				this.currentView.undelegateEvents();
			}
			this.currentView = view;
			this.currentView.render();
		},
		
/*
		execute: function(callback, args, name) {
		    console.log(name);
		    console.log(args);
		    console.log(callback);
		    callback.apply(this, args);
		},*/

		
		home: function(){
			//Tab(id, name, href, state, type, el) 
			var tabContentEl = "api-tab-home";
			var tabCached = this.tabs.ParentTabs.unshift(new Tab("home", "Home", "home", this.$uStatus, this.$aType, tabContentEl));
			if (tabCached) {
				return false;
			}
			this.changeView(new _IndexView({tabContentEl: tabContentEl}));
		},
		
		apis : function() {
			var tabContentEl = "api-tab-existing-apis";
			//	Tab(id, name, href, state, type, el) 
			var tabCached = this.tabs.ParentTabs.unshift(new Tab("apis", "APIs List", "apis", this.$uStatus, this.$aType, tabContentEl));
			if (tabCached) {
				return false;
			}			
			var that = this,
			apiCollection = new ApiCollection();
			
			apiCollection.fetch({
				success: function(){
					var apiCollectionView = new _ApiCollectionView({collection:apiCollection, tabContentEl: tabContentEl});
					that.changeView(apiCollectionView);
				},
				error: function() {
					console.log("apis not retrieved");
				}
			});

		},
		
		apiCreate: function(){
			var tabContentEl = "api-tab-api-create";

			var tabCached = this.tabs.ParentTabs.unshift(new Tab("api-create", "Create API", "create-api", this.$uStatus, this.$aType, tabContentEl));
			if (tabCached) {
				return false;
			}			


			var apiCreateView = new _ApiCreateView({model: new ApiModel(), tabContentEl: tabContentEl});
			this.changeView(apiCreateView);
		},
		
		apiEdit: function(id, viewMode) {
			if (id == null || id < 0 || typeof id != "number")
			{
				// return error page,invalid request id
			}
			if (viewMode == null || viewMode !== "view" && viewMode !== "edit")
			{
				viewMode = "view";
			}
			var tabContentEl = "api-tab-api-detail-" + id;
			//	Tab(id, name, href, state, type, el) 
			var tabCached = this.tabs.ChildTabs.unshift(new Tab("ao" + id + "-" + "ad"+ id, "Edit Api " + id, "api/" + id + "/detail/edit", this.$uStatus, this.$cType, tabContentEl));
			
			if (tabCached) {
				return false;
			}
			
			var apiDetailModel = new ApiModel({id:id});
			
			apiDetailModel.fetch({data: $.param({ id: id})});
			
			var apiDetailView = new _ApiDetailView({model:apiDetailModel, viewMode: viewMode, tabContentEl: tabContentEl});
			
			this.changeView(apiDetailView);
		},
		
		apiDetail: function(id, viewMode) {
			var that = this;
			if (id == null || id < 0 || typeof id != "number")
			{
				// return error page,invalid request id
			}
			if (viewMode == null || viewMode !== "view" && viewMode !== "edit")
			{
				viewMode = "view";
			}
			var tabContentEl = "api-tab-api-detail-" + id;
			//	Tab(id, name, href, state, type, el) 
			var tabCached = this.tabs.ChildTabs.unshift(new Tab("ad"+ id, "Api " + id + " Detail", "api/" + id + "/detail", this.$uStatus, this.$aType, tabContentEl));
			if (tabCached) {
				return false;
			}
			
			var apiDetailModel = new ApiModel({id:id});
			
			apiDetailModel.fetch({data: $.param({ id: id}),
			success: function(){
				var apiDetailView = new _ApiDetailView({model:apiDetailModel, viewMode: viewMode, tabContentEl: tabContentEl});
			
				that.changeView(apiDetailView);
				return this;
			},
			error: function(){
				console.log("error retrieving Api Detail: possibly not exists. todo: implement non existing tab content error handling");
			}});
			
			return false;
		},
		
		apiManage: function(id) {

			if (id == null || id < 0 || typeof id != "number")
			{
				// return error page,invalid request id
			}
			
			var tabContentEl = "api-tab-api-overview-" + id;

			//	Tab(id, name, href, state, type, el) 
			var tabCached = this.tabs.ParentTabs.unshift(new Tab("ao"+ id, "Manage Api " + id, "api/" + id + "/manage", this.$uStatus, this.$aType, tabContentEl));
			if (tabCached) {
				return false;
			}
			
			var apiDetailModel = new ApiModel({id:id});
			
			apiDetailModel.fetch({data: $.param({ id: id})});
			
			var apiDetailView = new _ApiOverviewView({model:apiDetailModel, tabContentEl: tabContentEl});
			
			this.changeView(apiDetailView);
		},
		
		attributeCreate: function(){
			var tabContentEl = "api-tab-home";

			var attributeCreateView = new _AttributeCreateView({model: new AttributeModel(), tabContentEl: tabContentEl});
			this.changeView(attributeCreateView);
		},
		
		attribute: function(id, viewMode){
			var tabContentEl = "api-tab-home";
			
			var that = this;
			id = parseInt(id,10);
			
			if (id == null || id < 0 || typeof id != "number")
			{
				// return error page,invalid request id
				return this.home();
			}
			if (viewMode == null || viewMode !== "view" && viewMode !== "edit")
			{
				viewMode = "view";
			}

			var attributeDetailModel = new AttributeModel({id:id});
			
			attributeDetailModel.fetch({data: $.param({ id: id})});
			
			var AttributeDetailView = new _AttributeDetailView({model:attributeDetailModel, viewMode: viewMode, tabContentEl: tabContentEl});

			this.changeView(AttributeDetailView);

			/*, success:function(that){
			  that.changeView(new AttributeDetailView({model:attributeDetailModel}));

				window.attributes = attributeDetailModel;}});
				*/

			
		//	attributeDetailModel.fetch({data: $.param({ id: id}), success:function(){window.attributes = attributeDetailModel;}});
			
		},
		
		attributes : function() {
			var tabContentEl = "api-tab-home";
			var that = this,
			attributeCollection = new AttributeCollection();
			
			attributeCollection.fetch({
				success: function(){
					var attributeListingView = new _AttributeListingView({collection:attributeCollection, tabContentEl: tabContentEl});
					that.changeView(attributeListingView);
				},
				error: function() {
					console.log("attributes not retrieved");
				}
			});

		},
				
		apiEntities: function(id) {

			if (id == null || id < 0 || typeof id != "number")
			{
				// return error page,invalid request id
			}
			
			var tabContentEl = "api-tab-api-" + id + "-entities";

			//	Tab(id, name, href, state, type, el) 
			var tabCached = this.tabs.ParentTabs.unshift(new Tab("ae"+ id, "Api " + id  + " Entities", "api/" + id + "/entities", this.$uStatus, this.$aType, tabContentEl));
			if (tabCached) {
				return false;
			}
			
			var apiDetailModel = new ApiModel({id:id});
			
			apiDetailModel.fetch({data: $.param({ id: id})});
			
			var apiDetailView = new _ApiOverviewView({model:apiDetailModel, tabContentEl: tabContentEl});
			
			this.changeView(apiDetailView);
		},
		entity: function(id){
			var tabContentEl = "api-tab-home";
			
			if (id == null || id < 0 || typeof id != int)
			{
				// return error page, invalid request id
				this.home();
			}
			var entityDetailModel = new EntityModel({id:id});
			
			this.changeView(new EntityDetailView({model:entityDetailModel, tabContentEl: tabContentEl}));
		},
		
		endpointCreate : function () {
			var tabContentEl = "api-tab-home";
			
			var endpointCreateView = new _EndpointCreateView({model: new EndpointModel(), tabContentEl: tabContentEl});
			this.changeView(endpointCreateView);
		},
		
		rest: function(entId,method){
			var tabContentEl = "api-tab-home";
			
			if (id == null || id < 0 || typeof id != int)
			{
				// return error page, invalid request id
			}
			var attributeDetailModel = new AttributeModel({id:id});
			
			this.changeView(new AttributeDetailView({model:attributeDetailModel, tabContentEl: tabContentEl}));
		},
		
		// infographic: function(){
			// var tagCollection = new TagCollection();
			// var categoryCollection = new CategoryCollection();
			// var graphicCollection = new GraphicCollection();
	// //		tagCollection.url = $APP_URL_ROOT + 'webservice/tags';
	// //		tagCollection.fetch({async : false});
// 			
			// this.changeView(new InfographicView({collection: graphicCollection}));
// 			
			// graphicCollection.fetch();
			// categoryCollection.fetch();
// 			
			// tagCollection.fetch();
			// //console.log(Tags);
			// //console.info(tagCollection);
			// window.Tags = tagCollection;
			// window.Categories = categoryCollection;
// 
		// }
		
	});
	
	var initialize = function () {
		 var app_router = new AppGeneratorRouter;
		 
		 Backbone.history.start();
	};
	
	return {
		initialize : initialize
	};
});
// INCLUDES READABLE FORMATTING
/*
	function( AttributeModel, 
		EntityModel, 
		EndpointActionAttributeMappingModel, 
		EntityAttributeMappingModel, 
		EndpointModel,
 		AttributeCollection, 
		EntityCollection, 
		EndpointActionAttributeMappingCollection, 
		EntityAttributeMappingCollection,
		EndpointCollection,
		AttributeDetailView,
		AttributeListingView,
		EntityDetailView,
		EntityListingView,
		EntityRestDetailView,
		EntityRestListingView,
		EntityRestOverviewView,
		IndexView) */
		
				// deprecated 
/*
			"index": "index"
			,"apis" : "apis"
			,"api/create" : "createApi"
			,"api/:id(/)(:viewMode)" : "api"
			,"attribute/:id(/)(:viewMode)": "attribute"
			,"attributes" : "attributes"
			,"entity/:id": "entity"
			,"rest/:entId(/:method)": "rest"
			,"*actions" : "index"
			// end deprecated
			// May 3rd, 2015 5-3-2015
			// backbone routes official*/
