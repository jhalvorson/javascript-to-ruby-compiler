import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-ruby";
import { useState } from "react";
// import compiler from "../compiler/src/compiler";

export default function Home() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [ruby, setRuby] = useState(`def add | a, b | \n a + b \nend`);

  const handleCompilation = async () => {
    // const rubyCode = compiler(code);

    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/compile`, {
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
    <div className="container">
      <div className="hero">
        <h1
          style={{
            color: "#fff",
            fontSize: 32,
            fontWeight: 600,
            marginBottom: 30,
          }}
        >
          JavaScript to Ruby Compiler
        </h1>
        <p style={{ marginBottom: 15 }}>
          A simplistic and niave compiler to convert basic JavaScript to Ruby.
          Built on top of Babel.
        </p>
      </div>
      <div className="flex">
        <div className="flex-1">
          <p className="mono text-sm flex-1 mb-sm">JavaScript</p>
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              highlight(code, languages.javascript, "javascript")
            }
            padding={15}
            className="editor editor-first"
          />
        </div>
        <div className="flex-1">
          <p className="mono text-sm flex-1 mb-sm">Ruby</p>
          <Editor
            value={ruby}
            onValueChange={(code) => setRuby(code)}
            highlight={(code) => highlight(code, languages.ruby, "ruby")}
            padding={15}
            className="editor"
          />
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <button className="button" onClick={() => handleCompilation()}>
          Compile
        </button>
      </div>

      <p style={{ marginTop: 80 }}>Supported methods</p>
      <ul>
        <li>Functions</li>
        <li>Classes</li>
        <li>Arrays</li>
        <li>Objects</li>
        <li>Array.map</li>
      </ul>

      <br />
      <p>Why?</p>
      <p>
        I built this when I first trying to learn both Ruby and Compilers. I had
        spent years as a JavaScript developer and I wanted to learn about all of
        the differences and similarities between the languages. I hope that this
        can serve as a semi-helpful resource for those going from JS to Ruby.
      </p>
    </div>
  );
}
