/* Verbatim from https://github.com/littlehaker/html-to-jsx */
// prettier-ignore
const HTML_DOM_ATTRS = [
  "accept", "acceptCharset", "accessKey", "action", "allowFullScreen", "allowTransparency", "alt", "async", "autoComplete", "autoFocus", "autoPlay", "capture", "cellPadding", "cellSpacing", "charSet", "challenge", "checked", "classID", "className", "cols", "colSpan", "content", "contentEditable", "contextMenu", "controls", "coords", "crossOrigin", "data", "dateTime", "defer", "dir", "disabled", "download", "draggable", "encType", "form", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "headers", "height", "hidden", "high", "href", "hrefLang", "htmlFor", "httpEquiv", "icon", "id", "inputMode", "keyParams", "keyType", "label", "lang", "list", "loop", "low", "manifest", "marginHeight", "marginWidth", "max", "maxLength", "media", "mediaGroup", "method", "min", "minLength", "multiple", "muted", "name", "noValidate", "open", "optimum", "pattern", "placeholder", "poster", "preload", "radioGroup", "readOnly", "rel", "required", "role", "rows", "rowSpan", "sandbox", "scope", "scoped", "scrolling", "seamless", "selected", "shape", "size", "sizes", "span", "spellCheck", "src", "srcDoc", "srcSet", "start", "step", "style", "summary", "tabIndex", "target", "title", "type", "useMap", "value", "width", "wmode", "wrap", "viewBox"
];

/* 
A lower-case to proper-case map of all HTML DOM attrs:
 {accept: "accept", acceptcharset: "acceptCharset", ...} 
*/
const htmlDomAttrsMap = HTML_DOM_ATTRS.reduce((acc, attr) => {
  acc[attr.toLowerCase()] = attr;
  return acc;
}, {});

/* eg: autofocus => autoFocus */
function htmlToDomAttrName(prop) {
  return htmlDomAttrsMap[prop] || prop
}

/* <hr />, <img /> etc. don't have children and are void elements */
// prettier-ignore
function isVoidElement(el) {
  return [
    "area", "base", "basefont", "bgsound", "br", "col", "command", "embed", "frame", "hr", "image", "img", "input", "isindex", "keygen", "link", "menuitem", "meta", "nextid", "param", "source", "track", "wbr"
  ].includes(el);
}

export { isVoidElement, htmlToDomAttrName };
