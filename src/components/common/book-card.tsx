import {
  type MouseEventHandler,
} from 'react';
import { useNavigate } from 'react-router';
import { HeartIcon } from '@common/icons/heart-icon.tsx';
import { StyledButton } from '@common/styled-button.tsx';
import { formatPrice } from '@utils/formatters.ts';
import type { Book } from '@utils/types.ts';

import {
  Box,
  Grid, type GridProps,
  IconButton, type IconButtonProps,
  Rating,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

type BookCardProps = {
  book: Book,
};


export const BookCard = (props: BookCardProps) => {
  const { book } = props;

  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/product/${book.id}`);
  };

  const handleIconButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    // toggleLike()
  };

  const handleBookPriceButtonClick = () => {
    
  };

  return (
    <Grid
      container
      size={{ md: 3, sm: 4, xs: 6 }}
      sx={{ flexDirection: 'column' }}
      rowSpacing="30px"
    >
      <StyledCoverGrid
        onClick={handleBookClick}
        img={`http://localhost:3000/${book.media}`}
      >
        <StyledIconButton
          onClick={handleIconButtonClick}
          transparent={!book.isFavorite}
        >
          <HeartIcon fill={book.isFavorite ? 'white' : 'none'} />
        </StyledIconButton>
      </StyledCoverGrid>

      <Grid rowSpacing="20px" container width="100%">
        <Grid
          onClick={handleBookClick} sx={{ cursor: 'pointer' }}
        >
          <Typography
            title={book.title}
            variant={'subtitle2'}
            fontWeight={500}
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}
          >
            {book.title}
          </Typography>

          <Typography
            title={book.author}
            variant={'subtitle2'}
            fontWeight={500}
            color={'#B9BAC3'}
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}
          >
            {book.author}
          </Typography>
        </Grid>

        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          size={12}
        >
          <StyledRating
            value={+book.booksRating}
            precision={1}
            size="large"
            readOnly={true}
          />

          <Box sx={{ mr: 2 }}>
            <Typography
              variant={'subtitle1'}
              sx={(theme) => ({
                color: theme.palette.appColor.darkGrey
              })}
            >
              {book.booksRating ? book.booksRating : '0.0'}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <StyledButton onClick={handleBookPriceButtonClick} buttonHeight={48} sx={{ fontSize: '20px' }}>
        {formatPrice(book.price)}
      </StyledButton>
    </Grid>
  );
};

const StyledCoverGrid = styled(
  (props: GridProps) => <Grid {...props} />,
  { shouldForwardProp: (prop) => prop !== 'img' }
)<{ img?: string }>(({ img = 'src/assets/img/no-cover.webp' }) => ({
  position: 'relative',
  height: 455,
  backgroundImage: `url(${img})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  borderRadius: 16,
  cursor: 'pointer'
}));

const StyledIconButton = styled(
  (props: IconButtonProps) => <IconButton {...props} />,
  { shouldForwardProp: (prop) => prop !== 'transparent' }
)<{ transparent?: boolean }>(({ transparent = true, theme }) => ({
  position: 'absolute',
  left: 20,
  top: 20,
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
