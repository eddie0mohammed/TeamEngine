import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
`;

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

  min-height: 50px;
  max-height: 50px;
`;

export const TH = styled.th`
  background-color: black;
  color: white;
  height: 50px;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;

  ${({ width }) =>
    width &&
    `
    width: ${width}%;
  `};
`;

export const TD = styled.td`
  text-align: center;
  ${({ boldFont }) =>
    boldFont &&
    `
    font-weight: bold
  `};
`;
