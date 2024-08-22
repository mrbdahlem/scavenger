import React, {useState, useMemo} from 'react';
import JoditEditor from 'jodit-react';

export const Editor = ({ content, placeholder, onChange, ref }) => {
    //const editor = useRef(null);
    const [value, setValue] = useState(content || '');

    const config = useMemo(() => {
        return {
            readonly: false, // all options from https://xdsoft.net/jodit/docs/,
            placeholder: placeholder || 'Start typing...',
            statusbar: false,
            toolbarAdaptive: false,
            buttons: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'brush', '|',
                'ul', 'ol', '|', 'font', 'fontsize', 'paragraph', '|', 'align', 'indent', 'outdent', '|', 'image',
                'link', '|', 'spellcheck', 'source'],
            addNewLine: false,
            spellcheck: true,
            height: -1,
            allowResizeX: false,
            allowResizeY: true,

        }},
        [placeholder]
    );

    const handleChanges = (newContent) => {
        setValue(newContent);
        if (onChange) {
            onChange(newContent);
        }
    };

    return (
        <JoditEditor
            ref={ref}
            value={value}
            config={config}

            tabIndex={-1} // tabIndex of textarea
            // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={handleChanges}
        />
    );
};

export default Editor;