import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function RatingSIze({ style, className, itemClassName, itemStyle, onClick, size, spacing, defaultValue, value, precision, readOnly, disabled, icon, emptyIcon, onChange, onChangeActive,getLabelText }) {

    var newName = size ? `size-${size}` : 'size-medium'
    var newSize = size ? size : 'medium'
    var newSpacing = spacing ? spacing : 1
    var newDefaultValue = defaultValue ? defaultValue : 0
    var newValue = value ? value : 0
    var newPrecision = precision ? precision : 1
    var newReadOnly = readOnly ? readOnly : false
    var newDisabled = disabled ? disabled : false
    var newIcon = icon ? icon : undefined
    var newEmptyIcon = emptyIcon ? emptyIcon : undefined

    return (
        <Stack spacing={newSpacing} style={style} className={className}>
            <Rating
                style={itemStyle}
                className={itemClassName}
                name={newName}
                size={newSize}
                defaultValue={newDefaultValue}
                value={newValue}
                precision={newPrecision}
                readOnly={newReadOnly}
                disabled={newDisabled}
                icon={newIcon}
                emptyIcon={newEmptyIcon}
                onChange={onChange}
                onChangeActive={onChangeActive}
                onClick={onClick}
                getLabelText={getLabelText}
            />
        </Stack>
    );
}