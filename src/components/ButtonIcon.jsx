import { Link } from 'react-router-dom';

export function ButtonIcon({ label, icon, classname, link, classnamebtn, left = false, onClick, type = "button", disabled = false }) {
  return (
    <div className={classname}>
      <Link to={link} className="flex">
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`flex items-center justify-center gap-2 ${classnamebtn} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {left && icon}
          {label}
          {!left && icon}
        </button>
      </Link>
    </div>
  );
}
