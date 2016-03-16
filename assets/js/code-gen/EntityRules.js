define(function() {
	var EntityRules = {};
	// ENTITIES base needed for Controller Methods primarily
	EntityRules.ENTITIES = [
	{
		resource : "user",
		backbone_name : "User",
		table_name : "users",
		attributes : ["id", "email", "password","date_joined"],
		identifiers : ["id"]
	},{
		resource : "api",
		backbone_name : "Api",
		table_name : "api",
		attributes : ["id", "name", "db_name", "status"],
		identifiers : ["id"]
	}, {
		resource : "api_entity_mapping",
		backbone_name : "ApiEntityMapping",
		table_name : "api_entity_mapping",
		attributes : ["id", "api_id", "ent_id"],
		identifiers : ["id"]
	}, {
		resource : "api_attr_mapping",
		backbone_name : "ApiAttrMapping",
		table_name : "api_attr_mapping",
		attributes : ["id", "api_id", "attr_id"],
		identifiers : ["id"]
	}, {
		resource : "attribute",
		backbone_name : "Attribute",
		table_name : "attribute",
		attributes : ["id", "name", "type", "length", "regex_pattern", "is_primary_key", "is_unique"],
		identifiers : ["id"]
	}, {
		resource : "entity",
		backbone_name : "Entity",
		table_name : "entity",
		attributes : ["id", "table", "name", "status"],
		identifiers : ["id"]
	}, {
		resource : "entity_attribute_mapping",
		backbone_name : "EntityAttributeMapping",
		table_name : "entity_attribute_mapping",
		attributes : ["id", "attr_id", "ent_id", "is_primary_key"],
		identifiers : ["id"]
	}, {
		resource : "endpoint_action_attribute_mapping",
		backbone_name : "EndpointActionAttributeMapping",
		table_name : "endpoint_action_attribute_mapping",
		attributes : ["id", "endpt_id", "action_method", "attr_id", "category"],
		identifiers : ["id"]
	}, {
		resource : "endpoint",
		backbone_name : "Endpoint",
		table_name : "endpoint",
		attributes : ["id", "api_id", "ent_id"],
		identifiers : ["id"]
	}];
	// REST  needed for Models and Validation Methods primarily
	EntityRules.REST = [{
		ENTITY : "user",
		METHOD : {
			GET : {
				REQUIRED_ALWAYS : ["email"],
				REQUIRED_OR : [],
				OPTIONAL : [],
				UNIQUE : []
			},
			PUT : {
				REQUIRED_ALWAYS : ["id","email"],
				REQUIRED_OR : [],
				OPTIONAL : ["password"],
				UNIQUE : []
			},
			POST : {
				REQUIRED_ALWAYS : ["email","password"],
				REQUIRED_OR : [],
				OPTIONAL : [],
				UNIQUE : []
			},
			DELETE : {
				REQUIRED_ALWAYS : ["id"],
				REQUIRED_OR : [],
				OPTIONAL : [],
				UNIQUE : []
			}
		}
	},{
		ENTITY : "api",
		METHOD : {
			GET : {
				REQUIRED_ALWAYS : ["id"],
				REQUIRED_OR : [],
				OPTIONAL : ["name", "db_name"],
				UNIQUE : []
			},
			PUT : {
				REQUIRED_ALWAYS : ["id"],
				REQUIRED_OR : [],
				OPTIONAL : ["name", "db_name", "status"],
				UNIQUE : []
			},
			POST : {
				REQUIRED_ALWAYS : ["name"],
				REQUIRED_OR : [],
				OPTIONAL : ["db_name"],
				UNIQUE : []
			},
			DELETE : {
				REQUIRED_ALWAYS : ["id"],
				REQUIRED_OR : [],
				OPTIONAL : [],
				UNIQUE : []
			}
		}
	}, {
		ENTITY : "attribute",
		METHOD : {
			GET : {
				REQUIRED_ALWAYS : [],
				REQUIRED_OR: [["id","api_id"]],
				OPTIONAL : ["name"],
				UNIQUE : []
			},
			PUT : {
				REQUIRED_ALWAYS : ["id"],
				REQUIRED_OR : [],
				OPTIONAL : ["name", "type", "length", "regex_pattern", "is_primary_key", "is_unique"],
				UNIQUE : []
			},
			POST : {
				REQUIRED_ALWAYS : ["name", "type", "length"],
				REQUIRED_OR : [],
				OPTIONAL : ["regex_pattern", "is_primary_key", "is_unique"],
				UNIQUE : []
			},
			DELETE : {
				REQUIRED_ALWAYS : ["id"],
				REQUIRED_OR : [],
				OPTIONAL : [],
				UNIQUE : []
			}
		}
	}, {
		ENTITY : "api_attr_mapping",
		METHOD : {
			GET : {
				REQUIRED_ALWAYS : [],
				REQUIRED_OR: [["id","api_id","attr_id"]],
				OPTIONAL : [],
				UNIQUE : []
			},
			PUT : {
				REQUIRED_ALWAYS : ["id", "api_id", "attr_id"],
				REQUIRED_OR : [],
				OPTIONAL : [],
				UNIQUE : []
			},
			POST : {
				REQUIRED_ALWAYS : ["api_id", "attr_id"],
				REQUIRED_OR : [],
				OPTIONAL : [],
				UNIQUE : ["api_id", "attr_id"]
			},
			DELETE : {
				REQUIRED_ALWAYS : ["id"],
				REQUIRED_OR : [],
				OPTIONAL : [],
				UNIQUE : []
			}
		}
	}, {
		ENTITY : "api_entity_mapping",
		METHOD : {
			GET : {
				REQUIRED_ALWAYS : [],
				REQUIRED_OR: [["id","api_id","ent_id"]],
				OPTIONAL : [],
				UNIQUE : []
			},
			PUT : {
				REQUIRED_ALWAYS : ["id",],
				REQUIRED_OR : [["api_id", "ent_id"]],
				OPTIONAL : [],
				UNIQUE : []
			},
			POST : {
				REQUIRED_ALWAYS : ["api_id", "ent_id"],
				REQUIRED_OR : [],
				OPTIONAL : [],
				UNIQUE : ["api_id", "ent_id"]
			},
			DELETE : {
				REQUIRED_ALWAYS : ["id"],
				REQUIRED_OR : [],
				OPTIONAL : [],
				UNIQUE : []
			}
		}
	}, {
		ENTITY : "entity",
		METHOD : {
			GET : {
				REQUIRED_ALWAYS : [],
				REQUIRED_OR: [["id"]],
				OPTIONAL : ["name","status","table"],
				UNIQUE : []
			},
			PUT : {
				REQUIRED_ALWAYS : ["id"],
				REQUIRED_OR : [],
				OPTIONAL : ["table", "name", "status"],
				UNIQUE : ["table", "name"]
			},
			POST : {
				REQUIRED_ALWAYS : ["table", "name"],
				REQUIRED_OR : [],
				OPTIONAL : ["status"],
				UNIQUE : ["table", "name"]
			},
			DELETE : {
				REQUIRED_ALWAYS : ["id"],
				REQUIRED_OR : [],
				OPTIONAL : [],
				UNIQUE : []
			}
		}
	}, {
		ENTITY : "entity_attribute_mapping",
		METHOD : {
			GET : {
				REQUIRED_ALWAYS : [],
				REQUIRED_OR : [["id","ent_id","attr_id"]],
				OPTIONAL : [],
				UNIQUE : []
			},
			PUT : {
				REQUIRED_ALWAYS : ["id", "attr_id", "ent_id"],
				REQUIRED_OR : [],
				OPTIONAL : ["is_primary_key"],
				UNIQUE : []
			},
			POST : {
				REQUIRED_ALWAYS : ["attr_id", "ent_id"],
				REQUIRED_OR : [],
				OPTIONAL : ["is_primary_key"],
				UNIQUE : ["attr_id", "ent_id"]
			},
			DELETE : {
				REQUIRED_ALWAYS : ["id"],
				REQUIRED_OR : [],
				OPTIONAL : [],
				UNIQUE : []
			}
		}
	}, {
		ENTITY : "endpoint_action_attribute_mapping",
		METHOD : {
			GET : {
				REQUIRED_ALWAYS : [],
				REQUIRED_OR : [["id","endpt_id"]],
				OPTIONAL : ["action_method"],
				UNIQUE : []
			},
			PUT : {
				REQUIRED_ALWAYS : ["id", "endpt_id", "attr_id", "action_method"],
				REQUIRED_OR : [],
				OPTIONAL : ["attr_id", "category", "action_method"],
				UNIQUE : ["endpt_id", "attr_id", "action_method"]
			},
			POST : {
				REQUIRED_ALWAYS : ["endpt_id", "attr_id", "category", "action_method"],
				REQUIRED_OR : [],
				OPTIONAL : [],
				UNIQUE : ["endpt_id", "attr_id", "action_method"]
			},
			DELETE : {
				REQUIRED_ALWAYS : ["id"],
				REQUIRED_OR : [],
				OPTIONAL : [],
				UNIQUE : []
			}
		}
	}, {
		ENTITY : "endpoint",
		METHOD : {
			GET : {
				REQUIRED_ALWAYS : [],
				REQUIRED_OR : [["id","api_id","ent_id"]],
				OPTIONAL : [],
				UNIQUE : []
			},
			PUT : {
				REQUIRED_ALWAYS : ["id", "ent_id", "api_id"],
				REQUIRED_OR : [],
				OPTIONAL : [],
				UNIQUE : []
			},
			POST : {
				REQUIRED_ALWAYS : ["ent_id", "api_id"],
				REQUIRED_OR : [],
				OPTIONAL : [],
				UNIQUE : ["ent_id", "api_id"]
			},
			DELETE : {
				REQUIRED_ALWAYS : ["id"],
				REQUIRED_OR : [],
				OPTIONAL : [],
				UNIQUE : []
			}
		}
	}];
	return EntityRules;
});
