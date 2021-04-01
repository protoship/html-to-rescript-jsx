%%raw(`
import "./index.css"
`)
@module("./converter") external convertPlain: string => array<string> = "convertPlain"
let s = React.string
let testCases = [
  [
    "Simple inline CSS style",
    `<p style="background-color: red; font-size: 20px; font-family: 'Times New Roman, Georgia, sans-serif'">Hello</p>`,
    `<p style=ReactDOM.Style.make(~backgroundColor="red", ~fontSize="20px", ~fontFamily="'Times New Roman, Georgia, sans-serif'", ())>{s("Hello")}</p>`,
  ],
  [
    "Inline CSS with base64 background image data",
    `<div style='background:url(data:image/png;base64,iVBORw0KGgoAAAA) repeat-x center;'>Hello</div>`,
    `<div style=ReactDOM.Style.make(~background="url(data:image/png;base64,iVBORw0KGgoAAAA) repeat-x center", ())>{s("Hello")}</div>`,
  ],
  ["P tag with text", `<p>Hello World!</p>`, `<p>{s("Hello World!")}</p>`],
  [
    "Nested HTML",
    `<main><div><p><span>Hello</span></p></div></main>`,
    `<main><div><p><span>{s("Hello")}</span></p></div></main>`,
  ],
  [
    "Classnames with colon",
    `<button class="bg-gray-800 hover:text-white focus:outline-none"><span class="sr-only">Hello</span><button>`,
    `<button className="bg-gray-800 hover:text-white focus:outline-none"><span className="sr-only">{s("Hello")}</span></button>`,
  ],
  ["Void tags", `<br>`, `<br />`],
  [
    "Ignore unsupported attributes",
    `<p aria-label="intro" aria-haspopup="true">Hello</p>`,
    `<p ariaLabel="intro">{s("Hello")}</p>`,
  ],
  [
    "Use DOM cased attribute names",
    `<p contenteditable="true">Hello</p>`,
    `<p contentEditable={true}>{s("Hello")}</p>`,
  ],
  [
    "HTML comments",
    `<p><!-- This is a comment !-->Hello</p>`,
    `<p>/* This is a comment ! */{s("Hello")}</p>`,
  ],
  [
    "Multi-line HTML comments",
    `<!--
  Dropdown menu, show/hide based on menu state.

  Entering: "transition ease-out duration-100"
    From: "transform opacity-0 scale-95"
    To: "transform opacity-100 scale-100"
-->`,
    `/* Dropdown menu, show/hide based on menu state.

  Entering: "transition ease-out duration-100"
    From: "transform opacity-0 scale-95"
    To: "transform opacity-100 scale-100" */`,
  ],
  [
    "ReScript reserved keywords",
    `<input type="text" name="hello" for="hello" />`,
    `<input type_="text" name="hello" htmlFor="hello" />`,
  ],
  [
    "SVG",
    `<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 0H9" /></svg>`,
    `<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" ariaHidden={true}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 0H9"></path></svg>`,
  ],
  [
    "IMG with src url",
    `<img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">`,
    `<img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />`,
  ],
]

type results = {
  mutable total: int,
  mutable passed: int,
  mutable failed: int,
  mutable cases: array<React.element>,
}

let testResults = () => {
  let results = {
    total: 0,
    passed: 0,
    failed: 0,
    cases: [],
  }
  let cases = testCases->Js.Array2.mapi((case, index) => {
    results.total = results.total + 1

    let caseName = case[0]
    let inputText = case[1]
    let expectedOutput = case[2]

    let outputText = convertPlain(inputText)

    /* Normalize the output by removing indentation and newlines.
     This is allows us to write one-line test cases */
    let outputText = outputText->Js.Array2.map(Js.String2.trim)->Js.Array2.joinWith("")

    let isTestPassing = expectedOutput == outputText
    if isTestPassing {
      results.passed = results.passed + 1
    } else {
      results.failed = results.failed + 1
    }

    let className = isTestPassing ? "bg-green-200" : "bg-red-300"
    <div className={"mb-4 border p-4 overflow-auto " ++ className}>
      <p className="mb-2">
        {s("# " ++ (index + 1)->string_of_int ++ ". ")} <strong> {s(caseName)} </strong>
      </p>
      <div className="grid grid-cols-12">
        <p className="col-span-1 text-sm text-gray-600"> {s("input")} </p>
        <pre className="col-span-11"> {s(inputText)} </pre>
        <p className="col-span-1 text-sm text-gray-600"> {s("expected output")} </p>
        <pre className="col-span-11"> {s(expectedOutput)} </pre>
        {isTestPassing
          ? React.null
          : <>
              <p className="col-span-1 text-sm text-gray-600"> {s("output")} </p>
              <pre className="col-span-11"> {s(outputText)} </pre>
            </>}
      </div>
    </div>
  })

  results.cases = cases
  results
}

module App = {
  @react.component
  let make = () => {
    let (results, setResult) = React.useState(() => testResults())
    let runTests = () => setResult(_ => testResults())
    React.useEffect0(() => {
      runTests()
      None
    })
    <RootUI>
      <h2 className="text-2xl mb-4"> {s("Test cases")} </h2>
      <h3
        className={"text-lg mb-6 p-4 inline-block " ++ (
          results.failed > 0 ? "bg-red-300" : "bg-green-300 text-gray-600"
        )}>
        {s(
          `${results.total->string_of_int} total. ${results.passed->string_of_int} passed. ${results.failed->string_of_int} failed.`,
        )}
      </h3>
      <button className="block mb-6 p-2 bg-gray-300" onClick={_e => runTests()}>
        {s("Run tests again")}
      </button>
      {results.cases->React.array}
    </RootUI>
  }
}

switch ReactDOM.querySelector("#root") {
| Some(root) => ReactDOM.render(<App />, root)
| None => Js.log("Error: could not find react element")
}
