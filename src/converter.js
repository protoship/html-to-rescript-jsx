import { parse } from 'node-html-parser';
import { isVoidElement, htmlToDomAttrName } from './htmlMappingHelpers';
import { convertInlineCSS } from './convertInlineCSS';
let intro = `let s = React.string

@react.component
let make = () => {
  <>`
let outro = `  </>
}`

/* Global array where we accumulate all the converted lines */
var result;
var indent;

function spacing() {
  return "  ".repeat(indent)
}

/* Convert aria-hidden to ariaHidden. From Facebook's html to jsx module. */
function hyphenToCamelCase(string) {
  return string.replace(/-(.)/g, function (match, chr) {
    return chr.toUpperCase();
  });
}

/* Some HTML attributes are typed to be boolean in ReScript. They have to be
rendered as values: {true} or {false}, rather than as strings. */
function isBooleanAttr(key) {
  return ["ariaExpanded", "ariaHidden", "contentEditable"].includes(key)
}

function toBooleanValue(v) {
  v = v.toLowerCase()
  if (v == "true") {
    return `{true}`
  } else {
    return `{false}`
  }
}


/* Some attributes are not currently supported in ReScript-JSX. We currently
remove them from the result.  */
function isUnsupportedInRescript(key) {
  return ["ariaHaspopup", "ariaOrientation", "ariaCurrent"].includes(key)
}

/* Convert HTML attributes to ReScript JSX format */
let htmlAttrsToReScriptAttrString = attrs => {
  let acc = []
  for (let [key, value] of Object.entries(attrs)) {
    /* Reserved keywords in ReScript JSX */
    if (key == "class") key = "className"
    else if (key == "for") key = "htmlFor"
    else if (key == "type") key = "type_"
    else {
      key = key.toLowerCase()

      /* radiogroup => radioGroup, contenteditable => contentEditable */
      key = htmlToDomAttrName(key)

      /* aria-hidden => ariaHidden */
      key = hyphenToCamelCase(key)
    }

    if (isBooleanAttr(key)) {
      value = toBooleanValue(value)
    } else if (key == 'style') {
      value = convertInlineCSS(value)
    } else if (isUnsupportedInRescript(key)) {
      value = null
      key = null
    } else {
      value = `"${value}"`
    }

    if (key && value)
      acc.push(`${key}=${value}`)
  }

  acc = acc.join(" ")
  if (acc.length > 0)
    acc = ` ${acc}`

  return acc
}

let htmlElementToReScriptJsx = (node) => {
  let tag = node.tagName.toLowerCase()
  let attrsString = htmlAttrsToReScriptAttrString(node.attrs)

  let s = spacing()
  if (isVoidElement(tag)) {
    result.push(`${s}<${tag}${attrsString} />`)
  } else {
    result.push(`${s}<${tag}${attrsString}>`)
    indent += 1
    node.childNodes.forEach(node => toRescriptJsx(node))
    indent -= 1
    result.push(`${s}</${tag}>`)
  }
}

let toRescriptJsx = node => {
  let i = node.nodeType
  if (i == Node.TEXT_NODE) {
    let t = node.rawText.trim()
    if (t.length > 0) {
      result.push(`${spacing()}{s("${t}")}`)
    }
  } else if (i == Node.COMMENT_NODE) {
    let t = node.rawText.trim()
    if (t.length > 0) {
      result.push(`${spacing()}/* ${t} */`)
    }
  } else if (i == Node.ELEMENT_NODE) {
    htmlElementToReScriptJsx(node)
  }
}

let convertSnippet = (t, i) => {
  const root = parse(t,
    {
      lowerCaseTagName: true,
      comment: true,
      blockTextElements: {
        script: false,	// keep text content when parsing
        noscript: false,
        style: true,
        pre: true
      }
    }
  );
  root.childNodes.forEach(node => toRescriptJsx(node))
}

/* This is only used for testing in browserTest.res */
let convertPlain = t => {
  result = []
  indent = 1
  convertSnippet(t, 1)
  return result
}

let convertWithIntroOutro = t => {
  result = [intro]
  indent = 2
  convertSnippet(t)
  result.push(outro)
  return result.join("\n")
}

export { convertWithIntroOutro, convertPlain }