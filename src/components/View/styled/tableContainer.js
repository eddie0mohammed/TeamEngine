// import { forwardRef } from "react";
import styled from "styled-components";

// const tableContainer = forwardRef(({ className, children }, ref) => {
//   console.log(ref);
//   return (
//     // eslint-disable-next-line react/react-in-jsx-scope
//     <div className={className} ref={ref}>
//       {...children}
//     </div>
//   );
// });

// const TableContainer = styled(tableContainer)`
const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  height: 80vh;
  overflow: auto;
`;

export default TableContainer;
