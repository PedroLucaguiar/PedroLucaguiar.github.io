import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const desktop = 'C:/Users/aguia/OneDrive/Desktop'

const jobs = [
  {
    input: 'AppColab1.jpg',
    output: 'public/projects/nxos-mobile/appcolab-report-measurables.webp',
    width: 520,
  },
  {
    input: 'AppColab2.jpg',
    output: 'public/projects/nxos-mobile/appcolab-report-selected.webp',
    width: 520,
  },
  {
    input: 'AppColab3.jpg',
    output: 'public/projects/nxos-mobile/appcolab-home.webp',
    width: 520,
  },
  {
    input: 'FieldOps.jpg',
    output: 'public/projects/fieldops/1.webp',
    width: 1280,
    blur: [
      [70, 345, 330, 55],
      [102, 650, 260, 150],
      [1095, 510, 215, 75],
    ],
  },
  {
    input: 'FieldOps2.jpg.png',
    output: 'public/projects/fieldops/2.webp',
    width: 1280,
  },
  {
    input: 'FieldOps3.jpg.png',
    output: 'public/projects/fieldops/3.webp',
    width: 1280,
    blur: [
      [45, 845, 105, 35],
    ],
  },
  {
    input: 'mEDIÇÃO1.png',
    output: 'public/projects/medicao/1.webp',
    width: 1280,
    blur: [
      [95, 252, 135, 110],
      [1670, 225, 180, 45],
    ],
  },
  {
    input: 'mEDIÇÃO2.png',
    output: 'public/projects/medicao/2.webp',
    width: 1280,
    blur: [
      [85, 207, 230, 35],
      [360, 210, 170, 45],
      [1655, 570, 120, 95],
    ],
  },
]

async function blurRegions(image, regions) {
  if (!regions?.length) return image

  const composites = []

  for (const [left, top, width, height] of regions) {
    const buffer = await image
      .clone()
      .extract({ left, top, width, height })
      .blur(18)
      .toBuffer()

    composites.push({ input: buffer, left, top })
  }

  return image.composite(composites)
}

for (const job of jobs) {
  const input = path.join(desktop, job.input)
  const output = path.join(root, job.output)
  let image = sharp(input).rotate()

  image = await blurRegions(image, job.blur)

  await image
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(output)

  console.log(`${job.input} -> ${job.output}`)
}
