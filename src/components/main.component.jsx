import React from "react";
import { ResultComponent } from "./result.component";

export const MainComponent = () => {
  const [value, setValue] = React.useState({ corner: '', length: '' });
  const [showImage, setShowImage] = React.useState(false);

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', padding: '20px', gap: '20px', height: '100vh' }}>
      <button onClick={() => window.location.reload()} style={{ position: 'absolute', left: '20px', top: '20px', width: '80px', height: '30px'}}>RESET</button>
      {showImage ? (
        <ResultComponent corner={parseInt(value.corner)} length={parseFloat(value.length)} />
      ): (
        <>
          <div
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '80px'
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
            >
              <h4>Кут нахилу криші (°С)</h4>
              <input
                type="text"
                value={value.corner}
                onChange={(e) => {
                  const inputValue = e.target.value;

                  if (/^\d*$/.test(inputValue)) {
                    const newValue = parseInt(inputValue, 10);

                    if (inputValue === '') {
                      setValue((prevState) => ({ ...prevState, corner: '' }));
                    } else if (newValue >= 0 && newValue <= 360) {
                      setValue((prevState) => ({ ...prevState, corner: newValue }));
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === '.' || e.key === ',' || e.key === '-') {
                    e.preventDefault();
                  }
                }}
                style={{ width: '170px' }}
                placeholder="кут нахилу криші"
              />
              <span style={{ fontSize: '12px', marginTop: '2px' }}>1 - 360, без знаків</span>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
            >
              <h4>Довжина панелі (м)</h4>
              <input
                type="text" // Изменить на text для более гибкого контроля
                value={value.length}
                onChange={(e) => {
                  const inputValue = e.target.value;

                  if (!inputValue || (/^\d*\.?\d{0,2}$/.test(inputValue) && parseFloat(inputValue) >= 0)) {
                    setValue((prevState) => ({...prevState, length: inputValue}));
                  }
                }}
                style={{width: '170px'}}
                placeholder="довжина панелі"
              />

              <span style={{fontSize: '12px', marginTop: '2px'}}>> 0, максимум 2 знаки</span>
            </div>
          </div>
          <button
            onClick={() => {
              setShowImage(true)
            }}
            style={{width: '200px', height: '50px',}}
            disabled={!parseInt(value.corner) || !parseFloat(value.length)}
          >
            Розрахувати
          </button>
        </>
      )}
    </div>
  );
};