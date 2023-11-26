import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { renderers } from "./fields";

export type FieldItem = {
    id: string;
    name: string;
    type: string;
    parent: unknown
}

function getRenderer(type) {
    if (type === "spacer") {
        return () => {
            return <div className="spacer">spacer</div>;
        };
    }

    return renderers[type] || (() => <div>No renderer found for {type}</div>);
}

export function Field({ field, overlay }: { field: FieldItem, overlay: boolean }) {
    const { type } = field;

    const Component = getRenderer(type);

    let className = "canvas-field";
    if (overlay) {
        className += " overlay";
    }

    return (
        <div className={className}>
            <Component />
        </div>
    );
}

function SortableField({ id, index, field }: { id: string, index: number, field: FieldItem }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id,
        data: {
            index,
            id,
            field
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Field field={field} overlay={false} />
        </div>
    );
}

export default function Canvas({ fields }: { fields: FieldItem[]}) {
    console.log('Canvas:. fields: ', fields)
    const {
        listeners,
        setNodeRef,
        transform,
        transition
    } = useDroppable({
        id: "canvas_droppable",
        data: {
            parent: null,
            isContainer: true
        }
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div
            ref={setNodeRef}
            className="canvas"
            style={style}
            {...listeners}
        >
            <div className="canvas-fields">
                {fields?.map((field, index) => (
                    <SortableField key={field.id} id={field.id} field={field} index={index} />
                ))}
            </div>
        </div>
    );
}