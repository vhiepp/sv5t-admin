const { Tooltip, styled, tooltipClasses } = require("@mui/material");

const HtmlTooltipDark = styled(({ className, backgroundColor, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'rgba(0, 30, 60)',
        color: 'rgba(255, 255, 255)',
        maxWidth: 500,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

export default HtmlTooltipDark;