export default (markup, helmet, state) => {
  return `<!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1">
      	${helmet.title.toString()}
	      ${helmet.meta.toString()}
	      ${helmet.link.toString()}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
	      <div id="root">${markup}</div>
        <script>window.__PRELOADED_STATE__=${JSON.stringify(state)}</script>
        <script src="/main.js"></script>
       </body>
    </html>`
}