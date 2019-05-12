export class Code {
    lines: CodeLine[] = []
    identationCount = 0

    constructor(identationCount: number) {
        this.identationCount = identationCount
    }

    insert(line: string) {
        this.lines.push(new CodeLine(line, this.identationCount))
    }

    incrementIdentation() {
        this.identationCount++
    }

    decrementIdentation() {
        this.identationCount--
    }

}

export class CodeLine {
    content: string
    identationAmount: number

    constructor(
        content: string,
        identationAmount: number
    ) {
        this.content = content
        this.identationAmount = identationAmount
    }
}
