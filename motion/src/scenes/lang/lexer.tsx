import {Code, makeScene2D, Rect, Node} from "@motion-canvas/2d";
import {createRef, Origin, waitUntil} from "@motion-canvas/core";
import {colors} from "../../colors";
import {absolutePosition} from "../../functions/position";
import {all} from "@motion-canvas/core/lib/flow";
import {Txt} from "@motion-canvas/2d/lib/components";

const duration = .5;

export default makeScene2D(function* (view) {
  view.fill(colors.bg);
  const code = createRef<Code>()
  const tokens = createRef<Rect>()
  const codeString = `a = 3 + 2
b = 2
print a + b `;
  view.add(<Code
    zIndex={3}
    ref={code}
    fontSize={40}
    code={codeString}
  />)

  view.add(<Rect
    ref={tokens}
    width={1600}
    layout
    y={190}
    gap={10}
    wrap={"wrap"}
  />)

  const highlight = createHighlight(code(), tokens())
  view.add(highlight.node)

  let cursor = 0
  yield* highlight.highlightChars(0, '', 0, 0)
  let column = 0
  let line = 0
  let acc = ""

  yield * waitUntil('Lexer')

  // Auto highlight groups
  while (cursor <= codeString.length) {
    const letter = codeString[cursor]
    switch (letter) {
      case "\n":
        yield* highlight.highlightChars(column - acc.length, acc, line, duration)
        line++
        column = 0
        acc = ""
        break;
      case " ":
        yield* highlight.highlightChars(column - acc.length, acc, line, duration)
        column++
        acc = ""
        break;
      default:
        column++
        acc += letter
    }
    cursor++
  }


  yield * waitUntil('Parser')

  tokens().zIndex(4)

  yield* all(
    code().opacity(0, duration),
    tokens().y(-400, duration),
    highlight.hide(),
  )
})

function createHighlight(code: Code, tokens: Rect) {
  const nodeRef = createRef<Node>()
  const node = <Node
    ref={nodeRef}
    x={0}
    y={0}
    zIndex={2}
  >
    <Rect fill={colors.yellow}
          width={0}
          height={10}
          opacity={.15}
    />
    <Rect fill={colors.yellow}
          y={10}
          width={0}
          height={4}
    />
  </Node>

  return {
    node: node,
    hide: function* () {
        yield node.opacity(0, duration)
      node.remove()
    },
    highlightChars: function* (start: number, word: string, line: number = 0, speed = duration) {
      const pos = absolutePosition(code)
      const lines = code.code().fragments[0].toString().split('\n')
      const charLength = lines.reduce((acc, l) => l.length > acc ? l.length : acc, 0)
      const padding = word.length === 0 ? 0 : 5;
      const width = pos.width / charLength * word.length + padding * 2
      const y = pos.y + (line + .5) * pos.height / lines.length
      const height = pos.height / lines.length;
      yield* all(
        nodeRef().x(pos.x + width / 2 + pos.width / charLength * start - padding, speed),
        nodeRef().y(y, speed),
        nodeRef().childAs<Rect>(0).width(width, speed),
        nodeRef().childAs<Rect>(0).height(height, speed),
        nodeRef().childAs<Rect>(1).width(width, speed),
        nodeRef().childAs<Rect>(1).y(height / 2, speed),
      )
      if (word === '') {
        return;
      }
      yield* addToken(tokens, word)
    }
  }
}

function* addToken (tokens: Rect, word: string) {
  const rect = createRef<Rect>()
  tokens.add(<Rect clip ref={rect} fill={colors.bgLight} layout>
    <Txt
      fontSize={30}
      fontWeight={700}
      fill={colors.text}
      fontFamily={'"JetBrains Mono", monospace'}
    >{tokenType(word)}</Txt>
  </Rect>)
  const width = rect().width()
  rect().width(0)
  rect().padding(0)
  yield* all(
    rect().width(width + 60, duration),
    rect().padding([15, 30, 15, 30], duration)
  )
  yield * waitUntil(`token_${tokens.children().length}_${word}`)
}

function tokenType (s: string) {
  if (isNumber(s)) {
    return `Number(${s})`
  }
  if (['+', '='].includes(s)) {
    return `Symbol(${s})`
  }
  if (s === 'print') {
    return `Print`
  }
  return `Identifier(${s})`
}

function isNumber (s: string): boolean {
  return !Number.isNaN(parseInt(s, 10))
}

