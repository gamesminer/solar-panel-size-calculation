import React from "react";
import { ResultComponent } from "./result.component";

export const MainComponent = () => {
  const [value, setValue] = React.useState({ corner: 0, length: 0 });
  const [showImage, setShowImage] = React.useState(false);

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', padding: '20px', gap: '20px', height: '100vh' }}>
      <button onClick={() => window.location.reload()} style={{ position: 'absolute', left: '20px', top: '20px'}}>Перезавантажити</button>
      {showImage ? (
        <ResultComponent corner={value.corner} length={value.length} />
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
              <h4>Кут нахилу (°)</h4>
              <input
                type="number"
                value={value.corner}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value, 10);
                  if (newValue < 0 || newValue > 360) {
                    return;
                  }
                  setValue((prevState) => ({ ...prevState, corner: newValue || 0 }));
                }}
                onKeyDown={(e) => {
                  if (e.key === '.' || e.key === ',') {
                    e.preventDefault();
                  }
                }}
                style={{ width: '140px' }}
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
                type="number"
                value={value.length}
                onChange={(e) => {
                  setValue((prevState) => ({ ...prevState, length: parseFloat(e.target.value) || 0 }));
                }}
                style={{width: '170px'}}
              />
              <span style={{fontSize: '12px', marginTop: '2px'}}>> 0, максимум 2 знаки</span>
            </div>
          </div>
          <button
            onClick={() => {
              setShowImage(true)
            }}
            style={{width: '200px', height: '50px',}}
            disabled={!value.corner || !value.length}
          >
            Розрахувати
          </button>
        </>
      )}
    </div>
  );
};