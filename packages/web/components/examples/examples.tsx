import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";
import "@reach/accordion/styles.css";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import Editor from "react-simple-code-editor";
import {
  arrays,
  functions,
  classes,
  ifStatements,
  logicalOperators,
  iterators,
  strings,
  switchStatement,
} from "./snippets";

const Examples = () => (
  <div style={{ marginTop: 90 }}>
    <p style={{ textAlign: "center", marginBottom: 20 }}>
      Click to open each set of examples that you can copy-paste into the JS
      editor
    </p>
    <Accordion>
      <AccordionItem>
        <h3>
          <AccordionButton>Functions</AccordionButton>
        </h3>
        <AccordionPanel>
          <p>
            We support basic function declaration, both with the function
            keyword and fat arrows.
          </p>
          <Editor
            value={functions}
            onValueChange={console.log}
            highlight={(code) =>
              highlight(code, languages.javascript, "javascript")
            }
            padding={15}
            className="editor editor-first editor-example"
          />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h3>
          <AccordionButton>Arrays</AccordionButton>
        </h3>
        <AccordionPanel>
          <Editor
            value={arrays}
            onValueChange={console.log}
            highlight={(code) =>
              highlight(code, languages.javascript, "javascript")
            }
            padding={15}
            className="editor editor-first editor-example"
          />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h3>
          <AccordionButton>Classes</AccordionButton>
        </h3>
        <AccordionPanel>
          <Editor
            value={classes}
            onValueChange={console.log}
            highlight={(code) =>
              highlight(code, languages.javascript, "javascript")
            }
            padding={15}
            className="editor editor-first editor-example"
          />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h3>
          <AccordionButton>If statements</AccordionButton>
        </h3>
        <AccordionPanel>
          <Editor
            value={ifStatements}
            onValueChange={console.log}
            highlight={(code) =>
              highlight(code, languages.javascript, "javascript")
            }
            padding={15}
            className="editor editor-first editor-example"
          />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h3>
          <AccordionButton>Logical operators</AccordionButton>
        </h3>
        <AccordionPanel>
          <Editor
            value={logicalOperators}
            onValueChange={console.log}
            highlight={(code) =>
              highlight(code, languages.javascript, "javascript")
            }
            padding={15}
            className="editor editor-first editor-example"
          />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h3>
          <AccordionButton>Loops</AccordionButton>
        </h3>
        <AccordionPanel>
          <Editor
            value={iterators}
            onValueChange={console.log}
            highlight={(code) =>
              highlight(code, languages.javascript, "javascript")
            }
            padding={15}
            className="editor editor-first editor-example"
          />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h3>
          <AccordionButton>Strings</AccordionButton>
        </h3>
        <AccordionPanel>
          <Editor
            value={strings}
            onValueChange={console.log}
            highlight={(code) =>
              highlight(code, languages.javascript, "javascript")
            }
            padding={15}
            className="editor editor-first editor-example"
          />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h3>
          <AccordionButton>Switch statement</AccordionButton>
        </h3>
        <AccordionPanel>
          <Editor
            value={switchStatement}
            onValueChange={console.log}
            highlight={(code) =>
              highlight(code, languages.javascript, "javascript")
            }
            padding={15}
            className="editor editor-first editor-example"
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </div>
);

export default Examples;
