// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import compiler from "../../compiler/src/compiler"

export default (req, res) => {
  if (req.method === 'POST') {
    try {
      const body = JSON.parse(req.body)
      const compile = compiler(body.code);

      res.status(200).json({ code: compile })
    } catch (err) {
      res.status(500).json({ message: 'Failed to compile' })
    }
    // Process a POST request
  } else {
    // Handle any other HTTP method
    res.status(500).json({ message: 'Not implemented'})
  }
}
