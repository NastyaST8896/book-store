import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Rating,
  Typography,
  type IconButtonProps
} from "@mui/material";
import { HeartIcon } from "@common/icons/heart-icon";
import { StarIcon } from "@common/icons/star-icon";
import { RatingArrowIcon } from "@common/icons/rating-arrow-icon";
import { StyledButton } from "@common/styled-button";

export const Product = () => {
  return (
    <main>
      <Container maxWidth="md">
        <Grid container display='flex' justifyContent='space-between' padding='36px 0 60px 0'>
          <StyledCoverGrid /*img={`http://localhost:3000/${book.media}`}*/>
            <StyledIconButton /*transparent={!book.isFavorite}*/>
              <HeartIcon  fill='none' /*fill={book.isFavorite ? 'white' : 'none'}*/ />
            </StyledIconButton>
          </StyledCoverGrid>

          <Grid
            display='flex'
            flexDirection='column'
            gap='80px'>
            <Grid
              container
              display='flex'
              flexDirection='column'
              gap='30px'
              sx={{ maxWidth: '630px', width: '100%' }}
            >
              <Grid >
                <Typography variant="h1">milk and honey</Typography>
                <Typography variant="h2" sx={{ fontSize: '24px' }}>Rupi Kaur</Typography>
              </Grid>

              <Grid container gap='40px' flexDirection='row'>
                <Grid display='flex' gap='14px'>
                  <StarIcon />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: '400', color: '#B9BAC3' }}
                  >
                    5.0
                  </Typography>
                </Grid>


                <Grid>
                  <StyledRating
                    // value={0}
                    precision={0.1}
                    defaultValue={0}
                    size="large"
                  />
                </Grid>

                <Grid display='flex' gap='7px'>
                  <RatingArrowIcon />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: '400', color: '#B9BAC3' }}
                  >
                    Rate this book
                  </Typography>
                </Grid>
              </Grid>

              <Grid display='flex' flexDirection='column' gap='12px'>
                <Typography variant="h2" sx={{ fontSize: '24px' }}>Description</Typography>
                <Typography variant="subtitle2" sx={{ fontSize: '16px' }}>
                  “Rupi Kaur is the Writer of the Decade.” - The New Republic.
                  <br />
                  <br />
                  #1 New York Times bestseller milk and honey is a collection of
                  poetry and prose about survival. About the experience of
                  violence, abuse, love, loss, and femininity.
                  <br />
                  <br />
                  The book is divided into four chapters, and each chapter serves
                  a different purpose. Deals with a different pain. Heals a
                  different heartache. milk and honey takes readers through
                  a journey of the most bitter moments in life and finds
                  sweetness in them because there is sweetness everywhere
                  if you are just willing to look.
                </Typography>
              </Grid>
            </Grid>

            <Grid>
              <Box display='flex' gap='82px'>
                <Box display='flex' flexDirection='column' gap='14px'>
                  <Typography variant="subtitle2" fontSize='16px'>Paperback</Typography>
                  <StyledButton disabled buttonHeight={50} sx={{fontSize: '20px'}}>Not available</StyledButton>
                </Box>

                <Box display='flex' flexDirection='column' gap='14px'>
                  <Typography variant="subtitle2" fontSize='16px'>Hardcover</Typography>
                  <StyledButton buttonHeight={50} sx={{fontSize: '20px'}}>$19.99 USD</StyledButton>
                </Box>
              </Box>
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </main>
  );
};

// const StyledCoverGrid = styled(
//   (props: GridProps) => <Grid {...props} />,
//   { shouldForwardProp: (prop) => prop !== 'img' }
// )<{ img?: string }>(({ img = 'src/assets/img/no-cover.webp' }) => ({
//   position: 'relative',
//   height: 455,
//   backgroundImage: `url(${img})`,
//   backgroundRepeat: 'no-repeat',
//   backgroundSize: 'cover',
//   backgroundPosition: 'center center',
//   borderRadius: 16,
// }));

const StyledCoverGrid = styled(Grid)`
  position: relative;
  background-image: url('src/assets/img/book1.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  border-radius: 16px;
  min-width: 135px;
  max-width: 522px;
  width: 100%;
  height: 780px;
`;

const StyledIconButton = styled(
  (props: IconButtonProps) => <IconButton {...props} />,
  { shouldForwardProp: (prop) => prop !== 'transparent' }
)<{ transparent?: boolean }>(({ transparent = true, theme }) => ({
  position: 'absolute',
  right: 30,
  top: 30,
  opacity: transparent ? .75 : 1,
  maxWidth: 48,
  width: '100%',
  height: 48,
  backgroundColor: theme.palette.appColor.darkBlue,

  '&:hover': {
    backgroundColor: theme.palette.appColor.darkBlue,
    opacity: 1
  }
}));

const StyledRating = styled(Rating)(({ theme }) => ({
  '&.MuiRating-root': {
    maxWidth: '250px',
    width: '100%',
    justifyContent: 'space-between',
  },
  '& .MuiRating-iconFilled': {
    color: theme.palette.appColor.green
  },
  '& .MuiRating-iconHover': {
    color: theme.palette.appColor.green
  },
  '& .MuiRating-iconEmpty': {
    color: theme.palette.appColor.green
  }
}));