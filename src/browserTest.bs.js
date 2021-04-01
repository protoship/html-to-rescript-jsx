// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReactDom from "react-dom";
import * as Caml_array from "bs-platform/lib/es6/caml_array.js";
import * as Converter from "./converter";
import * as RootUI$ReactResTest from "./RootUI.bs.js";

import "./index.css"
;

function convertPlain(prim) {
  return Converter.convertPlain(prim);
}

function s(prim) {
  return prim;
}

var testCases = [
  [
    "Simple inline CSS style",
    "<p style=\"background-color: red; font-size: 20px; font-family: 'Times New Roman, Georgia, sans-serif'\">Hello</p>",
    "<p style={ReactDOM.Style.make(~backgroundColor=\"red\", ~fontSize=\"20px\", ~fontFamily=\"'Times New Roman, Georgia, sans-serif'\", ())}>{s(\"Hello\")}</p>"
  ],
  [
    "Inline CSS with base64 background image data",
    "<div style='background:url(data:image/png;base64,iVBORw0KGgoAAAA) repeat-x center;'>Hello</div>",
    "<div style={ReactDOM.Style.make(~background=\"url(data:image/png;base64,iVBORw0KGgoAAAA) repeat-x center\", ())}>{s(\"Hello\")}</div>"
  ],
  [
    "Invalid inline CSS should be ignored and rest should be parsed",
    "<p style='xyz--123;;::'>Hello</p>",
    "<p>{s(\"Hello\")}</p>"
  ],
  [
    "P tag with text",
    "<p>Hello World!</p>",
    "<p>{s(\"Hello World!\")}</p>"
  ],
  [
    "Nested HTML",
    "<main><div><p><span>Hello</span></p></div></main>",
    "<main><div><p><span>{s(\"Hello\")}</span></p></div></main>"
  ],
  [
    "Classnames with colon",
    "<button class=\"bg-gray-800 hover:text-white focus:outline-none\"><span class=\"sr-only\">Hello</span><button>",
    "<button className=\"bg-gray-800 hover:text-white focus:outline-none\"><span className=\"sr-only\">{s(\"Hello\")}</span></button>"
  ],
  [
    "Void tags",
    "<br>",
    "<br />"
  ],
  [
    "Ignore unsupported attributes",
    "<p aria-label=\"intro\" aria-haspopup=\"true\">Hello</p>",
    "<p ariaLabel=\"intro\">{s(\"Hello\")}</p>"
  ],
  [
    "Use DOM cased attribute names",
    "<p contenteditable=\"true\">Hello</p>",
    "<p contentEditable={true}>{s(\"Hello\")}</p>"
  ],
  [
    "HTML comments",
    "<p><!-- This is a comment !-->Hello</p>",
    "<p>/* This is a comment ! */{s(\"Hello\")}</p>"
  ],
  [
    "Multi-line HTML comments",
    "<!--\n  Dropdown menu, show/hide based on menu state.\n\n  Entering: \"transition ease-out duration-100\"\n    From: \"transform opacity-0 scale-95\"\n    To: \"transform opacity-100 scale-100\"\n-->",
    "/* Dropdown menu, show/hide based on menu state.\n\n  Entering: \"transition ease-out duration-100\"\n    From: \"transform opacity-0 scale-95\"\n    To: \"transform opacity-100 scale-100\" */"
  ],
  [
    "ReScript reserved keywords",
    "<input type=\"text\" name=\"hello\" for=\"hello\" />",
    "<input type_=\"text\" name=\"hello\" htmlFor=\"hello\" />"
  ],
  [
    "SVG",
    "<svg class=\"h-6 w-6\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" aria-hidden=\"true\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 17h5l-1.405-1.405A2.032 2.032 0 0118 0H9\" /></svg>",
    "<svg className=\"h-6 w-6\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" ariaHidden={true}><path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth=\"2\" d=\"M15 17h5l-1.405-1.405A2.032 2.032 0 0118 0H9\"></path></svg>"
  ],
  [
    "IMG with src url",
    "<img class=\"h-8 w-8 rounded-full\" src=\"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80\" alt=\"\">",
    "<img className=\"h-8 w-8 rounded-full\" src=\"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80\" alt=\"\" />"
  ]
];

function testResults(param) {
  var results = {
    total: 0,
    passed: 0,
    failed: 0,
    cases: []
  };
  var cases = testCases.map(function ($$case, index) {
        results.total = results.total + 1 | 0;
        var caseName = Caml_array.get($$case, 0);
        var inputText = Caml_array.get($$case, 1);
        var expectedOutput = Caml_array.get($$case, 2);
        var outputText = Converter.convertPlain(inputText);
        var outputText$1 = outputText.map(function (prim) {
                return prim.trim();
              }).join("");
        var isTestPassing = expectedOutput === outputText$1;
        if (isTestPassing) {
          results.passed = results.passed + 1 | 0;
        } else {
          results.failed = results.failed + 1 | 0;
        }
        var className = isTestPassing ? "bg-green-200" : "bg-red-300";
        return React.createElement("div", {
                    className: "mb-4 border p-4 overflow-auto " + className
                  }, React.createElement("p", {
                        className: "mb-2"
                      }, "# " + String(index + 1 | 0) + ". ", React.createElement("strong", undefined, caseName)), React.createElement("div", {
                        className: "grid grid-cols-12"
                      }, React.createElement("p", {
                            className: "col-span-1 text-sm text-gray-600"
                          }, "input"), React.createElement("pre", {
                            className: "col-span-11"
                          }, inputText), React.createElement("p", {
                            className: "col-span-1 text-sm text-gray-600"
                          }, "expected output"), React.createElement("pre", {
                            className: "col-span-11"
                          }, expectedOutput), isTestPassing ? null : React.createElement(React.Fragment, undefined, React.createElement("p", {
                                  className: "col-span-1 text-sm text-gray-600"
                                }, "output"), React.createElement("pre", {
                                  className: "col-span-11"
                                }, outputText$1))));
      });
  results.cases = cases;
  return results;
}

function BrowserTest$App(Props) {
  var match = React.useState(function () {
        return testResults(undefined);
      });
  var setResult = match[1];
  var results = match[0];
  React.useEffect((function () {
          Curry._1(setResult, (function (param) {
                  return testResults(undefined);
                }));
          
        }), []);
  return React.createElement(RootUI$ReactResTest.make, {
              children: null
            }, React.createElement("h2", {
                  className: "text-2xl mb-4"
                }, "Test cases"), React.createElement("h3", {
                  className: "text-lg mb-6 p-4 inline-block " + (
                    results.failed > 0 ? "bg-red-300" : "bg-green-300 text-gray-600"
                  )
                }, String(results.total) + " total. " + String(results.passed) + " passed. " + String(results.failed) + " failed."), React.createElement("button", {
                  className: "block mb-6 p-2 bg-gray-300",
                  onClick: (function (_e) {
                      return Curry._1(setResult, (function (param) {
                                    return testResults(undefined);
                                  }));
                    })
                }, "Run tests again"), results.cases);
}

var App = {
  make: BrowserTest$App
};

var root = document.querySelector("#root");

if (root == null) {
  console.log("Error: could not find react element");
} else {
  ReactDom.render(React.createElement(BrowserTest$App, {}), root);
}

export {
  convertPlain ,
  s ,
  testCases ,
  testResults ,
  App ,
  
}
/*  Not a pure module */
