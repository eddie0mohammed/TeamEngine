import styled from "styled-components";

export const StyledTable = styled.table``;

export const THead = styled.thead`
  position: sticky;
  top: 0;
`;

export const TFoot = styled.tfoot``;

export const TBody = styled.tbody``;

export const TR = styled.tr`
  :nth-child(even) {
    background-color: lightGray;
  }
  :nth-child(odd) {
    background-color: white;
  }
  height: 50px;
`;

export const TH = styled.th`
  background-color: black;
  color: white;
  height: 50px;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
`;

export const TD = styled.td`
  text-align: center;
  ${({ boldFont }) =>
    boldFont &&
    `
    font-weight: bold
  `};
`;
