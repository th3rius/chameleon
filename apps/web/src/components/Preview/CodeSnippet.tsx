export interface CodeSnippetProps {
  colors: Record<string, string>;
}

export default function CodeSnippet({colors}: CodeSnippetProps) {
  return (
    <div className="container">
      <pre className="code-snippet">
        <code className="code">
          <div>
            <span className="vimLineComment">
              {'" Returns true if the color hex value is light'}
            </span>
          </div>
          <div>
            <span className="vimCommand">function</span>
            <span className="vimFunction">! IsHexColorLight</span>
            <span className="vimParenSep">(</span>
            <span className="vimOperParen">color</span>
            <span className="vimParenSep">)</span>
            <span className="vimFuncBody"> </span>
            <span className="vimIsCommand">abort</span>
          </div>
          <div>
            <span className="vimLet">{"  "}let</span>
            <span className="vimFuncBody"> </span>
            <span className="vimVar">l:raw_color</span>
            <span className="vimFuncBody"> </span>
            <span className="vimOper">=</span>
            <span className="vimFuncBody"> </span>
            <span className="vimFuncName">trim</span>
            <span className="vimParenSep">(</span>
            <span className="vimFuncVar">a:color</span>
            <span className="vimOperParen">, </span>
            <span className="vimString">{"'#'"}</span>
            <span className="vimParenSep">)</span>
          </div>
          <br />
          <div>
            <span className="vimLet">{"  "}let</span>
            <span className="vimFuncBody"> </span>
            <span className="vimVar">l:red</span>
            <span className="vimFuncBody"> </span>
            <span className="vimOper">=</span>
            <span className="vimFuncBody"> </span>
            <span className="vimFuncName">str2nr</span>
            <span className="vimParenSep">(</span>
            <span className="vimSubst">substitute</span>
            <span className="vimParenSep">(</span>
            <span className="vimOperParen">l:raw_color, </span>
            <span className="vimString">{"'.{0}(.{2})'"}</span>
            <span className="vimOperParen">, </span>
            <span className="vimString">{"'1'"}</span>
            <span className="vimOperParen">, </span>
            <span className="vimString">{"'g'"}</span>
            <span className="vimParenSep">)</span>
            <span className="vimFuncBody">, </span>
            <span className="vimNumber">16</span>
            <span className="vimParenSep">)</span>
          </div>
          <div className="CursorLineBg">
            <span className="vimLet CursorLineBg">{"  "}let</span>
            <span className="vimFuncBody CursorLineBg"> </span>
            <span className="vimVar CursorLineBg">l:green</span>
            <span className="vimFuncBody CursorLineBg"> </span>
            <span className="vimOper CursorLineBg">=</span>
            <span className="vimFuncBody CursorLineBg"> </span>
            <span className="vimFuncName CursorLineBg">str2nr</span>
            <span className="vimParenSep CursorLineBg">(</span>
            <span className="vimSubst CursorLineBg">substitute</span>
            <span className="vimParenSep CursorLineBg">(</span>
            <span className="vimOperParen CursorLineBg">l:raw_color, </span>
            <span className="vimString CursorLineBg">{"'.{2}(.{2}).{2}'"}</span>
            <span className="vimOperParen CursorLineBg">, </span>
            <span className="vimString CursorLineBg">{"'1'"}</span>
            <span className="vimOperParen CursorLineBg">, </span>
            <span className="vimString CursorLineBg">{"'g'"}</span>
            <span className="vimParenSep CursorLineBg">)</span>
            <span className="vimFuncBody CursorLineBg">, </span>
            <span className="vimNumber CursorLineBg">16</span>
            <span className="vimParenSep CursorLineBg">)</span>
          </div>
          <div>
            <span className="vimLet">{"  "}let</span>
            <span className="vimFuncBody"> </span>
            <span className="vimVar">l:blue</span>
            <span className="vimFuncBody"> </span>
            <span className="vimOper">=</span>
            <span className="vimFuncBody"> </span>
            <span className="vimFuncName">str2nr</span>
            <span className="vimParenSep">(</span>
            <span className="vimSubst">substitute</span>
            <span className="vimParenSep">(</span>
            <span className="vimOperParen">l:raw_color, </span>
            <span className="vimString">{"'.{4}(.{2})'"}</span>
            <span className="vimOperParen">, </span>
            <span className="vimString">{"'1'"}</span>
            <span className="vimOperParen">, </span>
            <span className="vimString">{"'g'"}</span>
            <span className="vimParenSep">)</span>
            <span className="vimFuncBody">, </span>
            <span className="vimNumber">16</span>
            <span className="vimParenSep">)</span>
          </div>
          <br />
          <div>
            <span className="vimLet">{"  "}let</span>
            <span className="vimFuncBody"> </span>
            <span className="vimVar">l:brightness</span>
            <span className="vimFuncBody"> </span>
            <span className="vimOper">=</span>
            <span className="vimFuncBody"> </span>
            <span className="vimParenSep">((</span>
            <span className="vimOperParen">l:red * </span>
            <span className="vimNumber">299</span>
            <span className="vimParenSep">)</span>
            <span className="vimOperParen"> </span>
            <span className="vimOper">+</span>
            <span className="vimOperParen"> </span>
            <span className="vimParenSep">(</span>
            <span className="vimOperParen">l:green * </span>
            <span className="vimNumber">587</span>
            <span className="vimParenSep">)</span>
            <span className="vimOperParen"> </span>
            <span className="vimOper">+</span>
            <span className="vimOperParen"> </span>
            <span className="vimParenSep">(</span>
            <span className="vimOperParen">l:blue * </span>
            <span className="vimNumber">114</span>
            <span className="vimParenSep">))</span>
            <span className="vimFuncBody"> / </span>
            <span className="vimNumber">1000</span>
          </div>
          <br />
          <div>
            <span className="vimNotFunc">{"  "}return</span>
            <span className="vimFuncBody"> </span>
            <span className="vimVar">l:brightness</span>
            <span className="vimFuncBody"> </span>
            <span className="vimOper">&gt;</span>
            <span className="vimFuncBody"> </span>
            <span className="vimNumber">155</span>
          </div>
          <div>
            <span className="vimCommand">endfunction</span>
          </div>
        </code>
      </pre>

      <style jsx>{`
        .container {
          background-color: ${colors.NormalBg};
          overflow-x: auto;
          width: 100%;
          display: flex;
          align-items: center;
        }

        .code {
          padding: 0.5rem 0;
        }

        .code > div {
          padding: 0 .5rem;
        }

        .code-snippet {
          margin: 0;
          width: 100%;
        }

        .CursorFg {
          color: ${colors.CursorFg || "rgba(black, 50%)"};
        }

        .CursorBg {
          background: ${colors.CursorBg || "rgba(white, 50%)"};
        }

        .StatusLineFg {
          color: ${colors.StatusLineFg};
        }

        .StatusLineBg {
          background: ${colors.StatusLineBg};
        }

        .StatusLineFg--inverted {
          color: ${colors.StatusLineBg || colors.NormalBg});
        }

        .StatusLineBg--inverted {
          background: ${colors.StatusLineFg || colors.NormalFg};
        }

        .LineNrFg {
          color: ${colors.LineNrFg};
        }

        .LineNrBg {
          background: ${colors.LineNrBg || colors.NormalBg};
        }

        .CursorLineFg {
          color: ${colors.CursorLineFg || colors.LineNrFg};
        }

        .CursorLineBg {
          background: ${colors.CursorLineBg || colors.LineNrBg};
        }

        .CursorLineNrFg {
          color: ${colors.CursorLineNrFg || colors.LineNrFg};
        }

        .CursorLineNrBg {
          background: ${colors.CursorLineNrBg || colors.LineNrBg};
        }

        .vimLineComment {
          font-style: italic;
          color: ${colors.vimLineComment};
        }

        .vimCommand {
          color: ${colors.vimCommand};
        }

        .vimFunction {
          color: ${colors.vimFunction};
        }

        .vimParenSep {
          color: ${colors.vimParenSep};
        }

        .vimOperParen {
          color: ${colors.vimOperParen};
        }

        .vimFuncBody {
          color: ${colors.vimFuncBody};
        }

        .vimIsCommand {
          color: ${colors.vimIsCommand || colors.vimCommand};
        }

        .vimLet {
          color: ${colors.vimLet};
        }

        .vimVar {
          color: ${colors.vimVar};
        }

        .vimOper {
          color: ${colors.vimOper};
        }

        .vimFuncName {
          color: ${colors.vimFuncName};
        }

        .vimFuncVar {
          color: ${colors.vimFuncVar};
        }

        .vimString {
          color: ${colors.vimString};
        }

        .vimSubst {
          color: ${colors.vimSubst || colors.vimFuncName};
        }

        .vimNumber {
          color: ${colors.vimNumber};
        }

        .vimNotFunc {
          color: ${colors.vimNotFunc};
        }
        `}</style>
    </div>
  );
}
