import React from 'react';
import Box from '@mui/material/Box';

interface AuctionStatusProps {
  status: string;
}

const AuctionStatus: React.FC<AuctionStatusProps> = ({ status }) => {
  let message = '';

  if (status === 'PENDING') {
    message = '경매전';
  } else if (status === 'INPROGRESS') {
    return null;
  } else if (status === 'COMPLETED') {
    message = '경매 완료';
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "white",
        fontSize: "1.5rem",
        zIndex: 1,
      }}
    >
      {message}
    </Box>
  );
}

export default AuctionStatus;