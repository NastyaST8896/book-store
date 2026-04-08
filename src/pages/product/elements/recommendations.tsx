import { BookCard } from "@common/book-card";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import type { Book } from "@utils/types";
import { styled, useTheme } from '@mui/material/styles';

type RecommendationsType = {
  recommendedBooks: Book[]
}

export const Recommendations = (props: RecommendationsType) => {
  const { recommendedBooks } = props;

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tabletFrom = useMediaQuery(theme.breakpoints.down('md'));
  const tabletTo = useMediaQuery(theme.breakpoints.up('sm'));

  let limitSize: number = 0;

  if (mobile) {
    limitSize = 2;
  } else if (tabletTo && tabletFrom) {
    limitSize = 3;
  }

  return (
    <StyledBox>
      <Typography variant="h1">Recommendations</Typography>

      <Grid
        container
        columnSpacing="20px"
      >
        {(limitSize !== 0) ? (
          recommendedBooks
            .filter((_, index) => index < limitSize)
            .map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            ))
        ) : (
          recommendedBooks
            .map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            )))}
      </Grid>
    </StyledBox>
  )
};

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 60px 0 80px 0;
`;