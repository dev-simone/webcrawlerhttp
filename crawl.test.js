const { test, expect } = require("@jest/globals");
const { normalizeURL } = require("./crawl.js");

test("normalizeURL strip protocol", () => {
  const input = "https://blog.test.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.test.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://blog.test.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.test.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://BLOG.test.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.test.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://blog.test.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.test.dev/path";
  expect(actual).toEqual(expected);
});
