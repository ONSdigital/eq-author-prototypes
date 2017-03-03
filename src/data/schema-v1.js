export default {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "definitions": {
        "id": {
            "type": "string",
            "description": "A lowercase alphanumeric string separated by hyphens.",
            "pattern": "^[a-z0-9][a-z0-9\\-]*[a-z0-9]$"
        },
        "skip_condition": {
            "description": "Allows an element to be skipped when a condition has been met. By adding more than one `when` element it will evaluate as an or rule.",
            "type": "array",
            "minItems": 1,
            "uniqueItems": true,
            "properties": {
                "when": {
                    "$ref": "#/definitions/when"
                }
            },
            "required": [
                "when"
            ]
        },
        "when": {
            "type": "array",
            "description": "Configure conditional rules. By adding more than one `condition` element it will evaluate as an and rule.",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "meta": {
                        "type": "string"
                    },
                    "condition": {
                        "enum": [
                            "equals",
                            "not equals",
                            "contains",
                            "not contains",
                            "not set"
                        ]
                    },
                    "value": {
                        "type": [
                            "string",
                            "boolean"
                        ]
                    }
                },
                "additionalProperties": false,
                "required": [
                    "condition"
                ],
                "oneOf": [
                    {
                        "required": [
                            "id"
                        ]
                    },
                    {
                        "required": [
                            "meta"
                        ]
                    }
                ]
            }
        },
        "messages": {
            "type": "object",
            "properties": {
                "NOT_INTEGER": {
                    "type": "string"
                },
                "NOT_STRING": {
                    "type": "string"
                },
                "MANDATORY": {
                    "type": "string"
                },
                "INVALID_DATE": {
                    "type": "string"
                },
                "NEGATIVE_INTEGER": {
                    "type": "string"
                },
                "INTEGER_TOO_LARGE": {
                    "type": "string"
                },
                "INVALID_DATE_RANGE_TO_BEFORE_FROM": {
                    "type": "string"
                },
                "INVALID_DATE_RANGE_TO_FROM_SAME": {
                    "type": "string"
                }
            },
            "additionalProperties": false
        },
        "routing_rules": {
            "type": "array",
            "navigation_label_answer_ids": {
                "type": "array",
                "items": {
                    "type": "string"
                },
                "minItems": 1,
                "uniqueItems": true
            },
            "items": {
                "type": "object",
                "properties": {
                    "goto": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "string"
                            },
                            "when": {
                                "$ref": "#/definitions/when"
                            }
                        },
                        "required": [
                            "id"
                        ]
                    },
                    "repeat": {
                        "type": "object",
                        "properties": {
                            "answer_id": {
                                "type": "string"
                            },
                            "goto": {
                                "type": "string"
                            },
                            "type": {
                                "enum": [
                                    "answer_value",
                                    "answer_count",
                                    "answer_count_minus_one"
                                ]
                            }
                        },
                        "required": [
                            "answer_id"
                        ]
                    }
                },
                "oneOf": [
                    {
                        "required": [
                            "goto"
                        ]
                    },
                    {
                        "required": [
                            "repeat"
                        ]
                    }
                ]
            }
        }
    },
    "required": [
        "mime_type",
        "schema_version",
        "data_version",
        "questionnaire_id",
        "survey_id",
        "title",
        "groups",
        "theme",
        "legal_basis"
    ],
    "properties": {
        "mime_type": {
            "type": "string"
        },
        "schema_version": {
            "type": "string"
        },
        "data_version": {
            "enum": [
                "0.0.1",
                "0.0.2"
            ]
        },
        "questionnaire_id": {
            "type": "string"
        },
        "survey_id": {
            "type": "string"
        },
        "session_timeout_in_seconds": {
            "description": "The amount of time in seconds before timing out a users session.",
            "type": "integer"
        },
        "session_prompt_in_seconds": {
            "description": "The amount of time in seconds before showing the prompt informing a user of the time to session timeout.",
            "type": "integer"
        },
        "title": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "theme": {
            "type": "string"
        },
        "legal_basis": {
            "enum": [
                "Voluntary",
                "StatisticsOfTradeAct"
            ]
        },
        "navigation": {
            "type": "boolean"
        },
        "messages": {
            "$ref": "#/definitions/messages"
        },
        "groups": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "$ref": "#/definitions/id"
                    },
                    "title": {
                        "type": "string"
                    },
                    "completed_id": {
                        "type": "string"
                    },
                    "highlight_when": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "minItems": 1,
                        "uniqueItems": true
                    },
                    "hide_in_navigation": {
                        "type": "boolean"
                    },
                    "skip_condition": {
                        "$ref": "#/definitions/skip_condition"
                    },
                    "routing_rules": {
                        "ref": "#/definitions/routing_rules"
                    },
                    "blocks": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "$ref": "#/definitions/id"
                                },
                                "title": {
                                    "type": "string"
                                },
                                "type": {
                                    "enum": [
                                        "Questionnaire",
                                        "Interstitial",
                                        "Introduction",
                                        "Summary",
                                        "Confirmation"
                                    ]
                                },
                                "description": {
                                    "type": "string"
                                },
                                "information_to_provide": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    },
                                    "uniqueItems": true
                                },
                                "sections": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "$ref": "#/definitions/id"
                                            },
                                            "title": {
                                                "type": "string"
                                            },
                                            "number": {
                                                "type": "string"
                                            },
                                            "description": {
                                                "type": "string"
                                            },
                                            "questions": {
                                                "type": "array",
                                                "items": {
                                                    "type": "object",
                                                    "properties": {
                                                        "id": {
                                                            "$ref": "#/definitions/id"
                                                        },
                                                        "title": {
                                                            "type": "string"
                                                        },
                                                        "number": {
                                                            "type": "string"
                                                        },
                                                        "description": {
                                                            "type": "string"
                                                        },
                                                        "guidance": {
                                                            "type": "array",
                                                            "items": {
                                                                "type": "object",
                                                                "properties": {
                                                                    "title": {
                                                                        "type": "string"
                                                                    },
                                                                    "description": {
                                                                        "type": "string"
                                                                    },
                                                                    "list": {
                                                                        "type": "array",
                                                                        "items": {
                                                                            "type": "string"
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        "skip_condition": {
                                                            "description": "Allows a question to be skipped when a condition has been met.",
                                                            "type": "object",
                                                            "properties": {
                                                                "when": {
                                                                    "$ref": "#/definitions/when"
                                                                }
                                                            },
                                                            "additionalProperties": false,
                                                            "required": [
                                                                "when"
                                                            ]
                                                        },
                                                        "type": {
                                                            "enum": [
                                                                "General",
                                                                "DateRange",
                                                                "RepeatingAnswer",
                                                                "Relationship"
                                                            ]
                                                        },
                                                        "answers": {
                                                            "type": "array",
                                                            "items": {
                                                                "type": "object",
                                                                "properties": {
                                                                    "id": {
                                                                        "$ref": "#/definitions/id"
                                                                    },
                                                                    "parent_answer_id": {
                                                                        "type": "string"
                                                                    },
                                                                    "q_code": {
                                                                        "type": "string",
                                                                        "pattern": "[0-9]+"
                                                                    },
                                                                    "label": {
                                                                        "type": "string"
                                                                    },
                                                                    "guidance": {
                                                                        "type": "string"
                                                                    },
                                                                    "description": {
                                                                        "type": "string"
                                                                    },
                                                                    "type": {
                                                                        "enum": [
                                                                            "Checkbox",
                                                                            "Currency",
                                                                            "Date",
                                                                            "MonthYearDate",
                                                                            "Integer",
                                                                            "Percentage",
                                                                            "PositiveInteger",
                                                                            "Radio",
                                                                            "TextArea",
                                                                            "TextField",
                                                                            "Relationship"
                                                                        ]
                                                                    },
                                                                    "options": {
                                                                        "type": "array",
                                                                        "items": {
                                                                            "type": "object",
                                                                            "properties": {
                                                                                "label": {
                                                                                    "type": "string"
                                                                                },
                                                                                "value": {
                                                                                    "type": "string"
                                                                                },
                                                                                "q_code": {
                                                                                    "type": "string",
                                                                                    "pattern": "[0-9]+"
                                                                                },
                                                                                "child_answer_id": {
                                                                                    "type": "string"
                                                                                }
                                                                            },
                                                                            "required": [
                                                                                "label",
                                                                                "value"
                                                                            ]
                                                                        }
                                                                    },
                                                                    "mandatory": {
                                                                        "type": "boolean"
                                                                    },
                                                                    "alias": {
                                                                        "type": "string"
                                                                    },
                                                                    "repeats": {
                                                                        "type": "boolean"
                                                                    },
                                                                    "validation": {
                                                                        "type": "object",
                                                                        "properties": {
                                                                            "messages": {
                                                                                "$ref": "#/definitions/messages"
                                                                            }
                                                                        }
                                                                    },
                                                                    "calculated": {
                                                                        "type": "boolean"
                                                                    }
                                                                },
                                                                "additionalProperties": false,
                                                                "required": [
                                                                    "id",
                                                                    "type",
                                                                    "mandatory"
                                                                ]
                                                            }
                                                        }
                                                    },
                                                    "additionalProperties": false,
                                                    "required": [
                                                        "id",
                                                        "title",
                                                        "type",
                                                        "answers"
                                                    ]
                                                }
                                            }
                                        },
                                        "additionalProperties": false,
                                        "required": [
                                            "id",
                                            "questions"
                                        ]
                                    }
                                },
                                "routing_rules": {
                                    "ref": "#/definitions/routing_rules"
                                },
                                "skip_condition": {
                                    "$ref": "#/definitions/skip_condition"
                                }
                            },
                            "additionalProperties": false,
                            "required": [
                                "id",
                                "type"
                            ]
                        }
                    }
                },
                "additionalProperties": false,
                "required": [
                    "id",
                    "title",
                    "blocks"
                ]
            }
        }
    },
    "additionalProperties": false
}
