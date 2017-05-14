import React from 'react';
import {
  FormGroup, 
  ControlLabel, 
  FormControl, 
  HelpBlock,
} from 'react-bootstrap';
import './FieldGroup.css';

export default function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id} className="field-group">
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
