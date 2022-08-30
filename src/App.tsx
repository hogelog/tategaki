import * as React from 'react';
import * as _ from 'lodash';

const CHARS = 20;
const LINES = 20;

const KINSOKU_START_NG = [
  '、', '。',
  '，', '．',
  '）', '」', '｝',
  '・', 'ー', '―', '−',
  '！', '？',
  '々',
  'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ',
  'ァ', 'ィ', 'ゥ', 'ェ', 'ォ',
  'っ', 'ゃ', 'ゅ', 'ょ',
  'ッ', 'ャ', 'ュ', 'ョ',
]
const KINSOKU_END_NG = [
  '（', '「', '｛',
]
function kumihan(text: string) {
  let characters = text.split('')
  let line = []
  let lines = [line]
  for (let i=0; i<characters.length; ++i) {
    let ch = characters[i]
    if (ch == '\n') {
        lines.push(line = [])
    } else if (line.length == 0) {
      if (KINSOKU_START_NG.includes(ch) && lines.length > 1) {
        lines[lines.length - 2].push(ch)
      } else {
        line.push(ch)
      }
    } else if (line.length < CHARS - 1) {
      line.push(ch)
    } else if (line.length == CHARS - 1) {
      if (KINSOKU_END_NG.includes(ch)) {
        lines.push(line = [])
        line.push(ch)
      } else {
        line.push(ch)
        lines.push(line = [])
      }
    }
  }
  return _.chunk(lines, LINES)
}

export function App() {
  const [text, setText] = React.useState('')

  let pages = kumihan(text)

  return (
    <div className='app'>
      <div className='control-menu'>
        <textarea className='w-full rounded border-2 m-2' onChange={(event) => {
          let value = event.target.value
          document.title = value.split('\n')[0]
          setText(value)
        }}>{text}</textarea>
        <p>Confirmed only Google Chrome 104 on macOS 12.5.1.</p>
      </div>
      <div className='papers'>
        { pages.map((page, index: number) => {
          return <div key={index} className='w-full m-4 paper'>
            <div className='text'>
              { page.map((line, index: number) => {
                return <div key={index} className='line'>
                  { line.map((ch, index: number) => {
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
