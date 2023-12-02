import './semver.css'

import gsap from 'gsap'
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const tl = gsap.timeline()
gsap.defaults({
  duration: 1,
  ease: 'power2'
});

const highlightLines = (parent: string, start: number, end?: number) => {
  const selector = new Array((end ?? start + 1)  - start).fill(0).map((_, k) => `${parent} .view-line:nth-child(${k+start})`).join(', ')
  tl.to(`${parent} .view-line`, {opacity: .3})
  tl.to(selector, { opacity: 1}, '<')
}

// Nombres
tl.fromTo(".number", {opacity: 0, y: -20}, {opacity: 1, y: 0, stagger: .2, ease: 'power2'})
tl.fromTo(".dot", {opacity: 0, y: -20}, {opacity: 1, y: 0, stagger: .2, ease: 'power2'})
tl.to(".dot", {opacity: 0.3, duration: 1})

// Majeur
tl.to("#minor, #patch", {opacity: 0.2, duration: 1}, '<')
tl.fromTo("#major .label", {opacity: 0}, {opacity: 1, y: -40})
tl.fromTo("#major-example", {opacity: 0}, {opacity: 1, delay: 1})
highlightLines('#major-example', 7)
tl.to("#nl2br", {text: 'jumpLine', delay: 1, type: 'diff', ease: 'linear'})
highlightLines('#major-example', 17)
tl.to("#amount", {text: 'currency, amount', delay: 1, type: 'diff', ease: 'linear'})
highlightLines('#major-example', 1, 20)
tl.to('#major-example', {opacity: 0, delay: 1})
tl.to('#major .number', {text: '3', type: 'diff', color: '#93ca69'})
tl.to('#major .number', {color: '#FFFFFF', delay: 1, opacity: .2})
tl.to("#major .label", {opacity: 0, y: 0}, '<')
// Mineur
tl.to('#minor', {opacity: 1}, '<')
tl.fromTo("#minor .label", {opacity: 0}, {opacity: 1, y: -40}, '<')
tl.fromTo("#minor-example", {opacity: 0}, {opacity: 1, delay: 1})
highlightLines('#minor-example', 3)
tl.to('#decimals', {text: 'decimals, prefix'})
highlightLines('#minor-example', 0, 20)
tl.fromTo('#additional-function', {height: 0, opacity: 0}, {height: 'auto', opacity: 1}, '<')
tl.to('#minor-example', {opacity: 0, delay: 1})
tl.to('#minor .number', {text: '5', type: 'diff', color: '#93ca69', ease: 'linear'})
tl.to('#minor .number', {color: '#FFFFFF', delay: 1, opacity: .2})
tl.to("#minor .label", {opacity: 0, y: 0}, '<')

// Patch
tl.to('#patch', {opacity: 1}, '<')
tl.fromTo("#patch .label", {opacity: 0}, {opacity: 1, y: -40}, '<')
tl.fromTo("#patch-example", {opacity: 0}, {opacity: 1, delay: 1})
tl.fromTo('#condition', {height: 0, opacity: 0}, {opacity: 1, height: 'auto', delay: 1})
tl.to("#patch-example", {opacity: 0, delay: 1})
tl.to('#patch .number', {text: '13', type: 'diff', color: '#93ca69', ease: 'linear'})
tl.to("#patch .label", {opacity: 0, y: 0})
tl.to('.number', {opacity: 1, color: '#FFFFFF'})
tl.to('.suffix', {text: '-beta', delay: 1})
tl.to('.suffix', {text: '-alpha', delay: 1})
tl.set('.suffix', {text: '', delay: 1})

// Range ^
tl.to('#range', {opacity: 1})
tl.set('.range1', {text: '^1.2.3', delay: 0})
tl.set('.range1', {text: '1.2.4', delay: 1})
tl.set('.range1', {text: '1.2.5', delay: 1})
tl.set('.range1', {text: '1.4.0', delay: 1})
tl.set('.range1', {text: '2.0.0', delay: 1, color: 'red'})
tl.set('.range1', {text: '^1.2.3', delay: 1, color: 'white'})
tl.set('.range2', {text: '>=1.2.3 <2'})
tl.to('.range1', {opacity: .3, color: 'white'}, '<')
tl.fromTo('.range2', {height: 0, opacity: 0}, {height: 'auto', opacity: 1}, '<')
tl.fromTo('.equal', {height: 0, opacity: 0}, {height: 'auto', opacity: .3}, '<')

tl.to('.range2, .equal', {height: 0, opacity: 0, delay: 1})
tl.to('.range1', {text: '~1.2.3', opacity: 1}, '<')
tl.set('.range1', {text: '1.2.4', delay: 1})
tl.set('.range1', {text: '1.2.5', delay: 1})
tl.set('.range1', {text: '1.3.0', delay: 1, color: 'red'})
tl.set('.range1', {text: '~1.2.3', delay: 1, color: 'white'})
tl.set('.range2', {text: '>=1.2.3 <1.3.0'})
tl.to('.range1', {opacity: .3, color: 'white'}, '<')
tl.fromTo('.range2', {height: 0, opacity: 0}, {height: 'auto', opacity: 1}, '<')
tl.fromTo('.equal', {height: 0, opacity: 0}, {height: 'auto', opacity: .3}, '<')
tl.to('.range2, .equal', {height: 0, opacity: 0, delay: 1})

tl.to('.range1', {text: '~1.2', opacity: 1}, '<')
tl.set('.range1', {text: '1.3', delay: 1})
tl.set('.range1', {text: '1.4', delay: 1})
tl.set('.range1', {text: '2.0', delay: 1, color: 'red'})
tl.set('.range1', {text: '~1.2', delay: 1, color: 'white'})
tl.set('.range2', {text: '>=1.2 <2'})
tl.to('.range1', {opacity: .3, color: 'white'}, '<')
tl.fromTo('.range2', {height: 0, opacity: 0}, {height: 'auto', opacity: 1}, '<')
tl.fromTo('.equal', {height: 0, opacity: 0}, {height: 'auto', opacity: .3}, '<')
tl.to('.range2, .equal', {height: 0, opacity: 0, delay: 1})
tl.set('.range1', {text: '1.0.2', opacity: 1}, '<')
tl.set('.range1', {text: '~1.0.2', delay: 1})
tl.set('.range1', {text: '^1.0.2', delay: 1})
