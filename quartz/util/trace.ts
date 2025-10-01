<<<<<<< HEAD
<<<<<<< HEAD
import { styleText } from "util"
=======
import chalk from "chalk"
>>>>>>> 02f2423 (Initial commit)
=======
import chalk from "chalk"
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
import process from "process"
import { isMainThread } from "workerpool"

const rootFile = /.*at file:/
export function trace(msg: string, err: Error) {
  let stack = err.stack ?? ""

  const lines: string[] = []

  lines.push("")
  lines.push(
    "\n" +
<<<<<<< HEAD
<<<<<<< HEAD
      styleText(["bgRed", "black", "bold"], " ERROR ") +
      "\n\n" +
      styleText("red", ` ${msg}`) +
=======
      chalk.bgRed.black.bold(" ERROR ") +
      "\n\n" +
      chalk.red(` ${msg}`) +
>>>>>>> 02f2423 (Initial commit)
=======
      chalk.bgRed.black.bold(" ERROR ") +
      "\n\n" +
      chalk.red(` ${msg}`) +
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
      (err.message.length > 0 ? `: ${err.message}` : ""),
  )

  let reachedEndOfLegibleTrace = false
  for (const line of stack.split("\n").slice(1)) {
    if (reachedEndOfLegibleTrace) {
      break
    }

    if (!line.includes("node_modules")) {
      lines.push(` ${line}`)
      if (rootFile.test(line)) {
        reachedEndOfLegibleTrace = true
      }
    }
  }

  const traceMsg = lines.join("\n")
  if (!isMainThread) {
    // gather lines and throw
    throw new Error(traceMsg)
  } else {
    // print and exit
    console.error(traceMsg)
    process.exit(1)
  }
}
