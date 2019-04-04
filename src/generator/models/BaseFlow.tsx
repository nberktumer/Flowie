export interface BaseFlow {
    createMainCode(): void,

    createFunctionCode(): void,

    nextFlow(): number,

    functionName(): string,

    functionInvocation(): string,
}
