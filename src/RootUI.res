let s = React.string

@react.component
let make = (~children) => {
  <main className="bg-gray-50 p-8 antialiased h-screen w-screen">
    <div className="block md:flex items-end justify-between w-full mb-6">
      <h1 className="text-base mb-2 md:mb-0 md:text-2xl">
        {s("Convert HTML to ReScript JSX React Component")}
      </h1>
      <p className="mr-4">
        <a
          className="text-blue-900 text-sm md:text-base"
          href="https://github.com/protoship/html-to-rescript-jsx">
          {s("https://github.com/protoship/html-to-rescript-jsx")}
        </a>
      </p>
    </div>
    {children}
    <div className="border-t">
      <p className="mt-4 text-gray-500 text-sm">
        {s(
          "Please check the test cases and raise a GitHub issue if your input is not handled well.",
        )}
      </p>
      <p className="mt-2 pb-4">
        <a className="text-blue-900" href="/"> {s("home")} </a>
        {s(" | ")}
        <a className="text-blue-900" href="/test.html"> {s("test cases")} </a>
      </p>
    </div>
  </main>
}
