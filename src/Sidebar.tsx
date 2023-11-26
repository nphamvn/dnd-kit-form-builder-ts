import { useRef } from "react";
import { SidebarFieldItem, fields } from "./fields";
import { useDraggable } from "@dnd-kit/core";
import { nanoid } from "nanoid";

export function SidebarField({ field, overlay }: { field: SidebarFieldItem, overlay: boolean }) {
    const { title } = field;
    let className = "sidebar-field";
    if (overlay) {
        className += " overlay";
    }

    return <div className={className}>{title}</div>;
}

function DraggableSidebarField({ field }: { field: SidebarFieldItem }) {
    const id = useRef(nanoid());
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: id.current,
        data: {
            field: field,
            fromSidebar: true
        }
    });

    return (
        <div
            ref={setNodeRef}
            className="sidebar-field"
            {...listeners}
            {...attributes}
        >
            <SidebarField field={field} overlay={false} />
        </div>
    );
}

export default function Sidebar({ fieldsRegKey }: { fieldsRegKey: number }) {
    return (
        <div key={fieldsRegKey} className="sidebar">
            {fields.map((field) => (
                <DraggableSidebarField key={field.type} field={field} />
            ))}
        </div>
    );
}