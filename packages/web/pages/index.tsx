import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-ruby";
import { useState } from "react";
import Examples from "../components/examples/examples";
// import compiler from "../compiler/src/compiler";

export default function Home() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [ruby, setRuby] = useState(`def add | a, b | \n a + b \nend`);
  const [error, setError] = useState(false);
  const [apiState, setApiState] = useState<'completed' | 'pending'>('completed')

  const apiComplete = () => setApiState('completed')

  const handleCompilation = async () => {
    setApiState('pending')
    const url = process.env.NODE_ENV === 'development' ? '/api/compile' : `${process.env.NEXT_PUBLIC_URL}/api/compile`
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        code,
      }),
    })
      .then((res) => {
        setError(false);

        if (res.ok) {
          apiComplete();
          return res.json();
        }

        apiComplete();
        setError(true);
        setRuby(`# an error occured. sad times.`);
      })
      .then((res) => {
        setRuby(res.code);
      })
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
          A simplistic and naive compiler to convert basic JavaScript to Ruby.
          Built on top of Babel.
        </p>
        <p style={{ marginBottom: 15 }}>
          Far from perfect. No where near complete. Kinda fun.
        </p>
      </div>

      {error && (
        <div role="alert" className="error">
          <p>
            Failed to compile the provided JavaScript. It's likely that what
            you've attempted is not yet supported.
          </p>
        </div>
      )}

      <div className="flex">
        <div className="flex-1">
          <p className="mono text-sm flex-1 mb-sm">JavaScript</p>
          <Editor
            value={code}
            onValueChange={(code) => {
              if (error) {
                setError(false);
              }

              setCode(code);
            }}
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
        <button
          className={["button", error ? "error" : ""].join(" ")}
          onClick={() => handleCompilation()}
        >
          {apiState === 'completed' ? 'Compile' : 'Compiling...'}
        </button>
      </div>

      <Examples />

      <br />
      <br />
      <br />
      <br />
      <br />
      <h3>But, why?</h3>
      <br />
      <p>
        I built this when I first trying to learn both Ruby and Compilers. I had
        spent years as a JavaScript developer and I wanted to learn about all of
        the differences and similarities between the languages. I hope that this
        can serve as a semi-helpful resource for those going from JS to Ruby.
      </p>

      <br />
      <br />
      <br />
      <br />
      <br />
      <p className="mono text-sm">
        by <a href="https://twitter.com/jamiehalvorson">Jamie Halvorson</a>
      </p>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
