import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import Rating from './Rating';

const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};


export default function TextareaValidator({avatar,value, onSubmit }) {
  
 
    const [stars, setStars] = React.useState(value?value.score:0);

    const [comment, setComment] = React.useState(value?value.body:"");

    const getLabelText = () => {
        return `${stars} Star${stars !== 1 ? 's' : ''}, ${labels[stars]}`;
    }
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
    React.useEffect(() => {
     
    }, [stars,comment,value])


    return (
        <FormControl>
            <Textarea
                placeholder="Type something here…"
                minRows={3}
                maxRows={4}
                value={comment}
                onChange={handleCommentChange}
                startDecorator={
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Rating onChange={(e, v) => { setStars(v) }} getLabelText={getLabelText} value={stars} />
                        {stars !== null && (
                            <Box sx={{ ml: 2 }}>{labels[stars]}</Box>
                        )}
                    </Box>
                }

                endDecorator={
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 'var(--Textarea-paddingBlock)',
                            pt: 'var(--Textarea-paddingBlock)',
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            flex: 'auto',
                        }}

                    >
                        <img src={avatar} alt="avatar" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                        <Button onClick={() => {
                            onSubmit({ stars, comment })
                            setComment('')
                            setStars(0)
                        }} sx={{ ml: 'auto' }} >Send</Button>
                    </Box>
                }
                sx={{ minWidth: 300, }}
            />
        </FormControl>
    );
}