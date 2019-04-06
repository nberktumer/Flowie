export interface BaseFlow {
    hasExternalDependencies(): boolean,

    createMainCode(): void,

    createFunctionCode(): void,

    nextFlow(): string,

    functionName(): string,

    functionInvocation(): string,
}
