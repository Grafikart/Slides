import {Circle, Img, Node, NODE_NAME, Rect, Txt} from "@motion-canvas/2d";
import {colors} from "../colors";
import {Length} from "@motion-canvas/2d/src/lib/partials";
import BackButton from '../img/BackButton.svg'
import Burger from '../img/Burger.svg'
import {createRef} from "@motion-canvas/core/lib/utils";
import {all, easeOutExpo} from "@motion-canvas/core";

type Props = {
  url: string
  width: Length,
  height: Length
}

export function addBrowser(parent: Node, props?: Props) {
  const {width = 1700, height = 800, url = 'https://grafikart.fr'} = props ?? {}
  const rect = createRef<Rect>()
  const buttons = createRef<Rect>()
  const nav = createRef<Rect>()
  const screen = createRef<Rect>()
  const wedge = createRef<Rect>()
  parent.add(<Rect
    ref={rect}
    layout
    direction="column"
    fill={colors.bgLight}
    radius={10}
    justifyContent="stretch"
    alignItems="stretch"
    width={width}
    height={height}
    padding={10}
  >
    <Rect zIndex={2} ref={wedge} marginLeft={70} marginRight={70} radius={[0, 0, 20, 20]} height={0} fill={colors.bgLight}/>
    <Rect gap={10} ref={buttons} layout>
      <Circle
        position={[0, 100]}
        width={20}
        height={20}
        fill={colors.purple}
      />
      <Circle
        position={[0, 100]}
        width={20}
        height={20}
        fill={colors.yellow}
      />
      <Circle
        position={[0, 100]}
        width={20}
        height={20}
        fill={colors.green}
      />
    </Rect>
    <Rect gap={20} padding={[0, 10]} alignItems="center" ref={nav} margin={[15, 0, 10, 0]}>
      <Img
        src={BackButton}
        width={30}
        height={30}
      />
      <Img
        src={BackButton}
        width={30}
        height={30}
        rotation={180}
      />
      <Rect padding={[10, 20]} height={40} fill={colors.bg} layout alignItems="center" radius={10} width="100%">
        <Txt text={url} fill={colors.textLight} fontSize={20}/>
      </Rect>
      <Img
        src={Burger}
        width={30}
        height={30}
        rotation={180}
      />
    </Rect>
    <Rect ref={screen} radius={5} layout fill={colors.bg} direction="column" width="100%" height="100%" alignItems="center"
          justifyContent="center">
    </Rect>
  </Rect>)
  rect().clip(true)
  rect().width(0).opacity(0).padding(0)
  return {
    show: function * (duration = .5) {
      yield* all(
          rect().width(width, duration, easeOutExpo),
          rect().padding(10, duration, easeOutExpo),
          rect().opacity(1, duration, easeOutExpo),
      )
    },
    hide: function * (duration = .5) {
      yield* all(
          rect().width(0, duration),
          rect().padding(0, duration),
      )
    },
    mobile: function* (duration = .5) {
      yield* all(
        rect().width(400, duration),
        rect().radius(30, duration),
        rect().height(896, duration),
        nav().height(0, duration),
        nav().margin(0, duration),
        nav().opacity(0, duration),
        buttons().height(0, duration),
        buttons().opacity(0, duration),
        screen().radius(25, duration),
        screen().margin([-25, 0, 0, 0], duration),
        wedge().height(25, duration),
        ...nav().children().filter(n => n[NODE_NAME] === 'Img').map((n: Img) => n.width(0, duration))
      );
    },
    desktop: function* (duration = .5) {
      yield* all(
        rect().width(width, duration),
        rect().radius(10, duration),
        rect().height(height, duration),
        ...buttons().children().map(b => b.opacity(1, duration)),
        nav().height(null, duration),
        nav().margin([15, 0, 10, 0], duration),
        nav().opacity(1, duration),
        buttons().opacity(1, duration),
        buttons().height(null, duration),
        screen().radius(5, duration),
        screen().margin([0, 0, 0, 0], duration),
        wedge().height(0, duration),
        ...nav().children().filter(n => n[NODE_NAME] === 'Img').map((n: Img) => n.width(null, duration))
      );
    },
    position: function* (p: [number, number], d: number) { yield* rect().position(p, d) }

  }
}
