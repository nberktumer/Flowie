import {ProgrammingLanguage} from "../../models";
import {CodeStrategy} from "./CodeStrategy";
import {KotlinCodeStrategy} from "./kotlin/KotlinCodeStrategy";
import {JavaCodeStrategy} from "./java/JavaCodeStrategy";

export class CodeStrategyFactory {
    static createCodeStrategy(programmingLanguage: ProgrammingLanguage): CodeStrategy {
        switch (programmingLanguage) {
            case ProgrammingLanguage.JAVA:
                return new JavaCodeStrategy()
            case ProgrammingLanguage.KOTLIN:
                return new KotlinCodeStrategy()
            default:
                return new KotlinCodeStrategy()
        }
    }
}
