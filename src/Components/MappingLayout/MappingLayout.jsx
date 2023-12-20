/* eslint-disable react/prop-types */

// major components
import MappingColumn from "../MappingColumn/MappingColumn";
import MappingRow from "../MappingRow/MappingRow";
// minor components
import AddButtons from "../AddButtons/AddButtons";
// hooks and tools
import { useSelector, useDispatch } from "react-redux";
import { createElement } from "react";
import { widgets } from "../../layout";
// actions
import { removeWidget } from "../../redux/actions";

export default function MappingLayout({ map }) {
  const dispatch = useDispatch();
  const mainContent = useSelector((state) => state.map.mainContent);

  return (
    <div className="bg-yellow-200 h-[90dvh] w-[90%] flex relative">
      {!map.next && (
        <div>
          <div className="absolute top-0 right-0 m-[2px]">
            <AddButtons />
          </div>
          {mainContent.map((elem, index) =>
            createElement(widgets[elem.type], {
              key: index,
              direction: "main",
              onClose: () => dispatch(removeWidget("main", elem.id)),
            })
          )}
        </div>
      )}
      {map?.next?.type === "row" ? (
        <MappingRow map={map.next} />
      ) : (
        map?.next?.type === "column" && <MappingColumn map={map.next} />
      )}
    </div>
  );
}
