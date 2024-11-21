import {describe, expect, it} from 'vitest';
import {updateTitle} from './dom';

describe('updateTitle', () => {
  it.each([
    {input: 'Home', expected: 'Home | MonSite'},
    {input: 'About', expected: 'About | MonSite'},
    {input: 'Contact', expected: 'Contact | MonSite'},
    {input: '', expected: 'MonSite'},
  ])('should update the document title to "$expected"', ({input, expected}) => {
    updateTitle(input);
    expect(document.title).toBe(expected);
  });
});
