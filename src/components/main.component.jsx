import React from "react";
import { ResultComponent } from "./result.component";

const initialState = {
  panelHeight: '',
  panelAngle: '',
  onGround: true,
  onRoof: false,
  roofAngle: '',
};

export const MainComponent = () => {
  const [form, setForm] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [result, setResult] = React.useState(null);

  const handleReset = () => {
    setForm(initialState);
    setErrors({});
    setResult(null);
  };

  const validateAndSubmit = () => {
    const newErrors = {};

    const height = parseFloat(form.panelHeight);
    if (!form.panelHeight || isNaN(height) || height <= 0) {
      newErrors.panelHeight = true;
    }

    const angle = parseInt(form.panelAngle, 10);
    if (!form.panelAngle || isNaN(angle) || angle < 1 || angle > 90) {
      newErrors.panelAngle = true;
    }

    if (form.onRoof) {
      const rAngle = parseInt(form.roofAngle, 10);
      if (!form.roofAngle || isNaN(rAngle) || rAngle < 1 || rAngle > 90) {
        newErrors.roofAngle = true;
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setResult(form);
    }
  };

  const handlePanelHeightChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d{0,2}$/.test(val)) {
      setForm((s) => ({ ...s, panelHeight: val }));
    }
  };

  const handleAngleChange = (field) => (e) => {
    const val = e.target.value;
    if (val === '' || /^\d+$/.test(val)) {
      const num = parseInt(val, 10);
      if (val === '' || (num >= 0 && num <= 90)) {
        setForm((s) => ({ ...s, [field]: val === '' ? '' : num }));
      }
    }
  };

  const handleLocation = (location) => () => {
    setForm((s) => ({
      ...s,
      onGround: location === 'ground',
      onRoof: location === 'roof',
      roofAngle: location === 'ground' ? '' : s.roofAngle,
    }));
  };

  // ── Result screen ────────────────────────────────────────────
  if (result) {
    return (
      <div className="page-wrapper">
        <ResultComponent
          panelHeight={parseFloat(result.panelHeight)}
          panelAngle={parseInt(result.panelAngle, 10)}
          onRoof={result.onRoof}
          roofAngle={result.onRoof ? parseInt(result.roofAngle, 10) : null}
          onReset={handleReset}
        />
      </div>
    );
  }

  // ── Form screen ──────────────────────────────────────────────
  return (
    <div className="page-wrapper">
      <div className="form-card">
        <div className="form-title">Дані для розрахунку</div>

        {/* Panel height */}
        <div className="field-group">
          <label className="field-label">Висота панелі (м)</label>
          <input
            className={`field-input${errors.panelHeight ? ' input-error' : ''}`}
            type="text"
            inputMode="decimal"
            value={form.panelHeight}
            onChange={handlePanelHeightChange}
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === 'e') e.preventDefault();
            }}
          />
          <span className="field-hint">значення &gt; 0</span>
        </div>

        {/* Panel angle */}
        <div className="field-group">
          <label className="field-label">Кут нахилу панелі (°)</label>
          <input
            className={`field-input small-input${errors.panelAngle ? ' input-error' : ''}`}
            type="text"
            inputMode="numeric"
            value={form.panelAngle}
            onChange={handleAngleChange('panelAngle')}
            onKeyDown={(e) => {
              if (e.key === '.' || e.key === ',' || e.key === '-' || e.key === 'e') {
                e.preventDefault();
              }
            }}
          />
          <span className="field-hint">значення 1-90</span>
        </div>

        {/* Location */}
        <div className="field-group">
          <label className="field-label">Місце встановлення</label>

          <div className="checkbox-row">
            <div
              className={`custom-checkbox${form.onGround ? ' checked' : ''}`}
              onClick={handleLocation('ground')}
              role="checkbox"
              aria-checked={form.onGround}
              tabIndex={0}
              onKeyDown={(e) => e.key === ' ' && handleLocation('ground')()}
            >
              {form.onGround && <span className="checkmark">✓</span>}
            </div>
            <span className="checkbox-label">на грунті</span>
          </div>

          <div className="checkbox-row roof-row">
            <div
              className={`custom-checkbox${form.onRoof ? ' checked' : ''}`}
              onClick={handleLocation('roof')}
              role="checkbox"
              aria-checked={form.onRoof}
              tabIndex={0}
              onKeyDown={(e) => e.key === ' ' && handleLocation('roof')()}
            >
              {form.onRoof && <span className="checkmark">✓</span>}
            </div>
            <span className="checkbox-label">на криші</span>
            <input
              className={`field-input small-input roof-angle-input${errors.roofAngle ? ' input-error' : ''}`}
              type="text"
              inputMode="numeric"
              value={form.roofAngle}
              onChange={handleAngleChange('roofAngle')}
              disabled={!form.onRoof}
              onKeyDown={(e) => {
                if (e.key === '.' || e.key === ',' || e.key === '-' || e.key === 'e') {
                  e.preventDefault();
                }
              }}
            />
            <span className="field-hint inline-hint">кут нахилу криші (°)</span>
          </div>
          {form.onRoof && (
            <span className="field-hint">значення 1-90</span>
          )}
        </div>

        {/* Buttons */}
        <div className="button-row">
          <button className="btn-calculate" onClick={validateAndSubmit}>
            Розрахувати
          </button>
          <button className="btn-reset" onClick={handleReset}>
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};
