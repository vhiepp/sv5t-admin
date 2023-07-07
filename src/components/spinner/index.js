import { styled } from "@mui/material";

const SpinnerContainer = styled('span')({
    width: "100%",
    display: "flex",
    justifyContent: "center"
})

const Spinner = styled('span')({
    "@keyframes rotate": {
        "0%": {
            transform: "rotate(0deg)"
        },
        "100%": {
            transform: "rotate(360deg)"
        }
    },
    width: 30,
    height: 30,
    border: "5px solid #f3f3f3", /* Light grey */
    borderTop: "5px solid #383636", /* Black */
    borderRadius: "50%",
    animation: "rotate 1.5s linear infinite"
})

export default function LoadingSpinner() {
    return (
        <SpinnerContainer>
            <Spinner />
        </SpinnerContainer>
    );
}