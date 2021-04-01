import { parse } from 'node-html-parser';
import { htmlCasedAttrs } from './htmlCasedAttrs';
import { AllHtmlEntities as Entities } from "html-entities"
import { isReservedKeyword, mangleNameAsAttribute } from "./ReasonHelper.bs"

let intro = `
let s = React.string

@react.component
let make = () => {
  <>
`
let outro = `
  </>
}
`

/* Global array where we accumulate all the converted lines */
var result;
var indent;

function spacing() {
  return "  ".repeat(indent)
}

function isVoidElement(el){
  return [ 'area',
  'base',
  'basefont',
  'bgsound',
  'br',
  'col',
  'command',
  'embed',
  'frame',
  'hr',
  'image',
  'img',
  'input',
  'isindex',
  'keygen',
  'link',
  'menuitem',
  'meta',
  'nextid',
  'param',
  'source',
  'track',
  'wbr' ].includes(el)
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
  return ["ariaExpanded", "ariaHidden"].includes(key)
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


let htmlElementToReScriptJsx = (node) => {
  let tag = node.tagName.toLowerCase()
  let attrs = {}

  /* Convert all attribute keys to proper casing. (radioGroup, contentEditable etc.)
  Mapping is done with the pre-defined list of well-cased html attributes in htmlCasedAttrs */
  for (let [key, value] of Object.entries(node.attrs)) {
    key = key.toLowerCase()
    htmlCasedAttrs.forEach(function (attr) {
      if (attr.toLowerCase() == key) {
        key = attr
      }
    });
    attrs[key] = value
  }

  let attrsString = []
  for (let [key, value] of Object.entries(attrs)) {

    /* Reserved keywords in ReScript JSX */
    if (key == "class") key = "className"
    else if (key == "for") key = "htmlFor"
    else if (key == "type") key = "type_"
    else {
      /* aria-hidden becomes ariaHidden */
      key = hyphenToCamelCase(key)
    }

    if (isBooleanAttr(key)) {
      value = toBooleanValue(value)
    } else if (key == 'style') {
      value = replaceStyle(value)
    } else if (isUnsupportedInRescript(key)) {
      value = null
      key = null
    } else {
      value = `"${value}"`
    }
    if (key && value)
      attrsString.push(`${key}=${value}`)
  }

  attrsString = attrsString.join(" ")

  let s = spacing()
  if(isVoidElement(tag)){
    result.push(`${s}<${tag} ${attrsString} />`)
  }else{
    result.push(`${s}<${tag} ${attrsString}>`)
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

let run = (t) => {
  if (!t)
    t = document.getElementById("inputHtml").value;

  result = []
  indent = 1

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

  result.push(intro)
  indent += 1
  root.childNodes.forEach(node => toRescriptJsx(node))
  indent -= 1
  result.push(outro)

  result = result.join("\n")

  document.getElementById("outputReScript").innerText = result
}


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

function replaceStyle(styleString) {
  const entities = new Entities();
  const styles = entities
    .decode(styleString)
    .trim()
    .split(";")
    .map((style) => {
      if (style.trim() == "") {
        return "";
      }
      const safeStyle = style
        .split(/\n/)
        .map((piece) => piece.trim())
        .join("");
      const [property, value] = safeStyle.split(/:(?!\/\/)/g);
      let basePropertyName = camelCase(property);
      const safePropertyName = isReservedKeyword(basePropertyName)
        ? mangleNameAsAttribute(basePropertyName)
        : basePropertyName;

      let basePropertyValue = (value || "").replace(/\n/g, "").trim();

      const safePropertyValue = escapeQuotes(basePropertyValue);

      return "~" + safePropertyName + '="' + safePropertyValue + '"';
    })
    .filter(Boolean);

  const labels = styles.length > 0 ? styles.join(", ") + ", " : "";

  return "ReactDOM.Style.make(" + labels + " ())";
}

export { run };