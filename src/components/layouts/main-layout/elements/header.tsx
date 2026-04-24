import React, { type ChangeEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
import Logo from '@assets/img/logo.svg';
import Search from '@assets/img/search.svg';
import { CartIcon } from '@common/icons/cart-icon';
import { HeartIcon } from '@common/icons/heart-icon';
import { ProfileIcon } from '@common/icons/profile-icon';
import { StyledRoundButton } from '@common/styled-round-button.tsx';
import { useAppSelector } from '@redux/hooks';
import { useDebounce } from '@utils/hooks.ts';
import { IN_APP_ROUTES } from '@utils/routes';

import {
  Box,
  Button,
  Container,
  FilledInput,
  Grid,
  InputAdornment,
  List,
  Popover,
  Typography,
  useMediaQuery,
  type ButtonProps
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { NotificationIcon } from '@common/icons/notification-icon';
import { NotificationItem } from './notification-item';
import { SocketManager } from '../../../../socket';
import type { BookCommentNotificationData } from '@utils/types';
import {
  getCommentBooksNotificationsApi
} from '../../../../api/notification-api';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const queryFilters = [
  'genres',
  'minPrice',
  'maxPrice',
  'sortId',
  'searchValue',
];

export const Header = () => {
  const auth = useAppSelector((state) => {
    return state.user;
  });

  const cartBooks = useAppSelector((state) => {
    return state.cartBooks.books;
  });

  const [
    anchorNotificationEl,
    setAnchorNotificationEl
  ] = React.useState<HTMLElement | null>(null);

  const [comments, setComments] = useState<BookCommentNotificationData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const socket = SocketManager.getSocket();

  const allCount = cartBooks.map((book) => {
    return book.count;
  });

  const totalCount = allCount.reduce((sum, item) => sum + item, 0);


  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));



  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState('');
  const searchValue = useDebounce<string>(inputValue.trim()) || null;

  const getBookNotifications = async () => {
    if (!auth) {
      return
    }

    setIsLoading(true);

    const result = await getCommentBooksNotificationsApi(
      { page: String(page) }
    );

    if (
      result.meta?.pagination.currentPage === result.meta?.pagination.totalPages
      ||
      result.meta && (
        result.meta?.pagination.currentPage > result.meta?.pagination.totalPages
      )
    ) {
      setHasMore(false);
    }

    if (result) {
      setComments(result.data.booksNotifications);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getBookNotifications();
  }, [auth]);

  useEffect(() => {

    if (searchParams.get('searchValue') !== searchValue) {
      queryFilters.forEach((filter) => searchParams.delete(filter));

      if (searchValue) {
        searchParams.set('searchValue', searchValue);
      }

      setSearchParams(searchParams);
    }
  }, [searchParams, searchValue, setSearchParams]);

  const options = {
    root: document.querySelector('.simpleBar'),
    rootMargin: '0px 0px 75px 0px',
    threshold: 0,
  };

  const target = document.querySelector('.target');

  const createObserver = () => {
    return new IntersectionObserver((entries, observer) => {
      let isVisible = false;
      entries.forEach(entry => {
        if (entry.isIntersecting && !isVisible && !isLoading && hasMore) {
          getBookNotifications();
          isVisible = true;
        }

        if (!entry.isIntersecting && isVisible) {
          isVisible = false;
        }
      })
    }, options)
  };

    const observer = createObserver();

    if (target) {
      observer.observe(target);
    }

  // const getMoreBooksCommentsNotifications = () => {
  //   if (!isLoading && hasMore) {
  //     getBookNotifications();
  //   }
  // }

  const handleInputFocus = () => {
    if (location.pathname !== IN_APP_ROUTES.home.path) {
      navigate(IN_APP_ROUTES.home.path);
    }
  };

  const handleInputValueChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
  };

  const handleNotificationButtonClick: ButtonProps['onClick'] = (event) => {
    setAnchorNotificationEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorNotificationEl(null);
  }

  socket?.on(
    'book comment notification',
    () => {
      setPage(1);
      getBookNotifications();
    });

  return (
    <StyledHeader>
      <Container maxWidth="md">
        <Grid
          container
          spacing={1}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Grid size={{ xl: 1, lg: 2 }}>
            <Link to={IN_APP_ROUTES.home.path}>
              <StyledIcon src={Logo} alt="book room" />
            </Link>
          </Grid>

          {mobile && (
            <>
              <StyledCatalogLink to={IN_APP_ROUTES.home.path}>
                <Typography variant="subtitle1" fontWeight={500}>
                  Catalog
                </Typography>
              </StyledCatalogLink>

              <Grid size={{ md: 'auto', sm: 4, xs: 'auto' }}>
                {auth.user
                  ? (
                    <StyledBox>
                      <StyledAuthLink to="#">
                        <StyledRoundButton
                          icon={<NotificationIcon fill="white" />}
                          count={comments.length}
                          onClick={handleNotificationButtonClick}
                        />
                        <StyledPriceRangePopover
                          open={Boolean(anchorNotificationEl)}
                          anchorEl={anchorNotificationEl}
                          onClose={handleNotificationClose}
                          anchorOrigin={
                            { horizontal: 'left', vertical: 'bottom' }
                          }
                          transformOrigin={
                            {
                              vertical: 'top',
                              horizontal: 'center'
                            }
                          }
                          disableScrollLock={true}
                          marginThreshold={null}
                        >
                          <StyledList>
                            <SimpleBar
                              id='simpleBar'
                              style={{ maxHeight: 400 }}
                            >
                              {
                                comments.map((comment, index) => (
                                  <React.Fragment key={comment.id}>
                                    <NotificationItem
                                      targetClassName={
                                        (index === (comments.length - 2))
                                          ? 'target'
                                          : ''
                                      }
                                      handleNotificationClose={
                                        handleNotificationClose
                                      }
                                      comment={comment}
                                    />

                                    {
                                      index !== (comments.length - 1)
                                      &&
                                      <StyledLineBox />
                                    }
                                  </React.Fragment>
                                ))
                              }
                            </SimpleBar>
                          </StyledList>
                        </StyledPriceRangePopover>
                      </StyledAuthLink>
                      <StyledAuthLink to={IN_APP_ROUTES.cart.path}>
                        <StyledRoundButton
                          icon={<CartIcon />}
                          count={totalCount}
                        />
                      </StyledAuthLink>
                      <StyledAuthLink to="#">
                        <StyledRoundButton icon={<HeartIcon fill="none" />} />
                      </StyledAuthLink>
                      <StyledAuthLink to={IN_APP_ROUTES.profile.path}>
                        <StyledRoundButton icon={<ProfileIcon />} />
                      </StyledAuthLink>
                    </StyledBox>
                  ) : (
                    <StyledButton variant="contained">
                      <StyledLink
                        to={IN_APP_ROUTES.login.path}
                      >
                        Log In
                      </StyledLink>
                      /
                      <StyledLink
                        to={IN_APP_ROUTES.register.path}
                      >
                        Sign Up
                      </StyledLink>
                    </StyledButton>
                  )
                }
              </Grid>

              <StyledGridEnd size={{ lg: 7, md: 6, sm: 6, xs: 12 }}>
                {location.pathname === IN_APP_ROUTES.home.path && (
                  <StyledInput
                    fullWidth={true}
                    disableUnderline={true}
                    startAdornment={
                      <InputAdornment position="start">
                        <img src={Search} alt="Search" />
                      </InputAdornment>
                    }
                    onFocus={handleInputFocus}
                    onChange={handleInputValueChange}
                    value={inputValue}
                    placeholder="Search"
                  />
                )}

              </StyledGridEnd>
            </>
          )}

          {!mobile && (
            <>
              <StyledGridEnd size={{ lg: 7, md: 6, sm: 6, xs: 12 }}>
                <StyledCatalogLink to={IN_APP_ROUTES.home.path}>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Catalog
                  </Typography>
                </StyledCatalogLink>

                {location.pathname === IN_APP_ROUTES.home.path && (
                  <StyledInput
                    fullWidth={true}
                    disableUnderline={true}
                    startAdornment={
                      <InputAdornment position="start">
                        <img src={Search} alt="Search" />
                      </InputAdornment>
                    }
                    onFocus={handleInputFocus}
                    onChange={handleInputValueChange}
                    value={inputValue}
                    placeholder="Search"
                  />
                )}

              </StyledGridEnd>

              <StyledButtonGrid size={{ md: 3, sm: 4, xs: 'auto' }}>
                {auth.user
                  ? (
                    <StyledBox>
                      <StyledAuthLink to="#">
                        <StyledRoundButton
                          icon={<NotificationIcon fill="white" />}
                          count={comments.length}
                          onClick={handleNotificationButtonClick}
                        />
                      </StyledAuthLink>
                      <StyledPriceRangePopover
                        open={Boolean(anchorNotificationEl)}
                        anchorEl={anchorNotificationEl}
                        onClose={handleNotificationClose}
                        anchorOrigin={
                          { horizontal: 'left', vertical: 'bottom' }
                        }
                        transformOrigin={
                          {
                            vertical: 'top',
                            horizontal: 'center'
                          }
                        }
                        disableScrollLock={true}
                        marginThreshold={null}
                      >
                        <StyledList>
                          <SimpleBar id='simpleBar' style={{ maxHeight: 400 }}>
                            {
                              comments.map((comment, index) => (
                                <React.Fragment key={comment.id}>
                                  <NotificationItem
                                    targetClassName={
                                      (index === (comments.length - 2))
                                        ? 'target'
                                        : ''
                                    }
                                    handleNotificationClose={
                                      handleNotificationClose
                                    }
                                    comment={comment}
                                  />

                                  {
                                    index !== (comments.length - 1)
                                    &&
                                    <StyledLineBox />
                                  }
                                </React.Fragment>
                              ))
                            }
                          </SimpleBar>
                        </StyledList>
                      </StyledPriceRangePopover>
                      <StyledAuthLink to={IN_APP_ROUTES.cart.path}>
                        <StyledRoundButton
                          icon={<CartIcon />}
                          count={totalCount}
                        />
                      </StyledAuthLink>
                      <StyledAuthLink to="#">
                        <StyledRoundButton icon={<HeartIcon fill="none" />} />
                      </StyledAuthLink>
                      <StyledAuthLink to={IN_APP_ROUTES.profile.path}>
                        <StyledRoundButton icon={<ProfileIcon />} />
                      </StyledAuthLink>
                    </StyledBox>
                  ) : (
                    <StyledButton variant="contained">
                      <StyledLink
                        to={IN_APP_ROUTES.login.path}
                      >
                        Log In/
                      </StyledLink>

                      <StyledLink
                        to={IN_APP_ROUTES.register.path}
                      >
                        Sign Up
                      </StyledLink>
                    </StyledButton>
                  )
                }
              </StyledButtonGrid>
            </>
          )
          }
        </Grid>
      </Container>
    </StyledHeader >
  );
};

const StyledHeader = styled('header')`
  padding: 24px 0;
`;

const StyledButton = styled(Button)`
  border-radius: 16px;
  max-width: 230px;
  width: 100%;
  height: 44px;
  text-transform: none;
  text-align: center;

  @media (max-width: 600px) {
    max-width: 140px;
    width: 100%;
    height: 38px;
    padding: 10px 15px;
    text-align: center;
  }
`;

const StyledInput = styled(FilledInput)(({ theme }) => `
  height: 64px;
  background-color: ${theme.palette.appColor.light};
  border-radius: 16px;
  text-align: center;
  padding: 20px;

  &:after {
    border-bottom: none;
  }

  & .MuiInputAdornment-root {
    margin: 0;
  }

  & .MuiInputBase-input {
    padding: 20px 24px;
  }

  @media (max-width: 834px) {
    max-width: 247px;
    width: 100%;
  }

  @media (max-width: 770px) {
    max-width: 770px;
    width: 100%;
    font-size: 14px;
    height: 47px;

    & .MuiInputBase-input {
      padding: 12px 14px;
    }
  }

  @media (max-width: 320px) {
    padding: 10px 10px;
  }
`);

const StyledLink = styled(Link)(({ theme }) => `
  text-decoration: none;
  color: ${theme.palette.appColor.light};
  text-align: center;

  @media (max-width: 600px) {
    width: 45px;
    height: 20px;
    font-size: 12px;
  }
`);

const StyledGridEnd = styled(Grid)`
  display: flex;
  align-items: center;
  gap: 36px;
`;

const StyledIcon = styled('img')`
  @media (max-width: 600px) {
    width: 62px;
  }
`;

const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  max-width: 200px;
  width: 100%;

  @media (max-width: 770px) {
    justify-content: center;
    gap: 5px;
  }
`;

const StyledButtonGrid = styled(Grid)`
  display: flex;
  justify-content: flex-end;
`;

const StyledAuthLink = styled(Link)`
  width: 48px;

  @media (max-width: 600px) {
    width: 32px;
  }
`;

const StyledCatalogLink = styled(Link)(({ theme }) => `
  text-decoration: none;
  color: ${theme.palette.appColor.darkBlue};
`);

const StyledPriceRangePopover = styled(Popover)(({ theme }) => `
  & .MuiPaper-root {
    background-color: ${theme.palette.appColor.darkBlue};
    margin-top: 16px;
    border-radius: 16px;
    overflow: visible;
    box-shadow: none;
    max-width: 400px;
    width: 100%;
    padding: 0 8px;
    
      & .MuiCheckbox-root {
        padding: 5px 15px;
      }

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 165px;
      width: 20px;
      height: 20px;
      background: ${theme.palette.appColor.darkBlue};
      transform: translateY(-50%) rotate(45deg);
      z-index: 0;
    }
  }
  
  & .MuiButtonBase-root {
      padding: 15px 15px 10px 15px;
      
      & .MuiListItemIcon-root {
        display: block;
        max-width: 34px;
        min-width: auto;
      }
      
      & .MuiListItemText-root {
      display: flex;
      justify-content: start;
      color: ${theme.palette.appColor.darkBlue};
      
      & .MuiTypography-root {
       font-weight: 500;
       font-size: 16px;
      }
    }
  }
`);

const StyledList = styled(List)(({ theme }) => `
  &. MuiList-root {
    width: 100%;
    max-width: 360px;
    background-color: ${theme.palette.appColor.light};
  }

  & .MuiListItem-root {
      width: 97%;
    }
`);

const StyledLineBox = styled(Box)(({ theme }) => `
  height: 1px;
  width: 100%;
  background-color: ${theme.palette.appColor.lightGrey};
  margin: 10px 0;
`);
