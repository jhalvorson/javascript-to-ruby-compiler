import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-ruby";
import { useState } from "react";
// import compiler from "../compiler/src/compiler";

export default function Home() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [ruby, setRuby] = useState(`def method | a, b | \n a + b \nend`);

  const handleCompilation = async () => {
    // const rubyCode = compiler(code);

    await fetch("http://127.0.0.1:3000/api/compile", {
      method: "POST",
      body: JSON.stringify({
        code,
      }),
    })
      .then((res) => res.json())
      .then((res) => setRuby(res.code))
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: "0 auto" }}>
      <div
        style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 40px" }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: 32,
            fontWeight: 600,
            marginBottom: 30,
          }}
        >
          JavaScript to Ruby
        </h1>
        <p style={{ marginBottom: 15 }}>
          A simplistic and niave compiler to convert basic JavaScript to Ruby.
          Built on top of Babel.
        </p>
        <p>By Jamie Halvorson</p>
      </div>
      <div
        style={{
          backgroundColor: "rgb(27,31,34)",
          borderRadius: 14,
        }}
      >
        <div style={{ display: "flex" }}>
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              highlight(code, languages.javascript, "javascript")
            }
            padding={15}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              flex: 1,
              minHeight: 300,
              borderRight: "3px solid #24292d",
              color: "#fff",
            }}
          />
          <Editor
            value={ruby}
            onValueChange={(code) => setRuby(code)}
            highlight={(code) => highlight(code, languages.ruby, "ruby")}
            padding={15}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              flex: 1,
              minHeight: 300,
              color: "#fff",
            }}
          />
        </div>
      </div>
      <div style={{ paddingTop: 20, textAlign: "center" }}>
        <button onClick={() => handleCompilation()}>Compile!</button>
      </div>
    </div>
  );
}
