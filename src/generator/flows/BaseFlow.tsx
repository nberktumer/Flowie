export interface BaseFlow {
    hasExternalDependencies(): boolean,

    createMainCode(): void,

    createFunctionCode(): void,

    nextFlow(): number,

    functionName(): string,

    functionInvocation(): string,
}
