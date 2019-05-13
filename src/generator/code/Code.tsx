export class Code {
    lines: CodeLine[] = []
    indentationCount: number

    constructor(indentationCount: number) {
        this.indentationCount = indentationCount
    }

    insert(line: string) {
        this.lines.push(new CodeLine(line, this.indentationCount))
    }

    incrementIndentation() {
        this.indentationCount++
    }

    decrementIndentation() {
        this.indentationCount--
    }

}

export class CodeLine {
    content: string
    indentationCount: number

    constructor(
        content: string,
        indentationCount: number
    ) {
        this.content = content
        this.indentationCount = indentationCount
    }
}
