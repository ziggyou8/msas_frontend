import React from "react";
import { Controller } from 'react-hook-form';
import Select from 'react-select';


const CustomSelect = ({control, options, customHandler,name}) =>(
    <Controller
    control={control}
    defaultValue={options.map(c => c.value)}
    name={name}
    rules={{ required: true }}
    render={({ field: { onChange, value, ref }}) => (
    <Select
        isMulti={true}
        placeholder="Choisir..."
        inputRef={ref}
        classNamePrefix="addl-class"
        options={options}
        value={options.find(c => c.value === value)}
        onChange={val => {onChange(val.value); customHandler(val.value)}}
    />
  )}
/>
)

export default CustomSelect;