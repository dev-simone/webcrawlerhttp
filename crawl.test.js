const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl.js");

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

test("getURLsFromHTML", () => {
  const inputHTMLBody = `
<html>
  <body>
    <a href="https://blog.test.dev/">
      Test.dev Blog
    </a>
  </body>
</html>
`;
  const inputBaseURL = "https://blog.test.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.test.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
<html>
  <body>
    <a href="https://blog.test.dev/path/">
      Test.dev Blog
    </a>
  </body>
</html>
`;
  const inputBaseURL = "https://blog.test.dev/path/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.test.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
<html>
  <body>
    <a href="/path/">
      Test.dev Blog
    </a>
  </body>
</html>
`;
  const inputBaseURL = "https://blog.test.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.test.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputHTMLBody = `
<html>
  <body>
    <a href="https://blog.test.dev/path1/">
      Test.dev Blog
    </a>
    <a href="/path2/">
      Test.dev Blog
    </a>
  </body>
</html>
`;
  const inputBaseURL = "https://blog.test.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://blog.test.dev/path1/",
    "https://blog.test.dev/path2/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid", () => {
  const inputHTMLBody = `
<html>
  <body>
    <a href="invalid">
      Invalid URL
    </a>
  </body>
</html>
`;
  const inputBaseURL = "https://blog.test.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
