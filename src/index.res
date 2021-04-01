%%raw(`
import "./index.css"
`)

@module("./converter") external convert: string => string = "convertWithIntroOutro"
@module("./clipboard") external copyOutputToClipboard: unit => unit = "copyOutputToClipboard"

@val external document: {..} = "document"

let convert = () => {
  let inputDom = document["getElementById"]("inputHtml")
  let inputText = inputDom["value"]
  let convertedText = convert(inputText)

  document["getElementById"]("outputReScript")["innerText"] = convertedText
}

let s = React.string

/* https://heroicons.com/ */
let clipboardIcon =
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
    />
  </svg>

module App = {
  @react.component
  let make = () => {
    React.useEffect(() => {
      convert()->ignore
      None
    })

    let editorStyle = ReactDOM.Style.make(~height="calc(100vh - 300px)", ())

    <RootUI>
      <div>
        <div className="mt-4 grid grid-cols-2">
          <div className="w-full ">
            <div className="flex justify-between">
              <p className="block mb-2 text-gray-600 text-sm" onClick={_ => convert()}>
                {s("Paste your HTML below")}
              </p>
            </div>
            <textarea
              style={editorStyle}
              className="block w-10/12 bg-white p-4 font-mono text-xs border border-blue-200 overflow-scroll"
              onFocus={event => ReactEvent.Synthetic.currentTarget(event)["select"]()}
              id="inputHtml"
              defaultValue={SampleData.initialData}
            />
          </div>
          <div className="text-white bg-gray-900 ">
            <button
              className="flex items-center justify-center w-full text-gray-100 bg-blue-800 text-lg p-4 hover:bg-gray-600 hover:text-blue-50"
              onClick={_ => copyOutputToClipboard()}>
              <div className="w-8 h-8 mr-4"> {clipboardIcon} </div>
              <p> {s("Click here to copy the converted code to clipboard")} </p>
            </button>
            <p
              className="p-6 text-xs font-mono whitespace-pre overflow-scroll"
              style={editorStyle}
              id="outputReScript"
            />
          </div>
        </div>
      </div>
    </RootUI>
  }
}

switch ReactDOM.querySelector("#root") {
| Some(root) => ReactDOM.render(<App />, root)
| None => Js.log("Error: could not find react element")
}
