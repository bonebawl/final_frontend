export default function Switch({isOn, onChange, disabled }) {
    return (
      <label className={`switch absolute top-4 right-4 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <input type="checkbox" checked={isOn} onChange={onChange} disabled={disabled} />
        <span className="slider round"></span>
      </label>
    );
  }