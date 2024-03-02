/* eslint-disable react/prop-types */

// hooks & tools
import { useDispatch } from "react-redux";
import { dndTypes } from "../../../layout";
// react-dnd
import { useDrag } from "react-dnd";
// actions
import { changeWidgets } from "../../../redux/actions";
// minorComponents
import ThreeDotsMenu from "../../ThreeDotsMenu/ThreeDotsMenu";

export default function Green({ id, parentId, direction, onClose }) {
  const dispatch = useDispatch();

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      // drag & dragPreview are Refs: [ ..., drag, dragPreview] = useDrag()
      // "type" is required. It is used by the "accept" specification of drop targets.
      type: dndTypes.WIDGET,
      item: { widId: id, parentId },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          dispatch(
            changeWidgets(
              item.widId,
              item.parentId,
              dropResult.dropId,
              dropResult.position
            )
          );
        }
      },
      // The collect function utilizes a "monitor" instance
      // to pull important pieces of state from the DnD system.
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    // this id MUST be in array or it gets memoed
    [id]
  );

  const styles = {
    width:
      direction === "column" ? "100%" : direction === "row" ? "250px" : "100%",
    height:
      direction === "column" ? "250px" : direction === "row" ? "100%" : "",
  };

  return (
    <div
      style={{
        ...styles,
        viewTransitionName: "name-" + id,
      }}
      className="bg-green-200 rounded-[20px] flex flex-col flex-shrink-0 overflow-hidden"
    >
      <div
        ref={drag}
        className="w-full flex justify-start px-4 py-2 cursor-grab active:cursor-grabbing bg-dot-small-black/30"
      >
        <ThreeDotsMenu onClose={onClose} />
      </div>
      {`<WidgetExample /> id:${id}`}
      <div ref={preview}></div>
    </div>
  );
}
