export type Phase = {
  label: string
  duration: number // seconds
}

/**
 * Parse a markdown-like workout into a flat list of phases.
 *
 * Supported syntax:
 *   ## Section Title
 *   ## Section Title (Repeat Nx)
 *   - Exercise Name: 30s
 *   - Rest: 15s
 *
 * Repeat sections are flattened with a (i/N) suffix appended to each label.
 */
export function parseMarkdownWorkout(mdText: string): Phase[] {
  const lines = mdText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l)

  type RepeatBlock = { repeat: number; block: Phase[] }
  const routine: (Phase | RepeatBlock)[] = []
  let currentBlock: Phase[] = []
  let repeatCount = 1
  let inRepeatBlock = false

  for (const line of lines) {
    // Section header, optionally with (Repeat Nx)
    const sectionHeader = line.match(/^##\s+(.*?)(?:\s+\(Repeat\s+(\d+)x\))?$/i)
    if (sectionHeader) {
      // Flush the previous block before starting a new section
      if (currentBlock.length > 0) {
        if (inRepeatBlock) {
          routine.push({ repeat: repeatCount, block: currentBlock })
        } else {
          routine.push(...currentBlock)
        }
        currentBlock = []
        repeatCount = 1
      }

      inRepeatBlock = !!sectionHeader[2]
      repeatCount = inRepeatBlock ? parseInt(sectionHeader[2]!, 10) : 1
      continue
    }

    // Exercise line: "- Label: 30s"
    const exerciseMatch = line.match(/^-?\s*(.+?):\s*(\d+)s$/i)
    if (exerciseMatch) {
      const label = exerciseMatch[1].trim()
      const duration = parseInt(exerciseMatch[2]!, 10)
      currentBlock.push({ label, duration })
    }
  }

  // Push last block
  if (currentBlock.length > 0) {
    if (inRepeatBlock) {
      routine.push({ repeat: repeatCount, block: currentBlock })
    } else {
      routine.push(...currentBlock)
    }
  }

  // Flatten repeat blocks
  const flattened: Phase[] = []
  for (const item of routine) {
    if ((item as RepeatBlock).repeat) {
      const { repeat, block } = item as RepeatBlock
      for (let i = 1; i <= repeat; i++) {
        for (const step of block) {
          flattened.push({
            ...step,
            label: `${step.label} (${i}/${repeat})`,
          })
        }
      }
    } else {
      flattened.push(item as Phase)
    }
  }

  return flattened
}
