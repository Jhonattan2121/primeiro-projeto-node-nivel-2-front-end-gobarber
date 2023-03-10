import styled, { css } from "styled-components";
import Tooltip from '../Tooltip'

interface IsFocusProps {
    isFocus: boolean;
    isFilled: boolean;
    isErrored: boolean;

}


export const Container = styled.div <IsFocusProps> `
background: #232129;
border-radius: 10px;
padding: 16px;
width: 100%;
border: 2px solid #232129;
color:#666360;
display: flex;
align-items: center;
& + div {
    margin-top: 8px;
}
${props => props.isErrored && css `
border-color:#c53030 ;
    
`}
${props => props.isFocus && css `
    color: #ff9000;
    border-color:#ff9000 ;
`}
${props => props.isFilled && css `
    color: #ff9000;
    
`}
input {
    flex:1;
    background: #232129;
    border: 0;
    color: #F4EDE8;
&  ::placeholder {
    color:#666360;
}
}
svg {
    margin-right: 16px;
}
`
export const Error  = styled(Tooltip) `
    height: 20px;
    margin-left: 16px;
    svg {
        margin:0;
    }
    span {
        background: #c53030;
        color: #ffff;
        &::before {
        border-color: #c53030 transparent;
    }
}
`
  