export interface BaseFlow {
    functionCallName: string,

    hasExternalDependencies(): boolean,

    createMainCode(): void,

    createFunctionCode(): void,

    nextFlow(): string,

    functionName(): string,

    functionInvocation(): string,
}
