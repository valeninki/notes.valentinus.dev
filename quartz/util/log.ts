<<<<<<< HEAD
import truncate from "ansi-truncate"
import readline from "readline"

export class QuartzLogger {
  verbose: boolean
  private spinnerInterval: NodeJS.Timeout | undefined
  private spinnerText: string = ""
  private updateSuffix: string = ""
  private spinnerIndex: number = 0
  private readonly spinnerChars = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]

  constructor(verbose: boolean) {
    const isInteractiveTerminal =
      process.stdout.isTTY && process.env.TERM !== "dumb" && !process.env.CI
    this.verbose = verbose || !isInteractiveTerminal
  }

  start(text: string) {
    this.spinnerText = text

    if (this.verbose) {
      console.log(text)
    } else {
      this.spinnerIndex = 0
      this.spinnerInterval = setInterval(() => {
        readline.clearLine(process.stdout, 0)
        readline.cursorTo(process.stdout, 0)

        const columns = process.stdout.columns || 80
        let output = `${this.spinnerChars[this.spinnerIndex]} ${this.spinnerText}`
        if (this.updateSuffix) {
          output += `: ${this.updateSuffix}`
        }

        const truncated = truncate(output, columns)
        process.stdout.write(truncated)
        this.spinnerIndex = (this.spinnerIndex + 1) % this.spinnerChars.length
      }, 50)
    }
  }

  updateText(text: string) {
    this.updateSuffix = text
  }

  end(text?: string) {
    if (!this.verbose && this.spinnerInterval) {
      clearInterval(this.spinnerInterval)
      this.spinnerInterval = undefined
      readline.clearLine(process.stdout, 0)
      readline.cursorTo(process.stdout, 0)
    }

=======
import { Spinner } from "cli-spinner"

export class QuartzLogger {
  verbose: boolean
  spinner: Spinner | undefined
  constructor(verbose: boolean) {
    this.verbose = verbose
  }

  start(text: string) {
    if (this.verbose) {
      console.log(text)
    } else {
      this.spinner = new Spinner(`%s ${text}`)
      this.spinner.setSpinnerString(18)
      this.spinner.start()
    }
  }

  end(text?: string) {
    if (!this.verbose) {
      this.spinner!.stop(true)
    }
>>>>>>> 02f2423 (Initial commit)
    if (text) {
      console.log(text)
    }
  }
}
