import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app/index'
import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import 'highlight.js/styles/github.css'

SyntaxHighlighter.registerLanguage('js', js)

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
