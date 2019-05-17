export enum VariableType {
    INT = "Int",
    LONG = "Long",
    STRING = "String",
    BOOLEAN = "Boolean",
    DOUBLE = "Double",
    LIST = "List",
    NONE = "None",
    MAIN_ARG = "MainArg" // TODO FIX
}

export enum ArithmeticOperationType {
    ADDITION = "Addition",
    SUBTRACTION = "Subtraction",
    MULTIPLICATION = "Multiplication",
    DIVISION = "Division",
    ROOT = "Root"
}

export enum FlowType {
    INITIAL = "Initial",
    ASSIGNMENT = "Set Variable",
    UPDATE_VARIABLE = "Update Variable",
    ARITHMETIC = "Arithmetic Operations",
    CURRENT_TIME = "Get Current Time",
    INPUT = "Get User Input",
    OUTPUT = "Print",
    RANDOM = "Random Number",
    IF = "If",
    WHILE = "While",
    PACKAGE = "Package",
    CLASS = "Function",
    DATA_CLASS = "Variable Holder",
    RETURN = "Return",
    LIST_NEW = "New List",
    LIST_ADD = "Add to List",
    LIST_GET = "Get from List",
    LIST_SIZE = "Size of List",
    LIST_UPDATE = "Update List Item",
    LIST_REMOVE = "Remove List Item",
    LIST_CLEAR = "Clear List"
}

export enum ConditionOperation {
    EQUALS = "Equals",
    NOT_EQUALS = "NotEquals",
    GREATER_THAN = "GreaterThan",
    GREATER_THAN_OR_EQUALS = "GreaterThanOrEquals",
    LESS_THAN = "LessThan",
    LESS_THAN_OR_EQUALS = "LessThanOrEquals",
}

export enum ConditionType {
    AND = "&&",
    OR = "||"
}
