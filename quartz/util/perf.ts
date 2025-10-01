<<<<<<< HEAD
<<<<<<< HEAD
import pretty from "pretty-time"
import { styleText } from "util"
=======
import chalk from "chalk"
import pretty from "pretty-time"
>>>>>>> 02f2423 (Initial commit)
=======
import chalk from "chalk"
import pretty from "pretty-time"
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb

export class PerfTimer {
  evts: { [key: string]: [number, number] }

  constructor() {
    this.evts = {}
    this.addEvent("start")
  }

  addEvent(evtName: string) {
    this.evts[evtName] = process.hrtime()
  }

  timeSince(evtName?: string): string {
<<<<<<< HEAD
<<<<<<< HEAD
    return styleText("yellow", pretty(process.hrtime(this.evts[evtName ?? "start"])))
=======
    return chalk.yellow(pretty(process.hrtime(this.evts[evtName ?? "start"])))
>>>>>>> 02f2423 (Initial commit)
=======
    return chalk.yellow(pretty(process.hrtime(this.evts[evtName ?? "start"])))
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  }
}
