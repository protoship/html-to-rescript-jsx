@module("./renderer") external renderer: Js.Nullable.t<string> => unit = "run"

module App = {
  @react.component
  let make = () => {
    <main>
      <div> {React.string("HTML-to-ReScript-JSX")} </div>
      <div className="flex">
        <div>
          <textarea
            id="input"
            defaultValue={SampleData.initialData}
            style={ReactDOMStyle.make(
              ~marginTop="40px",
              ~width="400px",
              ~height="400px",
              ~fontFamily="monospace",
              (),
            )}
          />
          <button onClick={_ => renderer(Js.Nullable.null)}> {React.string("Convert")} </button>
        </div>
        <div> <p id="output" /> </div>
      </div>
    </main>
  }
}

switch ReactDOM.querySelector("#root") {
| Some(root) => ReactDOM.render(<App />, root)
| None => Js.log("Error: could not find react element")
}

/* Render the transformed sample data without having to click on the Convert
 buttn. This is to make it easy to test during development */
Js.Global.setTimeout(() => renderer(Js.Nullable.return(SampleData.initialData)), 200)->ignore
