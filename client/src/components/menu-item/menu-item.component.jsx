import React from 'react';
import { withRouter } from 'react-router-dom';

import {
    MenuItemContainer,
    BackgroundImageContainer,
    ContentContainer,
    ContentTitle,
    ContentSubtitle,
} from './menu-item.styles';

const MenuItem = ({ title, imageUrl, size, history, match, id }) => {
    // const url = '/shop/' + title;
    return (
        <MenuItemContainer size={size} onClick={() => history.push(`${match.url}${id}`)}>
            <BackgroundImageContainer className='background-image' imageUrl={imageUrl} />
            <ContentContainer className='content'>
                <ContentTitle>{title.toUpperCase()}</ContentTitle>
                <ContentSubtitle>SHOP NOW</ContentSubtitle>
            </ContentContainer>
        </MenuItemContainer>
    );
};

export default withRouter(MenuItem);
