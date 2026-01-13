import { SVG, Path, Node, Rect, Img } from "@motion-canvas/2d";
import { colors } from "../colors.js";
import { all, createRef, linear, loop } from "@motion-canvas/core";

const positions = [
    [138, -89],
    [-66, 117],
    [-223, -38]
] satisfies [number, number][]

export function addCogs(parent: Node) {
    const root = createRef<Node>()
    parent.add(<Node ref={root} opacity={0}>
        <Node>
            <Path x={-174} y={-174} data="M349 184V163L320 159C319 149 317 140 314 131L339 117L331 98L303 105C298 97 293 89 287 81L306 58L291 43L268 60C261 54 253 49 244 44L251 16L232 8L218 33C209 30 200 28 190 27L186 0H165L161 29C151 30 142 32 133 35L119 9L100 17L107 45C99 50 91 55 83 61L60 44L45 58L62 81C56 88 51 96 46 105L18 98L10 117L35 131C32 140 30 149 29 159L0 163V184L29 188C30 198 32 207 35 216L10 230L18 249L46 242C51 250 56 258 62 266L45 289L60 304L83 287C90 293 98 298 107 303L100 331L119 339L133 314C142 317 151 319 161 320L165 349H186L190 320C200 319 209 317 218 314L232 339L251 331L244 303C252 298 260 293 268 287L291 304L306 289L289 266C295 259 300 251 305 242L333 249L341 230L316 216C319 207 321 198 322 188L349 184ZM175 284C114 284 65 235 65 174C65 113 115 64 175 64C235 64 285 113 285 174C285 235 236 284 175 284Z" fill={colors.textLight} />
        </Node>
        <Node>
            <Path x={-136} y={-136} data="M272 146V125L244 121C243 111 240 102 237 93L260 76L249 58L222 69C216 61 209 55 202 49L213 23L195 12L178 35C169 31 160 29 150 28L146 0H125L121 28C111 29 102 32 93 35L76 12L58 23L69 49C61 55 55 62 49 69L23 58L12 76L35 93C31 102 29 111 28 121L0 125V146L28 150C29 160 32 169 35 178L12 195L23 213L49 202C55 210 62 216 69 222L58 248L76 259L93 236C102 240 111 242 121 243L125 271H146L150 243C160 242 169 239 178 236L195 259L213 248L202 222C210 216 216 209 222 202L248 213L259 195L236 178C240 169 242 160 243 150L272 146ZM135 209C94 209 61 176 61 135C61 94 94 61 135 61C176 61 209 94 209 135C208 176 175 209 135 209Z" fill={colors.textLight} />
        </Node>
        <Node>
            <Path x={-100} y={-100} data="M200 111V90L171 86C169 76 165 68 160 60L178 37L163 22L140 40C132 35 123 31 114 29L110 0H90L86 29C76 31 68 35 60 40L37 22L22 37L40 60C35 68 31 77 29 86L0 90V111L29 115C31 125 35 133 40 141L22 164L37 179L60 161C68 166 77 170 86 172L90 201H111L115 172C125 170 133 166 141 161L164 179L179 164L161 141C166 133 170 124 172 115L200 111ZM100 137C80 137 63 120 63 100C63 80 80 63 100 63C120 63 137 80 137 100C137 120 121 137 100 137Z" fill={colors.textLight} />
        </Node>
    </Node>)

    return {
        *play() {
            const items = root().children()
            yield all(
                ...items.map((item, index) => {
                    return item.position(positions[index], 1)
                }),
                root().opacity(1, 1),
                loop(
                    () => items[0].rotation(0).rotation(-360, 5, linear),
                ),
                loop(
                    () => items[1].rotation(0).rotation(360, 3.75, linear),
                ),
                loop(
                    () => items[2].rotation(0).rotation(-360, 2.5, linear),
                )
            )
        },
        *hide() {
            const items = root().children()
            yield all(
                ...items.map((item) => {
                    return item.position([0, 0], .5)
                }),
                root().opacity(0, .5),
            )
        },
        root,
    }
}
