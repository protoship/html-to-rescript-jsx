// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";

function s(prim) {
  return prim;
}

function RootUI(Props) {
  var children = Props.children;
  return React.createElement("main", {
              className: "bg-gray-50 p-8 antialiased h-screen w-screen"
            }, React.createElement("div", {
                  className: "flex items-end justify-between w-full mb-6"
                }, React.createElement("h1", {
                      className: "text-2xl"
                    }, "Convert HTML to ReScript JSX React Component"), React.createElement("p", {
                      className: "mr-4"
                    }, React.createElement("a", {
                          className: "text-blue-900",
                          href: "https://github.com/protoship/html-to-rescript-jsx"
                        }, "https://github.com/protoship/html-to-rescript-jsx"))), children, React.createElement("div", {
                  className: "border-t"
                }, React.createElement("p", {
                      className: "mt-4 text-gray-500 text-sm"
                    }, "Please check the test cases and raise a GitHub issue if your input is not handled well."), React.createElement("p", {
                      className: "mt-2 pb-4"
                    }, React.createElement("a", {
                          className: "text-blue-900",
                          href: "/"
                        }, "home"), " | ", React.createElement("a", {
                          className: "text-blue-900",
                          href: "/test.html"
                        }, "test cases"))));
}

var make = RootUI;

export {
  s ,
  make ,
  
}
/* react Not a pure module */
