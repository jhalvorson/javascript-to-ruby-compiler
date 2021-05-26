import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import { useCallback, useState } from "react";
import compiler from "../compiler/src/compiler";

export default function Home() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [ruby, setRuby] = useState(``);

  const handleCompilation = useCallback(() => {
    const rubyCode = compiler(code);
    setRuby(rubyCode);
  }, [code]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, {}, "javascript")}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
        <Editor
          value={ruby}
          onValueChange={console.log}
          highlight={(code) => highlight(code, {}, "ruby")}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
      </div>
      <button onClick={() => handleCompilation()}>Compile!</button>
    </div>
  );
}
