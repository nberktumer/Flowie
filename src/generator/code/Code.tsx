export class Code {
    lines: CodeLine[] = []
    currentIdentationAmount = 0

    insert(line: string) {
        this.lines.push(new CodeLine(line, this.currentIdentationAmount))
    }

    incrementIdentation() {
        this.currentIdentationAmount++
    }

    decrementIdentation() {
        this.currentIdentationAmount--
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
