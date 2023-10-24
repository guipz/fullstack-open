sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of browser: The browser makes a post request to the server sending the textfield content.
    activate server
    server-->>browser: Redirect to /notes
    Note right of browser: The server saves the note and return a redirect to the notes page.
    deactivate server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    Note right of browser: The browser is redirected to the notes page and request the page again.
    activate server
    server-->>browser: Returns all resources needed for the page.
    deactivate server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Note right of browser: The javascript code running in the browser will request the notes data.
    activate server
    server-->>browser: Return notes data.
    Note right of browser: The server will return the notes data with our newly created note included.
    deactivate server