import {Rect, Txt} from '@motion-canvas/2d/lib/components';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import {createRef} from '@motion-canvas/core/lib/utils';
import {waitUntil} from "@motion-canvas/core";
import {CodeBlock} from "@motion-canvas/2d/lib/components/CodeBlock";

const gap = 70
const duration = .7

const Card = ({title, ref, children}: any) => {
    return <Rect
        ref={ref}
        width={'100%'}
        height={'100%'}
        fill={'#2d2e3b'}
        direction={"column"}
        alignItems={'start'}
        padding={50}
        grow={1}
        radius={30}
        justifyContent={'start'}
    >
        <Txt
            marginBottom={40}
            fontSize={60}
            fontWeight={700}
            fill={'#fff'}
            fontFamily={'"JetBrains Mono", monospace'}
        >{title}</Txt>
        {children}
    </Rect>
}

export default makeScene2D(function* (view) {
    view.fill('#161720')
    const modelRef = createRef<Rect>()
    const viewRef = createRef<Rect>()
    const controllerRef = createRef<Rect>()
    const modelCodeRef = createRef<CodeBlock>()
    const controllerCodeRef = createRef<CodeBlock>()
    const viewCoderef = createRef<CodeBlock>()

    view.add(
        <Rect layout width={'100%'}
              height={'100%'} gap={gap} padding={gap}>
            <Card ref={modelRef} title="Modèle">
                <CodeBlock fontSize={20} opacity={0} ref={modelCodeRef} language="ts" code={`
                class Recipe {
                
                    public int id;
                    
                    public string title;
                    
                    public string content;
                    
                    public Date publishedAt;
                
                }`}/>
            </Card>
            <Card ref={viewRef} title="Vue">
                <CodeBlock fontSize={20} opacity={0} ref={viewCoderef} language="html" code={`@extends('layout')
                
<nav>
@for category in categories
    <a href="{{ category.url }}">
        {{ category.name }}
    </a>
@endfor
</nav>`}/>
            </Card>
            <Card ref={controllerRef} title="Controller">
                <CodeBlock fontSize={20} opacity={0} ref={controllerCodeRef} language="ts" code={`
                function Home () {
                
                  categories = Category.all()
                  recipes = Recipes.latest(10)
                    
                  return view('home', {
                      categories,
                      recipes
                  })
                }`}/>
            </Card>
        </Rect>,
    );


    yield * waitUntil('model')

    yield * all(
        controllerRef().opacity(0.2, duration),
        viewRef().opacity(0.2, duration),
        modelCodeRef().opacity(1, duration),
        modelCodeRef().fontSize(40 , duration),
    )

    yield * waitUntil('controller')

    yield * all(
        modelRef().opacity(0.2, duration),
        controllerRef().opacity(1, duration),
        modelCodeRef().fontSize(20 , duration),
        controllerCodeRef().fontSize(40 , duration),
        controllerCodeRef().opacity(1, duration),
    )

    yield * waitUntil('vue')

    yield * all(
        controllerRef().opacity(0.2, duration),
        viewRef().opacity(1, duration),
        controllerCodeRef().fontSize(20 , duration),
        viewCoderef().fontSize(40 , duration),
        viewCoderef().opacity(1, duration),
    )

    yield* waitFor(3)
});
