import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;

    @media screen and (max-width: 800px) {
        height: 50px;
        padding: 10px;
        margin-bottom: 10px;
    }
`;
// le pasamos el componente al que queremos que se cree
//al aplicar el style
export const LogoContainer = styled(Link)`
    height: 100%;
    align-self: flex-start;
    display: flex;
    align-items: center;
    justify-content: center;

    .logo {
        @media screen and (max-width: 800px) {
            width: 45px;
        }
    }
`;

// con esto creamos una variable de css
export const OptionContainerStyles = css`
    padding: 10px 15px;
    cursor: pointer;

    @media screen and (max-width: 800px) {
        padding: 5px 10px;
    }
`;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;

    @media screen and (max-width: 800px) {
        width: 90%;
    }
`;
// esta es una forma cuando tienen el mismo código, en el código con as = "div" o as = {Link}
// podemos reducir la cantidad de código y que sólo se use uno solo
export const OptionLink = styled(Link)`
    ${OptionContainerStyles}
`;
export const OptionDiv = styled.div`
    ${OptionContainerStyles}
`;

// como no queremos duplicar el código de option
