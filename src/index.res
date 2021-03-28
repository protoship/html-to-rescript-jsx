@module("./converter") external convert: unit => unit = "run"
@module("./clipboard") external copyOutputToClipboard: unit => unit = "copyOutputToClipboard"

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
