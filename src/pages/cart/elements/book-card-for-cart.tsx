import { DeleteIcon } from "@common/icons/delete-icon";
import NumberSpinner from "@common/number-spinner";
import { Box, Grid, IconButton, Typography, type GridProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type CartBook = {
  id: number,
  title: string,
  author: string,
  price: number,
  media: string,
}

type BookCardForCartProps = {
  book: CartBook,
};

export const BookCardForCart = (props: BookCardForCartProps) => {
  const { book } = props;
  return (
    <>
      <Grid container gap={3} alignItems='center'>
        <StyledCoverGrid
          // onClick={handleBookClick(String(book.id))}
          img={`${book.media}`}
        ></StyledCoverGrid>

        <Grid container rowSpacing={7} flexDirection='column'>
          <Grid>
            <Typography variant="h1">{book.title}</Typography>

            <StyledAuthorTypography variant="h2">
              {book.author}
            </StyledAuthorTypography>
          </Grid>

          <Grid
            alignItems='center'
            justifyContent='flex-start'
            container
            spacing={8}>
            <NumberSpinner
              min={1}
              max={100}
              defaultValue={1}
            />

            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Grid>

          <Grid>
            <StyledPriceTypography variant="h2">
              $${book.price} USD
            </StyledPriceTypography>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{
        height: '1px',
        width: '100%',
        backgroundColor: '#D6D8E7',
        margin: '40px 0'
      }}
      />
    </>
  )
};

const StyledCoverGrid = styled(
  (props: GridProps) => <Grid {...props} />,
  { shouldForwardProp: (prop) => prop !== 'img' }
)<{ img?: string }>(({ img = 'src/assets/img/no-cover.webp' }) => ({
  height: 289,
  maxWidth: 198,
  width: '100%',
  backgroundImage: `url(${img})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  borderRadius: 16,
  cursor: 'pointer'
}));

const StyledAuthorTypography = styled(Typography)(({ theme }) => `
    color: ${theme.palette.appColor.dark};
    font-size: 24px;
`);

const StyledPriceTypography = styled(Typography)(({ theme }) => `
    color: ${theme.palette.appColor.dark};
    font-size: 36px;
`);