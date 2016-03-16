define(function(){
	var AttributeRules = [{
		"attribute" : "id",
		"datatype" : "integer",
		"regex" : null,
		"validation" : "number",
		"sanatation" : "int",
		"isUnique" : false
	}, {
		"attribute" : "name",
		"dataType" : "string",
		"regex" : null,
		"validation" : "alfanum",
		"sanatation" : "string",
		"isUnique" : false
	},{
		"attribute" : "email",
		"dataType" : "string",
		"regex" : null,
		"validation" : "email",
		"sanatation" : "string",
		"isUnique" : false
	}, {
		"attribute" : "type",
		"dataType" : "string",
		"regex" : null,
		"validation" : "alfanum",
		"sanatation" : "string",
		"isUnique" : false
	}, {
		"attribute" : "password",
		"dataType" : "string",
		"regex" : null,
		"validation" : "alfanum",
		"sanatation" : "string",
		"isUnique" : false
	}, {
		"attribute" : "length",
		"datatype" : "integer",
		"regex" : null,
		"validation" : "number",
		"sanatation" : "int",
		"isUnique" : false
	}, {
		"attribute" : "regex_pattern",
		"dataType" : "string",
		"regex" : null,
		"validation" : "anything",
		"sanatation" : "string",
		"isUnique" : false
	}, {
		"attribute" : "date_joined",
		"dataType" : "string",
		"regex" : null,
		"validation" : "anything",
		"sanatation" : "string",
		"isUnique" : false
	}, {
		"attribute" : "is_primary_key",
		"datatype" : "integer",
		"regex" : null,
		"validation" : "number",
		"sanatation" : "int",
		"isUnique" : false
	}, {
		"attribute" : "is_unique",
		"datatype" : "integer",
		"regex" : null,
		"validation" : "number",
		"sanatation" : "int",
		"isUnique" : false
	}, {
		"attribute" : "attr_id",
		"datatype" : "integer",
		"regex" : null,
		"validation" : "number",
		"sanatation" : "int",
		"isUnique" : true,
		"table_name" : "attribute"
	}, {
		"attribute" : "table",
		"dataType" : "string",
		"regex" : null,
		"validation" : "alfanum",
		"sanatation" : "string",
		"isUnique" : true,
		"table_name" : "entity"
	}, {
		"attribute" : "required_api_key",
		"datatype" : "integer",
		"regex" : null,
		"validation" : "number",
		"sanatation" : "int",
		"isUnique" : false
	}, {
		"attribute" : "status",
		"datatype" : "integer",
		"regex" : null,
		"validation" : "number",
		"sanatation" : "int",
		"isUnique" : false
	}, {
		"attribute" : "ent_id",
		"datatype" : "integer",
		"regex" : null,
		"validation" : "number",
		"sanatation" : "int",
		"isUnique" : false,
		"table_name" : "entity"
	},{
		"attribute" : "api_id",
		"datatype" : "integer",
		"regex" : null,
		"validation" : "number",
		"sanatation" : "int",
		"isUnique" : false,
		"table_name" : "api"
	}, {
		"attribute" : "endpt_id",
		"datatype" : "integer",
		"regex" : null,
		"validation" : "number",
		"sanatation" : "int",
		"isUnique" : false,
		"table_name" : "entity"
	},  {
		"attribute" : "category",
		"dataType" : "string",
		"regex" : null,
		"validation" : "alfanum",
		"sanatation" : "string",
		"isUnique" : true,
		"table_name" : "entity_rest_att_mapping"
	},  {
		"attribute" : "db_name",
		"dataType" : "string",
		"regex" : null,
		"validation" : "alfanum",
		"sanatation" : "string",
		"isUnique" : false,
		"table_name" : "entity"
	}, {
		"attribute" : "action_method",
		"dataType" : "string",
		"regex" : null,
		"validation" : "alfanum",
		"sanatation" : "string",
		"isUnique" : true,
		"table_name" : "entity_rest_att_mapping"
	},  {
		"attribute" : "complete_status",
		"datatype" : "integer",
		"regex" : null,
		"validation" : "number",
		"sanatation" : "int",
		"isUnique" : false
	}
];

	return  AttributeRules;
});