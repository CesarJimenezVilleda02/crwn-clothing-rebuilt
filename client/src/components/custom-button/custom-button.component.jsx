import React from 'react';

// import './custom-button.styles.scss';

// recordemos que los estilos especiales ya se los metimos con la función
import { CustomButtonContainer } from './custom-buttons.style';

const CustomButton = ({children, ...props}) => {
    // si pasamos un tipo submit este le va a llegar al boton
    // como ya no tiene la clase custom button se rompe la shop page porque ya no se encuentra 
    // donde aplicar el estilp con el absolute
    return (
        <CustomButtonContainer {...props}>
            {children}
        </CustomButtonContainer>
    );
};

export default CustomButton;
// const CustomButton = (props, {children}) => {
//     // si pasamos un tipo submit este le va a llegar al boton
//     return (
//         <CustomButtonContainer {...props}>
//             {children}
//         </CustomButtonContainer>
//     );
// };

// export default CustomButton;
