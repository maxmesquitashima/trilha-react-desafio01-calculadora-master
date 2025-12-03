import styled from 'styled-components';

export const ButtonContainer = styled.button`
    padding: 20px;
    border: 1px solid #CDCDCD;
    background-color: #00AAF0;
    color: #FFFFFF;
    font-size: 24px;
    font-weight: 700;
    flex: 1;
    transition: all 0.1s ease-in-out;

    &:hover {
        opacity: 0.6;
    }

    &:active {
        transform: scale(0.95);
        box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2);
    }

    &.operator {
        background-color: #E67E22;
    }
`