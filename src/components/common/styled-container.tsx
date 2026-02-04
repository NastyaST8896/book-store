import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Container)`
    padding: 0 80px;

    @media (max-width: 1440px) {
        padding: 0 15px;
    }
`;