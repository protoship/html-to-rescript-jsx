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
  let msg = document.getElementById("btn-copyToClipboard").insertAdjacentHTML(
    "beforeend",
    "<p class='msg-copiedToClipboard ml-auto text-sm text-yellow-300'>Copied to clipboard...</p>"
  )
  setTimeout(() => {
    document.getElementsByClassName("msg-copiedToClipboard").item(0).remove()
  }, 500)
}