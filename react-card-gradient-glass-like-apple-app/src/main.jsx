import {createRoot} from 'react-dom/client';
import {css} from '@emotion/css';
import * as d3 from 'd3';
import {transform} from 'framer-motion';
import {samples, interpolate, formatHex} from 'culori';
import easing from 'bezier-easing';
import '@fontsource/inter';
import './styles/index.scss';

const makeGradient = (step, interpolateColor) => {
  const bezier = easing(0, 0, 0.18, 0.99);
  const result = samples(step)
    .map(bezier)
    .map(transform([0, 1], [0.6, 0.9]))
    .map((t) => {
      return {t, color: interpolateColor(t)};
    })
    .map((info) => {
      return {...info, color: formatHex(info.color)};
    })
    .map((info) => {
      return `${info.color} ${info.t * 100}%`;
    });
  return result.join();
};

const Spacer = ({height = `0.5vh`}) => {
  return (
    <div
      className={css`
        height: ${height};
        width: 100%;
      `}
    ></div>
  );
};

const GrassCard = ({title, sentence}) => {
  return (
    <div
      className={css`
        background: rgba(238, 238, 238, 0.25);
        border-radius: 16px;
        box-shadow: 0 14px 90px rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(10px);
        border: 3px solid rgba(255, 255, 255, 0.25);
        height: 100%;
        min-height: 30rem;
        width: 100%;
        /* color: white; */
        color: black;
        margin: 3rem;
        @media (max-width: 768px) {
          margin: 2rem;
        }
        padding: 3rem;
        @media (max-width: 768px) {
          padding: 2rem;
        }
      `}
    >
      <h1 className={css``}>{title}</h1>
      {[...Array(3)].map((n, index) => {
        return <Spacer key={index} />;
      })}
      <p
        className={css`
          font-size: 1.15rem;
        `}
      >
        {sentence}
      </p>
    </div>
  );
};
const App = () => {
  // const gradient = makeGradient(5, interpolate(['#54d0ff', '#9f92ff', '#ff7689']))
  // const gradient = makeGradient(5, d3.interpolateInferno);
  // const gradient = makeGradient(5, d3.interpolateOranges);
  // const gradient = makeGradient(5, d3.interpolatePlasma);
  // const gradient = makeGradient(5, d3.interpolateGnBu);
  // const gradient = makeGradient(5, d3.interpolateBuGn);
  // const gradient = makeGradient(5, d3.interpolateMagma);
  // const gradient = makeGradient(5, d3.interpolateYlOrRd);
  const gradient = makeGradient(5, d3.interpolateRdYlBu);
  return (
    <>
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        `}
      >
        <div
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 30px;
            max-width: 30rem;
            height: 100%;
            width: 100%;
            background: linear-gradient(45deg, ${gradient});
            /* background: repeating-linear-gradient(45deg, ${gradient}); */
            /* background: radial-gradient(${gradient}); */
            /* background: repeating-radial-gradient(${gradient}); */
          `}
        >
          <GrassCard
            title={`Cowboy Bebop`}
            sentence={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`}
          />
        </div>
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
