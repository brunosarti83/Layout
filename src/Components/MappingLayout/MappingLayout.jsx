import MappingColumn from "../MappingColumn/MappingColumn";
import MappingRow from "../MappingRow/MappingRow";

export default function Layout({ map }) {
    return (
    <div className="bg-yellow-200 h-[90%] w-[90%] flex">
        { map?.next?.type === 'row' ? <MappingRow map={map.next} /> :
            map?.next?.type === 'column' && <MappingColumn map={map.next} />
        }
    </div>
    );
  }