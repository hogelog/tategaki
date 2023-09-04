import * as React from 'react';
import * as lodash from 'lodash';
import process from 'process';

const CHARS = 20;
const LINES = 20;

const DEFAULT_TEXT = process.env.NODE_ENV === 'production' ? '' : '　メロスは激怒した。必ず、かの邪智暴虐じゃちぼうぎゃくの王を除かなければならぬと決意した。メロスには政治がわからぬ。メロスは、村の牧人である。笛を吹き、羊と遊んで暮して来た。けれども邪悪に対しては、人一倍に敏感であった。きょう未明メロスは村を出発し、野を越え山越え、十里はなれた此このシラクスの市にやって来た。メロスには父も、母も無い。女房も無い。十六の、内気な妹と二人暮しだ。この妹は、村の或る律気な一牧人を、近々、花婿はなむことして迎える事になっていた。結婚式も間近かなのである。メロスは、それゆえ、花嫁の衣裳やら祝宴の御馳走やらを買いに、はるばる市にやって来たのだ。先ず、その品々を買い集め、それから都の大路をぶらぶら歩いた。メロスには竹馬の友があった。セリヌンティウスである。今は此のシラクスの市で、石工をしている。その友を、これから訪ねてみるつもりなのだ。久しく逢わなかったのだから、訪ねて行くのが楽しみである。歩いているうちにメロスは、まちの様子を怪しく思った。ひっそりしている。もう既に日も落ちて、まちの暗いのは当りまえだが、けれども、なんだか、夜のせいばかりでは無く、市全体が、やけに寂しい。のんきなメロスも、だんだん不安になって来た。路で逢った若い衆をつかまえて、何かあったのか、二年まえに此の市に来たときは、夜でも皆が歌をうたって、まちは賑やかであった筈はずだが、と質問した。若い衆は、首を振って答えなかった。しばらく歩いて老爺ろうやに逢い、こんどはもっと、語勢を強くして質問した。老爺は答えなかった。メロスは両手で老爺のからだをゆすぶって質問を重ねた。老爺は、あたりをはばかる低声で、わずか答えた。'

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
  return lodash.chunk(lines, LINES)
}

export function App() {
  const [text, setText] = React.useState(DEFAULT_TEXT)

  let pages = kumihan(text)

  return (
    <div className='app'>
      <div className='control-menu'>
        <textarea defaultValue={ DEFAULT_TEXT } onChange={(event) => {
          let value = event.target.value
          document.title = value.split('\n')[0]
          setText(value)
        }} />
        <p className='m-1'>Confirmed only Google Chrome 104 on macOS 12.5.1.</p>
        <p className='m-1'><a href="https://github.com/hogelog/tategaki">Source: https://github.com/hogelog/tategaki</a></p>
      </div>
      <div className='papers'>
        { pages.map((page, index: number) => {
          return <div key={index} className='paper'>
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
