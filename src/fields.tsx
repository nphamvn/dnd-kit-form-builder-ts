// These will be available from the sidebar
export type SidebarFieldItem = {
    type: string;
    title: string;
}

export const fields: SidebarFieldItem[] = [
    {
        type: "input",
        title: "Text Input"
    },
    {
        type: "select",
        title: "Select"
    },
    {
        type: "text",
        title: "Text"
    },
    {
        type: "button",
        title: "Button"
    },
    {
        type: "textarea",
        title: "Text Area"
    }
];

// These define how we render the field
export const renderers = {
    input: () => <input type="text" placeholder="This is a text input" />,
    textarea: () => <textarea rows={5} />,
    select: () => (
        <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
    ),
    text: () => (
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. 
        </p>
    ),
    button: () => <button>Button</button>
};