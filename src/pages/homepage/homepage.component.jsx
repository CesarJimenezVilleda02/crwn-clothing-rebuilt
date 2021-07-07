import React from 'react';
import Directory from '../../components/directory/directory.component';

// import './homepage.styles.scss';

import {HomepageContainer} from "./homepage.styles";

const HomePage = () => {
    return (
        // antes esto era un div
        <HomepageContainer className='homepage'>
            <Directory />
        </HomepageContainer>
    );
};

export default HomePage;
