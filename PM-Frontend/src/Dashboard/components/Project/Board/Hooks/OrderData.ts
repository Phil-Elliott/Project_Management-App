import { useEffect, useState } from "react";
import { fakeDataProps } from "../Board";

// export function useOrderData<T>(data: T) {
//   const [ordered, setOrdered] = useState<T>([]);

//   const orderedContent = data.sort((a, b) => {
//     return a.order - b.order;
//   });
//   setOrdered(orderedSections);
// }

export function useOrderData<T>(fakeData: fakeDataProps, part: string) {
  const [ordered, setOrdered] = useState<fakeDataProps>([]);

  useEffect(() => {
    const orderedContent = fakeData.tasksSections.sort((a, b) => {
      return a.order - b.order;
    });
    setOrdered(orderedContent);
  }, [data]);

  return ordered;
}

// const [orderedSections, setOrderedSections] = useState<
//     {
//       id: string;
//       name: string;
//     }[]
//   >([]);

//   useEffect(() => {
//     const orderedSections = fakeData.tasksSections.sort((a, b) => {
//       return a.order - b.order;
//     });
//     setOrderedSections(orderedSections);
//   }, [fakeData.tasksSections]);
