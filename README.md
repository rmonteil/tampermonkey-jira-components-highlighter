# tampermonkey-Jira-components-highlighter

Description
--
This script allows you to highligh the components linked to your Jira issues. You can customize the look of each component just by editing the script and adding some CSS in the `components` object.

For now, it works on the "backlog" and "active sprints" pages.

Customize
--
Simply edit the `components` object as in this example:
```javascript
var components = {
    'default': {
        'text-transform': 'uppercase',
        'font-size': '0.6rem',
        'font-weight': 'bold',
        'display': 'inline-block',
        'padding': '1px 3px',
        'border-radius': '3px',
        'color': 'black',
        'background-color': 'white',
        'border': '1px solid black'
    },
    'my component': {
        'text-transform': 'uppercase',
        'font-size': '0.6rem',
        'font-weight': 'bold',
        'display': 'inline-block',
        'padding': '1px 3px',
        'border-radius': '3px',
        'color': '#FFF',
        'background-color': '#a05ed2'
    },
};
```
