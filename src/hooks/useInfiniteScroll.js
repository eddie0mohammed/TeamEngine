/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

function useInfiniteScroll(scrollEl, callback) {
  console.log(scrollEl);
  //   const [scrollBottomReached, setScrollBottomReached] = useState(false);

  //   useEffect(() => {
  //     function handleScroll() {
  //       const bottomOffset = 50;
  //       setScrollBottomReached(
  //         scrollEl.scrollHeight - scrollEl.scrollTop <=
  //           scrollEl.clientHeight + bottomOffset
  //       );
  //     }

  //     if (scrollEl) {
  //       scrollEl.addEventListener("scroll", handleScroll);
  //     }

  //     return () => {
  //       if (scrollEl) {
  //         scrollEl.removeEventListener("scroll", handleScroll);
  //       }
  //     };
  //   }, [scrollEl]);

  //   useEffect(() => {
  //     if (scrollBottomReached) {
  //       callback();
  //       setScrollBottomReached(false);
  //     }
  //   }, [scrollBottomReached, callback]);

  //   return {
  //     scrollBottomReached,
  //   };
}

export default useInfiniteScroll;
