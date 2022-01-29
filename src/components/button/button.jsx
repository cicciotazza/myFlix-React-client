import Button from 'react-bootstrap/Button';

import './button.scss';

export function Button({ label }) {

  return (
    <Button variant="Danger">Primary
      <button className="super-button">{label}</button>;
    </Button>
  );
}