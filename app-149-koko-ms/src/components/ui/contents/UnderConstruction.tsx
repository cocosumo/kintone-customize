
import Construction from './../../../assets/construction.jpg';
import Box from '@mui/system/Box';


export default function UnderConstruction() {
  return (


    <Box width="100%">
      <img
        width="50%"
        style={{
          'margin': '0 auto 0 auto',
          'display': 'block'
        }}
        src={Construction}
        alt="construction"
      />
    </Box>

  );
}