function copyElementToClipboard(id) {
  let node = document.getElementById(id);
  let range = document.createRange();
  range.selectNode(node);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  return true
}

export function copyOutputToClipboard() {
  copyElementToClipboard("outputReScript")
  let msg = document.body.firstElementChild.insertAdjacentHTML(
    "beforeend",
    "<p class='clipboard-msg'>Copied to clipboard...</p>"
  )
  setTimeout(() => {
    document.getElementsByClassName("clipboard-msg").item(0).remove()
  }, 500)
}