import { type SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BookCard } from '@common/book-card';
import { HeartIcon } from '@common/icons/heart-icon';
import { RatingArrowIcon } from '@common/icons/rating-arrow-icon';
import { StarIcon } from '@common/icons/star-icon';
import { StyledButton } from '@common/styled-button';
import { setBookRating } from '@redux/books/thunk.ts';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getBook } from '@redux/thunks/book-thunk';
import type { Book, BookProfile } from '@utils/types';

import {
  Box,
  Container,
  Grid,
  type GridProps,
  IconButton,
  type IconButtonProps,
  Rating,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const Product = () => {
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => {
    return state.auth;
  });

  const [rating, setRating] = useState<number>(0);

  const [book, setBook] = useState<BookProfile>(null);

  const [recommended, setRecommended] = useState<Book[]>([]);


  const description = book?.description;

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getBook(+id))
        .unwrap()
        .then((data) => {
          setBook(data.book);
          setRecommended(data.recomended);
        });
    }
  }, [dispatch, id]);

  const handleRatingChange = (_: SyntheticEvent<Element, Event>, newRating: number | null) => {
    if (newRating && auth.user?.id && book) {
      dispatch(setBookRating({
        bookId: book.id,
        userId: +auth.user.id,
        rating: newRating
      }))
        .unwrap()
        .then(() => setRating(newRating));
    }
  };

  return (
    <main>
      <Container maxWidth="md">
        <Grid
          container
          display="flex"
          justifyContent="space-between"
          padding="36px 0 60px 0"
        >
          <StyledCoverGrid
            img={`http://localhost:3000/${book?.media}`}
          >
            <StyledIconButton /*transparent={!book.isFavorite}*/>
              <HeartIcon
                fill="none"
                /*fill={book.isFavorite ? 'white' : 'none'}*/
              />
            </StyledIconButton>
          </StyledCoverGrid>

          <Grid
            display="flex"
            flexDirection="column"
            gap="80px">
            <Grid
              container
              display="flex"
              flexDirection="column"
              gap="30px"
              sx={{ maxWidth: '630px', width: '100%' }}
            >
              <Grid>
                <Typography variant="h1">{book?.title}</Typography>
                <Typography variant="h2" sx={{ fontSize: '24px' }}>
                  {book?.author}
                </Typography>
              </Grid>

              <Grid container gap="40px" flexDirection="row">
                <Grid display="flex" gap="14px">
                  <StarIcon />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: '400', color: '#B9BAC3' }}
                  >
                    {book?.rating}
                  </Typography>
                </Grid>


                <Grid>
                  <StyledRating
                    value={rating}
                    precision={0.1}
                    defaultValue={0}
                    size="large"
                    onChange={handleRatingChange}
                  />
                </Grid>

                <Grid display="flex" gap="7px">
                  <RatingArrowIcon />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: '400', color: '#B9BAC3' }}
                  >
                    Rate this book
                  </Typography>
                </Grid>
              </Grid>

              <Grid display="flex" flexDirection="column" gap="12px">
                <Typography
                  variant="h2"
                  sx={{ fontSize: '24px' }}
                >
                  Description
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontSize: '16px', whiteSpace: 'pre-wrap' }}
                >
                  {description}
                </Typography>
              </Grid>
            </Grid>

            <Grid>
              <Box display="flex" gap="82px">
                <Box display="flex" flexDirection="column" gap="14px">
                  <Typography
                    variant="subtitle2"
                    fontSize="16px"
                  >
                    Paperback
                  </Typography>
                  <StyledButton
                    disabled
                    buttonHeight={50}
                    sx={{ fontSize: '20px' }}
                  >
                    Not available
                  </StyledButton>
                </Box>

                <Box display="flex" flexDirection="column" gap="14px">
                  <Typography
                    variant="subtitle2"
                    fontSize="16px"
                  >
                    Hardcover
                  </Typography>
                  <StyledButton
                    buttonHeight={50}
                    sx={{ fontSize: '20px' }}
                  >
                    $ {book?.price} USD
                  </StyledButton>
                </Box>
              </Box>
            </Grid>
          </Grid>

        </Grid>

        <StyledBox>
          <Typography variant="h1">Recommendations</Typography>

          <Grid
            container
            columnSpacing="20px"
          >
            {recommended.map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            ))}
          </Grid>
        </StyledBox>

      </Container>
    </main>
  );
};

const StyledCoverGrid = styled(
  (props: GridProps) => <Grid {...props} />,
  { shouldForwardProp: (prop) => prop !== 'img' }
)<{ img?: string }>(({ img = 'src/assets/img/no-cover.webp' }) => `
  position: relative;
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  border-radius: 16px;
  min-width: 135px;
  max-width: 522px;
  width: 100%;
  height: 780px;
`);

const StyledIconButton = styled(
  (props: IconButtonProps) => <IconButton {...props} />,
  { shouldForwardProp: (prop) => prop !== 'transparent' }
)<{ transparent?: boolean }>(({ transparent = true, theme }) => ({
  position: 'absolute',
  right: 30,
  top: 30,
  opacity: transparent ? .75 : 1,
  maxWidth: 60,
  width: '100%',
  height: 60,
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

const StyledBox = styled(Box)`
  padding: 60px 0 80px 0;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;