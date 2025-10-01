import { isCancel, outro } from "@clack/prompts"
<<<<<<< HEAD
<<<<<<< HEAD
import { styleText } from "util"
=======
import chalk from "chalk"
>>>>>>> 02f2423 (Initial commit)
=======
import chalk from "chalk"
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
import { contentCacheFolder } from "./constants.js"
import { spawnSync } from "child_process"
import fs from "fs"

export function escapePath(fp) {
  return fp
    .replace(/\\ /g, " ") // unescape spaces
    .replace(/^".*"$/, "$1")
    .replace(/^'.*"$/, "$1")
    .trim()
}

export function exitIfCancel(val) {
  if (isCancel(val)) {
<<<<<<< HEAD
<<<<<<< HEAD
    outro(styleText("red", "Exiting"))
=======
    outro(chalk.red("Exiting"))
>>>>>>> 02f2423 (Initial commit)
=======
    outro(chalk.red("Exiting"))
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
    process.exit(0)
  } else {
    return val
  }
}

export async function stashContentFolder(contentFolder) {
  await fs.promises.rm(contentCacheFolder, { force: true, recursive: true })
  await fs.promises.cp(contentFolder, contentCacheFolder, {
    force: true,
    recursive: true,
    verbatimSymlinks: true,
    preserveTimestamps: true,
  })
  await fs.promises.rm(contentFolder, { force: true, recursive: true })
}

export function gitPull(origin, branch) {
  const flags = ["--no-rebase", "--autostash", "-s", "recursive", "-X", "ours", "--no-edit"]
  const out = spawnSync("git", ["pull", ...flags, origin, branch], { stdio: "inherit" })
  if (out.stderr) {
<<<<<<< HEAD
<<<<<<< HEAD
    throw new Error(styleText("red", `Error while pulling updates: ${out.stderr}`))
  } else if (out.status !== 0) {
    throw new Error(styleText("red", "Error while pulling updates"))
=======
    throw new Error(chalk.red(`Error while pulling updates: ${out.stderr}`))
  } else if (out.status !== 0) {
    throw new Error(chalk.red("Error while pulling updates"))
>>>>>>> 02f2423 (Initial commit)
=======
    throw new Error(chalk.red(`Error while pulling updates: ${out.stderr}`))
  } else if (out.status !== 0) {
    throw new Error(chalk.red("Error while pulling updates"))
>>>>>>> 18d4681c3fa99dd2d68f2b95767544223dcd8dfb
  }
}

export async function popContentFolder(contentFolder) {
  await fs.promises.rm(contentFolder, { force: true, recursive: true })
  await fs.promises.cp(contentCacheFolder, contentFolder, {
    force: true,
    recursive: true,
    verbatimSymlinks: true,
    preserveTimestamps: true,
  })
  await fs.promises.rm(contentCacheFolder, { force: true, recursive: true })
}
