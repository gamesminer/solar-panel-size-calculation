import React from "react";
import image from "./result.jpg";

const RED_COLOR = '#c13939';
const LENGTH_COLOR = '#00a8c1';

const STEP_1 = 57;
const STEP_2 = 33;

const moveToRadians = (degrees) => degrees * Math.PI / 180;

export const ResultComponent = ({ corner, length }) => {
  const step2 = 37 - corner;
  const step3 = 90 - step2;
  const step4 = 180 - 57 - step3;
  const step5 = 90 - step4;
  const step7 = parseFloat(length * Math.sin(moveToRadians(step2))).toFixed(2);
  const step9 = parseFloat(length * Math.cos(moveToRadians(step2))).toFixed(2)
  const step11 = parseFloat(step7 * Math.tan(moveToRadians(step4))).toFixed(2);

  return (
    <div style={{position: 'relative', width: '1000px', height: '384px', display: 'flex', flexDirection: 'column'}}>
      <div
        style={{position: 'absolute', left: 0, top: 0, display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
        <span>Кут нахилу: <b style={{color: RED_COLOR}}>{corner}°</b></span>
        <span>Довжина панелі: <b style={{color: LENGTH_COLOR}}>{length.toFixed(2)}м</b></span>
      </div>
      <img src={image} alt="result" style={{width: '100%', height: '100%'}}/>

      <b style={{position: 'absolute', top: '90px', right: '225px'}}>{STEP_1}°</b>
      <b style={{position: 'absolute', bottom: '160px', right: '105px'}}>{STEP_2}°</b>
      <b style={{position: 'absolute', bottom: '100px', right: '160px', color: RED_COLOR}}>{corner}°</b>
      <b style={{position: 'absolute', bottom: '135px', right: '145px', color: RED_COLOR}}>{step2}°</b>
      <b style={{position: 'absolute', top: '125px', right: '275px', color: RED_COLOR}}>{step3}°</b>
      <b style={{position: 'absolute', top: '122px', right: '330px', color: RED_COLOR}}>{step4}°</b>
      <b style={{position: 'absolute', top: '150px', right: '455px', color: RED_COLOR}}>{step5}°</b>
      <b style={{position: 'absolute', top: '150px', left: '800px', color: LENGTH_COLOR}}>{length.toFixed(2)}</b>
      <b style={{position: 'absolute', top: '150px', right: '330px', color: LENGTH_COLOR}}>{step7}</b>
      <b style={{position: 'absolute', bottom: '5px', left: '720px', color: LENGTH_COLOR}}>{step9}</b>
      <b style={{position: 'absolute', bottom: '65px', left: '490px', color: LENGTH_COLOR}}>{step11}</b>
    </div>
  );
};