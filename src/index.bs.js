// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as ReactDom from "react-dom";
import * as Clipboard from "./clipboard";
import * as Converter from "./converter";
import * as RootUI$ReactResTest from "./RootUI.bs.js";
import * as SampleData$ReactResTest from "./SampleData.bs.js";

import "./index.css"
;

function copyOutputToClipboard(prim) {
  Clipboard.copyOutputToClipboard();
  
}

function convert(param) {
  var inputDom = document.getElementById("inputHtml");
  var inputText = inputDom.value;
  var convertedText = Converter.convertWithIntroOutro(inputText);
  var tmp = document.getElementById("outputReScript");
  tmp.innerText = convertedText;
  
}

function s(prim) {
  return prim;
}

var clipboardIcon = React.createElement("svg", {
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
          d: "M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2"
        }));

function Index$App(Props) {
  React.useEffect(function () {
        convert(undefined);
        
      });
  var editorStyle = {
    height: "calc(100vh - 300px)"
  };
  return React.createElement(RootUI$ReactResTest.make, {
              children: React.createElement("div", undefined, React.createElement("div", {
                        className: "mt-4 grid grid-cols-2"
                      }, React.createElement("div", {
                            className: "w-full "
                          }, React.createElement("div", {
                                className: "flex justify-between"
                              }, React.createElement("p", {
                                    className: "block mb-2 text-gray-600 text-sm",
                                    onClick: (function (param) {
                                        return convert(undefined);
                                      })
                                  }, "Paste your HTML below")), React.createElement("textarea", {
                                defaultValue: SampleData$ReactResTest.initialData,
                                className: "block w-10/12 bg-white p-4 font-mono text-xs border border-blue-200 overflow-scroll",
                                id: "inputHtml",
                                style: editorStyle,
                                onFocus: (function ($$event) {
                                    return $$event.currentTarget.select();
                                  })
                              })), React.createElement("div", {
                            className: "text-white bg-gray-900 "
                          }, React.createElement("button", {
                                className: "flex items-center justify-center w-full text-gray-100 bg-blue-800 text-lg p-4 hover:bg-gray-600 hover:text-blue-50",
                                onClick: (function (param) {
                                    Clipboard.copyOutputToClipboard();
                                    
                                  })
                              }, React.createElement("div", {
                                    className: "w-8 h-8 mr-4"
                                  }, clipboardIcon), React.createElement("p", undefined, "Click here to copy the converted code to clipboard")), React.createElement("p", {
                                className: "p-6 text-xs font-mono whitespace-pre overflow-scroll",
                                id: "outputReScript",
                                style: editorStyle
                              }))))
            });
}

var App = {
  make: Index$App
};

var root = document.querySelector("#root");

if (root == null) {
  console.log("Error: could not find react element");
} else {
  ReactDom.render(React.createElement(Index$App, {}), root);
}

export {
  copyOutputToClipboard ,
  convert ,
  s ,
  clipboardIcon ,
  App ,
  
}
/*  Not a pure module */
