import { RectProps, Rect, Txt } from "@motion-canvas/2d";
import { colors } from "../colors";
import { Signal, SimpleSignal } from "@motion-canvas/core";

export function NamedRect<T>({
  title,
  children,
  justifyContent = "start",
  alignItems = "center",
  ...props
}: { title: string | SimpleSignal<string> } & RectProps) {
  return (
    <Rect layout direction="column" fill={colors.bg} radius={20} {...props}>
      <Rect justifyContent="start" width="100%" padding={[10, 20]} height={0}>
        <Txt fill={colors.textLight} fontSize={30} text={title} />
      </Rect>
      <Rect
        height="100%"
        alignItems={alignItems}
        justifyContent={justifyContent}
      >
        {children}
      </Rect>
    </Rect>
  );
}
