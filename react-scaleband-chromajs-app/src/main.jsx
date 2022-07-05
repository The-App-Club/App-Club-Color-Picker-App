import {createRoot} from 'react-dom/client';
import {useState, useRef} from 'react';
import {css} from '@emotion/css';
import '@fontsource/inter';
import './styles/index.scss';
import {Slider} from '@mui/material';
import {samples} from 'culori';
import chroma from 'chroma-js';

const App = () => {
  const svgDomRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setProgress(e.target.value);
  };
  return (
    <>
      <div
        className={css`
          width: 100%;
          padding: 3rem;
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          max-width: 20rem;
        `}
      >
        <Slider
          defaultValue={0}
          min={0}
          max={1}
          step={0.001}
          value={progress}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={handleChange}
        />
      </div>
      <div
        className={css`
          position: relative;
          width: 100%;
          height: 100vh;
          svg {
            width: 100%;
            height: 100vh;
            display: block;
          }
        `}
      >
        <svg
          ref={svgDomRef}
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            {/* <radialGradient
              id="gradient"
              cx={`${progress * 100}%`}
              cy={`${progress * 100}%`}
              r={0.1}
            >
              {samples(10)
                .map((n) => {
                  return {t: n};
                })
                .map((info) => {
                  return {
                    t: info.t,
                    color: chroma
                      .scale(['#E3FDFD', '#CBF1F5', '#A6E3E9', '#71C9CE'])
                      .mode('lab')
                      .gamma(progress)(info.t)
                      .hex(),
                  };
                })
                .map((info, index) => {
                  return (
                    <stop
                      key={index}
                      offset={`${info.t * 100}%`}
                      stopColor={info.color}
                      stopOpacity={1}
                    />
                  );
                })}
            </radialGradient> */}
            <linearGradient id="gradient" x1="100%" y1="0%" x2="0%" y2="100%">
              {samples(10)
                .map((n) => {
                  return {t: n};
                })
                .map((info) => {
                  return {
                    t: info.t,
                    color: chroma
                      .scale(['#E3FDFD', '#CBF1F5', '#A6E3E9', '#71C9CE'])
                      .mode('lab')
                      .gamma(progress)(info.t)
                      .hex(),
                  };
                })
                .map((info, index) => {
                  return (
                    <stop
                      key={index}
                      offset={`${info.t * 100}%`}
                      stopColor={info.color}
                      stopOpacity={1}
                    />
                  );
                })}
            </linearGradient>
          </defs>
          <g fill="url(#gradient)">
            <rect width="100" height="100" x="0" y="0" />
          </g>
        </svg>
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
