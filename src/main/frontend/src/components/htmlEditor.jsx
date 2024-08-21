import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

export const Editor = ({ initialContent }) => {
    const editor = useRef(null);
    const [content, setContent] = useState(initialContent || '');

    const config = useMemo(() => {
        return {
            readonly: false, // all options from https://xdsoft.net/jodit/docs/,
            placeholder: 'Start typing...',
            statusbar: false,
            toolbarAdaptive: false,
            buttons: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'brush', '|',
                'ul', 'ol', '|', 'font', 'fontsize', 'paragraph', '|', 'align', 'indent', 'outdent', '|', 'image',
                'link', '|', 'spellcheck', 'source'],
            addNewLine: false,
            spellcheck: true,
        }},
        [initialContent]
    );

    return (
        <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            // onChange={newContent => {}}
        />
    );
};

export default Editor;