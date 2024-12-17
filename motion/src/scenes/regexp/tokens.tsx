import {Txt, Node, Rect, TxtProps} from "@motion-canvas/2d";
import {CodeBlock, insert, remove, edit} from '@motion-canvas/2d/lib/components/CodeBlock';
import {makeScene2D} from "@motion-canvas/2d/lib/scenes";
import {createRef} from "@motion-canvas/core/lib/utils";
import {waitUntil} from "@motion-canvas/core";
import {colors} from "../../colors";
import {HighlightedRefProps, HighlightedText} from "../../components/HighlightedText";
import {all} from "@motion-canvas/core/lib/flow";

const duration = 1;
const fontSize = 80;

export default makeScene2D(function* (view) {
    view.fill(colors.bgAlpha)

    const codeRef = createRef<CodeBlock>()
    const titleRef = createRef<Txt>()
    const highlightRef = createRef<HighlightedRefProps>()

    yield view.add(
        <>
            <Rect layout direction="column" width="90%" height="90%">
                <Txt
                    ref={titleRef}
                    marginBottom={40}
                    fontSize={30}
                    fontWeight={700}
                    fill={'rgba(255,255,255,0.75)'}
                    fontFamily={'"JetBrains Mono", monospace'}
                >
                    Symboles
                </Txt>
                <Rect height="100%" width="100%" alignItems="center" direction="column" justifyContent="center"
                      gap={100}>
                    <CodeBlock ref={codeRef} fontSize={fontSize} language="regexp" code="aze"/>,
                    <HighlightedText ref={highlightRef}/>
                </Rect>
            </Rect>
        </>
    )


    yield* waitUntil('delimiter')
    yield* codeRef().edit(duration, false)`${insert(`//`)}`;
    yield* waitUntil('word')
    yield* codeRef().edit(duration, false)`/${insert(`tente`)}/`;
    yield* waitUntil('wordchange')
    yield* highlightRef().setContent('Je suis avec ma *tente*')
    yield* waitUntil('[ea]')
    yield* codeRef().edit(duration, false)`/t${edit(`e`, `[ea]`)}nte/`;
    yield* waitUntil('hcaracter')
    yield* highlightRef().setContent('Je suis avec ma *tante*')
    yield* waitUntil('e|a')
    yield* codeRef().edit(duration, false)`/t${remove('[')}e${insert('|')}a${remove(']')}nte/`;

    // Range
    yield* waitUntil('[a-z]')
    yield* codeRef().edit(duration, false)`/t${insert('[')}${remove('e|')}a${insert("-z")}${insert(']')}nte/`;
    yield* waitUntil('hrange_example')
    yield* highlightRef().setContent('Je suis avec ma *tonte*')

    // Range+
    yield* waitUntil('range+')
    yield* all(
        codeRef().edit(duration, false)`/${remove("t")}[a-z${insert(`0-9`)}]${remove("nte")}/`,
        highlightRef().setContent('J*e* suis avec ma tante')
    )
    yield* waitUntil('casse')
    yield* all(
        codeRef().edit(duration, false)`/[${insert(`A-Z`)}a-z0-9]/`,
        highlightRef().setContent('*J*e suis avec ma tante')
    )

    yield* waitUntil('.')
    yield* codeRef().edit(duration, false)`/${edit("[A-Za-z0-9]", ".")}/`

    yield* waitUntil('\\d')
    yield* all(
        codeRef().edit(duration, false)`/${edit(".", "\\d")}/`,
        highlightRef().setContent("J'ai *2*5 ans")
    )

    yield* waitUntil('^$')
    yield* all(
        codeRef().edit(duration, false)`/${insert("^")}\\d${insert("$")}/`,
        highlightRef().setContent("J'ai 25 ans")
    )

    yield* waitUntil('[^"]')
    yield* all(
        codeRef().edit(duration, false)`/${remove("^")}${edit("\\d", "[^\"]")}${remove("$")}/`,
        highlightRef().setContent("*J*'ai 25 ans")
    )

    yield* waitUntil('quantifier')
    yield* titleRef().text("Quantificateur", duration)

    yield* waitUntil('{2}')
    yield* all(
        codeRef().edit(duration, false)`/\\d${insert("{2}")}/`,
        highlightRef().setContent("J'ai *25* ans")
    )

    yield* waitUntil('{1,2}')
    yield* all(
        codeRef().edit(duration, false)`/\\d{${insert("1,")}2}/`,
        highlightRef().setContent("J'ai *25* ans")
    )

    yield* waitUntil('{1,}')
    yield* all(
        codeRef().edit(duration, false)`/\\d{1,${remove("2")}}/`,
        highlightRef().setContent("J'ai *25* ans")
    )

    yield* waitUntil('*')
    yield* all(
        codeRef().edit(duration, false)`/\\d${edit("{1,}", "*")}/`,
        highlightRef().setContent("J'ai *25* ans")
    )

    yield* waitUntil('+')
    yield* all(
        codeRef().edit(duration, false)`/\\d${edit("*", "+")}/`,
    )

    yield* waitUntil('?')
    yield* all(
        codeRef().edit(duration, false)`/\\d${edit("+", "?")}/`,
        highlightRef().setContent("J'ai *25* ans")
    )

    yield* waitUntil('Drapeau')
    yield* all(
        titleRef().text("Drapeau", duration),
        highlightRef().setContent("J'ai *25* ans et 12 mois")
    )
    yield* waitUntil('g')
    yield* all(
        codeRef().edit(duration, false)`/\\d+/${insert('g')}`,
        highlightRef().setContent("J'ai *25* Ans et *12* mois")
    )
    yield* waitUntil('i')
    yield* all(
        codeRef().edit(duration, false)`/${edit('\\d+', 'ans')}/${edit('g', 'i')}`,
        highlightRef().setContent("J'ai 25 *Ans* et 12 mois")
    )
    yield* waitUntil('gi')
    yield* all(
        codeRef().edit(duration, false)`/an/${edit('i', 'gi')}`,
        highlightRef().setContent("J'aurais 25 *An*s l'*an*née prochaine")
    )

    yield* waitUntil('chien|chat')
    yield* all(
        titleRef().text("Groupe", duration),
        codeRef().edit(duration, false)`/${insert('c')}${edit('an', 'h')}${insert('(ien|at)')}/gi`,
        highlightRef().setContent("J'aimerais avoir un *chat* ou un *chien*")
    )

    yield* waitUntil('papa')
    yield* all(
        codeRef().edit(duration, false)`/${edit('ch(ien|at)', '(ma){2}')}/gi`,
        highlightRef().setContent("Here is *mama*")
    )


})

const BaseText = (props: TxtProps) => {
    return <Txt
        textAlign="center"
        marginBottom={40}
        fontSize={60}
        fill={'rgba(217,217,217,0.6)'}
        fontFamily={'"JetBrains Mono", monospace'}
        {...props}
    />
}
