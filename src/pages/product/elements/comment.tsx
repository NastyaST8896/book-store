import { styled, useTheme } from '@mui/material/styles';
import { Box, Typography, useMediaQuery, type BoxProps } from '@mui/material';

type CommentType = {
  comment: {
    id: number,
    name: string,
    date: Date,
    text: string,
    img: string,
  },
}

export const Comment = (props: CommentType) => {
  const { comment } = props;

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const today = new Date();
  const createCommentDate = new Date(comment.date);
  const diffTime = today.getTime() - createCommentDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (mobile) {
    return (
      <StyledMobileCommentBox width={{ lg: '50%', sm: '75%', xs: '100%' }}>

        <StyledMobileInfoBox>
          <StyledAvatarBox
            img={comment.img || 'src/assets/img/no-cover.webp'}
          />

          <Box>
            <StyledNameTypography variant='subtitle1'>
              {comment.name}
            </StyledNameTypography>

            <StyledTimeTypography variant='h2'>
              {String(comment.date)}
            </StyledTimeTypography>
          </Box>
        </StyledMobileInfoBox>

        <Box>
          <StyledCommentTextTypography>
            {comment.text}
          </StyledCommentTextTypography>
        </Box>
      </StyledMobileCommentBox>
    );
  }

  return (
    <StyledCommentBox width={{ lg: '50%', sm: '75%', xs: '100%' }}>
      <StyledAvatarBox img={comment.img} />
      <StyledInfoBox>
        <StyledNameTypography variant='subtitle1'>
          {comment.name}
        </StyledNameTypography>

        <StyledTimeTypography variant='h2'>
          {
            diffDays ?
            `Left a comment ${diffDays} days ago`
            :
            'Сomment added today'
          }
        </StyledTimeTypography>

        <StyledCommentTextTypography>
          {comment.text}
        </StyledCommentTextTypography>

      </StyledInfoBox>
    </StyledCommentBox>
  );
};

const StyledCommentBox = styled(Box)(({ theme }) => `
  display: flex;
  gap: 20px;
  background-color: ${theme.palette.appColor.light};
  padding: 30px;
  border-radius: 16px;
  max-width: 738px;
  width: 100%;
  margin-bottom: 10px;
`);

const StyledAvatarBox = styled(
  (props: BoxProps) => <Box {...props} />,
  { shouldForwardProp: (prop) => prop !== 'img' }
)<{ img?: string }>(({ img = '/src/assets/img/no-cover.webp' }) => ({
  height: '60px',
  width: '60px',
  backgroundImage: `url(${img})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  borderRadius: '50%',
  flexShrink: 0,
}));

const StyledInfoBox = styled(Box)`
  max-width: 516px;
  width: 100%;
`;

const StyledNameTypography = styled(Typography)(({ theme }) => `
  color: ${theme.palette.appColor.dark};
  font-weight: 600;
  margin-bottom: 4px;
`);

const StyledTimeTypography = styled(Typography)(({ theme }) => `
  font-size: 12px;
  color: ${theme.palette.appColor.darkGrey};
  margin-bottom: 10px;
`);

const StyledCommentTextTypography = styled(Typography)(({ theme }) => `
  color: ${theme.palette.appColor.darkBlue};
`);


// mobile

const StyledMobileCommentBox = styled(Box)(({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${theme.palette.appColor.light};
  padding: 12px;
  border-radius: 16px;
  max-width: 738px;
  width: 100%;
  margin-bottom: 10px;
`);

const StyledMobileInfoBox = styled(Box)`
  display: flex;
  gap: 12px;
`;