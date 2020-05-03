import scraper from './scraper'

const init = async () => {
  const start = new Date()
  await scraper()
  const end = new Date()
  console.info('Execution time: %dms', end - start)
  process.exit()
}

init()