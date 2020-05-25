import CodeMirror, {
    Editor,
    Hint,
    Hints,
    HintFunction,
    Token,
    Position
} from 'codemirror';

import {
    baseHints,
    collectionHints,
    commandHints,
    cursorHints,
    databaseHints,
    keywordHints,
    valueHints,
    logicHints,
} from './language'


export function codeCompletion(editor: Editor) {
    CodeMirror.showHint(editor, hintFunc);
};

interface CursorContext {
    editor: Editor
    cursor: Position
    currentWord: Token
    start: number
    end: number
    line: number
}

const hintFunc = function (editor: Editor): any {
    // return the computed hints asyncronciously
    return new Promise((done) => {
        // do the work
        const cursor = editor.getCursor(); // the cursor is just a position 
        const currentWord = editor.getTokenAt(cursor); // find the token at the cursors position
        const start = currentWord.start; // start is the first letter if the word
        const end = cursor.ch; // end is the column number of the cursors position
        const line = cursor.line; // line is the line the cursor is currently on

        const context = {
            editor: editor,
            cursor: cursor,
            currentWord: currentWord,
            start: start,
            end: end,
            line: line,
        }

        // find the appropiate vocabular based on the cursors context
        const list = contextualHintList(context)

        // filter the words against typed word
        const filtered = filteredHintList(editor, list)

        // TODO: match cursor character, if its not a word add 1 to the from property

        // return the Hints that hold the array of Hint as list key
        return done({
            list: filtered.length ? filtered : list,
            from: CodeMirror.Pos(line, start),
            to: CodeMirror.Pos(line, end),
        } as Hints)
    })
} as HintFunction

// filter the contextlist based on current typed word
const filteredHintList = (editor: Editor, hints: Hint[]): Hint[] => {
    const word = editor.getTokenAt(editor.getCursor()).string
    return hints.filter(({ text }) => text.indexOf(word) >= 0);
}

// select a subset of all hints based on the currect context
const contextualHintList = (ctx: CursorContext): Hint[] => {

    const currentLineText = ctx.editor.getDoc().getLine(ctx.line)
    const charBeforeCursor = currentLineText.substring(ctx.cursor.ch, ctx.cursor.ch - 1)
    const previousToken = ctx.editor.getTokenAt({ ch: ctx.start - 1, line: ctx.line })
    const previousPreviousToken = ctx.editor.getTokenAt({ ch: previousToken.start-1 , line: ctx.line })

    console.log(currentLineText, '\n', charBeforeCursor, '\n', previousToken, '\n', previousPreviousToken)

    if (charBeforeCursor === '\'') {
        console.log('logic')
        return [...logicHints]
    }
    
    if (previousPreviousToken.string === 'runCommand' || previousPreviousToken.string === 'adminCommand'
        || previousToken.string === 'runCommand' || previousToken.string === 'adminCommand'
    ) {
        console.log('logic')
        return [...commandHints]
    }
    
    if (previousToken.string === '') {
        console.log('base')
        return [...keywordHints, ...baseHints]
    }

    if (previousPreviousToken.string === 'getSiblingDB' || previousToken.string === 'db') {
        console.log('db')
        return [...databaseHints]
    }

    if (previousPreviousToken.type === 'property') {
        console.log('coll')
        return [
            ...collectionHints
        ]
    }

    console.log('default')
    return [
        ...collectionHints,
        ...cursorHints,
        ...commandHints,
        ...databaseHints,
    ]
};