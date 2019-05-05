export enum VariableType {
    INT = "Int",
    STRING = "String",
    BOOLEAN = "Boolean",
    DOUBLE = "Double"
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
    IF = "If",
    WHILE = "While",
    FOR = "For",
    INPUT = "Input",
    OUTPUT = "Output",
    ARITHMETIC = "Arithmetic",
    ASSIGNMENT = "Assignment",
    RANDOM = "Random"
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
