import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app/index'
import 'photon/dist/css/photon.css'
import './global.css'

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
