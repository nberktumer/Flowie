import strings from "../lang"
import {Defaults} from "../config"

export class FileUtils {

    static save(filename: string, data: string) {
        const blob = new Blob([data], {type: "text/plain"})
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename)
        } else {
            const elem = window.document.createElement("a")
            elem.href = window.URL.createObjectURL(blob)
            elem.download = filename
            document.body.appendChild(elem)
            elem.click()
            document.body.removeChild(elem)
        }
    }

    static download(blob: Blob, filename: string) {
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename)
        } else {
            const elem = window.document.createElement("a")
            elem.href = window.URL.createObjectURL(blob)
            elem.download = filename
            document.body.appendChild(elem)
            elem.click()
            document.body.removeChild(elem)
        }
    }

    static load(onLoad: (data: string) => void, onError: (err: string) => void) {
        const elem = window.document.createElement("input")
        elem.type = "file"
        elem.accept = `.${Defaults.SAVE_EXTENSION}`
        elem.onchange = (e: any) => {
            if (!e.target.files) {
                onError(strings.fileReadError)
                return
            }

            const file = e.target.files[0]
            if (!file) {
                onError(strings.fileReadError)
            }
            const reader = new FileReader()
            reader.onerror = () => {
                onError(strings.fileReadError)
            }
            reader.onload = (e: any) => {
                const contents = e.target.result
                onLoad(contents)
            }
            reader.readAsText(file)
        }
        elem.click()
    }
}
