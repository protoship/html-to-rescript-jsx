@module("./converter") external convert: string => string = "convertWithIntroOutro"
@module("./clipboard") external copyOutputToClipboard: unit => unit = "copyOutputToClipboard"

@val external document: {..} = "document"

let convert = () => {
  let inputDom = document["getElementById"]("inputHtml")
  let inputText = inputDom["value"]
  let convertedText = convert(inputText)

  document["getElementById"]("outputReScript")["innerText"] = convertedText
}

module App = {
  @react.component
  let make = () => {
    React.useEffect(() => {
      convert()->ignore
      None
    })

    <div>
      <div className="flex">
        <div>
          <textarea
            onFocus={event => ReactEvent.Synthetic.currentTarget(event)["select"]()}
            id="inputHtml"
            defaultValue={SampleData.initialData}
          />
          <button className="convert" onClick={_ => convert()}>
            {React.string("1. Convert HTML to ReScript JSX component")}
          </button>
        </div>
        <div>
          <p id="outputReScript" />
          <button className="copyToClipboard" onClick={_ => copyOutputToClipboard()}>
            {React.string("2. Copy to clipboard")}
          </button>
        </div>
      </div>
    </div>
  }
}

switch ReactDOM.querySelector("#root") {
| Some(root) => ReactDOM.render(<App />, root)
| None => Js.log("Error: could not find react element")
}
