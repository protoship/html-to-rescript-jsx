// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Belt_SetString from "bs-platform/lib/es6/belt_SetString.js";

var reservedKeywords = Belt_SetString.fromArray([
      "and",
      "as",
      "assert",
      "begin",
      "class",
      "constraint",
      "do",
      "done",
      "downto",
      "else",
      "end",
      "esfun",
      "exception",
      "external",
      "false",
      "for",
      "fun",
      "function",
      "functor",
      "if",
      "in",
      "include",
      "inherit",
      "initializer",
      "lazy",
      "let",
      "module",
      "mutable",
      "new",
      "nonrec",
      "object",
      "of",
      "open",
      "or",
      "pri",
      "pub",
      "rec",
      "sig",
      "struct",
      "switch",
      "then",
      "to",
      "true",
      "try",
      "type",
      "val",
      "virtual",
      "when",
      "while",
      "with"
    ]);

function isReservedKeyword(string) {
  return Belt_SetString.has(reservedKeywords, string);
}

function mangleNameAsAttribute(name) {
  return name + "_";
}

export {
  reservedKeywords ,
  isReservedKeyword ,
  mangleNameAsAttribute ,
  
}
/* reservedKeywords Not a pure module */
