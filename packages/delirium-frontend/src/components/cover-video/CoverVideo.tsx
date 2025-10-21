import { Box, Button, styled } from "@mui/material";
import video from "../../assets/video.mp4";

const VideoWrapper = styled(Box)({
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  position: "relative",
});

const CenteredBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1,
});

const CenteredButton = styled(Button)({
  color: "#ffffff",
  borderColor: "#ffffff",
  textTransform: "uppercase",
  padding: "16px 40px",
  fontSize: "1.125rem",
  fontWeight: 500,
  letterSpacing: "2px",
  backgroundColor: "transparent",
  borderWidth: "2px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "#ffffff",
  },
});

export const CoverVideo = () => {
  return (
    <VideoWrapper>
      <Box
        component="video"
        src={video}
        autoPlay
        loop
        muted
        playsInline
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <CenteredBox>
        <CenteredButton variant="outlined">The science of taste</CenteredButton>
      </CenteredBox>
    </VideoWrapper>
  );
};
