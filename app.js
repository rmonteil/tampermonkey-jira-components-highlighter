// ==UserScript==
// @name         Jira-components-highlighter
// @namespace    http://www.allo-media.fr/
// @version      1.0
// @description  Customize the extra fields style
// @author       Robin Monteil
// @match        https://allomedia.atlassian.net/secure/RapidBoard.jspa*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Define the styles for the different components
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
        }
    };
    
    // Observe for changes on the DOM
    var observeDOM = (function(){
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
            eventListenerSupported = window.addEventListener;

        return function(obj, callback){
            if( MutationObserver ){
                // Define a new observer
                var obs = new MutationObserver(function(mutations, observer){
                    if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                        callback();
                });
                // Have the observer observe foo for changes in children
                obs.observe( obj, { childList:true, subtree:true });
            }
            else if( eventListenerSupported ){
                obj.addEventListener('DOMNodeInserted', callback, false);
                obj.addEventListener('DOMNodeRemoved', callback, false);
            }
        };
    })();

    // Observe a specific DOM element
    observeDOM(document.getElementsByClassName('ghx-throbber')[0], styleComponents);
    
    function styleComponents(){
        // Get the components (can also be other kind of extra-field)
        var issues = document.querySelectorAll('.ghx-extra-field-content');
        var nbIssues = issues.length;
        if (nbIssues) {
            // If the part of the page we are interested in is loaded, we stop the loop
            //clearInterval(refreshIntervalId);
            var i = 0;
            // Loop all the issues...
            for (; i < nbIssues; i++) {
                // Loop the components of the issue
                var issueComponents = issues[i].textContent.split(', ');
                var newIssueComponents = '';
                for (var issueComponent of issueComponents) {
                    var issueComponentLowerCase = issueComponent.toLowerCase();
                    var cssProperties = '';
                    // If we defined a style for the component
                    if (typeof components[issueComponentLowerCase] !== 'undefined') {
                        // Loop on css properties
                        Object.keys(components[issueComponentLowerCase]).forEach(function(cssProperty) {
                            cssProperties += cssProperty + ':' + components[issueComponentLowerCase][cssProperty] + ';';
                        });
                        newIssueComponents += '<span style="' + cssProperties + '">' + issueComponent + '</span>, ';
                    } else {
                        // Use default style if defined
                        if (typeof components['default'] !== 'undefined') {
                            Object.keys(components['default']).forEach(function(cssProperty) {
                                cssProperties += cssProperty + ':' + components['default'][cssProperty] + ';';
                            });
                            newIssueComponents += '<span style="' + cssProperties + '">' + issueComponent + '</span>, ';
                        } else {
                            newIssueComponents += '<span>' + issueComponent + '</span>, ';
                        }
                    }
                    issues[i].innerHTML = newIssueComponents.substring(0, newIssueComponents.length - 2);
                }
            }
        }
    }
})();