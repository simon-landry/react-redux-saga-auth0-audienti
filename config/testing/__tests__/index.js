import test from 'ava';
import { noop } from '../ava_setup';

const { expect, shallow } = testHelper;

test('Be sure noop returns null', () => {
  expect(noop()).toBe(null);
});
