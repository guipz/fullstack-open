sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: The browser makes a post request to the server sending the textfield content.
    activate server
    server-->>browser: Return code 201
    Note right of browser: The server saves the note and return a created status code.
    deactivate server
    Note right of browser: The browser saves the note locally and updates the notes list using DOM.
