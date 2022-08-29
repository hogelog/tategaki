import * as React from 'react';
import * as _ from 'lodash';

const CHARS = 20;
const LINES = 20;

export function App() {
  const [text, setText] = React.useState('')

  let lines = text.replace(/^\n+|\n+$/g, '').split('\n')
  let pages = _.chunk(lines, LINES)

  return (
    <div className='app'>
      <div className='control-menu'>
        <textarea className='w-full rounded border-2 m-2' onChange={(event) => {
          let value = event.target.value
          document.title = value.split('\n')[0]
          setText(value)
        }}>{text}</textarea>
      </div>
      <div className='papers'>
        { pages.map((page, index: number) => {
          return <div key={index} className='w-full m-4 paper'>
            <div className='text'>
              { [...Array(LINES)].map((_, index: number) => {
                let line = page[index] || ''
                return <div key={index} className='line'>
                  {line.split('').map((ch, index: number) => {
                    if (ch == '\n') {
                      return <br key={index} />
                    } else {
                      return <span key={index}>{ch}</span>
                    }
                  })}
                </div>
              })}
            </div>
            <div className='background'>
              { [...Array(LINES)].map((_, index: number) => 
                <div key={index} className='line'>
                  { [...Array(CHARS)].map((_, index: number) => <span key={index}>　</span>)}
                </div>
              ) }
            </div>
            <div className='footer'>（{CHARS}✕{LINES} {CHARS * LINES}字）</div>
          </div>
        })}
      </div>
    </div>
  )
}
