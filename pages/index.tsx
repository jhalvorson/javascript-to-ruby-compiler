import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import "prismjs/components/prism-ruby";
import { useState } from "react";
import compiler from "../compiler/src/compiler";

export default function Home() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [ruby, setRuby] = useState(`def method | a, b | \n a + b \nend`);

  const handleCompilation = () => {
    const rubyCode = compiler(code);
    setRuby(rubyCode);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) =>
            highlight(code, languages.javascript, "javascript")
          }
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
            flex: 1,
          }}
        />
        <Editor
          value={ruby}
          onValueChange={console.log}
          highlight={(code) => highlight(code, languages.ruby, "ruby")}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
            flex: 1,
          }}
        />
      </div>
      <button onClick={() => handleCompilation()}>Compile!</button>
    </div>
  );
}
