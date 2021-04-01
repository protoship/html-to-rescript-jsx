/* 
Convert inline CSS style to valid ReScript `ReactDOM.Style.make` code fragment.
Uses a css parser so that complex properties like background-image don't trip up
a simpler regex parser.
*/

import * as css from 'css';
import { isReservedKeyword, mangleNameAsAttribute } from "./ReasonHelper.bs"

/*
Convert parsed css object into a flat array

  .element {
    color: red;
    background: blue;
  }

  .element {
    font-size: 44px;
  }

turns to:

  [["color", "red"], ["background", "blue"], ["font-size", "44px"]]
 */

function toCssArray(obj) {
  if (obj.stylesheet.rules.length == 0) {
    return []
  } else {
    let result = []
    obj.stylesheet.rules.forEach(r =>
      r.declarations.forEach(
        decl => result.push([decl["property"], decl["value"]])
      )
    )
    return result;
  }
}

function parse(inlineText) {
  const STAND_IN_SELECTOR = ".element"
  /* https://github.com/reworkcss/css needs a proper CSS fragment, not just
  inline styles. So `color: red;` becomes `.element { color: red; } */
  let text = `${STAND_IN_SELECTOR} { ${inlineText} }`
  let parsed = css.parse(text, {});
  return toCssArray(parsed)
}


/* Portions thanks to https://github.com/mrmurphy/html-to-reason */
const DASH = /[-|_|:]([a-z])/g;
const MS = /^Ms/g;

function capitalize(match) {
  return match[1].toUpperCase();
}

function camelCase(property) {
  const mid = property.replace(DASH, capitalize).replace(MS, "ms");
  const final = lowerCaseFirst(mid);

  return final;
}

function lowerCaseFirst(s) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

const escapeQuotes = (string) => {
  if (typeof string === "string") {
    return string.replace(/"/g, '\\"');
  }

  return string;
};


function convertInlineCSS(inlineText) {
  let css

  try {
    css = parse(inlineText)
  } catch (err) {
    console.error("Error. You submitted HTML with inline CSS that could not be parsed: ", err);
    css = []
  }

  let keyValues = css.map(entry => {
    let name = entry[0]
    name = camelCase(name);
    if (isReservedKeyword(name))
      name = mangleNameAsAttribute(name)

    let value = entry[1]
    value = escapeQuotes(value);

    return "~" + name + '="' + value + '"';
  })

  return "{ReactDOM.Style.make(" + keyValues.join(", ") + ", ())}";

}
export { convertInlineCSS }

