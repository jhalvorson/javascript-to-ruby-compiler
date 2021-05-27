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
import { arrays, functions, classes } from "./snippets";

const Examples = () => (
  <div style={{ marginTop: 90 }}>
    <p style={{ textAlign: "center", marginBottom: 20 }}>
      Click to open each set of examples
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
    </Accordion>
  </div>
);

export default Examples;
