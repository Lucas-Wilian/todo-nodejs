import React from 'react';
import './styles.css';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

export const RadioButton = ({ selectedValue, handleChange }) => {
  const CustomRadio = withStyles({
    root: {
      color: '#ffd3ca',
      '&$checked': {
        color: '#eb8f7a',
      },
    },
    checked: {},
  })((props) => <Radio color='default' {...props} />);

  return (
    <div className='radioOptions'>
      <div>
        <CustomRadio
          value='all'
          checked={selectedValue === 'all'}
          onChange={(e) => handleChange(e.target)}
        />
        <span>Todos</span>
      </div>

      <div>
        <CustomRadio
          value='true'
          onChange={(e) => handleChange(e.target)}
          checked={selectedValue === 'true'}
        />
        <span>Prioridades</span>
      </div>

      <div>
        <CustomRadio
          value='false'
          onChange={(e) => handleChange(e.target)}
          checked={selectedValue === 'false'}
        />
        <span>Normal</span>
      </div>
    </div>
  );
};
