import type { SyntheticEvent } from 'react';
import { RatingArrowIcon } from '@common/icons/rating-arrow-icon';
import { StarIcon } from '@common/icons/star-icon';
import { setBookRating } from '@redux/books/thunk';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import type { ProductBookType } from '@utils/types';

import { Grid, Rating, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

type ProductBookRatingProps = {
  book: ProductBookType,
  onChange: (newBook: ProductBookType) => void,
};
export const ProductBookRating = (props: ProductBookRatingProps) => {
  const { onChange, book } = props;

  const user = useAppSelector((state) => {
    return state.user;
  });

  const dispatch = useAppDispatch();

  const handleRatingChange = (
    _: SyntheticEvent<Element, Event>,
    newRating: number | null
  ) => {
    if (newRating && user.user?.id && book) {
      dispatch(setBookRating({
        bookId: book.id,
        rating: newRating
      }))
        .unwrap()
        .then((data) => {
          onChange({
            ...book,
            booksRating: String(data.booksRating),
            userRating: data.userRating,
          });
        });
    }
  };

  return (
    <StyledRatingContainerGrid container>
      <StyledGeneralRatingGrid size={{lg: 1, md: 2, sm: 9}}>
        <StarIcon />

        <StyledRatingTypography variant="subtitle1">
          {book.booksRating}
        </StyledRatingTypography>
      </StyledGeneralRatingGrid>

      <Grid>
        <StyledRating
          value={(user.user && book.userRating) ? +book.userRating : 0}
          precision={1}
          size="large"
          onChange={handleRatingChange}
          readOnly={!user.user}
        />
      </Grid>

      <StyledRatingTextGrid>
        <RatingArrowIcon />

        <StyledRatingTypography variant="subtitle1">
          Rate this book
        </StyledRatingTypography>
      </StyledRatingTextGrid>
    </StyledRatingContainerGrid>
  );
};

const StyledRatingContainerGrid = styled(Grid)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
`;

const StyledGeneralRatingGrid = styled(Grid)`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const StyledRatingTypography = styled(Typography)(({ theme }) => `
  font-weight: 400; 
  color: ${theme.palette.appColor.darkGrey};
`);

const StyledRatingTextGrid = styled(Grid)`
  display: flex;
  gap: 7px;
`;

const StyledRating = styled(Rating)(({ theme }) => ({
  '&.MuiRating-root': {
    maxWidth: '250px',
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: '5px',
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