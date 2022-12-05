import React, { useEffect, useRef, useState } from "react";
import { NavOptionsProps } from "../../NavOptions/NavOptions";
import "./Members.scss";

const Members = ({ members }: NavOptionsProps) => {
  // const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <div className="members-container">
      {members.map((member, i) => {
        return (
          <div key={i} className="member" style={{ zIndex: -i + 5 }}>
            <p>{member[0]}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Members;

// function useHover<T>(): [MutableRefObject<T>, boolean] {
//   const [value, setValue] = useState<boolean>(false);

//   const ref: any = useRef<T | null>(null);

//   const handleMouseOver = (): void => setValue(true);
//   const handleMouseOut = (): void => setValue(false);

//   useEffect(
//     () => {
//       const node: any = ref.current;
//       if (node) {
//         node.addEventListener("mouseover", handleMouseOver);
//         node.addEventListener("mouseout", handleMouseOut);

//         return () => {
//           node.removeEventListener("mouseover", handleMouseOver);
//           node.removeEventListener("mouseout", handleMouseOut);
//         };
//       }
//     },
//     [ref.current] // Recall only if ref changes
//   );

//   return [ref, value];
// }

/*
  Start by passing in the members data as a prop
  Map through the members data and display the members as a circle
  need to know when one of them is clicked (but can do that later) - to filter the tasks
*/
