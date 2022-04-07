%%raw(`
import "./index.css"
`)

type debouncedFn = unit => unit
@module external debounce: ('a => unit, int) => debouncedFn = "lodash.debounce"

@module("./converter") external convertWithIntroOutro: string => string = "convertWithIntroOutro"
@module("./clipboard") external copyOutputToClipboard: unit => unit = "copyOutputToClipboard"
@module("lz-string")
external compressToEncodedURIComponent: string => string = "compressToEncodedURIComponent"

@val external document: {..} = "document"

@scope("window") @val
external windowOpen: string => unit = "open"

let convert = () => {
  let inputDom = document["getElementById"](. "inputHtml")
  let inputText = inputDom["value"]
  let convertedText = convertWithIntroOutro(inputText)
  document["getElementById"](. "outputReScript")["innerText"] = convertedText
}

let updateConversionResult = debounce(convert, 150)

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
let playIcon =
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
      clipRule="evenodd"
    />
  </svg>

module App = {
  @react.component
  let make = () => {
    React.useEffect(() => {
      convert()->ignore
      None
    })

    let editorStyle = ReactDOM.Style.make(~height="calc(100vh - 250px)", ())

    <RootUI>
      <div>
        <div className="mt-4 md:grid grid-cols-2">
          <div className="mr-4">
            <p className="block mb-2 text-gray-600 text-sm"> {s("Paste your HTML below")} </p>
            <textarea
              style={editorStyle}
              className="block w-full bg-white p-4 font-mono text-xs border border-blue-200 overflow-scroll"
              onFocus={evt => ReactEvent.Synthetic.currentTarget(evt)["select"](.)}
              id="inputHtml"
              onChange={_ => updateConversionResult()}
              defaultValue={SampleTemplate.template}
            />
          </div>
          <div className="text-white bg-gray-900">
            <div className="mt-2 md:mt-0 md:grid grid-cols-2">
              <button
                id="btn-copyToClipboard"
                className="col-span-1 flex items-center w-full text-gray-100 bg-blue-800 text-sm p-1 md:text-base md:p-2 hover:bg-indigo-900 hover:text-white"
                onClick={_ => copyOutputToClipboard()}>
                <div className="w-6 h-6 ml-2 mr-2"> {clipboardIcon} </div>
                <p> {s("Copy to clipboard")} </p>
              </button>
              <button
                className="col-span-1 flex items-center w-full text-gray-100 bg-indigo-800 text-sm p-1 md:text-base md:p-2 hover:bg-blue-900 hover:text-white"
                onClick={_ => {
                  windowOpen(
                    "https://rescript-lang.org/try?code=" ++
                    compressToEncodedURIComponent(
                      document["getElementById"](. "outputReScript")["innerText"],
                    ),
                  )
                }}>
                <div className="w-6 h-6 ml-2 mr-2"> {playIcon} </div>
                <p> {s("Open in ReScript playground")} </p>
              </button>
            </div>
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
